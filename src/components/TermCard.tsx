import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    useLearningContext,
} from '../context/LearningContext';

export type Term = {
  name: string;
  explanation: string;
  example: string;
};

type Props = {
  term: Term;
  isLearned: boolean;
  isFavorite: boolean;
  onNext: () => void;
  onLearned: () => void;
  onFavorite: () => void;
};

export default function TermCard({
  term,
  isLearned,
  isFavorite,
  onNext,
  onLearned,
  onFavorite,
}: Props) {
  const { level } = useLearningContext();

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.level}>
          {level === 'Beginner'
            ? '🌱 مبتدئ'
            : '🚀 متوسط'}
        </Text>

        <Pressable
          style={[
            styles.favoriteButton,
            isFavorite &&
              styles.favoriteButtonActive,
          ]}
          onPress={onFavorite}
        >
          <Text style={styles.favoriteText}>
            {isFavorite
              ? '★ محفوظ'
              : '☆ حفظ'}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.label}>
        مصطلح تقني
      </Text>

      <Text style={styles.term}>
        {term.name}
      </Text>

      {isLearned && (
        <View style={styles.learnedBadge}>
          <Text style={styles.learnedBadgeText}>
            ✓ تم تعلمه
          </Text>
        </View>
      )}

      <Text style={styles.explanation}>
        {term.explanation}
      </Text>

      {level === 'Intermediate' && (
        <Text style={styles.extraInfo}>
          🔎 حاول ربط هذا المصطلح بمثال عملي
          من التطبيقات أو الأنظمة التي تستخدمها.
        </Text>
      )}

      <View style={styles.exampleBox}>
        <Text style={styles.exampleTitle}>
          💡 مثال
        </Text>

        <Text style={styles.example}>
          {term.example}
        </Text>
      </View>

      <View style={styles.buttons}>
        <Pressable
          style={styles.nextButton}
          onPress={onNext}
        >
          <Text style={styles.nextText}>
            مصطلح آخر 🔄
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.learnedButton,
            isLearned &&
              styles.alreadyLearnedButton,
          ]}
          onPress={onLearned}
        >
          <Text style={styles.learnedText}>
            {isLearned
              ? 'التالي ✓'
              : 'فهمته ✓'}
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
    backgroundColor: '#EDE9FE',
    borderRadius: 20,
    padding: 24,
    marginBottom: 18,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  level: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: 'bold',
  },

  favoriteButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  favoriteButtonActive: {
    backgroundColor: '#FEF3C7',
  },

  favoriteText: {
    color: '#7C3AED',
    fontWeight: 'bold',
  },

  label: {
    textAlign: 'center',
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 14,
  },

  term: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 8,
  },

  learnedBadge: {
    alignSelf: 'center',
    backgroundColor: '#DCFCE7',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 8,
  },

  learnedBadgeText: {
    color: '#15803D',
    fontSize: 12,
    fontWeight: 'bold',
  },

  explanation: {
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 27,
    color: '#334155',
    marginTop: 15,
  },

  extraInfo: {
    backgroundColor: '#DDD6FE',
    color: '#5B21B6',
    padding: 12,
    borderRadius: 12,
    textAlign: 'right',
    lineHeight: 21,
    marginTop: 15,
  },

  exampleBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 15,
    marginTop: 20,
  },

  exampleTitle: {
    fontWeight: 'bold',
    color: '#7C3AED',
    textAlign: 'right',
    marginBottom: 5,
  },

  example: {
    color: '#475569',
    textAlign: 'right',
    lineHeight: 21,
  },

  buttons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },

  nextButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#7C3AED',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  learnedButton: {
    flex: 1,
    backgroundColor: '#7C3AED',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  alreadyLearnedButton: {
    backgroundColor: '#16A34A',
  },

  nextText: {
    color: '#7C3AED',
    fontWeight: 'bold',
  },

  learnedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});