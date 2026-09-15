import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import {
  LearningLevel,
  useLearningContext,
} from '../context/LearningContext';

export default function LevelSelector() {
  const { level, setLevel } = useLearningContext();

  function selectLevel(newLevel: LearningLevel) {
    setLevel(newLevel);
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        🎯 مستوى الشرح
      </Text>

      <View style={styles.buttons}>
        <Pressable
          style={[
            styles.button,
            level === 'Beginner' && styles.selected,
          ]}
          onPress={() => selectLevel('Beginner')}
        >
          <Text
            style={[
              styles.buttonText,
              level === 'Beginner' &&
                styles.selectedText,
            ]}
          >
            🌱 مبتدئ
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
            🚀 متوسط
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#1E293B',
    marginBottom: 14,
  },

  buttons: {
    flexDirection: 'row',
    gap: 10,
  },

  button: {
    flex: 1,
    backgroundColor: '#F1F5F9',
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
  },

  selectedText: {
    color: '#FFFFFF',
  },
});