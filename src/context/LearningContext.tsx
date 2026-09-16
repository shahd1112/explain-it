import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import type {
  ReactNode,
} from 'react';

import type {
  LearningLevel,
} from '@/data/terms';

import {
  useAuth,
} from '@/context/AuthContext';

import {
  apiRequest,
} from '@/services/api';

// ==========================================
// API RESPONSE TYPES
// ==========================================

type FavoritesResponse = {
  success: boolean;
  favorites: string[];
};

type FavoriteActionResponse = {
  success: boolean;
  message: string;
  termId?: string;
};

type ProgressResponse = {
  success: boolean;
  level: LearningLevel;
  learnedTerms: string[];
};

type ProgressActionResponse = {
  success: boolean;
  message: string;
};

type LevelResponse = {
  success: boolean;
  message: string;
  level: LearningLevel;
};

type ResetProgressResponse = {
  success: boolean;
  message: string;
  level: LearningLevel;
  learnedTerms: string[];
};

type QuizStatsResponse = {
  success: boolean;
  quizzesCompleted: number;
  bestQuizScore: number;
};

type QuizResultResponse = {
  success: boolean;
  message: string;
  quizzesCompleted: number;
  bestQuizScore: number;
};

type ResetQuizResponse = {
  success: boolean;
  message: string;
  quizzesCompleted: number;
  bestQuizScore: number;
};

// ==========================================
// CONTEXT TYPE
// ==========================================

type LearningContextType = {
  level: LearningLevel;

  learnedTerms: string[];
  favoriteTerms: string[];

  quizzesCompleted: number;
  bestQuizScore: number;

  favoritesLoading: boolean;
  progressLoading: boolean;
  quizLoading: boolean;

  setLevel: (
    level: LearningLevel
  ) => void;

  markLearned: (
    termId: string
  ) => void;

  toggleFavorite: (
    termId: string
  ) => Promise<void>;

  isLearned: (
    termId: string
  ) => boolean;

  isFavorite: (
    termId: string
  ) => boolean;

  recordQuizResult: (
    score: number
  ) => void;

  resetLearning: () => void;
};

const LearningContext =
  createContext<
    LearningContextType | undefined
  >(undefined);

type Props = {
  children: ReactNode;
};

// ==========================================
// PROVIDER
// ==========================================

export function LearningProvider({
  children,
}: Props) {
  const {
    user,
    token,
  } = useAuth();

  const [
    level,
    setLevelState,
  ] =
    useState<LearningLevel>(
      'Beginner'
    );

  const [
    learnedTerms,
    setLearnedTerms,
  ] = useState<string[]>([]);

  const [
    favoriteTerms,
    setFavoriteTerms,
  ] = useState<string[]>([]);

  const [
    quizzesCompleted,
    setQuizzesCompleted,
  ] = useState(0);

  const [
    bestQuizScore,
    setBestQuizScore,
  ] = useState(0);

  const [
    favoritesLoading,
    setFavoritesLoading,
  ] = useState(false);

  const [
    progressLoading,
    setProgressLoading,
  ] = useState(false);

  const [
    quizLoading,
    setQuizLoading,
  ] = useState(false);

  // ========================================
  // LOAD FAVORITES FROM BACKEND
  // ========================================

  useEffect(() => {
    let active = true;

    async function loadFavorites() {
      if (!token || !user) {
        if (active) {
          setFavoriteTerms([]);
        }

        return;
      }

      try {
        setFavoritesLoading(true);

        const response =
          await apiRequest<FavoritesResponse>(
            '/favorites',
            {
              method: 'GET',
              token,
            }
          );

        if (active) {
          setFavoriteTerms(
            response.favorites
          );
        }
      } catch (error) {
        console.error(
          'Load favorites error:',
          error
        );

        if (active) {
          setFavoriteTerms([]);
        }
      } finally {
        if (active) {
          setFavoritesLoading(false);
        }
      }
    }

    void loadFavorites();

    return () => {
      active = false;
    };
  }, [token, user?.id]);

  // ========================================
  // LOAD LEARNING PROGRESS FROM BACKEND
  // ========================================

  useEffect(() => {
    let active = true;

    async function loadProgress() {
      if (!token || !user) {
        if (active) {
          setLevelState(
            'Beginner'
          );

          setLearnedTerms([]);
        }

        return;
      }

      try {
        setProgressLoading(true);

        const response =
          await apiRequest<ProgressResponse>(
            '/progress',
            {
              method: 'GET',
              token,
            }
          );

        if (active) {
          setLevelState(
            response.level
          );

          setLearnedTerms(
            response.learnedTerms
          );
        }
      } catch (error) {
        console.error(
          'Load learning progress error:',
          error
        );

        if (active) {
          setLevelState(
            'Beginner'
          );

          setLearnedTerms([]);
        }
      } finally {
        if (active) {
          setProgressLoading(false);
        }
      }
    }

    void loadProgress();

    return () => {
      active = false;
    };
  }, [token, user?.id]);

  // ========================================
  // LOAD QUIZ STATS FROM BACKEND
  // ========================================

  useEffect(() => {
    let active = true;

    async function loadQuizStats() {
      if (!token || !user) {
        if (active) {
          setQuizzesCompleted(0);
          setBestQuizScore(0);
        }

        return;
      }

      try {
        setQuizLoading(true);

        const response =
          await apiRequest<QuizStatsResponse>(
            '/quiz',
            {
              method: 'GET',
              token,
            }
          );

        if (active) {
          setQuizzesCompleted(
            response.quizzesCompleted
          );

          setBestQuizScore(
            response.bestQuizScore
          );
        }
      } catch (error) {
        console.error(
          'Load quiz stats error:',
          error
        );

        if (active) {
          setQuizzesCompleted(0);
          setBestQuizScore(0);
        }
      } finally {
        if (active) {
          setQuizLoading(false);
        }
      }
    }

    void loadQuizStats();

    return () => {
      active = false;
    };
  }, [token, user?.id]);

  // ========================================
  // UPDATE LEARNING LEVEL
  // ========================================

  function setLevel(
    newLevel: LearningLevel
  ) {
    void updateLevel(
      newLevel
    );
  }

  async function updateLevel(
    newLevel: LearningLevel
  ) {
    if (!token) {
      console.error(
        'Cannot update level without token.'
      );

      return;
    }

    try {
      const response =
        await apiRequest<LevelResponse>(
          '/progress/level',
          {
            method: 'PUT',
            token,
            body: {
              level: newLevel,
            },
          }
        );

      setLevelState(
        response.level
      );
    } catch (error) {
      console.error(
        'Update learning level error:',
        error
      );
    }
  }

  // ========================================
  // MARK TERM AS LEARNED
  // ========================================

  function markLearned(
    termId: string
  ) {
    void saveLearnedTerm(
      termId
    );
  }

  async function saveLearnedTerm(
    termId: string
  ) {
    if (!token) {
      console.error(
        'Cannot mark term as learned without token.'
      );

      return;
    }

    if (
      learnedTerms.includes(
        termId
      )
    ) {
      return;
    }

    try {
      await apiRequest<
        ProgressActionResponse
      >(
        `/progress/learned/${encodeURIComponent(
          termId
        )}`,
        {
          method: 'POST',
          token,
        }
      );

      setLearnedTerms(
        (current) => {
          if (
            current.includes(
              termId
            )
          ) {
            return current;
          }

          return [
            ...current,
            termId,
          ];
        }
      );
    } catch (error) {
      console.error(
        'Mark learned error:',
        error
      );
    }
  }

  // ========================================
  // TOGGLE FAVORITE
  // ========================================

  async function toggleFavorite(
    termId: string
  ): Promise<void> {
    if (!token) {
      console.error(
        'Cannot update favorite without token.'
      );

      return;
    }

    const alreadyFavorite =
      favoriteTerms.includes(
        termId
      );

    try {
      if (alreadyFavorite) {
        await apiRequest<
          FavoriteActionResponse
        >(
          `/favorites/${encodeURIComponent(
            termId
          )}`,
          {
            method: 'DELETE',
            token,
          }
        );

        setFavoriteTerms(
          (current) =>
            current.filter(
              (id) =>
                id !== termId
            )
        );
      } else {
        await apiRequest<
          FavoriteActionResponse
        >(
          `/favorites/${encodeURIComponent(
            termId
          )}`,
          {
            method: 'POST',
            token,
          }
        );

        setFavoriteTerms(
          (current) => {
            if (
              current.includes(
                termId
              )
            ) {
              return current;
            }

            return [
              ...current,
              termId,
            ];
          }
        );
      }
    } catch (error) {
      console.error(
        'Toggle favorite error:',
        error
      );
    }
  }

  // ========================================
  // CHECK LEARNED
  // ========================================

  function isLearned(
    termId: string
  ) {
    return learnedTerms.includes(
      termId
    );
  }

  // ========================================
  // CHECK FAVORITE
  // ========================================

  function isFavorite(
    termId: string
  ) {
    return favoriteTerms.includes(
      termId
    );
  }

  // ========================================
  // SAVE QUIZ RESULT
  // ========================================

  function recordQuizResult(
    score: number
  ) {
    void saveQuizResult(
      score
    );
  }

  async function saveQuizResult(
    score: number
  ) {
    if (!token) {
      console.error(
        'Cannot save quiz result without token.'
      );

      return;
    }

    try {
      setQuizLoading(true);

      const response =
        await apiRequest<QuizResultResponse>(
          '/quiz',
          {
            method: 'POST',
            token,
            body: {
              score,
            },
          }
        );

      setQuizzesCompleted(
        response.quizzesCompleted
      );

      setBestQuizScore(
        response.bestQuizScore
      );
    } catch (error) {
      console.error(
        'Save quiz result error:',
        error
      );
    } finally {
      setQuizLoading(false);
    }
  }

  // ========================================
  // RESET LEARNING
  // ========================================

  function resetLearning() {
    void resetAllLearning();
  }

  async function resetAllLearning() {
    if (!token) {
      console.error(
        'Cannot reset learning without token.'
      );

      return;
    }

    try {
      setProgressLoading(true);
      setQuizLoading(true);

      const progressResponse =
        await apiRequest<ResetProgressResponse>(
          '/progress/reset',
          {
            method: 'DELETE',
            token,
          }
        );

      const quizResponse =
        await apiRequest<ResetQuizResponse>(
          '/quiz/reset',
          {
            method: 'DELETE',
            token,
          }
        );

      setLearnedTerms(
        progressResponse.learnedTerms
      );

      setLevelState(
        progressResponse.level
      );

      setQuizzesCompleted(
        quizResponse.quizzesCompleted
      );

      setBestQuizScore(
        quizResponse.bestQuizScore
      );
    } catch (error) {
      console.error(
        'Reset learning error:',
        error
      );
    } finally {
      setProgressLoading(false);
      setQuizLoading(false);
    }
  }

  // ========================================
  // PROVIDER
  // ========================================

  return (
    <LearningContext.Provider
      value={{
        level,

        learnedTerms,
        favoriteTerms,

        quizzesCompleted,
        bestQuizScore,

        favoritesLoading,
        progressLoading,
        quizLoading,

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

// ==========================================
// CUSTOM HOOK
// ==========================================

export function useLearningContext() {
  const context =
    useContext(
      LearningContext
    );

  if (!context) {
    throw new Error(
      'useLearningContext must be used inside LearningProvider'
    );
  }

  return context;
}