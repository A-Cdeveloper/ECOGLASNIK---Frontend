import { createContext, useState, useEffect, useCallback } from "react";
import get from "lodash.get";
import { setTranslationFunction } from "./translationService";

// eslint-disable-next-line react-refresh/only-export-components
export const TranslationContext = createContext<{
  t: (key: string) => string;
  setLanguage: (lang: string) => void;
}>({
  t: (key) => key,
  setLanguage: () => {},
});

export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState("rs");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    import(`../locales/${language}.json`).then((data) =>
      setTranslations(data.default)
    );
  }, [language]);

  const t = useCallback(
    (key: string) => get(translations, key, key),
    [translations]
  );

  useEffect(() => {
    setTranslationFunction(t); // Store globally
  }, [t]);

  return (
    <TranslationContext.Provider value={{ t, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};
