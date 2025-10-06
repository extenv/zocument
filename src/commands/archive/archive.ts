import { type Command } from '../../types/command';
import path from 'path';
import { pathToFileURL } from 'url';

import { archiveDocs } from './archiveService';
import { rollbackDocs } from './rollbackService';
import { deleteArchive } from './deleteService';

import { printError } from '../../utils/error';

import { type VERSIONTYPE } from '../../types/command';

import {
  CONFIG_FILE_NAME,
  ASSETS_DIR,
  CONTENTS_DIR,
  ARCHIVE_DIR,
  DEFAULT_DOCS_DIR,
} from '../../types/constant';

export const archiveCommand: Command = {
  name: 'archive',
  description:
    'Archive documentation into versioned folder, rollback, delete, or auto-increment',
  run: async (args) => {
    const rootPath = process.cwd();
    const configPath = path.join(rootPath, CONFIG_FILE_NAME);
    const docsPath = path.join(rootPath, DEFAULT_DOCS_DIR);

    const rollArg = args.find((arg) => arg.startsWith('--roll='));
    const delArg = args.find((arg) => arg.startsWith('--del='));
    const isBlank = args.includes('--blank');
    const isAllow = args.includes('--allow');

    // ============ delete mode ============
    if (delArg) {
      const delVersion = delArg.split('=')[1];
      if (!delVersion) {
        console.error('Error: Please provide a version after --del=');
        return;
      }

      try {
        await deleteArchive({ docsPath, delVersion });
      } catch (err) {
        console.error(err);
      }
      return;
    }

    // ============ rollback mode ============
    if (rollArg) {
      const rollbackVersion = rollArg.split('=')[1];
      if (!rollbackVersion) {
        console.error('Error: Please provide a version after --roll=');
        return;
      }

      try {
        await rollbackDocs({ docsPath, configPath, rollbackVersion });
      } catch (err) {
        printError(err);
      }
      return;
    }

    // ============ archive mode ============
    let version: VERSIONTYPE;
    try {
      const configModule = await import(pathToFileURL(configPath).href);
      version = configModule.config?.version;
    } catch {
      console.error('Error: Cannot load config file');
      return;
    }

    if (!version) {
      console.error('Error: Version not found in config file');
      return;
    }

    try {
      await archiveDocs({
        docsPath,
        archiveVersion: version,
        isBlank,
        isAllow,
        configPath,
      });
    } catch (err) {
      printError(err);
    }
  },
};
