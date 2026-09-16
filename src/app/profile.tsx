import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { router } from 'expo-router';

import AppScreen from '@/components/AppScreen';

import {
    useAuth,
} from '@/context/AuthContext';

import {
    useLearningContext,
} from '@/context/LearningContext';

import {
    useSettings,
} from '@/context/SettingsContext';

export default function ProfileScreen() {
  const {
    user,
  } = useAuth();

  const {
    learnedTerms,
    favoriteTerms,
    quizzesCompleted,
    bestQuizScore,
  } = useLearningContext();

  const {
    theme,
    language,
  } = useSettings();

  const isDark =
    theme === 'dark';

  const isArabic =
    language === 'ar';

  const displayName =
    user?.name?.trim() ||
    (isArabic ? 'طالب' : 'Student');

  return (
    <AppScreen>
      <ScrollView
        style={[
          styles.screen,
          isDark &&
            styles.darkScreen,
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
            ? 'الملف الشخصي 👤'
            : 'Profile 👤'}
        </Text>

        <View
          style={[
            styles.profileCard,
            isDark &&
              styles.darkCard,
          ]}
        >
          <View style={styles.avatar}>
            <Text
              style={styles.avatarText}
            >
              {displayName
                .charAt(0)
                .toUpperCase()}
            </Text>
          </View>

          <Text
            style={[
              styles.name,
              isDark && styles.darkText,
            ]}
          >
            {displayName}
          </Text>

          <Text
            style={[
              styles.email,
              isDark &&
                styles.darkSecondaryText,
            ]}
          >
            {user?.email || ''}
          </Text>
        </View>

        <Text
          style={[
            styles.sectionTitle,
            isDark && styles.darkText,
          ]}
        >
          {isArabic
            ? 'إحصائيات التعلم'
            : 'Learning Statistics'}
        </Text>

        <View style={styles.stats}>
          <View
            style={[
              styles.stat,
              isDark &&
                styles.darkCard,
            ]}
          >
            <Text style={styles.number}>
              {learnedTerms.length}
            </Text>

            <Text
              style={[
                styles.label,
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
            style={[
              styles.stat,
              isDark &&
                styles.darkCard,
            ]}
          >
            <Text style={styles.number}>
              {favoriteTerms.length}
            </Text>

            <Text
              style={[
                styles.label,
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
            style={[
              styles.stat,
              isDark &&
                styles.darkCard,
            ]}
          >
            <Text style={styles.number}>
              {quizzesCompleted}
            </Text>

            <Text
              style={[
                styles.label,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {isArabic
                ? 'الاختبارات'
                : 'Quizzes'}
            </Text>
          </View>

          <View
            style={[
              styles.stat,
              isDark &&
                styles.darkCard,
            ]}
          >
            <Text style={styles.number}>
              {bestQuizScore}%
            </Text>

            <Text
              style={[
                styles.label,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {isArabic
                ? 'أفضل نتيجة'
                : 'Best Score'}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.progressCard,
            isDark &&
              styles.darkProgressCard,
          ]}
        >
          <Text
            style={[
              styles.progressTitle,
              isDark && styles.darkText,
            ]}
          >
            {isArabic
              ? '📚 تقدمك في التعلم'
              : '📚 Your Learning Progress'}
          </Text>

          <Text
            style={[
              styles.progressText,
              isDark &&
                styles.darkSecondaryText,
            ]}
          >
            {isArabic
              ? `لقد تعلمت ${learnedTerms.length} مصطلح وحفظت ${favoriteTerms.length} في المفضلة.`
              : `You have learned ${learnedTerms.length} terms and saved ${favoriteTerms.length} favorites.`}
          </Text>

          <Text
            style={[
              styles.progressText,
              isDark &&
                styles.darkSecondaryText,
            ]}
          >
            {isArabic
              ? `لقد أكملت ${quizzesCompleted} اختبار. أفضل نتيجة لك هي ${bestQuizScore}%.`
              : `You completed ${quizzesCompleted} quizzes. Your best score is ${bestQuizScore}%.`}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.settingsButton,

            isDark &&
              styles.darkCard,

            pressed &&
              styles.pressed,
          ]}
          onPress={() =>
            router.push('/settings')
          }
        >
          <Text
            style={[
              styles.settingsText,
              isDark && styles.darkText,
            ]}
          >
            {isArabic
              ? '⚙️ الإعدادات'
              : '⚙️ Settings'}
          </Text>

          <Text style={styles.arrow}>
            {isArabic ? '‹' : '›'}
          </Text>
        </Pressable>
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
    fontSize: 29,
    fontWeight: '800',
    color: '#1E293B',
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    alignItems: 'center',
    padding: 25,
    marginTop: 24,
  },

  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },

  name: {
    color: '#1E293B',
    fontSize: 21,
    fontWeight: '800',
    marginTop: 13,
  },

  email: {
    color: '#64748B',
    marginTop: 4,
  },

  sectionTitle: {
    color: '#1E293B',
    fontSize: 19,
    fontWeight: '800',
    marginTop: 27,
    marginBottom: 13,
  },

  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  stat: {
    flexGrow: 1,
    flexBasis: '22%',
    minWidth: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },

  number: {
    color: '#7C3AED',
    fontSize: 22,
    fontWeight: '800',
  },

  label: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 4,
  },

  progressCard: {
    backgroundColor: '#EDE9FE',
    borderRadius: 17,
    padding: 18,
    marginTop: 20,
  },

  darkProgressCard: {
    backgroundColor: '#312E81',
  },

  progressTitle: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '800',
  },

  progressText: {
    color: '#475569',
    lineHeight: 20,
    marginTop: 7,
  },

  settingsButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },

  settingsText: {
    flex: 1,
    color: '#1E293B',
    fontWeight: '700',
    fontSize: 16,
  },

  arrow: {
    color: '#7C3AED',
    fontSize: 27,
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

  pressed: {
    opacity: 0.78,
  },
});