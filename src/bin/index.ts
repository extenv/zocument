#!/usr/bin/env node
import { createCommand } from '../commands/create/create';
import { buildCommand } from '../commands/build/build';
import { helpCommand } from '../commands/help';
import { archiveCommand } from '../commands/archive/archive';

const commands = [createCommand, buildCommand, helpCommand, archiveCommand];

const args = process.argv.slice(2);
const input = args[0];

const command = commands.find((c) => c.name === input);

if (command) {
  command.run(args.slice(1));
} else {
  console.log('Unknown command. Use `help` to see available commands.');
}
