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

export default function SignUpScreen() {
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] =
    useState('');
  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('');

  const [error, setError] = useState('');

  function handleSignup() {
    setError('');

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError(
        'Please complete all fields.'
      );
      return;
    }

    if (!email.includes('@')) {
      setError(
        'Please enter a valid email address.'
      );
      return;
    }

    if (password.length < 6) {
      setError(
        'Password must contain at least 6 characters.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        'Passwords do not match.'
      );
      return;
    }

    const success = signup(
      name,
      email,
      password
    );

    if (success) {
      router.replace('/home');
    }
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
        <Pressable
          style={styles.backButton}
          onPress={() =>
            router.replace('/login')
          }
        >
          <Text style={styles.backText}>
            ← Back to Sign In
          </Text>
        </Pressable>

        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Text style={styles.logo}>
              🧠
            </Text>
          </View>

          <Text style={styles.title}>
            Create Account
          </Text>

          <Text style={styles.subtitle}>
            Join Explain It and start
            learning technical concepts.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Your name"
            placeholderTextColor="#94A3B8"
          />

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
            placeholder="At least 6 characters"
            placeholderTextColor="#94A3B8"
            secureTextEntry
          />

          <Text style={styles.label}>
            Confirm Password
          </Text>

          <TextInput
            value={confirmPassword}
            onChangeText={
              setConfirmPassword
            }
            style={styles.input}
            placeholder="Repeat password"
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
              styles.button,
              pressed &&
                styles.buttonPressed,
            ]}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>
              Create Account
            </Text>
          </Pressable>

          <View style={styles.loginRow}>
            <Text style={styles.smallText}>
              Already have an account?
            </Text>

            <Pressable
              onPress={() =>
                router.replace('/login')
              }
            >
              <Text style={styles.link}>
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.motivation}>
          🚀 Your learning journey starts
          here.
        </Text>
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
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 40,
  },

  backButton: {
    alignSelf: 'flex-start',
  },

  backText: {
    color: '#7C3AED',
    fontWeight: '700',
  },

  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 25,
  },

  logoCircle: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    fontSize: 39,
  },

  title: {
    fontSize: 29,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 11,
  },

  subtitle: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 7,
    lineHeight: 21,
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

  label: {
    color: '#334155',
    fontWeight: '700',
    marginTop: 13,
    marginBottom: 7,
  },

  input: {
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

  button: {
    backgroundColor: '#7C3AED',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 23,
  },

  buttonPressed: {
    opacity: 0.85,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 20,
  },

  smallText: {
    color: '#64748B',
  },

  link: {
    color: '#7C3AED',
    fontWeight: '800',
  },

  motivation: {
    color: '#64748B',
    textAlign: 'center',
    marginTop: 25,
  },
});