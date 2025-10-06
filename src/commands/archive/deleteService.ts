import fs from 'fs/promises';
import path from 'path';
import { ARCHIVE_DIR } from '../../types/constant';
import { type DeleteArchiveOptions } from '../../types/command';

export async function deleteArchive({
  docsPath,
  delVersion,
}: DeleteArchiveOptions) {
  const archivePath = path.join(docsPath, ARCHIVE_DIR, delVersion);

  try {
    await fs.access(archivePath);
  } catch {
    throw new Error(`Archive version ${delVersion} not found.`);
  }

  try {
    await fs.rm(archivePath, { recursive: true, force: true });
    console.log(`Archive version ${delVersion} deleted successfully!`);
  } catch (err) {
    throw new Error(`Failed to delete archive version ${delVersion}`);
  }
}
