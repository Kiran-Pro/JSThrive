import JsEditor from "../../../components/codeEditor/JsEditor";
import "./Lessons.css";

const defaultJsCode = `// Example code for visual enhancements and user feedback
// You can modify and add to this code to customize your quiz app's appearance and feedback mechanisms.

// Function to update the UI with feedback messages
function displayFeedback(isCorrect) {
    const feedbackMessage = isCorrect ? 'Correct!' : 'Incorrect! Try again.';
    feedbackElement.textContent = feedbackMessage;
}

// Function to update the UI with final score and high score
function displayFinalScore() {
    scoreElement.textContent = \`Your Score: \${score}\`;
    highScoreElement.textContent = \`High Score: \${highScore}\`;
}

// Function to reset the UI after the quiz ends
function resetUI() {
    // Clear question and answer elements
    questionElement.textContent = '';
    answersElement.innerHTML = '';
    // Hide feedback and score elements
    feedbackElement.textContent = '';
    scoreElement.textContent = '';
    highScoreElement.textContent = '';
}

// Call resetUI() to initialize UI elements when the page loads
document.addEventListener('DOMContentLoaded', resetUI);
`;

function lesson9() {
  return (
    <div className="lesson-container">
      <h2 className="lesson-title">Lesson 9: Enhancing User Experience and Finalizing the Quiz App</h2>
      <div className="lesson-content">
        <p>
          <strong>Objective:</strong> In this final lesson, we'll focus on enhancing the user experience of our quiz app and making final adjustments to ensure a smooth and engaging interaction for users. We'll address aspects such as visual design, user feedback, and overall polish.
        </p>
        <p>
          <strong>Implementation Steps:</strong>
          <br />
          <strong>Visual Enhancements:</strong>
          <ul>
            <li>Refine the visual design of the quiz app to make it visually appealing and intuitive.</li>
            <li>Experiment with colors, fonts, and layouts to create a cohesive and attractive interface.</li>
            <li>Ensure that text and buttons are legible and appropriately sized for easy reading and interaction.</li>
          </ul>
          <strong>User Feedback:</strong>
          <ul>
            <li>Provide clear and informative feedback to users throughout the quiz experience.</li>
            <li>Use visual cues, such as changing button colors or displaying messages, to indicate correctness of answers and progression through the quiz.</li>
            <li>Offer encouraging messages for correct answers and helpful hints or explanations for incorrect ones.</li>
          </ul>
          <strong>Final Touches:</strong>
          <ul>
            <li>Test the quiz app thoroughly to identify and fix any bugs or issues.</li>
            <li>Optimize performance to ensure smooth operation across different devices and screen sizes.</li>
            <li>Consider adding additional features, such as a leaderboard or share buttons, to further engage users and promote interaction.</li>
          </ul>
        </p>
      </div>
      <JsEditor defaultCode={defaultJsCode} />
      <div className="lesson-congratulations">
        <h4>Congratulations!</h4>
        <p>You've completed Lesson 9 and finalized your quiz app with enhanced user experience and polished design. By focusing on visual enhancements, user feedback, and final touches, you've created a compelling and engaging learning tool. Keep iterating and refining your projects to deliver the best possible experience for your users.</p>
      </div>
    </div>
  );
}

export default lesson9;
