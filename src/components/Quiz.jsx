import { useState } from "react";

import QUESTIONS from "../questions.js";

const Quiz = () => {
  const [userAnswers, setUserAnswer] = useState([]);

  const activeQuestionIndex = userAnswers.length;

  const handleSelectAnswer = (selectedAnswer) => {
    setUserAnswer((prevAnswers) => {
      const newAnswers = [...prevAnswers, selectedAnswer];
      return newAnswers;
    });
  };

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {QUESTIONS[activeQuestionIndex].answers.map((answer) => {
            return (
              <li
                key={answer}
                className="answer"
                onClick={() => {
                  handleSelectAnswer(answer);
                }}
              >
                <button>{answer}</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
