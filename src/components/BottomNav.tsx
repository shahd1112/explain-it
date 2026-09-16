import {
    router,
    usePathname,
} from 'expo-router';

import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    useSettings,
} from '@/context/SettingsContext';

type Route =
  | '/home'
  | '/learn'
  | '/quiz'
  | '/favorites'
  | '/profile';

type NavItemProps = {
  emoji: string;
  route: Route;

  englishLabel: string;
  arabicLabel: string;
};

function NavItem({
  emoji,
  route,
  englishLabel,
  arabicLabel,
}: NavItemProps) {
  const pathname =
    usePathname();

  const {
    theme,
    language,
  } = useSettings();

  const active =
    pathname === route;

  const isDark =
    theme === 'dark';

  const label =
    language === 'ar'
      ? arabicLabel
      : englishLabel;

  return (
    <Pressable
      style={styles.item}
      onPress={() =>
        router.replace(route)
      }
    >
      <View
        style={[
          styles.iconBox,

          isDark &&
            styles.darkIconBox,

          active &&
            styles.activeIconBox,
        ]}
      >
        <Text style={styles.emoji}>
          {emoji}
        </Text>
      </View>

      <Text
        style={[
          styles.label,

          isDark &&
            styles.darkLabel,

          active &&
            styles.activeLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function BottomNav() {
  const {
    theme,
  } = useSettings();

  const isDark =
    theme === 'dark';

  return (
    <View
      style={[
        styles.nav,
        isDark && styles.darkNav,
      ]}
    >
      <NavItem
        emoji="🏠"
        englishLabel="Home"
        arabicLabel="الرئيسية"
        route="/home"
      />

      <NavItem
        emoji="📚"
        englishLabel="Learn"
        arabicLabel="تعلّم"
        route="/learn"
      />

      <NavItem
        emoji="🧠"
        englishLabel="Quiz"
        arabicLabel="اختبار"
        route="/quiz"
      />

      <NavItem
        emoji="⭐"
        englishLabel="Favorites"
        arabicLabel="المفضلة"
        route="/favorites"
      />

      <NavItem
        emoji="👤"
        englishLabel="Profile"
        arabicLabel="الملف"
        route="/profile"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 5,
  },

  darkNav: {
    backgroundColor: '#1E293B',
    borderTopColor: '#334155',
  },

  item: {
    flex: 1,
    alignItems: 'center',
  },

  iconBox: {
    width: 39,
    height: 31,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  darkIconBox: {
    backgroundColor: '#1E293B',
  },

  activeIconBox: {
    backgroundColor: '#EDE9FE',
  },

  emoji: {
    fontSize: 18,
  },

  label: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 3,
  },

  darkLabel: {
    color: '#CBD5E1',
  },

  activeLabel: {
    color: '#7C3AED',
    fontWeight: '800',
  },
});