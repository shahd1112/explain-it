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

type SubjectCardProps = {
  emoji: string;
  title: string;
  description: string;
  isDark: boolean;
};

function SubjectCard({
  emoji,
  title,
  description,
  isDark,
}: SubjectCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.subjectCard,
        isDark && styles.darkCard,
        pressed && styles.pressed,
      ]}
      onPress={() =>
        router.push('/learn')
      }
    >
      <View
        style={[
          styles.subjectIcon,
          isDark &&
            styles.darkSubjectIcon,
        ]}
      >
        <Text style={styles.subjectEmoji}>
          {emoji}
        </Text>
      </View>

      <Text
        style={[
          styles.subjectTitle,
          isDark && styles.darkText,
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.subjectDescription,
          isDark &&
            styles.darkSecondaryText,
        ]}
      >
        {description}
      </Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { user } = useAuth();

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
        {/* ==========================================
            HEADER
        ========================================== */}

        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text
              style={[
                styles.hello,
                isDark && styles.darkText,
              ]}
            >
              {isArabic
                ? `مرحباً، ${
                    user?.name ||
                    'Student'
                  } 👋`
                : `Hello, ${
                    user?.name ||
                    'Student'
                  } 👋`}
            </Text>

            <Text
              style={[
                styles.subtitle,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {isArabic
                ? 'ماذا تريد أن تتعلم اليوم؟'
                : 'What would you like to learn today?'}
            </Text>
          </View>

          <Pressable
            style={styles.avatar}
            onPress={() =>
              router.push('/profile')
            }
          >
            <Text style={styles.avatarText}>
              {user?.name
                ?.charAt(0)
                .toUpperCase() ||
                'S'}
            </Text>
          </Pressable>
        </View>

        {/* ==========================================
            DAILY MOTIVATION
        ========================================== */}

        <View
          style={[
            styles.motivationCard,
            isDark &&
              styles.darkMotivationCard,
          ]}
        >
          <Text
            style={
              styles.motivationLabel
            }
          >
            {isArabic
              ? '🌟 تحفيز اليوم'
              : '🌟 DAILY MOTIVATION'}
          </Text>

          <Text
            style={[
              styles.motivationTitle,
              isDark && styles.darkText,
            ]}
          >
            {isArabic
              ? 'استمر في التقدم!'
              : 'Keep moving forward!'}
          </Text>

          <Text
            style={[
              styles.motivationText,
              isDark &&
                styles.darkSecondaryText,
            ]}
          >
            {isArabic
              ? 'التقدم البسيط كل يوم يؤدي إلى نتائج كبيرة.'
              : 'Small progress every day leads to big results.'}
          </Text>
        </View>

        {/* ==========================================
            AI ASSISTANT
        ========================================== */}

        <Pressable
          style={({ pressed }) => [
            styles.aiCard,
            isDark &&
              styles.darkAiCard,
            pressed &&
              styles.pressed,
          ]}
          onPress={() =>
            router.push('/ai-chat')
          }
        >
          <View style={styles.aiIcon}>
            <Text style={styles.aiEmoji}>
              🤖
            </Text>
          </View>

          <View style={styles.aiContent}>
            <Text style={styles.aiTitle}>
              {isArabic
                ? 'اسأل Explain It'
                : 'Ask Explain It'}
            </Text>

            <Text style={styles.aiDescription}>
              {isArabic
                ? 'اسأل عن البرمجة والتكنولوجيا وأي موضوع تعليمي.'
                : 'Ask about programming, technology, and any educational topic.'}
            </Text>
          </View>

          <Text style={styles.aiArrow}>
            {isArabic
              ? '‹'
              : '›'}
          </Text>
        </Pressable>

        {/* ==========================================
            EXPLORE SUBJECTS
        ========================================== */}

        <View
          style={styles.sectionHeader}
        >
          <Text
            style={[
              styles.sectionTitle,
              isDark &&
                styles.darkText,
            ]}
          >
            {isArabic
              ? 'استكشف المواضيع'
              : 'Explore Subjects'}
          </Text>

          <Pressable
            onPress={() =>
              router.push('/learn')
            }
          >
            <Text
              style={
                styles.sectionHint
              }
            >
              {isArabic
                ? 'اختر مجالاً'
                : 'Choose a field'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.grid}>
          <SubjectCard
            emoji="💻"
            title={
              isArabic
                ? 'البرمجة'
                : 'Programming'
            }
            description={
              isArabic
                ? 'React والمكونات والبرمجة'
                : 'React, components and coding'
            }
            isDark={isDark}
          />

          <SubjectCard
            emoji="🌐"
            title={
              isArabic
                ? 'الشبكات'
                : 'Networks'
            }
            description={
              isArabic
                ? 'IP و DNS والتوجيه والمزيد'
                : 'IP, DNS, routing and more'
            }
            isDark={isDark}
          />

          <SubjectCard
            emoji="🔐"
            title={
              isArabic
                ? 'الأمن السيبراني'
                : 'Cyber Security'
            }
            description={
              isArabic
                ? 'الأمان والحماية'
                : 'Security and protection'
            }
            isDark={isDark}
          />

          <SubjectCard
            emoji="🤖"
            title={
              isArabic
                ? 'الذكاء الاصطناعي'
                : 'Artificial Intelligence'
            }
            description={
              isArabic
                ? 'الذكاء الاصطناعي وتعلم الآلة'
                : 'AI and machine learning'
            }
            isDark={isDark}
          />
        </View>

        {/* ==========================================
            PROGRESS
        ========================================== */}

        <Text
          style={[
            styles.sectionTitle,
            isDark &&
              styles.darkText,
          ]}
        >
          {isArabic
            ? 'تقدمك'
            : 'Your Progress'}
        </Text>

        <View
          style={
            styles.statsContainer
          }
        >
          <View
            style={[
              styles.statCard,
              isDark &&
                styles.darkCard,
            ]}
          >
            <Text
              style={
                styles.statNumber
              }
            >
              {learnedTerms.length}
            </Text>

            <Text
              style={[
                styles.statLabel,
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
              styles.statCard,
              isDark &&
                styles.darkCard,
            ]}
          >
            <Text
              style={
                styles.statNumber
              }
            >
              {favoriteTerms.length}
            </Text>

            <Text
              style={[
                styles.statLabel,
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
              styles.statCard,
              isDark &&
                styles.darkCard,
            ]}
          >
            <Text
              style={
                styles.statNumber
              }
            >
              {quizzesCompleted}
            </Text>

            <Text
              style={[
                styles.statLabel,
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
              styles.statCard,
              isDark &&
                styles.darkCard,
            ]}
          >
            <Text
              style={
                styles.statNumber
              }
            >
              {bestQuizScore}%
            </Text>

            <Text
              style={[
                styles.statLabel,
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

        {/* ==========================================
            QUIZ
        ========================================== */}

        <Pressable
          style={({ pressed }) => [
            styles.quizCard,
            isDark &&
              styles.darkQuizCard,
            pressed &&
              styles.pressed,
          ]}
          onPress={() =>
            router.push('/quiz')
          }
        >
          <View style={styles.quizIcon}>
            <Text
              style={styles.quizEmoji}
            >
              🧠
            </Text>
          </View>

          <View
            style={styles.quizContent}
          >
            <Text
              style={styles.quizTitle}
            >
              {isArabic
                ? 'جاهز للتحدي؟'
                : 'Ready for a challenge?'}
            </Text>

            <Text
              style={
                styles.quizDescription
              }
            >
              {isArabic
                ? 'اختبر معلوماتك التقنية من خلال اختبار.'
                : 'Test your technical knowledge with a quiz.'}
            </Text>
          </View>

          <Text style={styles.arrow}>
            {isArabic
              ? '‹'
              : '›'}
          </Text>
        </Pressable>
      </ScrollView>
    </AppScreen>
  );
}

const styles =
  StyleSheet.create({
    // ========================================
    // SCREEN
    // ========================================

    screen: {
      flex: 1,
      backgroundColor:
        '#F7F7FC',
    },

    darkScreen: {
      backgroundColor:
        '#0F172A',
    },

    container: {
      width: '100%',
      maxWidth: 700,
      alignSelf: 'center',
      paddingHorizontal: 22,
      paddingTop: 35,
      paddingBottom: 35,
    },

    // ========================================
    // HEADER
    // ========================================

    header: {
      flexDirection: 'row',
      justifyContent:
        'space-between',
      alignItems: 'center',
    },

    headerText: {
      flex: 1,
      paddingRight: 15,
    },

    hello: {
      fontSize: 26,
      fontWeight: '800',
      color: '#1E293B',
    },

    subtitle: {
      color: '#64748B',
      marginTop: 5,
      lineHeight: 21,
    },

    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor:
        '#7C3AED',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    avatarText: {
      color: '#FFFFFF',
      fontWeight: '800',
      fontSize: 20,
    },

    // ========================================
    // MOTIVATION
    // ========================================

    motivationCard: {
      backgroundColor:
        '#EDE9FE',
      borderRadius: 22,
      padding: 21,
      marginTop: 27,
      marginBottom: 20,
    },

    darkMotivationCard: {
      backgroundColor:
        '#312E81',
    },

    motivationLabel: {
      color: '#7C3AED',
      fontSize: 12,
      fontWeight: '800',
    },

    motivationTitle: {
      color: '#1E293B',
      fontSize: 20,
      fontWeight: '800',
      marginTop: 8,
    },

    motivationText: {
      color: '#475569',
      marginTop: 6,
      lineHeight: 21,
    },

    // ========================================
    // AI CARD
    // ========================================

    aiCard: {
      backgroundColor:
        '#7C3AED',
      borderRadius: 21,
      padding: 18,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 29,
    },

    darkAiCard: {
      backgroundColor:
        '#5B21B6',
    },

    aiIcon: {
      width: 52,
      height: 52,
      borderRadius: 16,
      backgroundColor:
        '#FFFFFF',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    aiEmoji: {
      fontSize: 28,
    },

    aiContent: {
      flex: 1,
      paddingHorizontal: 14,
    },

    aiTitle: {
      color: '#FFFFFF',
      fontSize: 17,
      fontWeight: '800',
    },

    aiDescription: {
      color: '#EDE9FE',
      fontSize: 12,
      lineHeight: 18,
      marginTop: 4,
    },

    aiArrow: {
      color: '#FFFFFF',
      fontSize: 30,
    },

    // ========================================
    // SECTION
    // ========================================

    sectionHeader: {
      flexDirection: 'row',
      justifyContent:
        'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },

    sectionTitle: {
      fontSize: 20,
      fontWeight: '800',
      color: '#1E293B',
      marginBottom: 15,
    },

    sectionHint: {
      color: '#7C3AED',
      fontWeight: '600',
      marginBottom: 15,
    },

    // ========================================
    // SUBJECTS
    // ========================================

    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent:
        'space-between',
      gap: 12,
      marginBottom: 30,
    },

    subjectCard: {
      width: '48%',
      minHeight: 155,
      backgroundColor:
        '#FFFFFF',
      borderRadius: 19,
      padding: 17,

      shadowColor: '#000',
      shadowOpacity: 0.04,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 4,
      },

      elevation: 2,
    },

    subjectIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      backgroundColor:
        '#F5F3FF',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    darkSubjectIcon: {
      backgroundColor:
        '#334155',
    },

    subjectEmoji: {
      fontSize: 25,
    },

    subjectTitle: {
      color: '#1E293B',
      fontSize: 15,
      fontWeight: '800',
      marginTop: 13,
    },

    subjectDescription: {
      color: '#64748B',
      fontSize: 12,
      lineHeight: 17,
      marginTop: 5,
    },

    // ========================================
    // STATISTICS
    // ========================================

    statsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 25,
    },

    statCard: {
      flexGrow: 1,
      flexBasis: '22%',
      minWidth: 100,
      backgroundColor:
        '#FFFFFF',
      borderRadius: 16,
      paddingVertical: 17,
      alignItems: 'center',
    },

    statNumber: {
      color: '#7C3AED',
      fontSize: 22,
      fontWeight: '800',
    },

    statLabel: {
      color: '#64748B',
      fontSize: 12,
      marginTop: 4,
    },

    // ========================================
    // QUIZ
    // ========================================

    quizCard: {
      backgroundColor:
        '#1E293B',
      borderRadius: 21,
      padding: 18,
      flexDirection: 'row',
      alignItems: 'center',
    },

    darkQuizCard: {
      backgroundColor:
        '#334155',
    },

    quizIcon: {
      width: 50,
      height: 50,
      borderRadius: 15,
      backgroundColor:
        '#475569',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    quizEmoji: {
      fontSize: 27,
    },

    quizContent: {
      flex: 1,
      paddingHorizontal: 14,
    },

    quizTitle: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '800',
    },

    quizDescription: {
      color: '#CBD5E1',
      fontSize: 12,
      lineHeight: 18,
      marginTop: 4,
    },

    arrow: {
      color: '#FFFFFF',
      fontSize: 30,
    },

    // ========================================
    // COMMON
    // ========================================

    darkCard: {
      backgroundColor:
        '#1E293B',
    },

    darkText: {
      color: '#F8FAFC',
    },

    darkSecondaryText: {
      color: '#CBD5E1',
    },

    pressed: {
      opacity: 0.82,
    },
  });