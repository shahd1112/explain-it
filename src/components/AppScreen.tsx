import type {
    ReactNode,
} from 'react';

import {
    SafeAreaView,
    StyleSheet,
    View,
} from 'react-native';

import BottomNav from './BottomNav';

import {
    useSettings,
} from '@/context/SettingsContext';

type AppScreenProps = {
  children: ReactNode;
};

export default function AppScreen({
  children,
}: AppScreenProps) {
  const {
    theme,
  } = useSettings();

  const isDark =
    theme === 'dark';

  return (
    <SafeAreaView
      style={[
        styles.screen,
        isDark && styles.darkScreen,
      ]}
    >
      <View style={styles.content}>
        {children}
      </View>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F7FC',
  },

  darkScreen: {
    backgroundColor: '#0F172A',
  },

  content: {
    flex: 1,
  },
});