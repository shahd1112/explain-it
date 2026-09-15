import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CategorySelector from '../components/CategorySelector';
import LevelSelector from '../components/LevelSelector';
import QuizCard from '../components/QuizCard';
import TermCard from '../components/TermCard';

import { useLearning } from '../hooks/useLearning';

import {
  LearningProvider,
} from '../context/LearningContext';

function LearningScreen() {
  const {
    category,
    currentTerm,

    learnedCount,
    favoriteCount,
    totalTerms,

    isLearned,
    isFavorite,

    selectCategory,
    nextTerm,
    learnedTerm,
    toggleFavorite,
    resetLearning,
  } = useLearning();

  const progress =
    totalTerms === 0
      ? 0
      : Math.round(
          (learnedCount / totalTerms) * 100
        );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          🧠
        </Text>

        <Text style={styles.title}>
          Explain It
        </Text>

        <Text style={styles.subtitle}>
          افهم المصطلحات التقنية بطريقة أبسط
        </Text>
      </View>

      {/* Level */}
      <LevelSelector />

      {/* Categories */}
      <CategorySelector
        selectedCategory={category}
        onSelectCategory={selectCategory}
      />

      {/* Current Term */}
      <TermCard
        term={currentTerm}
        isLearned={isLearned}
        isFavorite={isFavorite}
        onNext={nextTerm}
        onLearned={learnedTerm}
        onFavorite={toggleFavorite}
      />

      {/* Progress */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>
          📊 تقدمك
        </Text>

        <Text style={styles.counter}>
          {learnedCount} / {totalTerms}
        </Text>

        <Text style={styles.counterLabel}>
          مصطلح تم تعلمه
        </Text>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
              },
            ]}
          />
        </View>

        <Text style={styles.percentage}>
          {progress}%
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              {learnedCount}
            </Text>

            <Text style={styles.statLabel}>
              ✓ تعلمت
            </Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statNumber}>
              {favoriteCount}
            </Text>

            <Text style={styles.statLabel}>
              ⭐ محفوظ
            </Text>
          </View>
        </View>
      </View>

      {/* Quiz */}
      <QuizCard />

      {/* Reset Learning */}
      <Pressable
        style={styles.resetButton}
        onPress={resetLearning}
      >
        <Text style={styles.resetText}>
          ↻ إعادة التعيين
        </Text>
      </Pressable>
    </ScrollView>
  );
}

export default function HomeScreen() {
  return (
    <LearningProvider>
      <LearningScreen />
    </LearningProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F6F7FB',
    paddingHorizontal: 22,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },

  header: {
    alignItems: 'center',
    marginBottom: 25,
  },

  logo: {
    fontSize: 45,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 5,
  },

  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 6,
    textAlign: 'center',
  },

  progressCard: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },

  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
  },

  counter: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7C3AED',
    marginTop: 10,
  },

  counterLabel: {
    color: '#64748B',
    marginTop: 2,
  },

  progressBackground: {
    width: '100%',
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 18,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#7C3AED',
    borderRadius: 20,
  },

  percentage: {
    color: '#7C3AED',
    fontWeight: 'bold',
    marginTop: 7,
  },

  statsRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },

  stat: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  statLabel: {
    color: '#64748B',
    marginTop: 3,
  },

  resetButton: {
    marginTop: 18,
    backgroundColor: '#1E293B',
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 12,
  },

  resetText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});