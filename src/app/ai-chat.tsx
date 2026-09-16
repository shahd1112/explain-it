import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  router,
} from 'expo-router';

import {
  useState,
} from 'react';

import AppScreen from '@/components/AppScreen';

import {
  useAuth,
} from '@/context/AuthContext';

import {
  useSettings,
} from '@/context/SettingsContext';

import {
  apiRequest,
} from '@/services/api';

type ChatResponse = {
  success: boolean;
  message: string;
  chat: {
    id: number;
    question: string;
    answer: string;
    created_at: string;
  };
};

export default function AIChatScreen() {
  const {
    token,
  } = useAuth();

  const {
    theme,
    language,
  } = useSettings();

  const [
    question,
    setQuestion,
  ] = useState('');

  const [
    answer,
    setAnswer,
  ] = useState('');

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState('');

  const isDark =
    theme === 'dark';

  const isArabic =
    language === 'ar';

  async function askAI() {
    const cleanQuestion =
      question.trim();

    if (!cleanQuestion) {
      setError(
        isArabic
          ? 'اكتبي السؤال أولاً.'
          : 'Please enter a question first.'
      );

      return;
    }

    if (!token) {
      setError(
        isArabic
          ? 'يجب تسجيل الدخول أولاً.'
          : 'You must be logged in first.'
      );

      return;
    }

    try {
      setLoading(true);
      setError('');
      setAnswer('');

      const response =
        await apiRequest<ChatResponse>(
          '/chat',
          {
            method: 'POST',

            token,

            body: {
              question:
                cleanQuestion,
            },
          }
        );

      setAnswer(
        response.chat.answer
      );
    } catch (err) {
      console.error(
        'AI chat error:',
        err
      );

      setError(
        isArabic
          ? 'حدث خطأ أثناء الحصول على الإجابة.'
          : 'Something went wrong while getting the answer.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppScreen>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
      >
        <ScrollView
          style={[
            styles.screen,
            isDark &&
              styles.darkScreen,
          ]}
          contentContainerStyle={
            styles.container
          }
          keyboardShouldPersistTaps="handled"
        >
          {/* =====================================
              HEADER
          ===================================== */}

          <View style={styles.header}>
            <Pressable
              style={[
                styles.backButton,
                isDark &&
                  styles.darkBackButton,
              ]}
              onPress={() =>
                router.back()
              }
            >
              <Text
                style={[
                  styles.backText,
                  isDark &&
                    styles.darkText,
                ]}
              >
                {isArabic
                  ? '‹'
                  : '‹'}
              </Text>
            </Pressable>

            <View
              style={styles.headerCenter}
            >
              <Text
                style={[
                  styles.headerEmoji,
                ]}
              >
                🤖
              </Text>

              <View>
                <Text
                  style={[
                    styles.title,
                    isDark &&
                      styles.darkText,
                  ]}
                >
                  {isArabic
                    ? 'اسأل Explain It'
                    : 'Ask Explain It'}
                </Text>

                <Text
                  style={[
                    styles.subtitle,
                    isDark &&
                      styles.darkSecondaryText,
                  ]}
                >
                  {isArabic
                    ? 'مساعدك التعليمي'
                    : 'Your learning assistant'}
                </Text>
              </View>
            </View>

            {/* HISTORY BUTTON */}

            <Pressable
              style={[
                styles.historyButton,
                isDark &&
                  styles.darkHistoryButton,
              ]}
              onPress={() =>
                router.push(
                  '/chat-history'
                )
              }
            >
              <Text
                style={
                  styles.historyEmoji
                }
              >
                🕘
              </Text>
            </Pressable>
          </View>

          {/* =====================================
              INTRO CARD
          ===================================== */}

          <View
            style={[
              styles.introCard,
              isDark &&
                styles.darkIntroCard,
            ]}
          >
            <Text
              style={[
                styles.introTitle,
                isDark &&
                  styles.darkText,
              ]}
            >
              {isArabic
                ? 'اسألني أي شيء 📚'
                : 'Ask me anything 📚'}
            </Text>

            <Text
              style={[
                styles.introText,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {isArabic
                ? 'يمكنك السؤال عن البرمجة، الشبكات، الذكاء الاصطناعي، الأمن السيبراني، التكنولوجيا أو أي موضوع تعليمي.'
                : 'Ask about programming, networks, AI, cybersecurity, technology, or any educational topic.'}
            </Text>
          </View>

          {/* =====================================
              QUESTION INPUT
          ===================================== */}

          <Text
            style={[
              styles.label,
              isDark &&
                styles.darkText,
            ]}
          >
            {isArabic
              ? 'سؤالك'
              : 'Your question'}
          </Text>

          <TextInput
            value={question}
            onChangeText={(text) => {
              setQuestion(text);

              if (error) {
                setError('');
              }
            }}
            placeholder={
              isArabic
                ? 'مثلاً: ما هو React؟'
                : 'Example: What is React?'
            }
            placeholderTextColor={
              isDark
                ? '#94A3B8'
                : '#94A3B8'
            }
            multiline
            maxLength={2000}
            editable={!loading}
            style={[
              styles.input,
              isDark &&
                styles.darkInput,
              isDark &&
                styles.darkText,
            ]}
          />

          {/* CHARACTER COUNT */}

          <Text
            style={[
              styles.counter,
              isDark &&
                styles.darkSecondaryText,
            ]}
          >
            {question.length}/2000
          </Text>

          {/* =====================================
              ERROR
          ===================================== */}

          {error ? (
            <View
              style={styles.errorBox}
            >
              <Text
                style={styles.errorText}
              >
                {error}
              </Text>
            </View>
          ) : null}

          {/* =====================================
              ASK BUTTON
          ===================================== */}

          <Pressable
            style={({ pressed }) => [
              styles.askButton,

              loading &&
                styles.disabledButton,

              pressed &&
                !loading &&
                styles.pressed,
            ]}
            onPress={askAI}
            disabled={loading}
          >
            {loading ? (
              <>
                <ActivityIndicator
                  color="#FFFFFF"
                  size="small"
                />

                <Text
                  style={
                    styles.askButtonText
                  }
                >
                  {isArabic
                    ? 'جاري التفكير...'
                    : 'Thinking...'}
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={
                    styles.askButtonEmoji
                  }
                >
                  ✨
                </Text>

                <Text
                  style={
                    styles.askButtonText
                  }
                >
                  {isArabic
                    ? 'اسأل الذكاء الاصطناعي'
                    : 'Ask AI'}
                </Text>
              </>
            )}
          </Pressable>

          {/* =====================================
              ANSWER
          ===================================== */}

          {answer ? (
            <View
              style={[
                styles.answerCard,
                isDark &&
                  styles.darkAnswerCard,
              ]}
            >
              <View
                style={
                  styles.answerHeader
                }
              >
                <View
                  style={
                    styles.answerIcon
                  }
                >
                  <Text
                    style={
                      styles.answerEmoji
                    }
                  >
                    🤖
                  </Text>
                </View>

                <View
                  style={
                    styles.answerHeaderText
                  }
                >
                  <Text
                    style={[
                      styles.answerTitle,
                      isDark &&
                        styles.darkText,
                    ]}
                  >
                    {isArabic
                      ? 'Explain It'
                      : 'Explain It AI'}
                  </Text>

                  <Text
                    style={[
                      styles.answerSubtitle,
                      isDark &&
                        styles.darkSecondaryText,
                    ]}
                  >
                    {isArabic
                      ? 'الإجابة'
                      : 'Answer'}
                  </Text>
                </View>
              </View>

              <View
                style={
                  styles.separator
                }
              />

              <Text
                style={[
                  styles.answerText,
                  isDark &&
                    styles.darkText,
                ]}
              >
                {answer}
              </Text>
            </View>
          ) : null}

          {/* =====================================
              HISTORY LINK
          ===================================== */}

          <Pressable
            style={[
              styles.historyLink,
              isDark &&
                styles.darkHistoryLink,
            ]}
            onPress={() =>
              router.push(
                '/chat-history'
              )
            }
          >
            <Text
              style={
                styles.historyLinkEmoji
              }
            >
              🕘
            </Text>

            <Text
              style={[
                styles.historyLinkText,
                isDark &&
                  styles.darkText,
              ]}
            >
              {isArabic
                ? 'عرض سجل الأسئلة السابقة'
                : 'View previous questions'}
            </Text>

            <Text
              style={
                styles.historyLinkArrow
              }
            >
              {isArabic
                ? '‹'
                : '›'}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

const styles =
  StyleSheet.create({
    // ========================================
    // SCREEN
    // ========================================

    keyboard: {
      flex: 1,
    },

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
      paddingTop: 25,
      paddingBottom: 40,
    },

    // ========================================
    // HEADER
    // ========================================

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 25,
    },

    backButton: {
      width: 42,
      height: 42,
      borderRadius: 13,
      backgroundColor:
        '#FFFFFF',
      alignItems: 'center',
      justifyContent:
        'center',
      marginRight: 10,
    },

    darkBackButton: {
      backgroundColor:
        '#1E293B',
    },

    backText: {
      color: '#1E293B',
      fontSize: 31,
      lineHeight: 32,
      marginTop: -3,
    },

    headerCenter: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },

    headerEmoji: {
      fontSize: 32,
      marginRight: 10,
    },

    title: {
      color: '#1E293B',
      fontSize: 19,
      fontWeight: '800',
    },

    subtitle: {
      color: '#64748B',
      fontSize: 12,
      marginTop: 2,
    },

    historyButton: {
      width: 42,
      height: 42,
      borderRadius: 13,
      backgroundColor:
        '#EDE9FE',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    darkHistoryButton: {
      backgroundColor:
        '#312E81',
    },

    historyEmoji: {
      fontSize: 20,
    },

    // ========================================
    // INTRO
    // ========================================

    introCard: {
      backgroundColor:
        '#EDE9FE',
      borderRadius: 21,
      padding: 20,
      marginBottom: 25,
    },

    darkIntroCard: {
      backgroundColor:
        '#312E81',
    },

    introTitle: {
      color: '#1E293B',
      fontSize: 19,
      fontWeight: '800',
    },

    introText: {
      color: '#475569',
      fontSize: 13,
      lineHeight: 20,
      marginTop: 7,
    },

    // ========================================
    // INPUT
    // ========================================

    label: {
      color: '#1E293B',
      fontSize: 16,
      fontWeight: '800',
      marginBottom: 9,
    },

    input: {
      minHeight: 125,
      backgroundColor:
        '#FFFFFF',
      borderRadius: 18,
      paddingHorizontal: 17,
      paddingVertical: 15,
      fontSize: 15,
      color: '#1E293B',
      textAlignVertical: 'top',
      borderWidth: 1,
      borderColor:
        '#E2E8F0',
    },

    darkInput: {
      backgroundColor:
        '#1E293B',
      borderColor:
        '#334155',
    },

    counter: {
      color: '#94A3B8',
      fontSize: 11,
      textAlign: 'right',
      marginTop: 5,
      marginBottom: 12,
    },

    // ========================================
    // ERROR
    // ========================================

    errorBox: {
      backgroundColor:
        '#FEE2E2',
      borderRadius: 13,
      padding: 12,
      marginBottom: 12,
    },

    errorText: {
      color: '#B91C1C',
      fontSize: 13,
      lineHeight: 19,
    },

    // ========================================
    // ASK BUTTON
    // ========================================

    askButton: {
      minHeight: 54,
      backgroundColor:
        '#7C3AED',
      borderRadius: 17,
      alignItems: 'center',
      justifyContent:
        'center',
      flexDirection: 'row',
      marginBottom: 25,
    },

    disabledButton: {
      opacity: 0.7,
    },

    askButtonEmoji: {
      fontSize: 19,
      marginRight: 8,
    },

    askButtonText: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '800',
    },

    // ========================================
    // ANSWER
    // ========================================

    answerCard: {
      backgroundColor:
        '#FFFFFF',
      borderRadius: 21,
      padding: 19,
      marginBottom: 20,
    },

    darkAnswerCard: {
      backgroundColor:
        '#1E293B',
    },

    answerHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    answerIcon: {
      width: 45,
      height: 45,
      borderRadius: 14,
      backgroundColor:
        '#F5F3FF',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    answerEmoji: {
      fontSize: 24,
    },

    answerHeaderText: {
      marginLeft: 11,
    },

    answerTitle: {
      color: '#1E293B',
      fontSize: 16,
      fontWeight: '800',
    },

    answerSubtitle: {
      color: '#64748B',
      fontSize: 11,
      marginTop: 2,
    },

    separator: {
      height: 1,
      backgroundColor:
        '#E2E8F0',
      marginVertical: 15,
    },

    answerText: {
      color: '#1E293B',
      fontSize: 15,
      lineHeight: 24,
    },

    // ========================================
    // HISTORY LINK
    // ========================================

    historyLink: {
      minHeight: 58,
      backgroundColor:
        '#FFFFFF',
      borderRadius: 17,
      paddingHorizontal: 17,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },

    darkHistoryLink: {
      backgroundColor:
        '#1E293B',
    },

    historyLinkEmoji: {
      fontSize: 22,
      marginRight: 11,
    },

    historyLinkText: {
      flex: 1,
      color: '#1E293B',
      fontSize: 14,
      fontWeight: '700',
    },

    historyLinkArrow: {
      color: '#7C3AED',
      fontSize: 28,
    },

    // ========================================
    // COMMON
    // ========================================

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