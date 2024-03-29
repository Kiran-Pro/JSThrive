import HtmlEditor from "../../../components/codeEditor/HtmlEditor";
import "./Lessons.css";

const defaultCode = `/* CSS Styles for Quiz App */
body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

#question {
    font-size: 1.5em;
    margin-bottom: 20px;
}

.btn-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 20px;
}

.btn {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
}

#next, #restart {
    background-color: #0056b3;
}

#score-board {
    margin-top: 20px;
}

#score-board p {
    margin: 10px 0;
    font-size: 1.2em;
}
`;

function lesson4() {
  return (
    <div className="lesson-container">
      <h2 className="lesson-title">Lesson 4: Enhancing the Quiz with Styling</h2>
      <div className="lesson-content">
        <p>
          <strong>Objective:</strong> In this lesson, we will focus on enhancing the visual appeal of our quiz app by applying CSS styling. CSS (Cascading Style Sheets) allows us to customize the appearance of our HTML elements, making them more visually appealing and user-friendly.
        </p>
        <p>
          <strong>Introduction:</strong> CSS is a powerful styling language that enables us to control the layout, colors, fonts, and other visual aspects of our web pages. By applying CSS styles to our quiz app, we can improve its overall look and feel, making it more engaging for users.
        </p>
        <p>
          <strong>Creating Responsive Layouts:</strong> Media Queries: We can use media queries in CSS to create responsive layouts that adapt to different screen sizes and devices. Flexbox/Grid: CSS Flexbox and Grid layouts offer powerful tools for creating flexible and responsive page layouts. Ensuring Accessibility: We'll ensure that our styling choices enhance accessibility and readability for all users.
        </p>
        <p>
          <strong>Adding Transitions and Animations:</strong> Transition Effects: CSS transitions allow us to smoothly animate changes in element properties, such as color, size, or position. Keyframe Animations: CSS keyframe animations enable us to create complex animations with precise control over timing and behavior. Enhancing User Experience: We'll use transitions and animations to provide visual feedback to users, making interactions more intuitive and engaging.
        </p>
      </div>
      <HtmlEditor defaultCode={defaultCode} />
      <div className="lesson-congratulations">
        <h4>Congratulations!</h4>
        <p>You've successfully completed Lesson 4 and learned how to enhance the visual appearance of our quiz app using CSS styling. In the next lesson, we'll explore more advanced concepts to further improve our quiz app's user experience.</p>
      </div>
    </div>
  );
}

export default lesson4;
