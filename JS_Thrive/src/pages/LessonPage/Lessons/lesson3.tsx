import { useState } from "react";
import LessonNavigator from "../../../components/LessonNavigator";
import JsEditor from "../../../components/codeEditor/JsEditor";
import "./Lessons.css";

const defaultJsCode = `



    document.addEventListener('DOMContentLoaded', () => {
        const questionElement = document.getElementById('question');
        const answersElement = document.getElementById('answers');
        const nextButton = document.getElementById('next');
        const restartButton = document.getElementById('restart');

        let currentQuestionIndex = 0;
        const questions = [
            {
                question: "What does HTML stand for?",
                answers: [
                    "Hyper Trainer Marking Language",
                    "Hyper Text Markup Language",
                    "Hyper Texts Market Language",
                    "Hyper Text Markup Leveler"
                ],
                correct: 1
            },
            // Add more questions here
        ];

        function showQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            questionElement.textContent = \`Question \${currentQuestionIndex + 1}: \${currentQuestion.question}\`;

            answersElement.innerHTML = '';
            currentQuestion.answers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.textContent = answer;
                button.addEventListener('click', () => selectAnswer(index, currentQuestion.correct));
                answersElement.appendChild(button);
            });
        }

        function selectAnswer(selectedIndex, correctIndex) {
            if (selectedIndex === correctIndex) {
                // Increment score if the selected answer is correct
                // You can implement this part
            }

            // Move to the next question
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                // End the quiz
                // You can implement this part
            }
        }

        nextButton.addEventListener('click', showQuestion);
        restartButton.addEventListener('click', () => {
            currentQuestionIndex = 0;
            showQuestion();
        });

        // Show the first question when the page loads
        showQuestion();
    });
`;

function Lesson3() {
  const [currentLesson, setCurrentLesson] = useState(3);
  const totalLessons = 9; // Total number of lessons

  const handleNextLesson = () => {
    setCurrentLesson(prevLesson => prevLesson + 1);
  };

  const handlePreviousLesson = () => {
    setCurrentLesson(prevLesson => prevLesson - 1);
  };
  return (
    <div className="lesson-container">
      <h2 className="lesson-title">Lesson 3: Making the Quiz Interactive with JavaScript</h2>
      <div className="lesson-content">
        <p>In this lesson, we're going to learn how to use JavaScript to add interactivity to our quiz app. JavaScript is a programming language that runs in the browser and allows us to make our web pages dynamic and responsive to user input.</p>
        <p>Handling User Interaction: JavaScript allows us to listen for events, such as clicks on buttons or selections of options, and respond to them accordingly. This enables us to create interactive elements on our webpage.</p>
        <p>Updating the Quiz Content: We'll use JavaScript to dynamically update the quiz content based on user interaction. This includes displaying questions, showing answer options, and navigating through the quiz.</p>
      </div>
      <JsEditor defaultCode={defaultJsCode} />
      <div>
        <p>Explanation:</p>
        <ul>
          <li>The showQuestion function is responsible for displaying the current question and its answer options. It dynamically creates buttons for each answer option and attaches click event listeners to them.</li>
          <li>The selectAnswer function is called when a user selects an answer. It checks if the selected answer is correct and updates the score accordingly. It also moves to the next question or ends the quiz if there are no more questions.</li>
          <li>Event listeners are added to the "Next" and "Restart" buttons to handle navigation and restarting of the quiz.</li>
          <li>Finally, the showQuestion function is called when the page loads to display the first question.</li>
        </ul>
        <p>Conclusion:</p>
        <p>In Lesson 3, we've learned how to use JavaScript to make our quiz app interactive. We've implemented functions to display questions, handle user selection of answers, and navigate through the quiz.</p>
        <div className="lesson-congratulations">
        <h4>Congratulations!</h4>
        <p>You've successfully completed Lesson 3 and learned how to make the quiz interactive with JavaScript. In the next lesson, we'll explore more advanced concepts to further enhance our quiz app.</p>
      </div>
      <LessonNavigator
        currentLesson={currentLesson}
        totalLessons={totalLessons}
        onNextLesson={handleNextLesson}
        onPreviousLesson={handlePreviousLesson}
      />
      </div>
    </div>
  );
}

export default Lesson3;
