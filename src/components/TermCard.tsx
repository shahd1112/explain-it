import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type {
    Term,
} from '@/data/terms';

import {
    useLearningContext,
} from '@/context/LearningContext';

import {
    useSettings,
} from '@/context/SettingsContext';

type Props = {
  term: Term;
  onNext: () => void;
};

export default function TermCard({
  term,
  onNext,
}: Props) {
  const {
    level,
    markLearned,
    toggleFavorite,
    isLearned,
    isFavorite,
  } = useLearningContext();

  const {
    theme,
    language,
  } = useSettings();

  const isDark =
    theme === 'dark';

  const isArabic =
    language === 'ar';

  const learned =
    isLearned(term.id);

  const favorite =
    isFavorite(term.id);

  function getLevelText() {
    if (level === 'Beginner') {
      return isArabic
        ? '🌱 مبتدئ'
        : '🌱 Beginner';
    }

    if (level === 'Intermediate') {
      return isArabic
        ? '🚀 متوسط'
        : '🚀 Intermediate';
    }

    return isArabic
      ? '🔥 متقدم'
      : '🔥 Advanced';
  }

  return (
    <View
      style={[
        styles.card,
        isDark && styles.darkCard,
      ]}
    >
      <View style={styles.top}>
        <View
          style={[
            styles.levelBadge,
            isDark &&
              styles.darkLevelBadge,
          ]}
        >
          <Text style={styles.levelText}>
            {getLevelText()}
          </Text>
        </View>

        <Pressable
          style={[
            styles.favorite,

            isDark &&
              styles.darkFavorite,

            favorite &&
              styles.favoriteActive,
          ]}
          onPress={() =>
            toggleFavorite(term.id)
          }
        >
          <Text
            style={[
              styles.favoriteText,

              isDark &&
                styles.darkSecondaryText,

              favorite &&
                styles.favoriteActiveText,
            ]}
          >
            {favorite
              ? isArabic
                ? '★ محفوظ'
                : '★ Saved'
              : isArabic
                ? '☆ المفضلة'
                : '☆ Favorite'}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.smallTitle}>
        {isArabic
          ? 'مصطلح تقني'
          : 'TECHNICAL TERM'}
      </Text>

      <Text
        style={[
          styles.termName,
          isDark && styles.darkText,
        ]}
      >
        {term.name}
      </Text>

      {learned && (
        <Text style={styles.learned}>
          {isArabic
            ? '✓ تم تعلمه'
            : '✓ Learned'}
        </Text>
      )}

      <Text
        style={[
          styles.explanation,
          isDark &&
            styles.darkSecondaryText,
        ]}
      >
        {term.explanations[level]}
      </Text>

      <View
        style={[
          styles.example,
          isDark &&
            styles.darkExample,
        ]}
      >
        <Text
          style={[
            styles.exampleTitle,
            isDark && styles.darkText,
          ]}
        >
          {isArabic
            ? '💡 مثال'
            : '💡 Example'}
        </Text>

        <Text
          style={[
            styles.exampleText,
            isDark &&
              styles.darkSecondaryText,
          ]}
        >
          {term.example}
        </Text>
      </View>

      <View style={styles.buttons}>
        <Pressable
          style={[
            styles.nextButton,
            isDark &&
              styles.darkNextButton,
          ]}
          onPress={onNext}
        >
          <Text style={styles.nextText}>
            {isArabic
              ? '← المصطلح التالي'
              : 'Next Term →'}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.learnButton,

            learned &&
              styles.learnedButton,
          ]}
          onPress={() =>
            markLearned(term.id)
          }
        >
          <Text style={styles.learnText}>
            {learned
              ? isArabic
                ? '✓ تم تعلمه'
                : '✓ Learned'
              : isArabic
                ? 'تحديد كمتعلّم'
                : 'Mark Learned'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    marginTop: 18,
  },

  darkCard: {
    backgroundColor: '#1E293B',
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  levelBadge: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 10,
  },

  darkLevelBadge: {
    backgroundColor: '#312E81',
  },

  levelText: {
    color: '#8B5CF6',
    fontWeight: '700',
    fontSize: 12,
  },

  favorite: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  darkFavorite: {
    borderColor: '#475569',
    backgroundColor: '#334155',
  },

  favoriteActive: {
    backgroundColor: '#FEF3C7',
    borderColor: '#FDE68A',
  },

  favoriteText: {
    color: '#475569',
    fontWeight: '700',
    fontSize: 12,
  },

  favoriteActiveText: {
    color: '#92400E',
  },

  smallTitle: {
    color: '#7C3AED',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 24,
  },

  termName: {
    color: '#1E293B',
    fontSize: 29,
    fontWeight: '800',
    marginTop: 5,
  },

  learned: {
    color: '#16A34A',
    fontWeight: '700',
    marginTop: 6,
  },

  explanation: {
    color: '#475569',
    lineHeight: 24,
    fontSize: 15,
    marginTop: 17,
  },

  example: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 15,
    marginTop: 18,
  },

  darkExample: {
    backgroundColor: '#334155',
  },

  exampleTitle: {
    color: '#1E293B',
    fontWeight: '800',
  },

  exampleText: {
    color: '#64748B',
    lineHeight: 20,
    marginTop: 6,
  },

  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },

  nextButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#7C3AED',
    borderRadius: 13,
    paddingVertical: 13,
    alignItems: 'center',
  },

  darkNextButton: {
    backgroundColor: '#0F172A',
  },

  nextText: {
    color: '#7C3AED',
    fontWeight: '800',
  },

  learnButton: {
    flex: 1,
    backgroundColor: '#7C3AED',
    borderRadius: 13,
    paddingVertical: 13,
    alignItems: 'center',
  },

  learnedButton: {
    backgroundColor: '#16A34A',
  },

  learnText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  darkText: {
    color: '#F8FAFC',
  },

  darkSecondaryText: {
    color: '#CBD5E1',
  },
});