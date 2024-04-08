import { useState } from "react";
import LessonNavigator from "../../../components/LessonNavigator";
import HtmlEditor from "../../../components/codeEditor/HtmlEditor";
import JsEditor from "../../../components/codeEditor/JsEditor";
import "./Lessons.css";

const defaultCodeJs = `function selectAnswer(selectedIndex, correctIndex) {
  const buttons = answersElement.querySelectorAll('.btn');
  buttons.forEach((button, index) => {
      if (index === correctIndex) {
          button.classList.add('correct');
      } else {
          button.classList.add('incorrect');
      }
      button.disabled = true; // Disable buttons after selection
  });

  if (selectedIndex === correctIndex) {
      score++; // Increment score for correct answer
  }
  scoreElement.textContent = \`Score: \${score}\`; // Update score display

  // Move to the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      nextButton.style.display = 'block';
  } else {
      endQuiz();
  }
}`;

function Lesson5() {
  const [currentLesson, setCurrentLesson] = useState(5);
  const totalLessons = 9; // Total number of lessons

  const handleNextLesson = () => {
    setCurrentLesson(prevLesson => prevLesson + 1);
  };

  const handlePreviousLesson = () => {
    setCurrentLesson(prevLesson => prevLesson - 1);
  };
  return (
    <div className="lesson-container">
      <h2 className="lesson-title">Lesson 5: Adding Feedback and Score Tracking</h2>
      <div className="lesson-content">
        <p>
          <strong>Objective:</strong> In this lesson, we will implement feedback mechanisms and score tracking to enhance the user experience of our quiz app. Providing immediate feedback to users about their responses and keeping track of their score adds engagement and motivation to the quiz.
        </p>
        <p>
          <strong>Introduction:</strong> Feedback is crucial in any interactive application, as it helps users understand their progress and learn from their actions. By incorporating feedback mechanisms such as correct/incorrect indicators and real-time score tracking, we can create a more interactive and rewarding quiz experience.
        </p>
        <p>
          <strong>1. Providing Feedback for User Responses:</strong>
          <br />
          Visual Indicators: We'll use visual cues such as color changes or icons to indicate whether the user's response was correct or incorrect.
          <br />
          Immediate Feedback: Feedback should be provided immediately after the user selects an answer, ensuring a smooth and responsive user experience.
          <br />
          Clear Messaging: Feedback messages should be clear and concise, helping users understand the outcome of their response.
        </p>
        <p>
          <strong>2. Implementing Score Tracking:</strong>
          <br />
          Incrementing Score: We'll increment the user's score when they select the correct answer.
          <br />
          Displaying Score: The user's current score will be displayed prominently, allowing them to track their progress throughout the quiz.
          <br />
          Persisting Score: We may consider persisting the user's score using local storage, allowing them to resume the quiz later without losing their progress.
        </p>
        <p>
          <strong>3. Enhancing User Engagement:</strong>
          <br />
          Motivating Feedback: Positive feedback for correct responses and encouraging messages can motivate users to continue participating in the quiz.
          <br />
          Encouraging Progress: Displaying the user's progress (e.g., current question number out of total) can encourage them to complete the quiz.
          <br />
          Celebrating Achievements: Celebrating milestones such as reaching a high score or completing the quiz can further engage users and make the experience more enjoyable.
        </p>
      </div>
      <JsEditor defaultCode={defaultCodeJs} />
      <HtmlEditor defaultCode=".btn.correct {
          background-color: #28a745;
      }

      .btn.incorrect {
          background-color: #dc3545;
      }" />
      <div className="lesson-congratulations">
        <h4>Congratulations!</h4>
        <p>You've successfully completed Lesson 5 and learned how to enhance the user experience of our quiz app by adding feedback mechanisms and score tracking. By providing immediate feedback and keeping track of the user's score, we've made the quiz more engaging and rewarding for users. In the next lesson, we'll explore more advanced features to further improve our quiz app's functionality.</p>
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

export default Lesson5;
