export function sleep(time: number) {
  try {
    return new Promise((resolve) => setTimeout(resolve, time));
  } catch {}
}
