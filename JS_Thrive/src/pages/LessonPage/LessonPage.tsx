import { useState } from 'react';
import './LessonPage.css'; 

const LessonPage = () => {
  const [completed, setCompleted] = useState(false);

  const completeLesson = () => {
    setCompleted(true);
  };

  return (
    <div className="lesson-container">
      <h1 className="lesson-title">Lesson: Introduction to JavaScript</h1>
      <p className="lesson-content">Lesson content goes here...</p>
      {!completed && (
        <button className="complete-button" onClick={completeLesson}>
          Complete Lesson
        </button>
      )}
      {completed && (
        <p className="congratulations-message">Congratulations! You've completed this lesson.</p>
      )}
    </div>
  );
};

export default LessonPage;
