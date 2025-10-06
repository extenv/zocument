// src/commands/create.ts
import { type Command } from '../../types/command';
import { type THEME_NAME } from '../../types/command';

import { initZocument } from './createService';

export const createCommand: Command = {
  name: 'create',
  description: 'Create a new documentation project',
  run: (args) => {
    const theme = args[0]; // Get theme from arguments

    // If no theme is provided, use default theme
    if (!theme) {
      initZocument();
      return;
    }

    // Handle theme-specific logic
    if (theme) {
      console.log(`Creating project with ${theme} theme...`);
      initZocument(theme as THEME_NAME);
    } else {
      console.log(`Unknown theme: ${theme}. Please choose available themes`);
    }
  },
};
