/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import LessonNavigator from '../../../components/LessonNavigator';
import './Lessons.css';
import icon from '../../../resources/objects.png';
import JsEditor3 from '../../../components/codeEditor/JsEditor2';
import Quiz from '../../../components/Quiz/Quiz';
import { firestore, app } from '../../../firebase.config';
import { doc, updateDoc, arrayUnion, onSnapshot, increment } from 'firebase/firestore';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import badge4 from '../../../resources/koala_badge.png';
import LessonDirector from './LessonDirector';
import Mini_IDE from '../../../components/codeEditor/Mini_codeEditor/Mini_IDE';

const question = 'What is an object in JavaScript?';
const correctAnswer = 'collection of key-value pairs';

const lessons = [
  { label: 'Introduction', href: '#Introduction' },
  { label: 'Creating Objects', href: '#CreatingObjects' },
  { label: 'Accessing Properties', href: '#AccessingProperties' },
  { label: 'Methods in Objects', href: '#MethodsInObjects' },
  { label: 'CodingStation', href: '#CodingStation' },
];

function Lesson4() {
  const [currentLesson, setCurrentLesson] = useState(4);
  const totalLessons = 9; // Assuming there are 9 lessons total
  const [progress, setProgress] = useState(44); // Progress in percentage
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
        setQuizCompleted(userData.lessonQuizzes?.lesson4 || false); // Load quiz completion state for lesson 4
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
      const newBadge = badge4;

      try {
        await updateDoc(userDocRef, {
          lessonsCompleted: increment(1),
          badges: arrayUnion(newBadge),
          points: increment(100),
          [`lessonQuizzes.lesson4`]: true, // Mark the lesson4 quiz as completed
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
    if (isCompleted) {
      setCurrentLesson((prevLesson) => prevLesson + 1);
    }
  };

  const handlePreviousLesson = () => {
    setCurrentLesson((prevLesson) => prevLesson - 1);
  };

  return (
    <div className="main-con">
      <LessonDirector items={lessons} />
      <div className="lesson-container">
        <div className="inner-con">
          <h1 className="lesson-title">Objects in JavaScript</h1>
          <div className="lesson-content">
            <section id="Introduction" className="lesson-section">
              <h2>Introduction to Objects</h2>
             
              <div className="figure">
              <p>
                Imagine you have a magical box that can store different attributes about a person, such as their name, age, and occupation. This box is called an object in JavaScript. An object is a collection of key-value pairs where each key is a unique identifier (like a label) and each value can be anything, including numbers, strings, arrays, or even other objects!
              </p>
                <img src={icon} alt="icon" width="300px" />
              </div>
              <p>Objects help us organize data in a structured way, making it easier to manage and manipulate.</p>
            </section>

            <section id="CreatingObjects" className="lesson-section">
              <h2>Creating Objects</h2>
              <p>
                To create an object, you use curly braces <code>{'{}'}</code> and define key-value pairs inside them. Here's an example:
              </p>
              <pre>
                <code>
                  <b>var</b> person = {'{'} name: "Alice", age: 25, occupation: "Engineer" {'}'};
                </code>
              </pre>
              <p>
                In this example, <b>person</b> is an object with three properties: <b>name</b>, <b>age</b>, and <b>occupation</b>. Each property has a key (like <b>name</b>) and a value (like "Alice").
              </p>
            </section>

            <section id="AccessingProperties" className="lesson-section">
              <h2>Accessing Properties</h2>
              <p>
                You can access the properties of an object using dot notation or bracket notation. Here's how:
              </p>
              <pre>
                <code>
                  // Dot notation
                  <br />
                  alert(person.name); // Outputs: Alice
                  <br />
                  <br />
                  // Bracket notation
                  <br />
                  alert(person["age"]); // Outputs: 25
                </code>
              </pre>
              <p>Both notations work the same, but dot notation is more common and easier to read.</p>
            </section>

            <section id="MethodsInObjects" className="lesson-section">
              <h2>Methods in Objects</h2>
              <p>
                Objects can also have functions as their properties. These functions are called methods. Let's add a method to our <b>person</b> object:
              </p>
              <pre>
                <code>
                  <b>var</b> person = {'{'}
                  <br />
                  &nbsp;name: "Alice",
                  <br />
                  &nbsp;age: 25,
                  <br />
                  &nbsp;occupation: "Engineer",
                  <br />
                  &nbsp;greet: <b>function</b>() {'{'}
                  <br />
                  &nbsp;&nbsp;alert("Hello, my name is " + this.name);
                  <br />
                  &nbsp;{'}'}
                  <br />
                  {'}'};
                  <br />
                  person.greet(); // Outputs: Hello, my name is Alice
                </code>
              </pre>
              <p>
                In this example, <b>greet</b> is a method that alerts a greeting message using the <b>name</b> property of the <b>person</b> object.
              </p>
            </section>

            <section id="MoreObjectFun" className="lesson-section">
              <h2>More Object Fun!</h2>
              <p>
                Objects can contain other objects, arrays, and any data type in JavaScript. Let's create an object that contains an array and another object:
              </p>
              <pre>
                <code>
                  <b>var</b> student = {'{'}
                  <br />
                  &nbsp;name: "Bob",
                  <br />
                  &nbsp;age: 22,
                  <br />
                  &nbsp;courses: ["Math", "Science", "History"],
                  <br />
                  &nbsp;address: {'{'}
                  <br />
                  &nbsp;&nbsp;street: "123 Main St",
                  <br />
                  &nbsp;&nbsp;city: "Metropolis"
                  <br />
                  &nbsp;{'}'}
                  <br />
                  {'}'};
                  <br />
                  alert(student.courses[1]); // Outputs: Science
                  <br />
                  alert(student.address.city); // Outputs: Metropolis
                </code>
              </pre>
              <JsEditor3
                defaultCode={`var student = {
  name: "Bob",
  age: 22,
  courses: ["Math", "Science", "History"],
  address: {
    street: "123 Main St",
    city: "Metropolis"
  }
};
alert(student.courses[1]); // Outputs: Science
alert(student.address.city); // Outputs: Metropolis`}
                onExecute={(code) => {
                  try {
                    eval(code);
                  } catch (error) {
                    console.error('Error executing code:', error);
                  }
                }}
              />
            </section>

            <section id="MoreObjectExamples" className="lesson-section">
              <h2>More Object Examples</h2>
              <p>Here are more examples to help you understand how objects work:</p>
              <pre>
                <code>
                  // Creating an object with a nested object and array
                  <br />
                  <b>var</b> car = {'{'}
                  <br />
                  &nbsp;brand: "Toyota",
                  <br />
                  &nbsp;model: "Corolla",
                  <br />
                  &nbsp;year: 2020,
                  <br />
                  &nbsp;features: ["Air Conditioning", "Bluetooth", "Backup Camera"],
                  <br />
                  &nbsp;owner: {'{'}
                  <br />
                  &nbsp;&nbsp;name: "John",
                  <br />
                  &nbsp;&nbsp;age: 30
                  <br />
                  &nbsp;{'}'}
                  <br />
                  {'}'};
                  <br />
                  alert(car.features[0]); // Outputs: Air Conditioning
                  <br />
                  alert(car.owner.name); // Outputs: John
                </code>
              </pre>
              <JsEditor3
                defaultCode={`var car = {
  brand: "Toyota",
  model: "Corolla",
  year: 2020,
  features: ["Air Conditioning", "Bluetooth", "Backup Camera"],
  owner: {
    name: "John",
    age: 30
  }
};
alert(car.features[0]); // Outputs: Air Conditioning
alert(car.owner.name); // Outputs: John`}
                onExecute={(code) => {
                  try {
                    eval(code);
                  } catch (error) {
                    console.error('Error executing code:', error);
                  }
                }}
              />
            </section>

            <section id="CodingStation" className="lesson-section">
              <h2>Time for Fun Coding!</h2>
              <p>
                Ready to try it yourself? Let's use the magic vortex - code editor below to create your own objects and experiment with different properties and methods!
              </p>
              <h2 style={{ color: 'var(--highlight-color2)', textAlign: 'center' }}>Let's get into Vortex - Play Around</h2>

              <h4 style={{ textAlign: 'center' }}>
                Use the code editor to create an object representing your favorite book, including properties for title, author, and year published, and a method to display a description of the book.
              </h4>
              <Mini_IDE/>
              <br />
              <h2 style={{ textAlign: 'center' }}>Here's a Quiz</h2>

              <Quiz question={question} correctAnswer={correctAnswer} badgeSrc={badge4} quizCompleted={quizCompleted} onCorrect={() => handleQuizCompletion(true)} />
            </section>
          </div>
        </div>

        <LessonNavigator currentLesson={currentLesson} totalLessons={totalLessons} onNextLesson={handleNextLesson} onPreviousLesson={handlePreviousLesson} />
      </div>
    </div>
  );
}

export default Lesson4;
