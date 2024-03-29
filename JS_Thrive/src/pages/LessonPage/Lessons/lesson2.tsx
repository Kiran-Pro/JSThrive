import HtmlEditor from '../../../components/codeEditor/HtmlEditor';
import './Lessons.css';

const defaultCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Game</title>
</head>
<body>
    <h1>Welcome to the Quiz Game!</h1>
    
    <!-- Quiz container -->
    <div id="quiz-container">
        <!-- Question -->
        <div id="question">
            <h2>Question 1:</h2>
            <p>What does HTML stand for?</p>
        </div>
        
        <!-- Answers -->
        <div id="answers">
            <ul>
                <li>Hyper Trainer Marking Language</li>
                <li>Hyper Text Markup Language</li>
                <li>Hyper Texts Market Language</li>
                <li>Hyper Text Markup Leveler</li>
            </ul>
        </div>
        
        <!-- Navigation buttons -->
        <button id="next">Next</button>
        <button id="restart">Restart</button>
    </div>
    
    <!-- Score board (initially hidden) -->
    <div id="score-board" style="display:none;">
        <p>Score: <span id="score">0</span></p>
        <p>High Score: <span id="high-score">0</span></p>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
`;

function Lesson2() {
  return (
    <div className="lesson-container">
      <h2 className="lesson-title">Lesson 2: Adding Structure to the Quiz App</h2>
      <div className="lesson-content">
        <section className="lesson-section">
          <h3>Discovering Web Development</h3>
          <p>We're going to learn how to structure our quiz app using HTML. HTML, or HyperText Markup Language, is the language used to create the structure of web pages.</p>
        </section>
        <section className="lesson-section">
          <h3>Setting up Your Workspace</h3>
          <p>Now, let's start building the structure of our quiz app.</p>
          <p>Question Section: We'll use a <code>&lt;div&gt;</code> tag with the id quiz-container to contain our quiz. Inside this container, we'll have another <code>&lt;div&gt;</code> with the id question to display the current question. Each question will be represented by a heading tag, such as <code>&lt;h2&gt;</code>.</p>
          <p>Answer Options: After the question, we'll have another <code>&lt;div&gt;</code> with the id answers to display the answer options. Answer options will be displayed as a list using <code>&lt;ul&gt;</code> (unordered list) and <code>&lt;li&gt;</code> (list item) tags.</p>
          <p>Buttons: Finally, we'll add buttons for navigation. We'll use a <code>&lt;button&gt;</code> tag for both the "Next" button and the "Restart" button. These buttons will help users navigate through the quiz and restart it if needed.</p>
        </section>
      </div>
      <HtmlEditor defaultCode={defaultCode} />
      <div className="lesson-congratulations">
        <h4>Congratulations!</h4>
        <p>You've successfully structured the HTML for our quiz app. In the next lesson, we'll make this quiz interactive by adding JavaScript functionality. Great job! Let me know if you have any questions or if you're ready to move on.</p>
      </div>
    </div>
  );
}

export default Lesson2;
