import React, { useState } from 'react';
import './Quiz.css';

interface QuizQuestion {
  question: string;
  correctAnswer: string;
  badgeSrc: string;
  onCorrect: () => void; // Add a callback function for correct answers
}

const Quiz: React.FC<QuizQuestion> = ({ question, correctAnswer, badgeSrc, onCorrect }) => {
  const [answer, setAnswer] = useState('');
  const [showBadge, setShowBadge] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const correct = answer.toLowerCase() === correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setShowBadge(true);
    if (correct) {
      onCorrect(); // Call the onCorrect callback if the answer is correct
    }
  };

  const handleReset = () => {
    setAnswer('');
    setShowBadge(false);
    setIsCorrect(false);
  };

  return (
    <div className="quiz-container">
      <h2 className="question">{question}</h2>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="answer-input" className="label">Your Answer:{" "}</label>
        <input
          id="answer-input"
          type="text"
          value={answer}
          onChange={handleChange}
          className="input"
          aria-label="Enter your answer here"
          aria-required="true"
        />
        <br />
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {showBadge && (
        <div className={`badge-container ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            <>
              <h3 className="badge-title">Congratulations!</h3>
              <p className="badge-text">correct answer!</p>
              <h3 style={{color:'black'}}>you've earned a badge!</h3>  
              <img src={badgeSrc} className="badge-image"  alt="Congratulations Badge" />
            </>
          ) : (
            <>
              <h3 className="badge-title">Try Again</h3>
              <p className="badge-text">That's not quite right. Please try again!</p>
              <button onClick={handleReset} className="submit-button">Try Again</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
