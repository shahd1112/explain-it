import { useState } from 'react';

import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { router } from 'expo-router';

import {
    apiRequest,
} from '@/services/api';

type ForgotPasswordResponse = {
  success: boolean;
  message: string;
};

type Step =
  | 'email'
  | 'code'
  | 'password'
  | 'success';

export default function ForgotPasswordScreen() {
  const [step, setStep] =
    useState<Step>('email');

  const [email, setEmail] =
    useState('');

  const [code, setCode] =
    useState('');

  const [
    newPassword,
    setNewPassword,
  ] = useState('');

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('');

  const [error, setError] =
    useState('');

  const [success, setSuccess] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  // ========================================
  // SEND RESET CODE
  // ========================================

  async function handleSendCode() {
    setError('');
    setSuccess('');

    const cleanEmail =
      email.trim().toLowerCase();

    if (!cleanEmail) {
      setError(
        'Please enter your email address.'
      );
      return;
    }

    if (!cleanEmail.includes('@')) {
      setError(
        'Please enter a valid email address.'
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await apiRequest<ForgotPasswordResponse>(
          '/auth/forgot-password',
          {
            method: 'POST',
            body: {
              email: cleanEmail,
            },
          }
        );

      setSuccess(response.message);
      setStep('code');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to send reset code.'
      );
    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // VERIFY RESET CODE
  // ========================================

  async function handleVerifyCode() {
    setError('');
    setSuccess('');

    const cleanCode =
      code.trim();

    if (!cleanCode) {
      setError(
        'Please enter the reset code.'
      );
      return;
    }

    if (
      cleanCode.length !== 6 ||
      !/^\d{6}$/.test(cleanCode)
    ) {
      setError(
        'Reset code must contain 6 digits.'
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await apiRequest<ForgotPasswordResponse>(
          '/auth/verify-reset-code',
          {
            method: 'POST',
            body: {
              email:
                email
                  .trim()
                  .toLowerCase(),

              code: cleanCode,
            },
          }
        );

      setSuccess(response.message);
      setStep('password');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Invalid reset code.'
      );
    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // RESET PASSWORD
  // ========================================

  async function handleResetPassword() {
    setError('');
    setSuccess('');

    if (!newPassword.trim()) {
      setError(
        'Please enter your new password.'
      );
      return;
    }

    if (newPassword.length < 6) {
      setError(
        'Password must contain at least 6 characters.'
      );
      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      setError(
        'Passwords do not match.'
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await apiRequest<ForgotPasswordResponse>(
          '/auth/reset-password',
          {
            method: 'POST',
            body: {
              email:
                email
                  .trim()
                  .toLowerCase(),

              code: code.trim(),

              newPassword,
            },
          }
        );

      setSuccess(response.message);
      setStep('success');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Unable to reset password.'
      );
    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // SCREEN TEXT
  // ========================================

  function getTitle() {
    if (step === 'email') {
      return 'Forgot Password?';
    }

    if (step === 'code') {
      return 'Verify Code';
    }

    if (step === 'password') {
      return 'New Password';
    }

    return 'Password Changed!';
  }

  function getSubtitle() {
    if (step === 'email') {
      return (
        'No worries! Enter your email address ' +
        "and we'll send you a code to reset your password."
      );
    }

    if (step === 'code') {
      return (
        'Enter the 6-digit code sent to ' +
        email.trim()
      );
    }

    if (step === 'password') {
      return (
        'Create a new password for your Explain It account.'
      );
    }

    return (
      'Your password has been reset successfully. ' +
      'You can now sign in with your new password.'
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={
          styles.container
        }
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logo}>
              {step === 'success'
                ? '✅'
                : '🔐'}
            </Text>
          </View>

          <Text style={styles.appName}>
            Explain It
          </Text>

          <Text style={styles.tagline}>
            Learn • Understand • Grow
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>
            {getTitle()}
          </Text>

          <Text style={styles.subtitle}>
            {getSubtitle()}
          </Text>

          {/* EMAIL STEP */}

          {step === 'email' && (
            <>
              <Text style={styles.label}>
                Email
              </Text>

              <TextInput
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  setError('');
                  setSuccess('');
                }}
                style={styles.input}
                placeholder="example@email.com"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                onSubmitEditing={
                  handleSendCode
                }
              />
            </>
          )}

          {/* CODE STEP */}

          {step === 'code' && (
            <>
              <Text style={styles.label}>
                Reset Code
              </Text>

              <TextInput
                value={code}
                onChangeText={(value) => {
                  const numbersOnly =
                    value.replace(
                      /\D/g,
                      ''
                    );

                  setCode(
                    numbersOnly.slice(
                      0,
                      6
                    )
                  );

                  setError('');
                }}
                style={[
                  styles.input,
                  styles.codeInput,
                ]}
                placeholder="000000"
                placeholderTextColor="#94A3B8"
                keyboardType="number-pad"
                maxLength={6}
                editable={!loading}
                onSubmitEditing={
                  handleVerifyCode
                }
              />

              <Pressable
                disabled={loading}
                style={styles.resendButton}
                onPress={
                  handleSendCode
                }
              >
                <Text
                  style={
                    styles.resendText
                  }
                >
                  Send a new code
                </Text>
              </Pressable>
            </>
          )}

          {/* PASSWORD STEP */}

          {step === 'password' && (
            <>
              <Text style={styles.label}>
                New Password
              </Text>

              <TextInput
                value={newPassword}
                onChangeText={(value) => {
                  setNewPassword(value);
                  setError('');
                }}
                style={styles.input}
                placeholder="At least 6 characters"
                placeholderTextColor="#94A3B8"
                secureTextEntry
                editable={!loading}
              />

              <Text style={styles.label}>
                Confirm New Password
              </Text>

              <TextInput
                value={confirmPassword}
                onChangeText={(value) => {
                  setConfirmPassword(
                    value
                  );
                  setError('');
                }}
                style={styles.input}
                placeholder="Repeat new password"
                placeholderTextColor="#94A3B8"
                secureTextEntry
                editable={!loading}
                onSubmitEditing={
                  handleResetPassword
                }
              />
            </>
          )}

          {/* ERROR */}

          {error !== '' && (
            <View style={styles.errorBox}>
              <Text
                style={styles.errorText}
              >
                {error}
              </Text>
            </View>
          )}

          {/* SUCCESS MESSAGE */}

          {success !== '' &&
            step !== 'success' && (
              <View
                style={
                  styles.successBox
                }
              >
                <Text
                  style={
                    styles.successTitle
                  }
                >
                  ✓ Success
                </Text>

                <Text
                  style={
                    styles.successText
                  }
                >
                  {success}
                </Text>
              </View>
            )}

          {/* EMAIL BUTTON */}

          {step === 'email' && (
            <Pressable
              disabled={loading}
              style={({ pressed }) => [
                styles.sendButton,

                loading &&
                  styles.disabledButton,

                pressed &&
                  !loading &&
                  styles.buttonPressed,
              ]}
              onPress={handleSendCode}
            >
              <Text
                style={
                  styles.sendButtonText
                }
              >
                {loading
                  ? 'Sending...'
                  : 'Send Reset Code'}
              </Text>
            </Pressable>
          )}

          {/* VERIFY BUTTON */}

          {step === 'code' && (
            <Pressable
              disabled={loading}
              style={({ pressed }) => [
                styles.sendButton,

                loading &&
                  styles.disabledButton,

                pressed &&
                  !loading &&
                  styles.buttonPressed,
              ]}
              onPress={
                handleVerifyCode
              }
            >
              <Text
                style={
                  styles.sendButtonText
                }
              >
                {loading
                  ? 'Verifying...'
                  : 'Verify Code'}
              </Text>
            </Pressable>
          )}

          {/* RESET BUTTON */}

          {step === 'password' && (
            <Pressable
              disabled={loading}
              style={({ pressed }) => [
                styles.sendButton,

                loading &&
                  styles.disabledButton,

                pressed &&
                  !loading &&
                  styles.buttonPressed,
              ]}
              onPress={
                handleResetPassword
              }
            >
              <Text
                style={
                  styles.sendButtonText
                }
              >
                {loading
                  ? 'Changing Password...'
                  : 'Reset Password'}
              </Text>
            </Pressable>
          )}

          {/* SUCCESS */}

          {step === 'success' && (
            <>
              <View
                style={
                  styles.successBox
                }
              >
                <Text
                  style={
                    styles.successTitle
                  }
                >
                  ✓ Password reset
                </Text>

                <Text
                  style={
                    styles.successText
                  }
                >
                  {success ||
                    'Password reset successfully.'}
                </Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.sendButton,

                  pressed &&
                    styles.buttonPressed,
                ]}
                onPress={() =>
                  router.replace(
                    '/login'
                  )
                }
              >
                <Text
                  style={
                    styles.sendButtonText
                  }
                >
                  Sign In
                </Text>
              </Pressable>
            </>
          )}

          {/* BACK BUTTON */}

          {step !== 'success' && (
            <Pressable
              disabled={loading}
              style={({ pressed }) => [
                styles.backButton,

                pressed &&
                  !loading &&
                  styles.buttonPressed,
              ]}
              onPress={() => {
                if (
                  step === 'password'
                ) {
                  setStep('code');
                  setError('');
                  setSuccess('');
                  return;
                }

                if (step === 'code') {
                  setStep('email');
                  setCode('');
                  setError('');
                  setSuccess('');
                  return;
                }

                router.replace(
                  '/login'
                );
              }}
            >
              <Text
                style={
                  styles.backButtonText
                }
              >
                {step === 'email'
                  ? '← Back to Sign In'
                  : '← Back'}
              </Text>
            </Pressable>
          )}
        </View>

        <View style={styles.helpCard}>
          <Text style={styles.helpText}>
            {step === 'email'
              ? '💡 Make sure you enter the email associated with your account.'
              : step === 'code'
                ? '📧 Check your inbox for the latest 6-digit reset code.'
                : step === 'password'
                  ? '🔒 Choose a password with at least 6 characters.'
                  : '🎉 Your account is ready to use again.'}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F7FC',
  },

  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 45,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },

  logoCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    fontSize: 40,
  },

  appName: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 12,
  },

  tagline: {
    color: '#7C3AED',
    fontWeight: '600',
    marginTop: 5,
  },

  card: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 3,
  },

  title: {
    color: '#1E293B',
    fontSize: 25,
    fontWeight: '800',
  },

  subtitle: {
    color: '#64748B',
    marginTop: 7,
    marginBottom: 20,
    lineHeight: 21,
  },

  label: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 7,
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1E293B',
  },

  codeInput: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 8,
  },

  resendButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },

  resendText: {
    color: '#7C3AED',
    fontSize: 13,
    fontWeight: '700',
  },

  errorBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    padding: 11,
    marginTop: 14,
  },

  errorText: {
    color: '#DC2626',
    fontSize: 13,
  },

  successBox: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 12,
    padding: 13,
    marginTop: 14,
  },

  successTitle: {
    color: '#16A34A',
    fontWeight: '800',
    fontSize: 13,
  },

  successText: {
    color: '#15803D',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 3,
  },

  sendButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 22,
  },

  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  disabledButton: {
    opacity: 0.6,
  },

  backButton: {
    borderWidth: 1,
    borderColor: '#DDD6FE',
    backgroundColor: '#F5F3FF',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 11,
  },

  backButtonText: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '800',
  },

  buttonPressed: {
    opacity: 0.82,
  },

  helpCard: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    marginTop: 22,
  },

  helpText: {
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 13,
  },
});