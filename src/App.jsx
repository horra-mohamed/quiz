import { useState } from "react";
import "./index.css";

const questions = [
  {
    question: "Quelle est la capitale de la France ?",
    options: ["Paris", "Londres", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "En quelle année a commencé la Première Guerre mondiale ?",
    options: ["1914", "1939", "1815", "1861"],
    correctAnswer: "1914",
  },
  {
    question: "Quel est l'élément chimique avec le symbole H ?",
    options: ["Helium", "Hydrogène", "Hélium", "Hafnium"],
    correctAnswer: "Hydrogène",
  },
  {
    question: "Combien de côtés possède un hexagone ?",
    options: ["4", "5", "6", "8"],
    correctAnswer: "6",
  },
];

const Questionnaire = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selection, setSelection] = useState(null);
  const [repRepondu, setRepRepondu] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSelection = (option) => {
    if (!repRepondu) {
      setSelection(option);
    }
  };

  const validateAnswer = () => {
    setRepRepondu(true);
    if (selection === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
      setMessage({ type: "success", text: "Bonne réponse !" });
    } else {
      setMessage({ type: "error", text: "Mauvaise réponse." });
    }
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setRepRepondu(false);
    setSelection(null);
    setMessage(null);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelection(null);
    setRepRepondu(false);
    setMessage(null);
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const scoreProgress = (score / questions.length) * 100;

  return (
    <div className="container">
      <h2>Questionnaire</h2>

      <div className="progress-container">
        <p className="score">Score : {score}</p>
        <div className="score-bar">
          <div
            className="score-progress"
            style={{ width: `${scoreProgress}%` }}
          ></div>
        </div>
      </div>


      {message && (
        <div className={`message ${message.type}`}>
          <p>{message.text}</p>
        </div>
      )}

      <div className="question">
        <p>{questions[currentQuestionIndex].question}</p>
      </div>

      <div className="options">
        {questions[currentQuestionIndex].options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selection === option}
              onChange={() => handleSelection(option)}
              disabled={repRepondu}
            />
            {option}
          </label>
        ))}
      </div>

      <button
        className="btn validate"
        onClick={validateAnswer}
        disabled={repRepondu || selection === null}
      >
        Valider
      </button>

      {repRepondu && !isLastQuestion && (
        <button className="btn next" onClick={nextQuestion}>
          Question suivante
        </button>
      )}

      {repRepondu && isLastQuestion && (
        <div className="final-section">
          <p className="final-score">
            Quiz terminé ! Votre score final est <strong>{score}</strong> sur {questions.length}.
          </p>
          <p className="final-percentage">
            Pourcentage : {((score / questions.length) * 100).toFixed(1)}%
          </p>
          <button className="btn replay" onClick={resetQuiz}>
            Rejouer
          </button>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;

