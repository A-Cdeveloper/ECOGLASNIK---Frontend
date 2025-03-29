let tFunction: (key: string) => string = (key) => key; // Default fallback

export const setTranslationFunction = (t: (key: string) => string) => {
  tFunction = t;
};

export const t = (key: string) => tFunction(key); // Use this globally
