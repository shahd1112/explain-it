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

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleSendCode() {
    setError('');
    setSuccess('');

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setError('Please enter your email address.');
      return;
    }

    if (!cleanEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Backend will send the real reset code later.
    setSuccess(
      'A password reset code will be sent to your email.'
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
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logo}>🔐</Text>
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
            Forgot Password?
          </Text>

          <Text style={styles.subtitle}>
            No worries! Enter your email address
            and we'll send you a code to reset your
            password.
          </Text>

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
          />

          {error !== '' && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>
                {error}
              </Text>
            </View>
          )}

          {success !== '' && (
            <View style={styles.successBox}>
              <Text style={styles.successTitle}>
                ✓ Request received
              </Text>

              <Text style={styles.successText}>
                {success}
              </Text>
            </View>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.sendButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleSendCode}
          >
            <Text style={styles.sendButtonText}>
              Send Reset Code
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() =>
              router.replace('/login')
            }
          >
            <Text style={styles.backButtonText}>
              ← Back to Sign In
            </Text>
          </Pressable>
        </View>

        <View style={styles.helpCard}>
          <Text style={styles.helpText}>
            💡 Make sure you enter the email
            associated with your account.
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