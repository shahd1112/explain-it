import {
    useEffect,
    useRef,
} from 'react';

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
    useQuiz,
} from '@/hooks/useQuiz';

import type {
    Category,
    LearningLevel,
} from '@/data/terms';

const categories: {
  value: Category;
  english: string;
  arabic: string;
}[] = [
  {
    value: 'Programming',
    english: '💻 Programming',
    arabic: '💻 البرمجة',
  },
  {
    value: 'Networks',
    english: '🌐 Networks',
    arabic: '🌐 الشبكات',
  },
  {
    value: 'Security',
    english: '🔐 Cyber Security',
    arabic: '🔐 الأمن السيبراني',
  },
  {
    value: 'AI',
    english: '🤖 AI',
    arabic: '🤖 الذكاء الاصطناعي',
  },
];

const levels: {
  value: LearningLevel;
  english: string;
  arabic: string;
}[] = [
  {
    value: 'Beginner',
    english: '🌱 Beginner',
    arabic: '🌱 مبتدئ',
  },
  {
    value: 'Intermediate',
    english: '🚀 Intermediate',
    arabic: '🚀 متوسط',
  },
  {
    value: 'Advanced',
    english: '🔥 Advanced',
    arabic: '🔥 متقدم',
  },
];

export default function QuizScreen() {
  const {
    category,
    level,
    quizQuestions,
    currentQuestion,
    currentIndex,
    answers,
    selectedAnswer,
    started,
    finished,
    correctCount,
    wrongCount,

    setCategory,
    setLevel,
    startQuiz,
    answerQuestion,
    nextQuestion,
    resetQuiz,
    tryAgain,
  } = useQuiz();

  const {
    recordQuizResult,
  } = useLearningContext();

  const {
    theme,
    language,
  } = useSettings();

  const isDark =
    theme === 'dark';

  const isArabic =
    language === 'ar';

  const recordedResult =
    useRef(false);

  function categoryName(
    value: Category
  ) {
    const item =
      categories.find(
        (categoryItem) =>
          categoryItem.value === value
      );

    if (!item) {
      return value;
    }

    return isArabic
      ? item.arabic
      : item.english;
  }

  function levelName(
    value: LearningLevel
  ) {
    const item =
      levels.find(
        (levelItem) =>
          levelItem.value === value
      );

    if (!item) {
      return value;
    }

    return isArabic
      ? item.arabic
      : item.english;
  }

  useEffect(() => {
    if (
      !finished ||
      recordedResult.current ||
      quizQuestions.length === 0
    ) {
      return;
    }

    const percentage = Math.round(
      (correctCount /
        quizQuestions.length) *
        100
    );

    recordQuizResult(percentage);

    recordedResult.current = true;
  }, [
    finished,
    correctCount,
    quizQuestions.length,
    recordQuizResult,
  ]);

  useEffect(() => {
    if (!finished) {
      recordedResult.current = false;
    }
  }, [finished]);

  // =========================
  // RESULT SCREEN
  // =========================

  if (finished) {
    const total =
      quizQuestions.length;

    const percentage =
      total === 0
        ? 0
        : Math.round(
            (correctCount / total) *
              100
          );

    const mistakes =
      answers.filter(
        (answer) =>
          !answer.isCorrect
      );

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
              isDark &&
                styles.darkText,
            ]}
          >
            {isArabic
              ? 'نتيجة الاختبار 🏆'
              : 'Quiz Result 🏆'}
          </Text>

          <View
            style={[
              styles.resultCard,
              isDark &&
                styles.darkCard,
            ]}
          >
            <Text style={styles.score}>
              {percentage}%
            </Text>

            <Text
              style={[
                styles.resultMessage,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {percentage >= 80
                ? isArabic
                  ? 'عمل ممتاز! 🌟'
                  : 'Excellent work! 🌟'
                : percentage >= 60
                  ? isArabic
                    ? 'أحسنت! استمر في التعلم 💪'
                    : 'Good job! Keep learning 💪'
                  : isArabic
                    ? 'استمر في التدريب، يمكنك التحسن! 📚'
                    : 'Keep practicing. You can improve! 📚'}
            </Text>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text
                  style={
                    styles.correctNumber
                  }
                >
                  {correctCount}
                </Text>

                <Text
                  style={[
                    styles.statText,
                    isDark &&
                      styles.darkSecondaryText,
                  ]}
                >
                  {isArabic
                    ? 'صحيح'
                    : 'Correct'}
                </Text>
              </View>

              <View style={styles.stat}>
                <Text
                  style={
                    styles.wrongNumber
                  }
                >
                  {wrongCount}
                </Text>

                <Text
                  style={[
                    styles.statText,
                    isDark &&
                      styles.darkSecondaryText,
                  ]}
                >
                  {isArabic
                    ? 'خطأ'
                    : 'Wrong'}
                </Text>
              </View>

              <View style={styles.stat}>
                <Text
                  style={
                    styles.totalNumber
                  }
                >
                  {total}
                </Text>

                <Text
                  style={[
                    styles.statText,
                    isDark &&
                      styles.darkSecondaryText,
                  ]}
                >
                  {isArabic
                    ? 'المجموع'
                    : 'Total'}
                </Text>
              </View>
            </View>
          </View>

          {mistakes.length > 0 && (
            <>
              <Text
                style={[
                  styles.sectionTitle,
                  isDark &&
                    styles.darkText,
                ]}
              >
                {isArabic
                  ? 'مراجعة الأخطاء'
                  : 'Review Mistakes'}
              </Text>

              {mistakes.map(
                (answer, index) => (
                  <View
                    key={
                      answer.question.id
                    }
                    style={[
                      styles.mistakeCard,
                      isDark &&
                        styles.darkCard,
                    ]}
                  >
                    <Text
                      style={
                        styles.mistakeNumber
                      }
                    >
                      {isArabic
                        ? `خطأ ${index + 1}`
                        : `Mistake ${index + 1}`}
                    </Text>

                    <Text
                      style={[
                        styles.mistakeQuestion,
                        isDark &&
                          styles.darkText,
                      ]}
                    >
                      {
                        answer.question
                          .question
                      }
                    </Text>

                    <Text
                      style={
                        styles.yourAnswer
                      }
                    >
                      {isArabic
                        ? 'إجابتك: '
                        : 'Your answer: '}
                      {
                        answer.selectedAnswer
                      }
                    </Text>

                    <Text
                      style={
                        styles.correctAnswer
                      }
                    >
                      {isArabic
                        ? 'الإجابة الصحيحة: '
                        : 'Correct answer: '}
                      {
                        answer.question
                          .correctAnswer
                      }
                    </Text>

                    <Text
                      style={[
                        styles.explanation,
                        isDark &&
                          styles.darkSecondaryText,
                      ]}
                    >
                      💡{' '}
                      {
                        answer.question
                          .explanation
                      }
                    </Text>
                  </View>
                )
              )}
            </>
          )}

          {mistakes.length === 0 && (
            <View
              style={[
                styles.perfectCard,
                isDark &&
                  styles.darkPerfectCard,
              ]}
            >
              <Text
                style={
                  styles.perfectTitle
                }
              >
                {isArabic
                  ? '🎉 نتيجة كاملة!'
                  : '🎉 Perfect Score!'}
              </Text>

              <Text
                style={
                  styles.perfectText
                }
              >
                {isArabic
                  ? 'لقد أجبت عن جميع الأسئلة بشكل صحيح.'
                  : 'You answered every question correctly.'}
              </Text>
            </View>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed &&
                styles.pressed,
            ]}
            onPress={tryAgain}
          >
            <Text
              style={
                styles.primaryButtonText
              }
            >
              {isArabic
                ? '🔄 حاول مرة أخرى'
                : '🔄 Try Again'}
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              isDark &&
                styles.darkSecondaryButton,
              pressed &&
                styles.pressed,
            ]}
            onPress={resetQuiz}
          >
            <Text
              style={
                styles.secondaryButtonText
              }
            >
              {isArabic
                ? 'اختر اختباراً آخر'
                : 'Choose Another Quiz'}
            </Text>
          </Pressable>
        </ScrollView>
      </AppScreen>
    );
  }

  // =========================
  // ACTIVE QUIZ
  // =========================

  if (
    started &&
    currentQuestion
  ) {
    const answered =
      selectedAnswer !== null;

    const selectedIsCorrect =
      selectedAnswer ===
      currentQuestion.correctAnswer;

    const progress =
      ((currentIndex + 1) /
        quizQuestions.length) *
      100;

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
          <View style={styles.quizTop}>
            <View>
              <Text
                style={[
                  styles.quizSubject,
                  isDark &&
                    styles.darkText,
                ]}
              >
                {categoryName(category)}
              </Text>

              <Text
                style={
                  styles.quizLevel
                }
              >
                {levelName(level)}
              </Text>
            </View>

            <Text
              style={[
                styles.questionCount,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {currentIndex + 1} /{' '}
              {quizQuestions.length}
            </Text>
          </View>

          <View
            style={[
              styles.progressBackground,
              isDark &&
                styles.darkProgressBackground,
            ]}
          >
            <View
              style={[
                styles.progressBar,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>

          <View
            style={styles.counterRow}
          >
            <Text
              style={
                styles.correctCounter
              }
            >
              ✓ {correctCount}{' '}
              {isArabic
                ? 'صحيح'
                : 'Correct'}
            </Text>

            <Text
              style={
                styles.wrongCounter
              }
            >
              ✕ {wrongCount}{' '}
              {isArabic
                ? 'خطأ'
                : 'Wrong'}
            </Text>
          </View>

          <View
            style={[
              styles.questionCard,
              isDark &&
                styles.darkCard,
            ]}
          >
            <Text
              style={
                styles.questionType
              }
            >
              {currentQuestion.type ===
              'true-false'
                ? isArabic
                  ? 'صح / خطأ'
                  : 'TRUE / FALSE'
                : isArabic
                  ? 'اختيار من متعدد'
                  : 'MULTIPLE CHOICE'}
            </Text>

            <Text
              style={[
                styles.question,
                isDark &&
                  styles.darkText,
              ]}
            >
              {
                currentQuestion.question
              }
            </Text>

            {currentQuestion.options.map(
              (option, index) => {
                const isSelected =
                  selectedAnswer ===
                  option;

                const isCorrectOption =
                  answered &&
                  option ===
                    currentQuestion.correctAnswer;

                const isWrongSelected =
                  answered &&
                  isSelected &&
                  !isCorrectOption;

                return (
                  <Pressable
                    key={option}
                    disabled={answered}
                    style={[
                      styles.option,

                      isDark &&
                        styles.darkOption,

                      isCorrectOption &&
                        styles.correctOption,

                      isWrongSelected &&
                        styles.wrongOption,
                    ]}
                    onPress={() =>
                      answerQuestion(
                        option
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.optionText,

                        isDark &&
                          styles.darkOptionText,

                        (isCorrectOption ||
                          isWrongSelected) &&
                          styles.answerText,

                        isCorrectOption &&
                          styles.correctOptionText,

                        isWrongSelected &&
                          styles.wrongOptionText,
                      ]}
                    >
                      {currentQuestion.type ===
                      'multiple-choice'
                        ? `${String.fromCharCode(
                            65 + index
                          )}. `
                        : ''}

                      {option}
                    </Text>
                  </Pressable>
                );
              }
            )}

            {answered && (
              <View
                style={[
                  styles.feedback,

                  selectedIsCorrect
                    ? styles.correctFeedback
                    : styles.wrongFeedback,

                  isDark &&
                    selectedIsCorrect &&
                    styles.darkCorrectFeedback,

                  isDark &&
                    !selectedIsCorrect &&
                    styles.darkWrongFeedback,
                ]}
              >
                <Text
                  style={[
                    styles.feedbackTitle,
                    isDark &&
                      styles.darkText,
                  ]}
                >
                  {selectedIsCorrect
                    ? isArabic
                      ? '✅ إجابة صحيحة! أحسنت!'
                      : '✅ Correct! Great job!'
                    : isArabic
                      ? '❌ إجابة غير صحيحة!'
                      : '❌ Not quite!'}
                </Text>

                {!selectedIsCorrect && (
                  <Text
                    style={[
                      styles.feedbackText,
                      isDark &&
                        styles.darkSecondaryText,
                    ]}
                  >
                    {isArabic
                      ? 'الإجابة الصحيحة: '
                      : 'Correct answer: '}

                    {
                      currentQuestion.correctAnswer
                    }
                  </Text>
                )}

                <Text
                  style={[
                    styles.feedbackText,
                    isDark &&
                      styles.darkSecondaryText,
                  ]}
                >
                  💡{' '}
                  {
                    currentQuestion.explanation
                  }
                </Text>
              </View>
            )}

            {answered && (
              <Pressable
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed &&
                    styles.pressed,
                ]}
                onPress={nextQuestion}
              >
                <Text
                  style={
                    styles.primaryButtonText
                  }
                >
                  {currentIndex ===
                  quizQuestions.length - 1
                    ? isArabic
                      ? 'عرض النتيجة 🏆'
                      : 'See Result 🏆'
                    : isArabic
                      ? 'السؤال التالي ←'
                      : 'Next Question →'}
                </Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </AppScreen>
    );
  }

  // =========================
  // QUIZ SETUP
  // =========================

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
            ? 'اختبار 🧠'
            : 'Quiz 🧠'}
        </Text>

        <Text
          style={[
            styles.subtitle,
            isDark &&
              styles.darkSecondaryText,
          ]}
        >
          {isArabic
            ? 'اختبر معلوماتك التقنية.'
            : 'Test your technical knowledge.'}
        </Text>

        <View
          style={[
            styles.heroCard,
            isDark &&
              styles.darkHeroCard,
          ]}
        >
          <Text
            style={styles.heroEmoji}
          >
            🎯
          </Text>

          <View style={styles.heroText}>
            <Text
              style={[
                styles.heroTitle,
                isDark &&
                  styles.darkText,
              ]}
            >
              {isArabic
                ? 'تحدَّ نفسك'
                : 'Challenge Yourself'}
            </Text>

            <Text
              style={[
                styles.heroDescription,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {isArabic
                ? 'اختر المجال ومستوى الصعوبة.'
                : 'Choose a subject and difficulty level.'}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.sectionTitle,
            isDark && styles.darkText,
          ]}
        >
          {isArabic
            ? 'اختر المجال'
            : 'Choose Subject'}
        </Text>

        <View style={styles.grid}>
          {categories.map((item) => {
            const selected =
              category === item.value;

            return (
              <Pressable
                key={item.value}
                style={[
                  styles.choice,

                  isDark &&
                    styles.darkChoice,

                  selected &&
                    styles.selectedChoice,
                ]}
                onPress={() =>
                  setCategory(
                    item.value
                  )
                }
              >
                <Text
                  style={[
                    styles.choiceText,

                    isDark &&
                      styles.darkSecondaryText,

                    selected &&
                      styles.selectedChoiceText,
                  ]}
                >
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
            styles.sectionTitle,
            isDark && styles.darkText,
          ]}
        >
          {isArabic
            ? 'اختر المستوى'
            : 'Choose Level'}
        </Text>

        <View style={styles.grid}>
          {levels.map((item) => {
            const selected =
              level === item.value;

            return (
              <Pressable
                key={item.value}
                style={[
                  styles.choice,

                  isDark &&
                    styles.darkChoice,

                  selected &&
                    styles.selectedChoice,
                ]}
                onPress={() =>
                  setLevel(item.value)
                }
              >
                <Text
                  style={[
                    styles.choiceText,

                    isDark &&
                      styles.darkSecondaryText,

                    selected &&
                      styles.selectedChoiceText,
                  ]}
                >
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
            styles.infoCard,
            isDark &&
              styles.darkCard,
          ]}
        >
          <Text
            style={[
              styles.infoText,
              isDark &&
                styles.darkSecondaryText,
            ]}
          >
            {isArabic
              ? '📝 اختيار من متعدد + صح/خطأ'
              : '📝 Multiple Choice + True/False'}
          </Text>

          <Text
            style={[
              styles.infoText,
              isDark &&
                styles.darkSecondaryText,
            ]}
          >
            {isArabic
              ? '🔀 يتم ترتيب الأسئلة عشوائياً في كل محاولة'
              : '🔀 Questions are shuffled every attempt'}
          </Text>

          <Text
            style={[
              styles.infoText,
              isDark &&
                styles.darkSecondaryText,
            ]}
          >
            {isArabic
              ? '💡 الإجابات الخاطئة تتضمن شرحاً'
              : '💡 Wrong answers include explanations'}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.startButton,
            pressed && styles.pressed,
          ]}
          onPress={startQuiz}
        >
          <Text
            style={
              styles.startButtonText
            }
          >
            {isArabic
              ? 'ابدأ الاختبار 🚀'
              : 'Start Quiz 🚀'}
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
    marginBottom: 22,
  },

  heroCard: {
    backgroundColor: '#EDE9FE',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  darkHeroCard: {
    backgroundColor: '#312E81',
  },

  heroEmoji: {
    fontSize: 38,
  },

  heroText: {
    flex: 1,
    marginLeft: 15,
  },

  heroTitle: {
    color: '#1E293B',
    fontSize: 19,
    fontWeight: '800',
  },

  heroDescription: {
    color: '#64748B',
    marginTop: 4,
  },

  sectionTitle: {
    color: '#1E293B',
    fontSize: 17,
    fontWeight: '800',
    marginTop: 25,
    marginBottom: 12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },

  choice: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  darkChoice: {
    backgroundColor: '#1E293B',
    borderColor: '#475569',
  },

  selectedChoice: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },

  choiceText: {
    color: '#475569',
    fontWeight: '700',
  },

  selectedChoiceText: {
    color: '#FFFFFF',
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 17,
    marginTop: 25,
    gap: 9,
  },

  infoText: {
    color: '#64748B',
  },

  startButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 18,
  },

  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  quizTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  quizSubject: {
    color: '#1E293B',
    fontSize: 21,
    fontWeight: '800',
  },

  quizLevel: {
    color: '#7C3AED',
    marginTop: 3,
    fontWeight: '700',
  },

  questionCount: {
    color: '#64748B',
    fontWeight: '800',
  },

  progressBackground: {
    height: 9,
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
    marginTop: 20,
    overflow: 'hidden',
  },

  darkProgressBackground: {
    backgroundColor: '#334155',
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#7C3AED',
    borderRadius: 20,
  },

  counterRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 12,
  },

  correctCounter: {
    color: '#16A34A',
    fontWeight: '700',
  },

  wrongCounter: {
    color: '#DC2626',
    fontWeight: '700',
  },

  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    marginTop: 22,
  },

  questionType: {
    color: '#7C3AED',
    fontSize: 11,
    fontWeight: '800',
  },

  question: {
    color: '#1E293B',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 29,
    marginTop: 9,
    marginBottom: 20,
  },

  option: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 13,
    padding: 15,
    marginBottom: 10,
  },

  darkOption: {
    backgroundColor: '#334155',
    borderColor: '#475569',
  },

  correctOption: {
    backgroundColor: '#DCFCE7',
    borderColor: '#22C55E',
  },

  wrongOption: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
  },

  optionText: {
    color: '#334155',
    fontWeight: '600',
  },

  darkOptionText: {
    color: '#F8FAFC',
  },

  answerText: {
    fontWeight: '800',
  },

  correctOptionText: {
    color: '#166534',
  },

  wrongOptionText: {
    color: '#991B1B',
  },

  feedback: {
    borderRadius: 14,
    padding: 15,
    marginTop: 8,
  },

  correctFeedback: {
    backgroundColor: '#DCFCE7',
  },

  wrongFeedback: {
    backgroundColor: '#FEE2E2',
  },

  darkCorrectFeedback: {
    backgroundColor: '#14532D',
  },

  darkWrongFeedback: {
    backgroundColor: '#7F1D1D',
  },

  feedbackTitle: {
    color: '#1E293B',
    fontWeight: '800',
    marginBottom: 6,
  },

  feedbackText: {
    color: '#475569',
    lineHeight: 20,
    marginTop: 3,
  },

  primaryButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: '#7C3AED',
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  darkSecondaryButton: {
    backgroundColor: '#1E293B',
  },

  secondaryButtonText: {
    color: '#7C3AED',
    fontWeight: '800',
  },

  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 25,
    alignItems: 'center',
    marginTop: 22,
  },

  score: {
    color: '#7C3AED',
    fontSize: 48,
    fontWeight: '900',
  },

  resultMessage: {
    color: '#475569',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 5,
    textAlign: 'center',
  },

  stats: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 25,
  },

  stat: {
    flex: 1,
    alignItems: 'center',
  },

  correctNumber: {
    color: '#16A34A',
    fontSize: 22,
    fontWeight: '800',
  },

  wrongNumber: {
    color: '#DC2626',
    fontSize: 22,
    fontWeight: '800',
  },

  totalNumber: {
    color: '#7C3AED',
    fontSize: 22,
    fontWeight: '800',
  },

  statText: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 3,
  },

  mistakeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 17,
    marginBottom: 11,
  },

  mistakeNumber: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: '800',
  },

  mistakeQuestion: {
    color: '#1E293B',
    fontWeight: '800',
    marginTop: 7,
    lineHeight: 21,
  },

  yourAnswer: {
    color: '#DC2626',
    marginTop: 12,
  },

  correctAnswer: {
    color: '#16A34A',
    marginTop: 5,
    fontWeight: '700',
  },

  explanation: {
    color: '#64748B',
    lineHeight: 20,
    marginTop: 10,
  },

  perfectCard: {
    backgroundColor: '#DCFCE7',
    borderRadius: 17,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },

  darkPerfectCard: {
    backgroundColor: '#14532D',
  },

  perfectTitle: {
    color: '#16A34A',
    fontSize: 18,
    fontWeight: '800',
  },

  perfectText: {
    color: '#16A34A',
    marginTop: 6,
    textAlign: 'center',
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