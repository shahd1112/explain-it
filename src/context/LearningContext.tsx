import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

export type LearningLevel = 'Beginner' | 'Intermediate';

type LearningContextType = {
  level: LearningLevel;
  setLevel: (level: LearningLevel) => void;
};

const LearningContext =
  createContext<LearningContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function LearningProvider({ children }: Props) {
  const [level, setLevel] =
    useState<LearningLevel>('Beginner');

  return (
    <LearningContext.Provider
      value={{
        level,
        setLevel,
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export function useLearningContext() {
  const context = useContext(LearningContext);

  if (context === undefined) {
    throw new Error(
      'useLearningContext must be used inside LearningProvider'
    );
  }

  return context;
}