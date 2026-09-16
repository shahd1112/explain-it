import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    useLearningContext,
} from '@/context/LearningContext';

import type {
    LearningLevel,
} from '@/data/terms';

export default function LevelSelector() {
  const {
    level,
    setLevel,
  } = useLearningContext();

  function selectLevel(
    newLevel: LearningLevel
  ) {
    setLevel(newLevel);
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        🎯 Explanation Level
      </Text>

      <View style={styles.buttons}>
        <Pressable
          style={[
            styles.button,
            level === 'Beginner' &&
              styles.selected,
          ]}
          onPress={() =>
            selectLevel('Beginner')
          }
        >
          <Text
            style={[
              styles.buttonText,
              level === 'Beginner' &&
                styles.selectedText,
            ]}
          >
            🌱 Beginner
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            level === 'Intermediate' &&
              styles.selected,
          ]}
          onPress={() =>
            selectLevel('Intermediate')
          }
        >
          <Text
            style={[
              styles.buttonText,
              level === 'Intermediate' &&
                styles.selectedText,
            ]}
          >
            🚀 Intermediate
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            level === 'Advanced' &&
              styles.selected,
          ]}
          onPress={() =>
            selectLevel('Advanced')
          }
        >
          <Text
            style={[
              styles.buttonText,
              level === 'Advanced' &&
                styles.selectedText,
            ]}
          >
            🔥 Advanced
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 14,
  },

  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  button: {
    flexGrow: 1,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },

  selected: {
    backgroundColor: '#7C3AED',
  },

  buttonText: {
    color: '#475569',
    fontWeight: 'bold',
    fontSize: 12,
  },

  selectedText: {
    color: '#FFFFFF',
  },
});