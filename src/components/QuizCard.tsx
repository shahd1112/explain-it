import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { useState } from 'react';

type Question = {
  question: string;
  answers: string[];
  correctAnswer: string;
};

type WrongAnswer = {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
};

const questions: Question[] = [
  {
    question:
      'Which concept stores changing data inside a React component?',
    answers: [
      'Props',
      'State',
      'Component',
      'JSX',
    ],
    correctAnswer: 'State',
  },

  {
    question:
      'Which system converts domain names into IP addresses?',
    answers: [
      'DHCP',
      'DNS',
      'VPN',
      'Firewall',
    ],
    correctAnswer: 'DNS',
  },

  {
    question:
      'Which device connects different networks?',
    answers: [
      'Router',
      'Keyboard',
      'Monitor',
      'Database',
    ],
    correctAnswer: 'Router',
  },

  {
    question:
      'What protects data by converting it into an unreadable form?',
    answers: [
      'Authentication',
      'Prediction',
      'Encryption',
      'Component',
    ],
    correctAnswer: 'Encryption',
  },

  {
    question:
      'Which process verifies the identity of a user?',
    answers: [
      'Authentication',
      'Routing',
      'Prediction',
      'Rendering',
    ],
    correctAnswer: 'Authentication',
  },

  {
    question:
      'What is a collection of data used to train an AI model?',
    answers: [
      'Firewall',
      'Dataset',
      'Router',
      'Hook',
    ],
    correctAnswer: 'Dataset',
  },
];

const motivationMessages = [
  'Excellent! Keep going 🚀',
  'Great job! You got it 🎉',
  'Amazing! Keep learning 🌟',
  'Perfect answer! 💜',
  'Well done! Keep it up 🔥',
];

export default function QuizCard() {
  const [questionIndex, setQuestionIndex] =
    useState(0);

  const [correctCount, setCorrectCount] =
    useState(0);

  const [wrongCount, setWrongCount] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState<string | null>(null);

  const [isCorrect, setIsCorrect] =
    useState<boolean | null>(null);

  const [message, setMessage] =
    useState('');

  const [answered, setAnswered] =
    useState(false);

  const [quizFinished, setQuizFinished] =
    useState(false);

  const [wrongAnswers, setWrongAnswers] =
    useState<WrongAnswer[]>([]);

  const question =
    questions[questionIndex];

  function chooseAnswer(answer: string) {
    if (answered) {
      return;
    }

    setSelectedAnswer(answer);
    setAnswered(true);

    if (answer === question.correctAnswer) {
      setIsCorrect(true);

      setCorrectCount((current) =>
        current + 1
      );

      const randomMessage =
        motivationMessages[
          Math.floor(
            Math.random() *
              motivationMessages.length
          )
        ];

      setMessage(randomMessage);
    } else {
      setIsCorrect(false);

      setWrongCount((current) =>
        current + 1
      );

      setWrongAnswers((current) => [
        ...current,
        {
          question: question.question,
          selectedAnswer: answer,
          correctAnswer:
            question.correctAnswer,
        },
      ]);

      setMessage(
        `Incorrect. The correct answer is: ${question.correctAnswer}`
      );
    }
  }

  function nextQuestion() {
    const isLastQuestion =
      questionIndex ===
      questions.length - 1;

    if (isLastQuestion) {
      setQuizFinished(true);
      return;
    }

    setQuestionIndex((current) =>
      current + 1
    );

    setSelectedAnswer(null);
    setIsCorrect(null);
    setMessage('');
    setAnswered(false);
  }

  function restartQuiz() {
    setQuestionIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setMessage('');
    setAnswered(false);
    setQuizFinished(false);
    setWrongAnswers([]);
  }

  const percentage =
    Math.round(
      (correctCount / questions.length) *
        100
    );

  // =========================
  // Quiz Result
  // =========================

  if (quizFinished) {
    return (
      <View style={styles.card}>
        <Text style={styles.resultEmoji}>
          {percentage >= 80
            ? '🏆'
            : percentage >= 50
              ? '👏'
              : '💪'}
        </Text>

        <Text style={styles.resultTitle}>
          Quiz Completed!
        </Text>

        <Text style={styles.finalMessage}>
          {percentage === 100
            ? 'Perfect! You mastered all the terms! 🌟'
            : percentage >= 80
              ? 'Excellent work! Keep going 🚀'
              : percentage >= 50
                ? 'Good job! Keep practicing 💜'
                : 'Keep learning! You can do it 💪'}
        </Text>

        <View style={styles.finalScore}>
          <Text style={styles.percentage}>
            {percentage}%
          </Text>

          <Text style={styles.scoreText}>
            {correctCount} / {questions.length}
          </Text>
        </View>

        <View style={styles.resultStats}>
          <View style={styles.correctStat}>
            <Text style={styles.statNumber}>
              {correctCount}
            </Text>

            <Text style={styles.correctLabel}>
              ✓ Correct
            </Text>
          </View>

          <View style={styles.wrongStat}>
            <Text style={styles.statNumber}>
              {wrongCount}
            </Text>

            <Text style={styles.wrongLabel}>
              ✕ Wrong
            </Text>
          </View>
        </View>

        {wrongAnswers.length > 0 && (
          <View style={styles.reviewSection}>
            <Text style={styles.reviewTitle}>
              📚 Review Your Mistakes
            </Text>

            {wrongAnswers.map(
              (item, index) => (
                <View
                  key={`${item.question}-${index}`}
                  style={styles.reviewItem}
                >
                  <Text
                    style={
                      styles.reviewQuestion
                    }
                  >
                    {index + 1}.{' '}
                    {item.question}
                  </Text>

                  <Text
                    style={styles.yourAnswer}
                  >
                    Your answer:{' '}
                    {item.selectedAnswer} ✕
                  </Text>

                  <Text
                    style={
                      styles.correctReview
                    }
                  >
                    Correct answer:{' '}
                    {item.correctAnswer} ✓
                  </Text>
                </View>
              )
            )}
          </View>
        )}

        {wrongAnswers.length === 0 && (
          <View style={styles.perfectBox}>
            <Text style={styles.perfectText}>
              🎉 No mistakes! Amazing work!
            </Text>
          </View>
        )}

        <Pressable
          style={styles.restartButton}
          onPress={restartQuiz}
        >
          <Text style={styles.restartText}>
            🔄 Try Again
          </Text>
        </Pressable>
      </View>
    );
  }

  // =========================
  // Quiz Questions
  // =========================

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.quizLabel}>
            🧠 MINI QUIZ
          </Text>

          <Text style={styles.questionNumber}>
            Question {questionIndex + 1}
            {' / '}
            {questions.length}
          </Text>
        </View>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreNumber}>
            {correctCount}
          </Text>

          <Text style={styles.scoreLabel}>
            Score
          </Text>
        </View>
      </View>

      {/* Correct / Wrong counter */}
      <View style={styles.liveStats}>
        <View style={styles.liveStat}>
          <Text style={styles.liveCorrect}>
            ✓ {correctCount}
          </Text>

          <Text style={styles.liveLabel}>
            Correct
          </Text>
        </View>

        <View style={styles.liveStat}>
          <Text style={styles.liveWrong}>
            ✕ {wrongCount}
          </Text>

          <Text style={styles.liveLabel}>
            Wrong
          </Text>
        </View>
      </View>

      <View style={styles.questionProgress}>
        <View
          style={[
            styles.questionProgressFill,
            {
              width: `${
                ((questionIndex + 1) /
                  questions.length) *
                100
              }%`,
            },
          ]}
        />
      </View>

      <Text style={styles.question}>
        {question.question}
      </Text>

      <View style={styles.answers}>
        {question.answers.map((answer) => {
          const isSelected =
            selectedAnswer === answer;

          const showCorrect =
            answered &&
            answer ===
              question.correctAnswer;

          const showWrong =
            answered &&
            isSelected &&
            answer !==
              question.correctAnswer;

          return (
            <Pressable
              key={answer}
              disabled={answered}
              onPress={() =>
                chooseAnswer(answer)
              }
              style={[
                styles.answerButton,

                showCorrect &&
                  styles.correctAnswer,

                showWrong &&
                  styles.wrongAnswer,
              ]}
            >
              <Text
                style={styles.answerText}
              >
                {showCorrect && '✓ '}
                {showWrong && '✕ '}
                {answer}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {answered && (
        <View
          style={[
            styles.messageBox,

            isCorrect
              ? styles.successBox
              : styles.errorBox,
          ]}
        >
          <Text style={styles.message}>
            {message}
          </Text>
        </View>
      )}

      {answered && (
        <Pressable
          style={styles.nextButton}
          onPress={nextQuestion}
        >
          <Text style={styles.nextText}>
            {questionIndex ===
            questions.length - 1
              ? 'See Results 🏆'
              : 'Next Question →'}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    marginTop: 18,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  quizLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7C3AED',
  },

  questionNumber: {
    color: '#64748B',
    marginTop: 4,
  },

  scoreBox: {
    backgroundColor: '#EDE9FE',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
  },

  scoreNumber: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#7C3AED',
  },

  scoreLabel: {
    fontSize: 11,
    color: '#64748B',
  },

  liveStats: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },

  liveStat: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },

  liveCorrect: {
    color: '#16A34A',
    fontWeight: 'bold',
    fontSize: 18,
  },

  liveWrong: {
    color: '#DC2626',
    fontWeight: 'bold',
    fontSize: 18,
  },

  liveLabel: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
  },

  questionProgress: {
    height: 7,
    backgroundColor: '#E2E8F0',
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 18,
  },

  questionProgressFill: {
    height: '100%',
    backgroundColor: '#7C3AED',
  },

  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    lineHeight: 27,
    marginTop: 22,
    marginBottom: 18,
  },

  answers: {
    gap: 10,
  },

  answerButton: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 12,
  },

  correctAnswer: {
    backgroundColor: '#DCFCE7',
    borderColor: '#16A34A',
  },

  wrongAnswer: {
    backgroundColor: '#FEE2E2',
    borderColor: '#DC2626',
  },

  answerText: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '600',
  },

  messageBox: {
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
  },

  successBox: {
    backgroundColor: '#DCFCE7',
  },

  errorBox: {
    backgroundColor: '#FEE2E2',
  },

  message: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1E293B',
    lineHeight: 22,
  },

  nextButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },

  nextText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },

  resultEmoji: {
    fontSize: 55,
    textAlign: 'center',
  },

  resultTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginTop: 8,
  },

  finalMessage: {
    color: '#64748B',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 8,
    lineHeight: 22,
  },

  finalScore: {
    alignItems: 'center',
    marginTop: 20,
  },

  percentage: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#7C3AED',
  },

  scoreText: {
    color: '#64748B',
    marginTop: 3,
  },

  resultStats: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },

  correctStat: {
    flex: 1,
    backgroundColor: '#DCFCE7',
    borderRadius: 14,
    padding: 15,
    alignItems: 'center',
  },

  wrongStat: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    borderRadius: 14,
    padding: 15,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1E293B',
  },

  correctLabel: {
    color: '#15803D',
    fontWeight: 'bold',
  },

  wrongLabel: {
    color: '#B91C1C',
    fontWeight: 'bold',
  },

  reviewSection: {
    marginTop: 25,
  },

  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },

  reviewItem: {
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  reviewQuestion: {
    fontWeight: 'bold',
    color: '#334155',
    lineHeight: 21,
  },

  yourAnswer: {
    color: '#DC2626',
    marginTop: 8,
  },

  correctReview: {
    color: '#16A34A',
    marginTop: 4,
    fontWeight: '600',
  },

  perfectBox: {
    backgroundColor: '#DCFCE7',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },

  perfectText: {
    color: '#15803D',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  restartButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 22,
  },

  restartText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});