import {
  createContext,
  useContext,
  useState,
} from 'react';

import type {
  ReactNode,
} from 'react';

export type AppTheme =
  | 'light'
  | 'dark';

export type AppLanguage =
  | 'en'
  | 'ar';

type SettingsContextType = {
  theme: AppTheme;
  language: AppLanguage;

  setTheme: (
    theme: AppTheme
  ) => void;

  setLanguage: (
    language: AppLanguage
  ) => void;

  toggleTheme: () => void;
};

const SettingsContext =
  createContext<
    SettingsContextType | undefined
  >(undefined);

type Props = {
  children: ReactNode;
};

export function SettingsProvider({
  children,
}: Props) {
  const [theme, setTheme] =
    useState<AppTheme>('light');

  const [language, setLanguage] =
    useState<AppLanguage>('en');

  function toggleTheme() {
    setTheme((current) =>
      current === 'light'
        ? 'dark'
        : 'light'
    );
  }

  return (
    <SettingsContext.Provider
      value={{
        theme,
        language,
        setTheme,
        setLanguage,
        toggleTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context =
    useContext(SettingsContext);

  if (!context) {
    throw new Error(
      'useSettings must be used inside SettingsProvider'
    );
  }

  return context;
}