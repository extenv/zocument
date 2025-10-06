export function printError(err: unknown) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error(String(err));
  }
}
