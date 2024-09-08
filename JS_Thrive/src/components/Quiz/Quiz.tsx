import React, { useState, useEffect } from 'react';
import './Quiz.css';

interface QuizQuestion {
  question: string;
  correctAnswer: string;
  badgeSrc: string;
  onCorrect: () => void; 
  quizCompleted: boolean; 
}

const Quiz: React.FC<QuizQuestion> = ({ question, correctAnswer, badgeSrc, onCorrect, quizCompleted }) => {
  const [answer, setAnswer] = useState('');
  const [showBadge, setShowBadge] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [dummyReset, setDummyReset] = useState(false); 

  useEffect(() => {
    if (quizCompleted && !dummyReset) {
      setShowBadge(true);
      setIsCorrect(true); 
    }
  }, [quizCompleted, dummyReset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (quizCompleted && !dummyReset) {
      setShowBadge(true);
      return;
    }

    const correct = answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    setIsCorrect(correct);
    setShowBadge(true);
    if (correct) {
      onCorrect();
    }
  };

  const handleReset = () => {
    setAnswer('');
    setShowBadge(false);
    setIsCorrect(false);
  };

  const handleDummyReset = () => {
    setAnswer('');
    setShowBadge(false);
    setIsCorrect(false);
    setDummyReset(true); 
  };

  return (
    <div className="quiz-container">
      <h2 className="question" aria-live="polite">{question}</h2>
      {(!quizCompleted || dummyReset) && (
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="answer-input" className="label">Your Answer: </label>
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
      )}
      {showBadge && (
        <div className={`badge-container ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            <>
              <h3 className="badge-title">Congratulations!</h3>
              <p className="badge-text">Correct answer!</p>
              <h3 className="badge-earn">You've earned a badge</h3>
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'20px'}}>
              <img onClick={() => {
                    window.location.href = '/profile';
                }} src={badgeSrc} className="badge-image" alt="Congratulations Badge" />

              <button onClick={handleDummyReset} className="dummy-reset-button">Take the Quiz Again</button>
              </div>
            </>
          ) : (
            <>
              <h3 className="badge-title">Try Again</h3>
              <p className="badge-text">That's not quite right. Please try again!</p>
              <button onClick={handleReset} className="reset-button">Try Again</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
