import { useState } from "react";
import LessonNavigator from "../../../components/LessonNavigator";
import JsEditor from "../../../components/codeEditor/JsEditor";
import "./Lessons.css";

const defaultJsCode = `// Function to update the high score in local storage
function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreElement.textContent = highScore;
    }
}

// Function to initialize the quiz and load high score from local storage
function initQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    scoreElement.textContent = '0';
    highScore = parseInt(localStorage.getItem('highScore') || '0', 10); // Retrieve high score from local storage
    highScoreElement.textContent = highScore;
    scoreBoard.style.display = 'none';
    restartButton.style.display = 'none';
    nextButton.style.display = 'none';
    showQuestion();
}

// Function to end the quiz and update high score
function endQuiz() {
    scoreElement.textContent = score;
    updateHighScore(); // Update high score in local storage
    scoreBoard.style.display = 'block';
    restartButton.style.display = 'block';
}
`;

function Lesson7() {
  const [currentLesson, setCurrentLesson] = useState(7);
  const totalLessons = 9; // Total number of lessons

  const handleNextLesson = () => {
    setCurrentLesson(prevLesson => prevLesson + 1);
  };

  const handlePreviousLesson = () => {
    setCurrentLesson(prevLesson => prevLesson - 1);
  };
  return (
    <div className="lesson-container">
      <h2 className="lesson-title">Lesson 7: Enhancing the Quiz with Local Storage for Persistent Data</h2>
      <div className="lesson-content">
        <p>
          <strong>Objective:</strong> In this lesson, we'll learn how to utilize the browser's local storage to store and retrieve data for our quiz app. By storing the user's high score locally, we can provide a more personalized experience and allow users to track their progress over multiple sessions.
        </p>
        <p>
          <strong>Implementation Steps:</strong>
          <br />
          <strong>Using Local Storage:</strong>
          <ul>
            <li>Local storage provides a simple key-value storage mechanism that persists even after the browser is closed.</li>
            <li>We can use local storage to store the user's high score and retrieve it when needed.</li>
          </ul>
          <strong>Updating the High Score:</strong>
          <ul>
            <li>Whenever the user completes the quiz and achieves a new high score, we'll update the stored high score in local storage.</li>
            <li>This ensures that the user's progress is saved and can be accessed in subsequent quiz sessions.</li>
          </ul>
          <strong>Displaying the High Score:</strong>
          <ul>
            <li>Retrieve the high score from local storage when the quiz app initializes.</li>
            <li>Display the high score alongside the current score on the score board.</li>
          </ul>
        </p>
      </div>
      <JsEditor defaultCode={defaultJsCode} />
      <div className="lesson-congratulations">
        <h4>Congratulations!</h4>
        <p>You've successfully completed Lesson 7 and learned how to enhance the quiz app with local storage for persistent data. By storing the user's high score locally, you've added a personalized touch to the quiz experience, allowing users to track their progress over multiple sessions. In the next lesson, we'll explore additional features to further improve our quiz app.</p>
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

export default Lesson7;
