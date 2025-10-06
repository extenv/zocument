// types and interfaces for commands
import { SUPPORTED_THEMES } from './constant';

// Command interface representing a CLI command
export interface ArchiveOptions {
  docsPath: string;
  archiveVersion: string;
  isBlank: boolean;
  isAllow: boolean;
  configPath: string;
}

export interface DeleteArchiveOptions {
  docsPath: string;
  delVersion: string;
}

// Command type representing a CLI command
export type Command = {
  name: string;
  description: string;
  run: (args: string[]) => void;
};

// Supported theme names
export type THEME_NAME = (typeof SUPPORTED_THEMES)[number];

// Version type representing version strings
export type VERSIONTYPE = string | undefined;
