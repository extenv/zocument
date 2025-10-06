import fs from 'fs/promises';
import path from 'path';
import { cleanFolder, copyFolder } from '../../utils/file';

export async function rollbackDocs({
  docsPath,
  configPath,
  rollbackVersion,
}: {
  docsPath: string;
  configPath: string;
  rollbackVersion: string;
}) {
  const archivePath = path.join(docsPath, 'archive', rollbackVersion);
  const assetsPath = path.join(archivePath, 'assets');
  const contentsPath = path.join(archivePath, 'contents');
  const archiveConfigPath = path.join(archivePath, 'zocument.config.js');

  try {
    await fs.access(archivePath);
  } catch {
    throw new Error(`Archive version ${rollbackVersion} not found.`);
  }

  console.log(`Rolling back documentation to version ${rollbackVersion}...`);

  const docsAssets = path.join(docsPath, 'assets');
  const docsContents = path.join(docsPath, 'contents');

  await cleanFolder(docsAssets);
  await cleanFolder(docsContents);

  await copyFolder(assetsPath, docsAssets);
  await copyFolder(contentsPath, docsContents);

  try {
    await fs.copyFile(archiveConfigPath, configPath);
  } catch {
    throw new Error(`Rollback to version ${rollbackVersion} failed!`);
  }

  console.log(`Rollback to version ${rollbackVersion} completed!`);
}
