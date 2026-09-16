import {
    createContext,
    useContext,
    useState,
} from 'react';

import type { LearningLevel } from '@/data/terms';
import type { ReactNode } from 'react';

type LearningContextType = {
  level: LearningLevel;
  learnedTerms: string[];
  favoriteTerms: string[];

  quizzesCompleted: number;
  bestQuizScore: number;

  setLevel: (level: LearningLevel) => void;
  markLearned: (termId: string) => void;
  toggleFavorite: (termId: string) => void;

  isLearned: (termId: string) => boolean;
  isFavorite: (termId: string) => boolean;

  recordQuizResult: (score: number) => void;

  resetLearning: () => void;
};

const LearningContext =
  createContext<LearningContextType | undefined>(
    undefined
  );

type Props = {
  children: ReactNode;
};

export function LearningProvider({
  children,
}: Props) {
  const [level, setLevel] =
    useState<LearningLevel>('Beginner');

  const [learnedTerms, setLearnedTerms] =
    useState<string[]>([]);

  const [favoriteTerms, setFavoriteTerms] =
    useState<string[]>([]);

  const [
    quizzesCompleted,
    setQuizzesCompleted,
  ] = useState(0);

  const [
    bestQuizScore,
    setBestQuizScore,
  ] = useState(0);

  function markLearned(termId: string) {
    setLearnedTerms((current) => {
      if (current.includes(termId)) {
        return current;
      }

      return [...current, termId];
    });
  }

  function toggleFavorite(termId: string) {
    setFavoriteTerms((current) => {
      if (current.includes(termId)) {
        return current.filter(
          (id) => id !== termId
        );
      }

      return [...current, termId];
    });
  }

  function isLearned(termId: string) {
    return learnedTerms.includes(termId);
  }

  function isFavorite(termId: string) {
    return favoriteTerms.includes(termId);
  }

  function recordQuizResult(score: number) {
    setQuizzesCompleted(
      (current) => current + 1
    );

    setBestQuizScore((current) =>
      Math.max(current, score)
    );
  }

  function resetLearning() {
    setLearnedTerms([]);
    setFavoriteTerms([]);
    setLevel('Beginner');
  }

  return (
    <LearningContext.Provider
      value={{
        level,
        learnedTerms,
        favoriteTerms,

        quizzesCompleted,
        bestQuizScore,

        setLevel,
        markLearned,
        toggleFavorite,

        isLearned,
        isFavorite,

        recordQuizResult,

        resetLearning,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearningContext() {
  const context =
    useContext(LearningContext);

  if (!context) {
    throw new Error(
      'useLearningContext must be used inside LearningProvider'
    );
  }

  return context;
}