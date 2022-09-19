export const sleep = (delay: number = 1500) =>
  new Promise((res) => setTimeout(res, delay));
