import HtmlEditor from '../../../components/codeEditor/HtmlEditor';
import './Lessons.css';

const defaultHtmlCode = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quiz Game</title>
    </head>
    <body>
        <h1>Welcome to the Quiz Game!</h1>
        <!-- Your quiz app content will go here -->
        <script src="script.js"></script>
    </body>
    </html>`;

function Lesson1() {
  return (
    <div className="lesson-container">
      <h2 className="lesson-title">Lesson 1: Introduction to Web Development and Setup</h2>
      <div className="lesson-content">
        <section className="lesson-section">
          <h3>Discovering Web Development:</h3>
          <p>Let's start by understanding what web development is all about. Think of the web as a vast network of interconnected pages, each designed to deliver information, services, or entertainment to users like you. Now, web development is the process of creating these web pages and making them work seamlessly on the internet.</p>
          <p>Activity: Take a moment to think about some of your favorite websites or web applications. What do you like about them? How do they make your browsing experience better?</p>
        </section>
        <section className="lesson-section">
          <h3>Setting up Your Workspace:</h3>
          <p>Activity: Let's set up your workspace together! First, download a code editor like Visual Studio Code or Atom. These tools will help you write and organize your code effectively. Once you've installed a code editor, create a new folder on your computer. This folder will hold all the files for our quiz app. Inside this folder, create a new file called index.html. This file will be the starting point of our quiz app, where we'll write the HTML code.</p>
          <p>Explanation: HTML (HyperText Markup Language) is the language used to create the structure of web pages. Think of it as the skeleton that gives a webpage its basic structure.</p>
          <p>Activity: Open the index.html file you just created with your code editor. Inside, let's add some basic HTML code to get started:</p>
          <HtmlEditor defaultCode={defaultHtmlCode} />
          <p>Explanation: This HTML code sets up the basic structure of our webpage. We have a title that appears in the browser tab, and a heading 'h1' that welcomes users to our quiz app. The script tag at the bottom links to a JavaScript file (script.js), which we'll use later to add interactivity to our quiz app.</p>
          <p>Activity: Save the index.html file and open it in your web browser. You should see the welcome message displayed in the browser window.</p>
        </section>
      </div>
      <div className="lesson-congratulations">
        <h4>Congratulations!</h4>
        <p>You've just taken your first steps into the world of web development by setting up your workspace and creating the foundation for our quiz app. In the next lesson, we'll start adding more elements to our quiz app and make it interactive using JavaScript.</p>
      </div>
    </div>
  );
}

export default Lesson1;
