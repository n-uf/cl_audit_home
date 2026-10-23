// The app's level colours: under 50 % green, under 80 % amber, then red.
export const level = (p: number) => (p >= 80 ? "r" : p >= 50 ? "a" : "g");
export const levelColor = (p: number) => (p >= 80 ? "var(--red)" : p >= 50 ? "var(--amber)" : "var(--green)");

/** 12 segments like the app's panels: filled by usage, coloured by position (6 green, 3 amber, 3 red). */
export const segments = (p: number) => {
  const filled = Math.round((p / 100) * 12);
  return Array.from({ length: 12 }, (_, i) => (i < filled ? (i < 6 ? "g" : i < 9 ? "a" : "r") : ""));
};
