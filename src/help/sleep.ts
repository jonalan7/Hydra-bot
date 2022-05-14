export function sleep(time: any) {
    try {
      return new Promise((resolve) => setTimeout(resolve, time));
    } catch (e) {}
  }
  