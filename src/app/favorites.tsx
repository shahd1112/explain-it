import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import AppScreen from '@/components/AppScreen';

import {
    useLearningContext,
} from '@/context/LearningContext';

import {
    useSettings,
} from '@/context/SettingsContext';

import {
    terms,
} from '@/data/terms';

export default function FavoritesScreen() {
  const {
    favoriteTerms,
    toggleFavorite,
  } = useLearningContext();

  const {
    theme,
    language,
  } = useSettings();

  const isDark =
    theme === 'dark';

  const isArabic =
    language === 'ar';

  const favorites = terms.filter(
    (term) =>
      favoriteTerms.includes(term.id)
  );

  function getCategoryName(
    category: string
  ) {
    if (!isArabic) {
      if (category === 'Security') {
        return 'Cyber Security';
      }

      if (category === 'AI') {
        return 'Artificial Intelligence';
      }

      return category;
    }

    switch (category) {
      case 'Programming':
        return 'البرمجة';

      case 'Networks':
        return 'الشبكات';

      case 'Security':
        return 'الأمن السيبراني';

      case 'AI':
        return 'الذكاء الاصطناعي';

      default:
        return category;
    }
  }

  return (
    <AppScreen>
      <ScrollView
        style={[
          styles.screen,
          isDark && styles.darkScreen,
        ]}
        contentContainerStyle={
          styles.container
        }
      >
        <Text
          style={[
            styles.title,
            isDark && styles.darkText,
          ]}
        >
          {isArabic
            ? 'المفضلة ⭐'
            : 'Favorites ⭐'}
        </Text>

        <Text
          style={[
            styles.subtitle,
            isDark &&
              styles.darkSecondaryText,
          ]}
        >
          {isArabic
            ? `${favorites.length} مصطلح محفوظ`
            : `${favorites.length} saved terms`}
        </Text>

        {favorites.length === 0 ? (
          <View
            style={[
              styles.empty,
              isDark && styles.darkCard,
            ]}
          >
            <Text
              style={styles.emptyEmoji}
            >
              ⭐
            </Text>

            <Text
              style={[
                styles.emptyTitle,
                isDark && styles.darkText,
              ]}
            >
              {isArabic
                ? 'لا توجد مفضلات بعد'
                : 'No favorites yet'}
            </Text>

            <Text
              style={[
                styles.emptyText,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {isArabic
                ? 'احفظ المصطلحات المفيدة من صفحة التعلّم.'
                : 'Save useful terms from the Learn page.'}
            </Text>
          </View>
        ) : (
          favorites.map((term) => (
            <View
              key={term.id}
              style={[
                styles.card,
                isDark &&
                  styles.darkCard,
              ]}
            >
              <View style={styles.content}>
                <Text
                  style={[
                    styles.term,
                    isDark &&
                      styles.darkText,
                  ]}
                >
                  {term.name}
                </Text>

                <Text
                  style={styles.category}
                >
                  {getCategoryName(
                    term.category
                  )}
                </Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.remove,

                  isDark &&
                    styles.darkRemove,

                  pressed &&
                    styles.pressed,
                ]}
                onPress={() =>
                  toggleFavorite(
                    term.id
                  )
                }
              >
                <Text
                  style={[
                    styles.removeText,
                    isDark &&
                      styles.darkRemoveText,
                  ]}
                >
                  {isArabic
                    ? '★ إزالة'
                    : '★ Remove'}
                </Text>
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </AppScreen>
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

  container: {
    width: '100%',
    maxWidth: 700,
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 30,
  },

  title: {
    color: '#1E293B',
    fontSize: 29,
    fontWeight: '800',
  },

  subtitle: {
    color: '#64748B',
    marginTop: 5,
  },

  empty: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 35,
    alignItems: 'center',
    marginTop: 30,
  },

  emptyEmoji: {
    fontSize: 45,
  },

  emptyTitle: {
    color: '#1E293B',
    fontSize: 19,
    fontWeight: '800',
    marginTop: 12,
  },

  emptyText: {
    color: '#64748B',
    marginTop: 6,
    textAlign: 'center',
    lineHeight: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 17,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  darkCard: {
    backgroundColor: '#1E293B',
  },

  content: {
    flex: 1,
  },

  term: {
    color: '#1E293B',
    fontWeight: '800',
    fontSize: 17,
  },

  category: {
    color: '#7C3AED',
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },

  remove: {
    backgroundColor: '#FEF3C7',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  darkRemove: {
    backgroundColor: '#422006',
  },

  removeText: {
    color: '#92400E',
    fontWeight: '700',
    fontSize: 11,
  },

  darkRemoveText: {
    color: '#FDE68A',
  },

  darkText: {
    color: '#F8FAFC',
  },

  darkSecondaryText: {
    color: '#CBD5E1',
  },

  pressed: {
    opacity: 0.75,
  },
});