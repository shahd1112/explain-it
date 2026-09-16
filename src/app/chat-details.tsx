import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  router,
  useLocalSearchParams,
} from 'expo-router';

import {
  useEffect,
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

type ChatItem = {
  id: number;
  question: string;
  answer: string;
  created_at: string;
};

type ChatResponse = {
  success: boolean;
  chat: ChatItem;
};

type DeleteResponse = {
  success: boolean;
  message: string;
};

export default function ChatDetailsScreen() {
  const {
    token,
  } = useAuth();

  const {
    theme,
    language,
  } = useSettings();

  const {
    id,
  } = useLocalSearchParams<{
    id: string;
  }>();

  const [
    chat,
    setChat,
  ] = useState<ChatItem | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState('');

  const isDark =
    theme === 'dark';

  const isArabic =
    language === 'ar';

  // ==========================================
  // LOAD CHAT
  // ==========================================

  async function loadChat() {
    if (!token || !id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response =
        await apiRequest<ChatResponse>(
          `/chat/history/${id}`,
          {
            method: 'GET',
            token,
          }
        );

      setChat(
        response.chat
      );
    } catch (err) {
      console.error(
        'Load chat details error:',
        err
      );

      setError(
        isArabic
          ? 'تعذر تحميل السؤال.'
          : 'Could not load this chat.'
      );
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // LOAD WHEN SCREEN OPENS
  // ==========================================

  useEffect(() => {
    loadChat();
  }, [token, id]);

  // ==========================================
  // FORMAT DATE
  // ==========================================

  function formatDate(
    dateString: string
  ) {
    const date =
      new Date(dateString);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return '';
    }

    return date.toLocaleString(
      isArabic
        ? 'ar'
        : 'en',
      {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
    );
  }

  // ==========================================
  // DELETE CHAT
  // ==========================================

  function confirmDelete() {
    if (!chat) {
      return;
    }

    Alert.alert(
      isArabic
        ? 'حذف السؤال'
        : 'Delete question',

      isArabic
        ? 'هل أنت متأكد أنك تريد حذف هذا السؤال؟'
        : 'Are you sure you want to delete this question?',

      [
        {
          text: isArabic
            ? 'إلغاء'
            : 'Cancel',

          style: 'cancel',
        },

        {
          text: isArabic
            ? 'حذف'
            : 'Delete',

          style: 'destructive',

          onPress:
            deleteChat,
        },
      ]
    );
  }

  async function deleteChat() {
    if (!token || !chat) {
      return;
    }

    try {
      await apiRequest<DeleteResponse>(
        `/chat/history/${chat.id}`,
        {
          method: 'DELETE',
          token,
        }
      );

      router.replace(
        '/chat-history'
      );
    } catch (err) {
      console.error(
        'Delete chat error:',
        err
      );

      Alert.alert(
        isArabic
          ? 'خطأ'
          : 'Error',

        isArabic
          ? 'تعذر حذف السؤال.'
          : 'Could not delete this question.'
      );
    }
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <AppScreen>
        <View
          style={[
            styles.screen,
            isDark &&
              styles.darkScreen,
          ]}
        >
          <View
            style={styles.center}
          >
            <ActivityIndicator
              size="large"
              color="#7C3AED"
            />

            <Text
              style={[
                styles.loadingText,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {isArabic
                ? 'جاري تحميل الإجابة...'
                : 'Loading answer...'}
            </Text>
          </View>
        </View>
      </AppScreen>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !chat) {
    return (
      <AppScreen>
        <View
          style={[
            styles.screen,
            isDark &&
              styles.darkScreen,
          ]}
        >
          <View
            style={styles.center}
          >
            <Text
              style={
                styles.errorEmoji
              }
            >
              ⚠️
            </Text>

            <Text
              style={[
                styles.errorTitle,
                isDark &&
                  styles.darkText,
              ]}
            >
              {error ||
                (isArabic
                  ? 'السؤال غير موجود.'
                  : 'Chat not found.')}
            </Text>

            <Pressable
              style={
                styles.backHomeButton
              }
              onPress={() =>
                router.replace(
                  '/chat-history'
                )
              }
            >
              <Text
                style={
                  styles.backHomeText
                }
              >
                {isArabic
                  ? 'العودة للسجل'
                  : 'Back to History'}
              </Text>
            </Pressable>
          </View>
        </View>
      </AppScreen>
    );
  }

  // ==========================================
  // CHAT DETAILS
  // ==========================================

  return (
    <AppScreen>
      <View
        style={[
          styles.screen,
          isDark &&
            styles.darkScreen,
        ]}
      >
        {/* =====================================
            HEADER
        ===================================== */}

        <View
          style={[
            styles.header,
            isDark &&
              styles.darkHeader,
          ]}
        >
          <Pressable
            style={[
              styles.backButton,
              isDark &&
                styles.darkButton,
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
              ‹
            </Text>
          </Pressable>

          <View
            style={
              styles.headerContent
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
                ? 'السؤال والإجابة'
                : 'Question & Answer'}
            </Text>

            <Text
              style={[
                styles.date,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {formatDate(
                chat.created_at
              )}
            </Text>
          </View>

          <Pressable
            style={
              styles.deleteButton
            }
            onPress={
              confirmDelete
            }
          >
            <Text
              style={
                styles.deleteEmoji
              }
            >
              🗑️
            </Text>
          </Pressable>
        </View>

        {/* =====================================
            CONTENT
        ===================================== */}

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={
            styles.container
          }
          showsVerticalScrollIndicator={
            false
          }
        >
          {/* ===================================
              QUESTION
          =================================== */}

          <View
            style={[
              styles.questionCard,
              isDark &&
                styles.darkCard,
            ]}
          >
            <View
              style={
                styles.sectionHeader
              }
            >
              <View
                style={
                  styles.questionIcon
                }
              >
                <Text
                  style={
                    styles.questionEmoji
                  }
                >
                  💬
                </Text>
              </View>

              <Text
                style={[
                  styles.sectionTitle,
                  isDark &&
                    styles.darkText,
                ]}
              >
                {isArabic
                  ? 'سؤالك'
                  : 'Your Question'}
              </Text>
            </View>

            <Text
              style={[
                styles.questionText,
                isDark &&
                  styles.darkText,
              ]}
            >
              {chat.question}
            </Text>
          </View>

          {/* ===================================
              ANSWER
          =================================== */}

          <View
            style={[
              styles.answerCard,
              isDark &&
                styles.darkCard,
            ]}
          >
            <View
              style={
                styles.sectionHeader
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

              <View>
                <Text
                  style={[
                    styles.sectionTitle,
                    isDark &&
                      styles.darkText,
                  ]}
                >
                  {isArabic
                    ? 'إجابة Explain It'
                    : 'Explain It Answer'}
                </Text>

                <Text
                  style={[
                    styles.answerLabel,
                    isDark &&
                      styles.darkSecondaryText,
                  ]}
                >
                  {isArabic
                    ? 'تم إنشاؤها بواسطة الذكاء الاصطناعي'
                    : 'Generated by AI'}
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
              {chat.answer}
            </Text>
          </View>

          {/* ===================================
              ASK NEW QUESTION
          =================================== */}

          <Pressable
            style={({ pressed }) => [
              styles.askButton,
              pressed &&
                styles.pressed,
            ]}
            onPress={() =>
              router.replace(
                '/ai-chat'
              )
            }
          >
            <Text
              style={
                styles.askButtonEmoji
              }
            >
              🤖
            </Text>

            <Text
              style={
                styles.askButtonText
              }
            >
              {isArabic
                ? 'اسأل سؤالاً جديداً'
                : 'Ask a new question'}
            </Text>
          </Pressable>

          {/* ===================================
              BACK TO HISTORY
          =================================== */}

          <Pressable
            style={[
              styles.historyButton,
              isDark &&
                styles.darkHistoryButton,
            ]}
            onPress={() =>
              router.replace(
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

            <Text
              style={[
                styles.historyText,
                isDark &&
                  styles.darkText,
              ]}
            >
              {isArabic
                ? 'العودة إلى سجل الأسئلة'
                : 'Back to Chat History'}
            </Text>
          </Pressable>
        </ScrollView>
      </View>
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

    // ========================================
    // HEADER
    // ========================================

    header: {
      minHeight: 92,
      paddingHorizontal: 22,
      paddingTop: 20,
      paddingBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor:
        '#F7F7FC',
    },

    darkHeader: {
      backgroundColor:
        '#0F172A',
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
      marginRight: 12,
    },

    darkButton: {
      backgroundColor:
        '#1E293B',
    },

    backText: {
      color: '#1E293B',
      fontSize: 31,
      lineHeight: 32,
      marginTop: -3,
    },

    headerContent: {
      flex: 1,
    },

    title: {
      color: '#1E293B',
      fontSize: 20,
      fontWeight: '800',
    },

    date: {
      color: '#64748B',
      fontSize: 11,
      marginTop: 4,
    },

    deleteButton: {
      width: 42,
      height: 42,
      borderRadius: 13,
      backgroundColor:
        '#FEF2F2',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    deleteEmoji: {
      fontSize: 19,
    },

    // ========================================
    // CONTENT
    // ========================================

    scroll: {
      flex: 1,
    },

    container: {
      paddingHorizontal: 22,
      paddingBottom: 40,
    },

    // ========================================
    // QUESTION
    // ========================================

    questionCard: {
      backgroundColor:
        '#FFFFFF',
      borderRadius: 21,
      padding: 20,
      marginBottom: 15,
    },

    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },

    questionIcon: {
      width: 45,
      height: 45,
      borderRadius: 14,
      backgroundColor:
        '#F5F3FF',
      alignItems: 'center',
      justifyContent:
        'center',
      marginRight: 11,
    },

    questionEmoji: {
      fontSize: 23,
    },

    sectionTitle: {
      color: '#1E293B',
      fontSize: 17,
      fontWeight: '800',
    },

    questionText: {
      color: '#1E293B',
      fontSize: 16,
      lineHeight: 25,
    },

    // ========================================
    // ANSWER
    // ========================================

    answerCard: {
      backgroundColor:
        '#FFFFFF',
      borderRadius: 21,
      padding: 20,
      marginBottom: 18,
    },

    answerIcon: {
      width: 45,
      height: 45,
      borderRadius: 14,
      backgroundColor:
        '#EDE9FE',
      alignItems: 'center',
      justifyContent:
        'center',
      marginRight: 11,
    },

    answerEmoji: {
      fontSize: 23,
    },

    answerLabel: {
      color: '#64748B',
      fontSize: 10,
      marginTop: 3,
    },

    separator: {
      height: 1,
      backgroundColor:
        '#E2E8F0',
      marginBottom: 17,
    },

    answerText: {
      color: '#1E293B',
      fontSize: 15,
      lineHeight: 25,
    },

    // ========================================
    // BUTTONS
    // ========================================

    askButton: {
      minHeight: 55,
      borderRadius: 17,
      backgroundColor:
        '#7C3AED',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'center',
      marginBottom: 12,
    },

    askButtonEmoji: {
      fontSize: 20,
      marginRight: 8,
    },

    askButtonText: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '800',
    },

    historyButton: {
      minHeight: 55,
      borderRadius: 17,
      backgroundColor:
        '#FFFFFF',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    darkHistoryButton: {
      backgroundColor:
        '#1E293B',
    },

    historyEmoji: {
      fontSize: 20,
      marginRight: 8,
    },

    historyText: {
      color: '#1E293B',
      fontSize: 14,
      fontWeight: '800',
    },

    // ========================================
    // LOADING
    // ========================================

    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent:
        'center',
      paddingHorizontal: 30,
    },

    loadingText: {
      color: '#64748B',
      fontSize: 14,
      marginTop: 12,
    },

    // ========================================
    // ERROR
    // ========================================

    errorEmoji: {
      fontSize: 50,
      marginBottom: 15,
    },

    errorTitle: {
      color: '#1E293B',
      fontSize: 16,
      fontWeight: '700',
      textAlign: 'center',
    },

    backHomeButton: {
      backgroundColor:
        '#7C3AED',
      borderRadius: 14,
      paddingHorizontal: 22,
      paddingVertical: 13,
      marginTop: 20,
    },

    backHomeText: {
      color: '#FFFFFF',
      fontWeight: '800',
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
      opacity: 0.75,
    },
  });