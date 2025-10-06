import fs from 'fs/promises';
import path from 'path';
import { pathToFileURL } from 'url';

import { type Command } from '../../types/command';
import {
  DEFAULT_OUTPUT_DIR,
  DEFAULT_DOCS_DIR,
  CONFIG_FILE_NAME,
} from '../../types/constant';

export const buildCommand: Command = {
  name: 'build',
  description: 'Build the documentation',
  run: async () => {
    try {
      console.log('Building the documentation...');

      const docsPath = path.join(process.cwd(), DEFAULT_DOCS_DIR);
      const distPath = path.join(process.cwd(), DEFAULT_OUTPUT_DIR);
      const configPath = path.join(process.cwd(), CONFIG_FILE_NAME);

      // check if docs folder exists
      try {
        const stats = await fs.stat(docsPath);
        if (!stats.isDirectory()) {
          console.error(
            'Project documentation not found (docs is not a folder)'
          );
          return;
        }
      } catch {
        console.error('Project documentation not found (docs folder missing)');
        return;
      }

      // make sure project exists
      await fs.mkdir(distPath, { recursive: true });

      // load config file
      let config: any;
      try {
        const imported = await import(pathToFileURL(configPath).href);
        config = imported.config;
      } catch (err) {
        console.error('Failed to load config file:', err);
        return;
      }

      // read items inside docs
      const items = await fs.readdir(docsPath);

      // copy each file/folder from docs to OUTPUT_DIR
      for (const item of items) {
        const src = path.join(docsPath, item);
        const dest = path.join(distPath, item);

        await fs.cp(src, dest, { recursive: true });
      }

      // generate index.html from config
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${config.title}</title>
</head>
<body>
  <h1>${config.title}</h1>
  <p>Version: ${config.version}</p>
  <img src="assets/${config.imageIcon}" alt="App Icon" width="100" />

  <nav>
    ${config.route
      .map(
        (menu: any) => `
        <h2>${menu.titleHeader}</h2>
        <ul>
          ${menu.sidebar
            .map((item: any) => `<li>${item.title} - ${item.content}</li>`)
            .join('')}
        </ul>
      `
      )
      .join('')}
  </nav>
</body>
</html>
`;

      await fs.writeFile(path.join(distPath, 'index.html'), html, 'utf-8');

      console.log('Documentation built successfully!');
    } catch (error) {
      console.error('Failed to build:', error);
    }
  },
};
