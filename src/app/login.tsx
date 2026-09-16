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

import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    const success = login(email, password);

    if (success) {
      router.replace('/home');
    } else {
      setError('Unable to sign in.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logo}>🧠</Text>
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
            Welcome Back 👋
          </Text>

          <Text style={styles.subtitle}>
            Sign in to continue your learning journey.
          </Text>

          <Text style={styles.label}>
            Email
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="example@email.com"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
          />

          {error !== '' && (
            <View style={styles.errorBox}>
              <Text style={styles.error}>
                {error}
              </Text>
            </View>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>
              Sign In
            </Text>
          </Pressable>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>
              Don't have an account?
            </Text>

            <Pressable
              onPress={() => router.push('/signup')}
            >
              <Text style={styles.signupLink}>
                Create Account
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.quoteCard}>
          <Text style={styles.quote}>
            ✨ Every expert was once a beginner.
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
    fontSize: 43,
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
    fontSize: 25,
    fontWeight: '800',
    color: '#1E293B',
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

  error: {
    color: '#DC2626',
    fontSize: 13,
  },

  loginButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 22,
  },

  buttonPressed: {
    opacity: 0.85,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 21,
    gap: 5,
  },

  signupText: {
    color: '#64748B',
  },

  signupLink: {
    color: '#7C3AED',
    fontWeight: '800',
  },

  quoteCard: {
    marginTop: 25,
    alignItems: 'center',
  },

  quote: {
    color: '#64748B',
    textAlign: 'center',
  },
});