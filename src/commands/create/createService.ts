import fs from 'fs';
import path from 'path';

import { type THEME_NAME } from '../../types/command';
import themes from '../config';
import {
  CONFIG_FILE_NAME,
  DEFAULT_DOCS_DIR,
  ASSETS_DIR,
  CONTENTS_DIR,
  ARCHIVE_DIR,
  DEFAULT_THEME,
} from '../../types/constant';

export async function initZocument(theme: THEME_NAME = DEFAULT_THEME) {
  try {
    // Path folder
    const docsPath = path.join(process.cwd(), DEFAULT_DOCS_DIR);
    const assetsPath = path.join(docsPath, ASSETS_DIR);
    const contentsPath = path.join(docsPath, CONTENTS_DIR);
    const releasePath = path.join(docsPath, ARCHIVE_DIR);

    // create zocument.config.js file in current working directory
    const filePath = path.join(process.cwd(), CONFIG_FILE_NAME);

    // Check if file already exists
    if (fs.existsSync(filePath) && fs.existsSync(docsPath)) {
      console.log('Zocument project already exists!');
      return;
    }

    // Create docs folder
    fs.mkdirSync(docsPath);
    fs.mkdirSync(assetsPath);
    fs.mkdirSync(contentsPath);
    fs.mkdirSync(releasePath);

    // Create file with default config content
    fs.writeFileSync(filePath, themes[theme], 'utf8');

    console.log('Zocument project created successfully!');
  } catch (error) {
    console.error('Error creating Zocument project');
  }
}
