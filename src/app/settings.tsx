import {
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

import {
  useAuth,
} from '@/context/AuthContext';

import {
  useSettings,
} from '@/context/SettingsContext';

export default function SettingsScreen() {
  const {
    user,
    updateName,
    logout,
  } = useAuth();

  const {
    theme,
    language,
    setTheme,
    setLanguage,
  } = useSettings();

  const [name, setName] =
    useState(user?.name || '');

  const [message, setMessage] =
    useState('');

  const [messageType, setMessageType] =
    useState<'success' | 'error'>(
      'success'
    );

  const [savingName, setSavingName] =
    useState(false);

  const isDark =
    theme === 'dark';

  // ========================================
  // SAVE NAME
  // ========================================

  async function saveName() {
    const cleanName =
      name.trim();

    setMessage('');

    if (!cleanName) {
      setMessageType('error');

      setMessage(
        language === 'ar'
          ? 'الاسم لا يمكن أن يكون فارغًا.'
          : 'Name cannot be empty.'
      );

      return;
    }

    if (cleanName.length < 2) {
      setMessageType('error');

      setMessage(
        language === 'ar'
          ? 'يجب أن يتكون الاسم من حرفين على الأقل.'
          : 'Name must be at least 2 characters.'
      );

      return;
    }

    try {
      setSavingName(true);

      const success =
        await updateName(cleanName);

      if (success) {
        setName(cleanName);

        setMessageType('success');

        setMessage(
          language === 'ar'
            ? 'تم تحديث الاسم بنجاح ✓'
            : 'Name updated successfully ✓'
        );
      } else {
        setMessageType('error');

        setMessage(
          language === 'ar'
            ? 'تعذر تحديث الاسم. حاولي مرة أخرى.'
            : 'Could not update name. Please try again.'
        );
      }
    } catch (error) {
      console.error(
        'Save name error:',
        error
      );

      setMessageType('error');

      setMessage(
        language === 'ar'
          ? 'حدث خطأ أثناء تحديث الاسم.'
          : 'An error occurred while updating the name.'
      );
    } finally {
      setSavingName(false);
    }
  }

  // ========================================
  // LOGOUT
  // ========================================

  function handleLogout() {
    logout();

    router.replace('/login');
  }

  return (
    <View
      style={[
        styles.screen,
        isDark &&
          styles.darkScreen,
      ]}
    >
      <ScrollView
        contentContainerStyle={
          styles.container
        }
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Pressable
            style={[
              styles.backButton,
              isDark &&
                styles.darkCard,
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

          <Text
            style={[
              styles.title,
              isDark &&
                styles.darkText,
            ]}
          >
            {language === 'ar'
              ? 'الإعدادات ⚙️'
              : 'Settings ⚙️'}
          </Text>
        </View>

        {/* APPEARANCE */}

        <Text
          style={[
            styles.sectionTitle,
            isDark &&
              styles.darkText,
          ]}
        >
          {language === 'ar'
            ? 'المظهر'
            : 'Appearance'}
        </Text>

        <View
          style={[
            styles.card,
            isDark &&
              styles.darkCard,
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              isDark &&
                styles.darkText,
            ]}
          >
            {language === 'ar'
              ? '🎨 وضع التطبيق'
              : '🎨 App Theme'}
          </Text>

          <Text
            style={[
              styles.description,
              isDark &&
                styles.darkSecondaryText,
            ]}
          >
            {language === 'ar'
              ? 'اختاري المظهر الذي تفضلينه.'
              : 'Choose your preferred appearance.'}
          </Text>

          <View style={styles.options}>
            <Pressable
              style={[
                styles.option,
                isDark &&
                  styles.darkOption,
                theme === 'light' &&
                  styles.selectedOption,
              ]}
              onPress={() =>
                setTheme('light')
              }
            >
              <Text
                style={[
                  styles.optionText,
                  isDark &&
                    styles.darkText,
                  theme === 'light' &&
                    styles.selectedText,
                ]}
              >
                ☀️ Light
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.option,
                isDark &&
                  styles.darkOption,
                theme === 'dark' &&
                  styles.selectedOption,
              ]}
              onPress={() =>
                setTheme('dark')
              }
            >
              <Text
                style={[
                  styles.optionText,
                  isDark &&
                    styles.darkText,
                  theme === 'dark' &&
                    styles.selectedText,
                ]}
              >
                🌙 Dark
              </Text>
            </Pressable>
          </View>
        </View>

        {/* LANGUAGE */}

        <Text
          style={[
            styles.sectionTitle,
            isDark &&
              styles.darkText,
          ]}
        >
          {language === 'ar'
            ? 'اللغة'
            : 'Language'}
        </Text>

        <View
          style={[
            styles.card,
            isDark &&
              styles.darkCard,
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              isDark &&
                styles.darkText,
            ]}
          >
            🌐{' '}
            {language === 'ar'
              ? 'لغة التطبيق'
              : 'App Language'}
          </Text>

          <Text
            style={[
              styles.description,
              isDark &&
                styles.darkSecondaryText,
            ]}
          >
            {language === 'ar'
              ? 'اختاري لغة واجهة التطبيق.'
              : 'Choose the app interface language.'}
          </Text>

          <View style={styles.options}>
            <Pressable
              style={[
                styles.option,
                isDark &&
                  styles.darkOption,
                language === 'en' &&
                  styles.selectedOption,
              ]}
              onPress={() =>
                setLanguage('en')
              }
            >
              <Text
                style={[
                  styles.optionText,
                  isDark &&
                    styles.darkText,
                  language === 'en' &&
                    styles.selectedText,
                ]}
              >
                🇬🇧 English
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.option,
                isDark &&
                  styles.darkOption,
                language === 'ar' &&
                  styles.selectedOption,
              ]}
              onPress={() =>
                setLanguage('ar')
              }
            >
              <Text
                style={[
                  styles.optionText,
                  isDark &&
                    styles.darkText,
                  language === 'ar' &&
                    styles.selectedText,
                ]}
              >
                🇵🇸 العربية
              </Text>
            </Pressable>
          </View>
        </View>

        {/* PROFILE */}

        <Text
          style={[
            styles.sectionTitle,
            isDark &&
              styles.darkText,
          ]}
        >
          {language === 'ar'
            ? 'الملف الشخصي'
            : 'Profile'}
        </Text>

        <View
          style={[
            styles.card,
            isDark &&
              styles.darkCard,
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              isDark &&
                styles.darkText,
            ]}
          >
            👤{' '}
            {language === 'ar'
              ? 'تعديل الاسم'
              : 'Edit Display Name'}
          </Text>

          <Text
            style={[
              styles.description,
              isDark &&
                styles.darkSecondaryText,
            ]}
          >
            {language === 'ar'
              ? 'سيظهر هذا الاسم في الصفحة الرئيسية والملف الشخصي.'
              : 'This name will appear on Home and Profile.'}
          </Text>

          <TextInput
            style={[
              styles.input,
              isDark &&
                styles.darkInput,
              isDark &&
                styles.darkText,
            ]}
            value={name}
            onChangeText={(value) => {
              setName(value);
              setMessage('');
            }}
            placeholder={
              language === 'ar'
                ? 'اكتبي اسمك'
                : 'Enter your name'
            }
            placeholderTextColor="#94A3B8"
            editable={!savingName}
          />

          {message !== '' && (
            <Text
              style={[
                styles.message,

                messageType ===
                  'success'
                  ? styles.successMessage
                  : styles.errorMessage,
              ]}
            >
              {message}
            </Text>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.saveButton,

              savingName &&
                styles.disabledButton,

              pressed &&
                !savingName &&
                styles.buttonPressed,
            ]}
            onPress={saveName}
            disabled={savingName}
          >
            <Text
              style={
                styles.saveButtonText
              }
            >
              {savingName
                ? language === 'ar'
                  ? 'جارٍ الحفظ...'
                  : 'Saving...'
                : language === 'ar'
                  ? 'حفظ الاسم'
                  : 'Save Name'}
            </Text>
          </Pressable>
        </View>

        {/* ACCOUNT */}

        <Text
          style={[
            styles.sectionTitle,
            isDark &&
              styles.darkText,
          ]}
        >
          {language === 'ar'
            ? 'الحساب'
            : 'Account'}
        </Text>

        <View
          style={[
            styles.card,
            isDark &&
              styles.darkCard,
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              isDark &&
                styles.darkText,
            ]}
          >
            🚪{' '}
            {language === 'ar'
              ? 'تسجيل الخروج'
              : 'Log Out'}
          </Text>

          <Text
            style={[
              styles.description,
              isDark &&
                styles.darkSecondaryText,
            ]}
          >
            {language === 'ar'
              ? 'سيتم تسجيل خروجك من حساب Explain It الحالي.'
              : 'Sign out of your current Explain It account.'}
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.logoutButton,

              pressed &&
                styles.buttonPressed,
            ]}
            onPress={handleLogout}
          >
            <Text
              style={
                styles.logoutButtonText
              }
            >
              {language === 'ar'
                ? 'تسجيل الخروج'
                : 'Log Out'}
            </Text>
          </Pressable>
        </View>

        {/* INFO */}

        <View
          style={[
            styles.infoCard,
            isDark &&
              styles.darkInfoCard,
          ]}
        >
          <Text
            style={[
              styles.infoTitle,
              isDark &&
                styles.darkText,
            ]}
          >
            {language === 'ar'
              ? '✨ إعدادات Explain It'
              : '✨ Explain It Settings'}
          </Text>

          <Text
            style={[
              styles.infoText,
              isDark &&
                styles.darkSecondaryText,
            ]}
          >
            {language === 'ar'
              ? 'يمكنك تخصيص المظهر واللغة والاسم وإدارة حسابك من هذه الصفحة.'
              : 'Customize your theme, language, display name, and account from this page.'}
          </Text>
        </View>
      </ScrollView>
    </View>
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
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  backText: {
    color: '#1E293B',
    fontSize: 30,
    lineHeight: 32,
  },

  title: {
    color: '#1E293B',
    fontSize: 28,
    fontWeight: '800',
  },

  sectionTitle: {
    color: '#1E293B',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 25,
    marginBottom: 11,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 19,
  },

  cardTitle: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '800',
  },

  description: {
    color: '#64748B',
    marginTop: 6,
    marginBottom: 15,
    lineHeight: 20,
  },

  options: {
    flexDirection: 'row',
    gap: 10,
  },

  option: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 13,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  darkOption: {
    backgroundColor: '#334155',
    borderColor: '#475569',
  },

  selectedOption: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },

  optionText: {
    color: '#475569',
    fontWeight: '700',
  },

  selectedText: {
    color: '#FFFFFF',
  },

  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 13,
    paddingHorizontal: 15,
    paddingVertical: 13,
    color: '#1E293B',
    fontSize: 15,
  },

  darkInput: {
    backgroundColor: '#334155',
    borderColor: '#475569',
  },

  saveButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 13,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonPressed: {
    opacity: 0.82,
  },

  message: {
    fontWeight: '700',
    marginTop: 10,
  },

  successMessage: {
    color: '#16A34A',
  },

  errorMessage: {
    color: '#DC2626',
  },

  logoutButton: {
    backgroundColor: '#DC2626',
    borderRadius: 13,
    paddingVertical: 14,
    alignItems: 'center',
  },

  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },

  infoCard: {
    backgroundColor: '#EDE9FE',
    borderRadius: 18,
    padding: 18,
    marginTop: 25,
  },

  darkInfoCard: {
    backgroundColor: '#1E293B',
  },

  infoTitle: {
    color: '#1E293B',
    fontWeight: '800',
    fontSize: 16,
  },

  infoText: {
    color: '#475569',
    lineHeight: 20,
    marginTop: 6,
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