import JsEditor from "../../../components/codeEditor/JsEditor";
import "./Lessons.css";

const defaultJsCode = `// Function to handle user's answer selection
function selectAnswer(selectedIndex, correctIndex) {
    const buttons = answersElement.querySelectorAll('.btn');

    // Loop through answer buttons to visually indicate correctness
    buttons.forEach((button, index) => {
        if (index === selectedIndex) {
            // Change button color based on correctness
            button.style.backgroundColor = index === correctIndex ? '#28a745' : '#dc3545';
            button.style.color = 'white';
        }
    });

    // Check if the selected answer is correct
    if (selectedIndex === correctIndex) {
        // Increment score if the answer is correct
        score++;
    }

    // Move to the next question or end the quiz
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        // Show next question
        showQuestion();
    } else {
        // End the quiz
        endQuiz();
    }
}
`;

function lesson8() {
  return (
    <div className="lesson-container">
      <h2 className="lesson-title">Lesson 8: Implementing Answer Validation and Feedback</h2>
      <div className="lesson-content">
        <p>
          <strong>Objective:</strong> In this lesson, we'll learn how to validate user answers and provide feedback based on their selections. This will enhance the interactive aspect of our quiz app by guiding users and giving them immediate responses to their choices.
        </p>
        <p>
          <strong>Implementation Steps:</strong>
          <br />
          <strong>Validating User Answers:</strong>
          <ul>
            <li>Compare the user's selected answer index with the correct answer index for each question.</li>
            <li>Determine whether the selected answer is correct or incorrect.</li>
          </ul>
          <strong>Providing Feedback:</strong>
          <ul>
            <li>Visualize the correctness of the user's answer by changing the appearance of the selected option button.</li>
            <li>Display feedback messages indicating whether the user's answer was correct or incorrect.</li>
          </ul>
          <strong>Updating the Score:</strong>
          <ul>
            <li>Increment the user's score if the answer is correct.</li>
            <li>Display the updated score to the user after each question.</li>
          </ul>
        </p>
      </div>
      <JsEditor defaultCode={defaultJsCode} />
      <div className="lesson-congratulations">
        <h4>Congratulations!</h4>
        <p>You've successfully completed Lesson 8 and learned how to implement answer validation and feedback in our quiz app. By providing immediate feedback on user selections and updating the score accordingly, you've enhanced the interactivity and educational value of the quiz. In the next lesson, we'll explore additional features to further improve the user experience.</p>
      </div>
    </div>
  );
}

export default lesson8;
