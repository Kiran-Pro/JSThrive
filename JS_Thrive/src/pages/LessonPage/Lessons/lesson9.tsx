/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import LessonNavigator from '../../../components/LessonNavigator';
import './Lessons.css';
import Quiz from '../../../components/Quiz/Quiz';
import { firestore, app } from '../../../firebase.config';
import { doc, updateDoc, arrayUnion, onSnapshot, increment } from 'firebase/firestore';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import badge9 from '../../../resources/lion_badge.png';
import LessonDirector from './LessonDirector';
import Mini_IDE from '../../../components/codeEditor/Mini_codeEditor/Mini_IDE';
import Mini_IDE_Simple from '../../../components/codeEditor/Mini_IDE_Simple';
import JsEditor2 from '../../../components/codeEditor/JsEditor';

const question = 'What is the purpose of the parseInt function in JavaScript?';
const correctAnswer = 'Converts a string into an integer';

const defaultHTML=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Number Guessing Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="game-container">
        <h1>Number Guessing Game</h1>
        <div id="message"></div>
        <div id="input-container">
            <input type="number" id="guess-input" placeholder="Enter your guess">
            <button id="submit-button">Submit Guess</button>
        </div>
        <div id="result"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>
`
const defaultCSS=`body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
  text-align: center;
  margin: 0;
  padding: 0;
}

#game-container {
  max-width: 600px;
  margin: 100px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #32908F;
}

#message, #result {
  font-size: 1.2em;
  margin: 20px 0;
}

#input-container {
  margin-bottom: 20px;
}

#guess-input {
  padding: 10px;
  font-size: 1em;
}

#submit-button {
  padding: 10px 20px;
  font-size: 1em;
  background-color: #32908F;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#submit-button:hover {
  background-color: #287a6e;
}
`
const defaultJS=`

// Get references to HTML elements

const message = document.getElementById('message');
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-button');
const result = document.getElementById('result');

// Initialize game variables

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// Function to start a new game

function newGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  message.innerText = 'Guess a number between 1 and 100';
  result.innerText = '';
  guessInput.value = '';
  guessInput.disabled = false;
  submitButton.disabled = false;
}

// Function to check the guess

function checkGuess() {
  const userGuess = parseInt(guessInput.value);
  attempts++;
  if (userGuess === randomNumber) {
    result.innerText =
      'Congratulations! You guessed the number in ' + attempts + ' attempts.';
    guessInput.disabled = true;
    submitButton.disabled = true;
  } else if (userGuess < randomNumber) {
    message.innerText = 'Too low! Try again.';
  } else if (userGuess > randomNumber) {
    message.innerText = 'Too high! Try again.';
  } else {
    message.innerText = 'Please enter a valid number.';
  }
}

// Add event listener to the submit button

submitButton.addEventListener('click', checkGuess);

// Start a new game when the page loads

newGame();
`


const lessons = [
  { label: 'Introduction', href: '#Introduction' },
  { label: 'HTML Structure', href: '#HTMLStructure' },
  { label: 'CSS Styling', href: '#CSSStyling' },
  { label: 'JavaScript Functionality', href: '#JavaScriptFunctionality' },
  { label: 'CodingStation', href: '#CodingStation' },
  { label: 'Quiz', href: '#Quiz' },
];

function Lesson9() {
  const [currentLesson, setCurrentLesson] = useState(9);
  const totalLessons = 9;
  const [progress, setProgress] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lessonsCompleted, setLessonsCompleted] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [points, setPoints] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        subscribeToUserData(currentUser.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const subscribeToUserData = (userId: string) => {
    const userDocRef = doc(firestore, "users", userId);
    return onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setLessonsCompleted(userData.lessonsCompleted);
        setBadges(userData.badges || []);
        setPoints(userData.points || 0);
        setQuizCompleted(userData.lessonQuizzes?.lesson9 || false); 
        setProgress(((userData.lessonsCompleted || 0) / totalLessons) * 100);
      } else {
        console.log("No user data available");
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching user data:", error);
      setError("Failed to load user data");
      setLoading(false);
    });
  };

  const handleQuizCompletion = async (isCorrect: boolean) => {
    if (isCorrect && user && !quizCompleted) {
      const userDocRef = doc(firestore, "users", user.uid);
      const newBadge = badge9;

      try {
        await updateDoc(userDocRef, {
          lessonsCompleted: increment(1),
          badges: arrayUnion(newBadge),
          points: increment(100),
          [`lessonQuizzes.lesson9`]: true, 
        });
        setLessonsCompleted((prev) => {
          const newCount = prev + 1;
          setProgress((newCount / totalLessons) * 100);
          return newCount;
        });
        setBadges((prev) => [...prev, newBadge]);
        setPoints((prev) => prev + 100);
        setQuizCompleted(true);
        console.log("Profile updated successfully with additional points and badge");
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    }
  };

  const handleNextLesson = () => {
    if (currentLesson < totalLessons) {
      setCurrentLesson((prevLesson) => prevLesson + 1);
      setProgress(((currentLesson + 1) / totalLessons) * 100);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 1) {
      setCurrentLesson((prevLesson) => prevLesson - 1);
      setProgress(((currentLesson - 1) / totalLessons) * 100);
    }
  };

  return (
    <div className="main-con">
      <LessonDirector items={lessons} />
      <div className="lesson-container">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="inner-con">
          <h1 className="lesson-title">Number Guessing Game</h1>
          <div className="lesson-content">
            <section id="Introduction" className="lesson-section">
              <h2>Introduction</h2>
              <p>
                In this lesson, we'll create a simple number guessing game using HTML, CSS, and JavaScript. The game will generate a random number, and you'll have to guess what it is. Let's get started!
              </p>
            </section>

            <section id="HTMLStructure" className="lesson-section">
              <h2>HTML Structure</h2>
              <p>Here's the HTML structure for our game. It includes a title, a container for the game, and an input field for entering guesses.</p>
              <Mini_IDE_Simple htmlCode={defaultHTML}/>
              <p>This is the basic HTML structure for our game. It includes a title, a container for the game, and an input field for entering guesses.
                Go and Play around, it has  <b>Live editor</b> in it!
              </p>
            </section>

            <section id="CSSStyling" className="lesson-section">
              <h2>CSS Styling</h2>
              <p>Now, let's style our game to make it look clean and user-friendly. Here's the CSS:</p>
              <Mini_IDE_Simple htmlCode={defaultHTML} cssCode={defaultCSS}/>
              <p>This CSS styles the game container, input field, and button to make the game look clean and user-friendly.</p>
            </section>

            <section id="JavaScriptFunctionality" className="lesson-section">
              <h2>JavaScript Functionality</h2>
              <p>Let's add the JavaScript functionality to our game. This code handles the game logic, including generating a random number, checking the user's guess, and providing feedback.</p>
              <JsEditor2 defaultCode={defaultJS} />
              <p>This JavaScript code handles the game logic, including generating a random number, checking the user's guess, and providing feedback.</p>
              <br />
              <h3>
             Get References to HTML Elements
              </h3>
              <ul>
                <li>We have four special "boxes" in our HTML: message, guess-input, submit-button, and result.</li>
               <li> message will show hints like "Too low!" or "Too high!".</li>
               <li>guess-input is where you type your guess.</li>
               <li>submit-button is the button you click to submit your guess.</li>
               <li> result will show the final message when you guess the correct number.</li>
               </ul>
               <br />
               <h3>
              Initialize Game Variables
               </h3>
               <ul>
                <li><b>randomNumber</b> is a secret number between 1 and 100 that you need to guess.</li>
                <li><b>attempts</b> keeps track of how many guesses you've made.</li>
             
               </ul>
               <br />
               <h3>
               Start a New Game
               </h3>
               <ul>
                <li>The <b>newGame</b> function resets everything to start a new game.</li>
                <li>It picks a new secret number.</li>
                <li>It sets attempts back to 0.</li>
                <li>It updates the message to tell you to guess a number between 1 and 100.</li>
                <li>It clears the result and guessInput fields.</li>
                <li>It makes sure you can type and click the button again.</li>
               </ul>
               <br />
               <h3>
               Check the Guess
               </h3>
               <ul>
                <li>The <b>checkGuess</b> function checks if your guess is right.</li>
                <li>It gets your guess from the guessInput and turns it into a number using parseInt.</li>
                <li>It adds 1 to attempts because you made a guess.</li>
                <li>If your guess is correct (userGuess === randomNumber), it shows a congratulations message, and stops you from typing or clicking again by disabling the input and button.</li>
                <li>If your guess is too low (userGuess lesser than randomNumber), it shows "Too low! Try again."</li>
                <li>If your guess is too high (userGuess greater than randomNumber), it shows "Too high! Try again."</li>
                <li>If you type something that's not a number, it says "Please enter a valid number."</li>
               </ul>
               <br />
               <h3>Add Event Listener to the Submit Button</h3>
               <ul>
                <li>It makes sure that every time you click the submit-button, the checkGuess function runs.</li>
               </ul>
               <br />
               <h3>
               Start a New Game When the Page Loads
               </h3>
               <ul><li>When the page loads, the <b>newGame</b> function runs to set everything up and start the game.
              </li></ul>
              <br />
            </section>

            <section id="CodingStation" className="lesson-section">
            <h2 style={{ color: 'var(--highlight-color2)', textAlign: 'center' }}>Let's get into Vortex - Play Around</h2>
              <p>Let's experiment with the code using the editor below. Try making changes to see how it affects the game!</p>
              <Mini_IDE defaultHTML={defaultHTML} defaultCSS={defaultCSS} defaultJS={defaultJS}/>
            </section>

            <section id="Quiz" className="lesson-section">
              <h2>Quiz</h2>
              <p>Test your understanding of JavaScript functions with this quiz.</p>
              <Quiz question={question} correctAnswer={correctAnswer} badgeSrc={badge9} quizCompleted={quizCompleted} onCorrect={() => handleQuizCompletion(true)} />
            </section>
          </div>
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

export default Lesson9;
