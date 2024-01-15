import { useState, useCallback } from "react";

import QUESTIONS from "../questions.js";
import quizComplete from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";

const Quiz = () => {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswer] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswer((prevAnswers) => {
        const newAnswers = [...prevAnswers, selectedAnswer];
        return newAnswers;
      });

      setTimeout(() => {
        if (selectedAnswer == QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        //reset the answer
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizComplete} alt="Trophy icon" />
        <h2>Quiz completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] == answer;
            let cssClasses = "";

            if (answerState == "answered" && isSelected) {
              cssClasses = "selected";
            }

            if (
              answerState == "correct" ||
              (answerState == "wrong" && isSelected)
            ) {
              cssClasses = answerState;
            }
            return (
              <li
                key={answer}
                className="answer"
                onClick={() => {
                  handleSelectAnswer(answer);
                }}
              >
                <button className={cssClasses}>{answer}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
