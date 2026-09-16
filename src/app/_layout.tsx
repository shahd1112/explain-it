import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
} from 'expo-router';

import * as SplashScreen from 'expo-splash-screen';

import {
  AnimatedSplashOverlay,
} from '@/components/animated-icon';

import {
  AuthProvider,
} from '@/context/AuthContext';

import {
  LearningProvider,
} from '@/context/LearningContext';

import {
  SettingsProvider,
  useSettings,
} from '@/context/SettingsContext';

SplashScreen.preventAutoHideAsync();

function AppNavigation() {
  const {
    theme,
  } = useSettings();

  return (
    <ThemeProvider
      value={
        theme === 'dark'
          ? DarkTheme
          : DefaultTheme
      }
    >
      <AnimatedSplashOverlay />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <LearningProvider>
          <AppNavigation />
        </LearningProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}