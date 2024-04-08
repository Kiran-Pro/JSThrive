import { useState } from "react";
import LessonNavigator from "../../../components/LessonNavigator";
import JsEditor from "../../../components/codeEditor/JsEditor";
import "./Lessons.css";

const defaultJsCode = `// Function to handle the end of the quiz
function endQuiz() {
    // Display final score and update high score if necessary
    scoreElement.textContent = \`Score: \${score}\`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreElement.textContent = \`High Score: \${highScore} (New High Score!)\`;
    } else {
        highScoreElement.textContent = \`High Score: \${highScore}\`;
    }

    // Show score board and restart button
    scoreBoard.style.display = 'block';
    restartButton.style.display = 'block';

    // Disable next button
    nextButton.disabled = true;
}

// Event listener for restart button
restartButton.addEventListener('click', () => {
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = 'Score: 0';
    nextButton.disabled = false;
    showQuestion(); // Restart the quiz
});
`;

function Lesson6() {
  const [currentLesson, setCurrentLesson] = useState(6);
  const totalLessons = 9; // Total number of lessons

  const handleNextLesson = () => {
    setCurrentLesson(prevLesson => prevLesson + 1);
  };

  const handlePreviousLesson = () => {
    setCurrentLesson(prevLesson => prevLesson - 1);
  };
  return (
    <div className="lesson-container">
      <h2 className="lesson-title">Lesson 6: Implementing Quiz Restart and High Score Tracking</h2>
      <div className="lesson-content">
        <p>
          <strong>Objective:</strong> In this lesson, we'll learn how to add two exciting features to our quiz app: the ability to restart the quiz and keeping track of the high score. These enhancements will make the quiz more engaging and competitive.
        </p>
        <p>
          <strong>Step 1: Adding Restart Functionality</strong>
          <br />
          Restart Button: Introduce a button that allows users to restart the quiz whenever they wish.
          <br />
          Reset State: Upon clicking the restart button, ensure the quiz state resets to its initial state, including the question index and score.
        </p>
        <p>
          <strong>Step 2: Tracking and Displaying High Score</strong>
          <br />
          High Score Storage: Utilize browser storage (localStorage) to persist the user's high score across sessions.
          <br />
          Updating High Score: Whenever the user achieves a new high score, update and prominently display it.
        </p>
        <p>
          <strong>Step 3: Providing Clear Feedback</strong>
          <br />
          Informative Messages: Provide clear and encouraging messages to users when they restart the quiz or achieve a new high score.
          <br />
          Visual Feedback: Consider adding visual cues to indicate when a high score is achieved or the quiz is restarted.
        </p>
      </div>
      <JsEditor defaultCode={defaultJsCode} />
      <div className="lesson-congratulations">
        <h4>Congratulations!</h4>
        <p>You've successfully completed Lesson 6 and learned how to enhance the quiz app by implementing quiz restart functionality and high score tracking. These features make the quiz more engaging and competitive, encouraging users to challenge themselves and improve their performance. In the next lesson, we'll explore further enhancements to make our quiz even more interactive and enjoyable.</p>
      </div>
      <LessonNavigator
        currentLesson={currentLesson}
        totalLessons={totalLessons}
        onNextLesson={handleNextLesson}
        onPreviousLesson={handlePreviousLesson}
      />
    </div>
  );
}

export default Lesson6;
