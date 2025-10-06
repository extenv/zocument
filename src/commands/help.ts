import { type Command } from '../types/command';

export const helpCommand: Command = {
  name: 'help',
  description: 'Show usage instructions',
  run: () => {
    console.log('Available commands:');
    console.log('bunx zoc create <theme> - Create a new documentation project');
    console.log('bunx zoc build  - Build the documentation');
    console.log('bunx zoc help   - Show usage instructions');
    console.log(
      'bunx zoc archive <version> - Archive document into versioned release'
    );
  },
};
