import {
    useState,
} from 'react';

import {
    questions,
} from '@/data/questions';

import type {
    Question,
} from '@/data/questions';

import type {
    Category,
    LearningLevel,
} from '@/data/terms';

export type QuizAnswer = {
  question: Question;
  selectedAnswer: string;
  isCorrect: boolean;
};

function shuffleQuestions(
  items: Question[]
) {
  return [...items].sort(
    () => Math.random() - 0.5
  );
}

export function useQuiz() {
  const [category, setCategory] =
    useState<Category>('Programming');

  const [level, setLevel] =
    useState<LearningLevel>('Beginner');

  const [quizQuestions, setQuizQuestions] =
    useState<Question[]>([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState<QuizAnswer[]>([]);

  const [selectedAnswer, setSelectedAnswer] =
    useState<string | null>(null);

  const [started, setStarted] =
    useState(false);

  const [finished, setFinished] =
    useState(false);

  const currentQuestion =
    quizQuestions[currentIndex];

  const correctCount =
    answers.filter(
      (answer) => answer.isCorrect
    ).length;

  const wrongCount =
    answers.filter(
      (answer) => !answer.isCorrect
    ).length;

  function startQuiz() {
    const availableQuestions =
      questions.filter(
        (question) =>
          question.category === category &&
          question.level === level
      );

    const shuffled =
      shuffleQuestions(
        availableQuestions
      );

    setQuizQuestions(shuffled);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setStarted(true);
    setFinished(false);
  }

  function answerQuestion(
    answer: string
  ) {
    if (
      !currentQuestion ||
      selectedAnswer !== null
    ) {
      return;
    }

    setSelectedAnswer(answer);

    const isCorrect =
      answer ===
      currentQuestion.correctAnswer;

    setAnswers((current) => [
      ...current,
      {
        question: currentQuestion,
        selectedAnswer: answer,
        isCorrect,
      },
    ]);
  }

  function nextQuestion() {
    if (selectedAnswer === null) {
      return;
    }

    const isLast =
      currentIndex ===
      quizQuestions.length - 1;

    if (isLast) {
      setFinished(true);
      return;
    }

    setCurrentIndex(
      (current) => current + 1
    );

    setSelectedAnswer(null);
  }

  function resetQuiz() {
    setQuizQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setStarted(false);
    setFinished(false);
  }

  function tryAgain() {
    startQuiz();
  }

  return {
    category,
    level,
    quizQuestions,
    currentQuestion,
    currentIndex,
    answers,
    selectedAnswer,
    started,
    finished,
    correctCount,
    wrongCount,

    setCategory,
    setLevel,
    startQuiz,
    answerQuestion,
    nextQuestion,
    resetQuiz,
    tryAgain,
  };
}