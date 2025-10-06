export function incrementVersion(version: string): string {
  const parts = version.split('.').map((n) => Number(n));
  if (parts.some((n) => Number.isNaN(n))) {
    throw new Error(`Invalid version format "${version}". Must be x.y.z`);
  }
  if (parts.length === 0) {
    throw new Error(`Version must have at least one segment`);
  }

  parts[parts.length - 1] = (parts.at(-1) ?? 0) + 1;
  return parts.join('.');
}
