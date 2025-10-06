// services/archiveService.ts
import fs from 'fs/promises';
import path from 'path';

import { incrementVersion } from '../../utils/version';
import { type ArchiveOptions } from '../../types/command';

import {
  CONFIG_FILE_NAME,
  ASSETS_DIR,
  CONTENTS_DIR,
  ARCHIVE_DIR,
} from '../../types/constant';

// helper to check if a path exists
async function checkExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

export async function archiveDocs({
  docsPath,
  archiveVersion,
  isBlank,
  isAllow,
  configPath,
}: ArchiveOptions): Promise<string> {
  let archivePath = path.join(docsPath, ARCHIVE_DIR, archiveVersion);

  // check if the version already exists
  const exists = await checkExists(archivePath);

  if (exists && !isAllow) {
    throw new Error(
      `Archive version ${archiveVersion} already exists. \nUse '--allow' to handle version conflicts.`
    );
  }

  if (exists && isAllow) {
    // increment until a new unused version is found
    while (true) {
      const nextVersion = incrementVersion(archiveVersion);
      const nextPath = path.join(docsPath, ARCHIVE_DIR, nextVersion);
      const nextExists = await checkExists(nextPath);

      if (nextExists) {
        archiveVersion = nextVersion;
        archivePath = nextPath;
        continue;
      } else {
        archiveVersion = nextVersion;
        archivePath = nextPath;
        break;
      }
    }

    // update config file → change version in zocument.config.js
    let configContent = await fs.readFile(configPath, 'utf-8');
    configContent = configContent.replace(
      /version:\s*["'`](.*?)["'`]/,
      `version: "${archiveVersion}"`
    );
    await fs.writeFile(configPath, configContent, 'utf-8');
  }

  // create new archive folder
  await fs.mkdir(archivePath, { recursive: true });

  // copy/move assets & contents
  const handleFolder = async (
    srcPath: string,
    destPath: string,
    name: string
  ) => {
    try {
      await fs.mkdir(destPath, { recursive: true });
      const items = await fs.readdir(srcPath);
      for (const item of items) {
        const src = path.join(srcPath, item);
        const dest = path.join(destPath, item);
        if (isBlank) {
          await fs.rename(src, dest); // move
        } else {
          await fs.cp(src, dest, { recursive: true }); // copy
        }
      }
    } catch {
      console.warn(`No ${name} folder found`);
    }
  };

  await handleFolder(
    path.join(docsPath, ASSETS_DIR),
    path.join(archivePath, ASSETS_DIR),
    ASSETS_DIR
  );
  await handleFolder(
    path.join(docsPath, CONTENTS_DIR),
    path.join(archivePath, CONTENTS_DIR),
    CONTENTS_DIR
  );

  try {
    await fs.cp(configPath, path.join(archivePath, CONFIG_FILE_NAME));
    console.log(`Documentation archived as version ${archiveVersion}`);
  } catch {
    console.warn('Failed to archive documentation config');
  }

  return archiveVersion;
}
