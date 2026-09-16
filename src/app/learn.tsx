import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import AppScreen from '@/components/AppScreen';
import TermCard from '@/components/TermCard';

import {
    useLearning,
} from '@/hooks/useLearning';

import {
    useLearningContext,
} from '@/context/LearningContext';

import {
    useSettings,
} from '@/context/SettingsContext';

import type {
    Category,
    LearningLevel,
} from '@/data/terms';

type CategoryItem = {
  value: Category;
  english: string;
  arabic: string;
  emoji: string;
};

type LevelItem = {
  value: LearningLevel;
  english: string;
  arabic: string;
  emoji: string;
};

const categories: CategoryItem[] = [
  {
    value: 'Programming',
    english: 'Programming',
    arabic: 'البرمجة',
    emoji: '💻',
  },
  {
    value: 'Networks',
    english: 'Networks',
    arabic: 'الشبكات',
    emoji: '🌐',
  },
  {
    value: 'Security',
    english: 'Cyber Security',
    arabic: 'الأمن السيبراني',
    emoji: '🔐',
  },
  {
    value: 'AI',
    english: 'AI',
    arabic: 'الذكاء الاصطناعي',
    emoji: '🤖',
  },
];

const levels: LevelItem[] = [
  {
    value: 'Beginner',
    english: 'Beginner',
    arabic: 'مبتدئ',
    emoji: '🌱',
  },
  {
    value: 'Intermediate',
    english: 'Intermediate',
    arabic: 'متوسط',
    emoji: '🚀',
  },
  {
    value: 'Advanced',
    english: 'Advanced',
    arabic: 'متقدم',
    emoji: '🔥',
  },
];

export default function LearnScreen() {
  const {
    category,
    search,
    currentTerm,
    filteredTerms,
    setSearch,
    selectCategory,
    nextTerm,
  } = useLearning();

  const {
    level,
    setLevel,
    learnedTerms,
    favoriteTerms,
    resetLearning,
  } = useLearningContext();

  const {
    theme,
    language,
  } = useSettings();

  const isDark =
    theme === 'dark';

  const isArabic =
    language === 'ar';

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
            ? 'تعلّم 📚'
            : 'Learn 📚'}
        </Text>

        <Text
          style={[
            styles.subtitle,
            isDark &&
              styles.darkSecondaryText,
          ]}
        >
          {isArabic
            ? 'تعلّم المفاهيم التقنية خطوة بخطوة.'
            : 'Learn technical concepts step by step.'}
        </Text>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder={
            isArabic
              ? '🔎 ابحث عن مصطلح...'
              : '🔎 Search terms...'
          }
          placeholderTextColor="#94A3B8"
          style={[
            styles.search,
            isDark && styles.darkInput,
            isDark && styles.darkText,
          ]}
          textAlign={
            isArabic ? 'right' : 'left'
          }
        />

        <Text
          style={[
            styles.label,
            isDark && styles.darkText,
          ]}
        >
          {isArabic
            ? 'المجال'
            : 'Subject'}
        </Text>

        <View style={styles.categories}>
          {categories.map((item) => {
            const selected =
              category === item.value;

            return (
              <Pressable
                key={item.value}
                style={[
                  styles.category,

                  isDark &&
                    styles.darkCard,

                  selected &&
                    styles.selectedCategory,
                ]}
                onPress={() =>
                  selectCategory(
                    item.value
                  )
                }
              >
                <Text
                  style={[
                    styles.categoryText,

                    isDark &&
                      styles.darkSecondaryText,

                    selected &&
                      styles.selectedText,
                  ]}
                >
                  {item.emoji}{' '}
                  {isArabic
                    ? item.arabic
                    : item.english}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text
          style={[
            styles.label,
            isDark && styles.darkText,
          ]}
        >
          {isArabic
            ? 'مستوى الشرح'
            : 'Explanation Level'}
        </Text>

        <View style={styles.levels}>
          {levels.map((item) => {
            const selected =
              level === item.value;

            return (
              <Pressable
                key={item.value}
                style={[
                  styles.level,

                  isDark &&
                    styles.darkCard,

                  selected &&
                    styles.selectedLevel,
                ]}
                onPress={() =>
                  setLevel(item.value)
                }
              >
                <Text
                  style={[
                    styles.levelText,

                    isDark &&
                      styles.darkSecondaryText,

                    selected &&
                      styles.selectedText,
                  ]}
                >
                  {item.emoji}{' '}
                  {isArabic
                    ? item.arabic
                    : item.english}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View
          style={[
            styles.progress,
            isDark &&
              styles.darkProgress,
          ]}
        >
          <View
            style={styles.progressItem}
          >
            <Text
              style={
                styles.progressNumber
              }
            >
              {learnedTerms.length}
            </Text>

            <Text
              style={[
                styles.progressLabel,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {isArabic
                ? 'تم تعلمها'
                : 'Learned'}
            </Text>
          </View>

          <View
            style={styles.progressItem}
          >
            <Text
              style={
                styles.progressNumber
              }
            >
              {favoriteTerms.length}
            </Text>

            <Text
              style={[
                styles.progressLabel,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {isArabic
                ? 'المفضلة'
                : 'Favorites'}
            </Text>
          </View>

          <View
            style={styles.progressItem}
          >
            <Text
              style={
                styles.progressNumber
              }
            >
              {filteredTerms.length}
            </Text>

            <Text
              style={[
                styles.progressLabel,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {isArabic
                ? 'النتائج'
                : 'Results'}
            </Text>
          </View>
        </View>

        {(learnedTerms.length > 0 ||
          favoriteTerms.length > 0 ||
          level !== 'Beginner') && (
          <Pressable
            style={({ pressed }) => [
              styles.resetButton,

              isDark &&
                styles.darkResetButton,

              pressed &&
                styles.resetButtonPressed,
            ]}
            onPress={resetLearning}
          >
            <Text
              style={styles.resetText}
            >
              {isArabic
                ? '↻ إعادة تعيين تقدم التعلم'
                : '↻ Reset Learning Progress'}
            </Text>
          </Pressable>
        )}

        {currentTerm ? (
          <TermCard
            term={currentTerm}
            onNext={nextTerm}
          />
        ) : (
          <View
            style={[
              styles.empty,
              isDark && styles.darkCard,
            ]}
          >
            <Text
              style={styles.emptyEmoji}
            >
              🔎
            </Text>

            <Text
              style={[
                styles.emptyTitle,
                isDark && styles.darkText,
              ]}
            >
              {isArabic
                ? 'لم يتم العثور على مصطلحات'
                : 'No terms found'}
            </Text>

            <Text
              style={[
                styles.emptyText,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {isArabic
                ? 'جرّب البحث عن مصطلح آخر.'
                : 'Try another search.'}
            </Text>
          </View>
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
    paddingBottom: 35,
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

  search: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 13,
    marginTop: 22,
    color: '#1E293B',
  },

  darkInput: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },

  label: {
    color: '#1E293B',
    fontWeight: '800',
    marginTop: 22,
    marginBottom: 10,
  },

  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  category: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },

  selectedCategory: {
    backgroundColor: '#7C3AED',
  },

  categoryText: {
    color: '#475569',
    fontWeight: '700',
    fontSize: 12,
  },

  selectedText: {
    color: '#FFFFFF',
  },

  levels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  level: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  selectedLevel: {
    backgroundColor: '#7C3AED',
  },

  levelText: {
    color: '#475569',
    fontWeight: '700',
    fontSize: 12,
  },

  progress: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#EDE9FE',
    borderRadius: 17,
    paddingVertical: 15,
    marginTop: 22,
  },

  darkProgress: {
    backgroundColor: '#312E81',
  },

  progressItem: {
    flex: 1,
    alignItems: 'center',
  },

  progressNumber: {
    color: '#7C3AED',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 18,
  },

  progressLabel: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },

  resetButton: {
    alignSelf: 'flex-end',
    marginTop: 12,
    backgroundColor: '#FEE2E2',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },

  darkResetButton: {
    backgroundColor: '#450A0A',
  },

  resetButtonPressed: {
    opacity: 0.75,
  },

  resetText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '800',
  },

  empty: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginTop: 20,
  },

  emptyEmoji: {
    fontSize: 35,
  },

  emptyTitle: {
    color: '#1E293B',
    fontWeight: '800',
    fontSize: 18,
    marginTop: 10,
  },

  emptyText: {
    color: '#64748B',
    marginTop: 5,
  },

  darkCard: {
    backgroundColor: '#1E293B',
  },

  darkText: {
    color: '#F8FAFC',
  },

  darkSecondaryText: {
    color: '#CBD5E1',
  },
});