import fs from 'fs/promises';

export async function cleanFolder(folder: string) {
  await fs.rm(folder, { recursive: true, force: true });
  await fs.mkdir(folder, { recursive: true });
}

export async function copyFolder(src: string, dest: string) {
  try {
    await fs.cp(src, dest, { recursive: true });
  } catch {
    // ignore missing folder
  }
}
