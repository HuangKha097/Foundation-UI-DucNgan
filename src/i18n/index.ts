import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources, type Lang } from "./resources";

const STORAGE_KEY = "dn.lang";

function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "vi";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "vi" || stored === "en") return stored;
  } catch {}
  return "vi";
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "vi", // stable SSR default; client will switch after mount if needed
    fallbackLng: "vi",
    interpolation: { escapeValue: false },
    returnObjects: true,
    react: { useSuspense: false },
  });
}

export function syncLangFromStorage() {
  const lang = detectInitialLang();
  if (i18n.language !== lang) i18n.changeLanguage(lang);
}

export function setLang(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {}
  i18n.changeLanguage(lang);
  if (typeof document !== "undefined") document.documentElement.lang = lang;
}

export default i18n;