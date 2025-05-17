export const generateRandomNumbers = (length: number): string[] => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10).toString());
};