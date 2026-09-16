import {
    ActivityIndicator,
    Alert,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    router,
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

type ChatHistoryItem = {
  id: number;
  question: string;
  answer: string;
  created_at: string;
};

type HistoryResponse = {
  success: boolean;
  history: ChatHistoryItem[];
};

type DeleteResponse = {
  success: boolean;
  message: string;
};

export default function ChatHistoryScreen() {
  const {
    token,
  } = useAuth();

  const {
    theme,
    language,
  } = useSettings();

  const [
    history,
    setHistory,
  ] = useState<
    ChatHistoryItem[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState('');

  const isDark =
    theme === 'dark';

  const isArabic =
    language === 'ar';

  // ==========================================
  // LOAD HISTORY
  // ==========================================

  async function loadHistory(
    showLoading = true
  ) {
    if (!token) {
      setHistory([]);
      setLoading(false);
      return;
    }

    try {
      if (showLoading) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      setError('');

      const response =
        await apiRequest<HistoryResponse>(
          '/chat/history',
          {
            method: 'GET',
            token,
          }
        );

      setHistory(
        response.history || []
      );
    } catch (err) {
      console.error(
        'Load chat history error:',
        err
      );

      setError(
        isArabic
          ? 'تعذر تحميل سجل الأسئلة.'
          : 'Could not load chat history.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // ==========================================
  // LOAD WHEN SCREEN OPENS
  // ==========================================

  useEffect(() => {
    loadHistory();
  }, [token]);

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

  function confirmDelete(
    chatId: number
  ) {
    Alert.alert(
      isArabic
        ? 'حذف السؤال'
        : 'Delete question',

      isArabic
        ? 'هل أنت متأكد أنك تريد حذف هذا السؤال من السجل؟'
        : 'Are you sure you want to delete this question from your history?',

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

          onPress: () =>
            deleteChat(chatId),
        },
      ]
    );
  }

  async function deleteChat(
    chatId: number
  ) {
    if (!token) {
      return;
    }

    try {
      await apiRequest<DeleteResponse>(
        `/chat/history/${chatId}`,
        {
          method: 'DELETE',
          token,
        }
      );

      setHistory(
        (current) =>
          current.filter(
            (item) =>
              item.id !== chatId
          )
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
          : 'Could not delete the question.'
      );
    }
  }

  // ==========================================
  // OPEN CHAT
  // ==========================================

  function openChat(
    chat: ChatHistoryItem
  ) {
    router.push({
      pathname:
        '/chat-details',

      params: {
        id: String(chat.id),
      },
    });
  }

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
                ? 'سجل الأسئلة'
                : 'Chat History'}
            </Text>

            <Text
              style={[
                styles.subtitle,
                isDark &&
                  styles.darkSecondaryText,
              ]}
            >
              {isArabic
                ? `${history.length} سؤال محفوظ`
                : `${history.length} saved questions`}
            </Text>
          </View>

          <View
            style={[
              styles.historyIcon,
              isDark &&
                styles.darkHistoryIcon,
            ]}
          >
            <Text
              style={
                styles.historyEmoji
              }
            >
              🕘
            </Text>
          </View>
        </View>

        {/* =====================================
            CONTENT
        ===================================== */}

        {loading ? (
          <View
            style={
              styles.center
            }
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
                ? 'جاري تحميل السجل...'
                : 'Loading history...'}
            </Text>
          </View>
        ) : error ? (
          <View
            style={
              styles.center
            }
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
              {error}
            </Text>

            <Pressable
              style={
                styles.retryButton
              }
              onPress={() =>
                loadHistory()
              }
            >
              <Text
                style={
                  styles.retryText
                }
              >
                {isArabic
                  ? 'إعادة المحاولة'
                  : 'Try Again'}
              </Text>
            </Pressable>
          </View>
        ) : history.length ===
          0 ? (
          <ScrollView
            contentContainerStyle={
              styles.emptyContainer
            }
          >
            <View
              style={[
                styles.emptyCard,
                isDark &&
                  styles.darkCard,
              ]}
            >
              <Text
                style={
                  styles.emptyEmoji
                }
              >
                🕘
              </Text>

              <Text
                style={[
                  styles.emptyTitle,
                  isDark &&
                    styles.darkText,
                ]}
              >
                {isArabic
                  ? 'لا يوجد سجل بعد'
                  : 'No history yet'}
              </Text>

              <Text
                style={[
                  styles.emptyText,
                  isDark &&
                    styles.darkSecondaryText,
                ]}
              >
                {isArabic
                  ? 'عندما تسأل Explain It عن أي موضوع، ستظهر أسئلتك وإجاباتك هنا.'
                  : 'When you ask Explain It a question, your questions and answers will appear here.'}
              </Text>

              <Pressable
                style={
                  styles.askButton
                }
                onPress={() =>
                  router.push(
                    '/ai-chat'
                  )
                }
              >
                <Text
                  style={
                    styles.askButtonText
                  }
                >
                  {isArabic
                    ? '🤖 اسأل Explain It'
                    : '🤖 Ask Explain It'}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            style={styles.list}
            contentContainerStyle={
              styles.listContainer
            }
            showsVerticalScrollIndicator={
              false
            }
            refreshControl={
              <RefreshControl
                refreshing={
                  refreshing
                }
                onRefresh={() =>
                  loadHistory(false)
                }
                tintColor="#7C3AED"
              />
            }
          >
            {/* =================================
                INFO
            ================================= */}

            <View
              style={[
                styles.infoCard,
                isDark &&
                  styles.darkInfoCard,
              ]}
            >
              <Text
                style={
                  styles.infoEmoji
                }
              >
                💡
              </Text>

              <Text
                style={[
                  styles.infoText,
                  isDark &&
                    styles.darkSecondaryText,
                ]}
              >
                {isArabic
                  ? 'اضغط على أي سؤال لعرض الإجابة كاملة.'
                  : 'Tap any question to view the full answer.'}
              </Text>
            </View>

            {/* =================================
                HISTORY ITEMS
            ================================= */}

            {history.map(
              (chat) => (
                <Pressable
                  key={chat.id}
                  style={({ pressed }) => [
                    styles.chatCard,

                    isDark &&
                      styles.darkCard,

                    pressed &&
                      styles.pressed,
                  ]}
                  onPress={() =>
                    openChat(chat)
                  }
                >
                  <View
                    style={
                      styles.chatTop
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

                    <View
                      style={
                        styles.chatMain
                      }
                    >
                      <Text
                        style={[
                          styles.question,
                          isDark &&
                            styles.darkText,
                        ]}
                        numberOfLines={3}
                      >
                        {chat.question}
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

                    <Text
                      style={
                        styles.arrow
                      }
                    >
                      ›
                    </Text>
                  </View>

                  <View
                    style={
                      styles.chatBottom
                    }
                  >
                    <Text
                      style={[
                        styles.answerPreview,
                        isDark &&
                          styles.darkSecondaryText,
                      ]}
                      numberOfLines={2}
                    >
                      {chat.answer}
                    </Text>

                    <Pressable
                      style={
                        styles.deleteButton
                      }
                      onPress={(
                        event
                      ) => {
                        event.stopPropagation();

                        confirmDelete(
                          chat.id
                        );
                      }}
                    >
                      <Text
                        style={
                          styles.deleteText
                        }
                      >
                        🗑️
                      </Text>
                    </Pressable>
                  </View>
                </Pressable>
              )
            )}

            {/* =================================
                ASK AGAIN
            ================================= */}

            <Pressable
              style={[
                styles.askAgainButton,
                isDark &&
                  styles.darkAskAgainButton,
              ]}
              onPress={() =>
                router.push(
                  '/ai-chat'
                )
              }
            >
              <Text
                style={
                  styles.askAgainEmoji
                }
              >
                🤖
              </Text>

              <Text
                style={[
                  styles.askAgainText,
                  isDark &&
                    styles.darkText,
                ]}
              >
                {isArabic
                  ? 'اسأل سؤالاً جديداً'
                  : 'Ask a new question'}
              </Text>

              <Text
                style={
                  styles.askAgainArrow
                }
              >
                ›
              </Text>
            </Pressable>
          </ScrollView>
        )}
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
      fontSize: 21,
      fontWeight: '800',
    },

    subtitle: {
      color: '#64748B',
      fontSize: 12,
      marginTop: 3,
    },

    historyIcon: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor:
        '#EDE9FE',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    darkHistoryIcon: {
      backgroundColor:
        '#312E81',
    },

    historyEmoji: {
      fontSize: 22,
    },

    // ========================================
    // CENTER
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

    errorEmoji: {
      fontSize: 45,
      marginBottom: 15,
    },

    errorTitle: {
      color: '#1E293B',
      fontSize: 16,
      fontWeight: '700',
      textAlign: 'center',
    },

    retryButton: {
      backgroundColor:
        '#7C3AED',
      paddingHorizontal: 22,
      paddingVertical: 12,
      borderRadius: 13,
      marginTop: 18,
    },

    retryText: {
      color: '#FFFFFF',
      fontWeight: '800',
    },

    // ========================================
    // EMPTY
    // ========================================

    emptyContainer: {
      flexGrow: 1,
      padding: 22,
      justifyContent:
        'center',
    },

    emptyCard: {
      backgroundColor:
        '#FFFFFF',
      borderRadius: 22,
      padding: 30,
      alignItems: 'center',
    },

    darkCard: {
      backgroundColor:
        '#1E293B',
    },

    emptyEmoji: {
      fontSize: 52,
      marginBottom: 15,
    },

    emptyTitle: {
      color: '#1E293B',
      fontSize: 20,
      fontWeight: '800',
    },

    emptyText: {
      color: '#64748B',
      fontSize: 13,
      lineHeight: 21,
      textAlign: 'center',
      marginTop: 8,
    },

    askButton: {
      backgroundColor:
        '#7C3AED',
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 13,
      marginTop: 20,
    },

    askButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '800',
    },

    // ========================================
    // LIST
    // ========================================

    list: {
      flex: 1,
    },

    listContainer: {
      paddingHorizontal: 22,
      paddingBottom: 35,
    },

    // ========================================
    // INFO
    // ========================================

    infoCard: {
      backgroundColor:
        '#EDE9FE',
      borderRadius: 16,
      padding: 14,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
    },

    darkInfoCard: {
      backgroundColor:
        '#312E81',
    },

    infoEmoji: {
      fontSize: 20,
      marginRight: 9,
    },

    infoText: {
      flex: 1,
      color: '#475569',
      fontSize: 12,
      lineHeight: 18,
    },

    // ========================================
    // CHAT CARD
    // ========================================

    chatCard: {
      backgroundColor:
        '#FFFFFF',
      borderRadius: 19,
      padding: 16,
      marginBottom: 12,
    },

    chatTop: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },

    questionIcon: {
      width: 43,
      height: 43,
      borderRadius: 13,
      backgroundColor:
        '#F5F3FF',
      alignItems: 'center',
      justifyContent:
        'center',
      marginRight: 11,
    },

    questionEmoji: {
      fontSize: 21,
    },

    chatMain: {
      flex: 1,
    },

    question: {
      color: '#1E293B',
      fontSize: 15,
      fontWeight: '800',
      lineHeight: 21,
    },

    date: {
      color: '#94A3B8',
      fontSize: 10,
      marginTop: 6,
    },

    arrow: {
      color: '#7C3AED',
      fontSize: 28,
      marginLeft: 7,
      marginTop: 2,
    },

    chatBottom: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 13,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor:
        '#E2E8F0',
    },

    answerPreview: {
      flex: 1,
      color: '#64748B',
      fontSize: 12,
      lineHeight: 18,
      paddingRight: 10,
    },

    deleteButton: {
      width: 38,
      height: 38,
      borderRadius: 11,
      backgroundColor:
        '#FEF2F2',
      alignItems: 'center',
      justifyContent:
        'center',
    },

    deleteText: {
      fontSize: 17,
    },

    // ========================================
    // ASK AGAIN
    // ========================================

    askAgainButton: {
      minHeight: 58,
      backgroundColor:
        '#FFFFFF',
      borderRadius: 17,
      paddingHorizontal: 17,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 3,
    },

    darkAskAgainButton: {
      backgroundColor:
        '#1E293B',
    },

    askAgainEmoji: {
      fontSize: 22,
      marginRight: 11,
    },

    askAgainText: {
      flex: 1,
      color: '#1E293B',
      fontSize: 14,
      fontWeight: '800',
    },

    askAgainArrow: {
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