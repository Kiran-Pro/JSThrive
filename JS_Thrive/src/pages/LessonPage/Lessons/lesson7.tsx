/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import LessonNavigator from "../../../components/LessonNavigator";
import "./Lessons.css";
import icon from "../../../resources/function.png";
import JsEditor3 from "../../../components/codeEditor/JsEditor";
import Quiz from "../../../components/Quiz/Quiz";
import { firestore, app } from "../../../firebase.config";
import {
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  increment,
} from "firebase/firestore";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import badge7 from "../../../resources/horse_badge.png";
import LessonDirector from "./LessonDirector";
import Mini_IDE from "../../../components/codeEditor/Mini_codeEditor/Mini_IDE";

const question = "What is a function in JavaScript?";
const correctAnswer = "reusable block of code";

const lessons = [
  { label: "Introduction", href: "#Introduction" },
  { label: "Defining Functions", href: "#DefiningFunctions" },
  { label: "Calling Functions", href: "#CallingFunctions" },
  { label: "Function Parameters", href: "#FunctionParameters" },
  { label: "Return Values", href: "#ReturnValues" },
  { label: "Function Expressions", href: "#FunctionExpressions" },
  { label: "Arrow Functions", href: "#ArrowFunctions" },
  { label: "CodingStation", href: "#CodingStation" },
];

function Lesson7() {
  const [currentLesson, setCurrentLesson] = useState(7);
  const totalLessons = 9;
  const [, setProgress] = useState(77);
  const [, setBadges] = useState<string[]>([]);
  const [isCompleted] = useState(false);
  const [, setLessonsCompleted] = useState<number>(0);
  const [, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string>("");
  const [, setPoints] = useState(0);
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
    return onSnapshot(
      userDocRef,
      (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setLessonsCompleted(userData.lessonsCompleted);
          setBadges(userData.badges || []);
          setPoints(userData.points || 0);
          setQuizCompleted(userData.lessonQuizzes?.lesson7 || false);
          setProgress(((userData.lessonsCompleted || 0) / totalLessons) * 100);
        } else {
          console.log("No user data available");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data");
        setLoading(false);
      }
    );
  };

  const handleQuizCompletion = async (isCorrect: boolean) => {
    if (isCorrect && user && !quizCompleted) {
      const userDocRef = doc(firestore, "users", user.uid);
      const newBadge = badge7;

      try {
        await updateDoc(userDocRef, {
          lessonsCompleted: increment(1),
          badges: arrayUnion(newBadge),
          points: increment(100),
          [`lessonQuizzes.lesson7`]: true,
        });
        setLessonsCompleted((prev) => {
          const newCount = prev + 1;
          setProgress((newCount / totalLessons) * 100);
          return newCount;
        });
        setBadges((prev) => [...prev, newBadge]);
        setPoints((prev) => prev + 100);
        setQuizCompleted(true);
        console.log(
          "Profile updated successfully with additional points and badge"
        );
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
          <h1 className="lesson-title">Functions in JavaScript</h1>
          <div className="lesson-content">
            <section id="Introduction" className="lesson-section">
              <h2>Introduction to Functions</h2>
              <p>
                Functions are like magical recipes in JavaScript. They allow you
                to create reusable blocks of code that perform specific tasks.
                Think of a function as a set of instructions that you can call
                whenever you need to perform that task. Just like a recipe, a
                function takes ingredients (called parameters) and follows steps
                to produce a result.
              </p>
              <div className="figure">
                <img src={icon} alt="icon" width="300px" />
              </div>
              <p>Let's explore how functions work in JavaScript!</p>
            </section>

            <section id="DefiningFunctions" className="lesson-section">
              <h2>Defining Functions</h2>
              <p>
                To define a function, you use the <b>function</b> keyword
                followed by a name, parentheses, and curly braces. The code
                inside the curly braces is the function's body. Here's an
                example:
              </p>
              <pre>
                <code>
                  <b>function</b> sayHello() {"{"}
                  <br />
                  &nbsp;&nbsp;alert("Hello, world!");
                  <br />
                  {"}"}
                </code>
              </pre>
              <p>
                In this example, we defined a function named <b>sayHello</b>{" "}
                that displays an alert with the message "Hello, world!".
              </p>
            </section>

            <section id="CallingFunctions" className="lesson-section">
              <h2>Calling Functions</h2>
              <p>
                To call a function, you simply use its name followed by
                parentheses. Here's how you call the <b>sayHello</b> function:
              </p>
              <pre>
                <code>sayHello();</code>
              </pre>
              <p>
                When you call the function, the code inside the function's body
                will run.
              </p>
            </section>

            <section id="FunctionParameters" className="lesson-section">
              <h2>Function Parameters</h2>
              <p>
                Functions can take inputs called parameters. You can define
                parameters inside the parentheses when you define the function.
                Here's an example:
              </p>
              <pre>
                <code>
                  <b>function</b> greet(name) {"{"}
                  <br />
                  &nbsp;&nbsp;alert("Hello, " + name + "!");
                  <br />
                  {"}"}
                </code>
              </pre>
              <p>
                In this example, the <b>greet</b> function takes one parameter
                called <b>name</b>. When you call the function, you can pass a
                value for the parameter:
              </p>
              <pre>
                <code>greet("Alice"); // Outputs: Hello, Alice!</code>
              </pre>
            </section>

            <section id="ReturnValues" className="lesson-section">
              <h2>Return Values</h2>
              <p>
                Functions can also return values. You use the <b>return</b>{" "}
                keyword to specify the value that should be returned. Here's an
                example:
              </p>
              <pre>
                <code>
                  <b>function</b> add(a, b) {"{"}
                  <br />
                  &nbsp;&nbsp;<b>return</b> a + b;
                  <br />
                  {"}"}
                </code>
              </pre>
              <p>
                In this example, the <b>add</b> function takes two parameters,{" "}
                <b>a</b> and <b>b</b>, and returns their sum. You can store the
                returned value in a variable:
              </p>
              <pre>
                <code>
                  <b>var</b> result = add(3, 4); // result is now 7
                </code>
              </pre>
            </section>

            <section id="FunctionExpressions" className="lesson-section">
              <h2>Function Expressions</h2>
              <p>
                In JavaScript, you can also define functions using function
                expressions. A function expression is when you assign a function
                to a variable. Here's an example:
              </p>
              <pre>
                <code>
                  <b>var</b> multiply = <b>function</b>(a, b) {"{"}
                  <br />
                  &nbsp;&nbsp;<b>return</b> a * b;
                  <br />
                  {"}"};
                </code>
              </pre>
              <p>
                In this example, we defined a function that multiplies two
                numbers and assigned it to the variable <b>multiply</b>. You can
                call this function using the variable name:
              </p>
              <pre>
                <code>
                  <b>var</b> result = multiply(3, 4); // result is now 12
                </code>
              </pre>
            </section>

            <section id="ArrowFunctions" className="lesson-section">
              <h2>Arrow Functions</h2>
              <p>
                Arrow functions are a shorthand way to write functions in
                JavaScript. They are especially useful for writing short
                functions. Here's an example:
              </p>
              <pre>
                <code>
                  <b>const</b> subtract = (a, b) =&gt; a - b;
                </code>
              </pre>
              <p>
                In this example, we defined an arrow function that subtracts two
                numbers. Arrow functions are great for simplifying your code and
                making it more readable.
              </p>
            </section>

            <section id="MoreFunctionFun" className="lesson-section">
              <h2>More Fun with Functions!</h2>
              <p>
                Let's experiment with functions using the code editor below. Try
                creating different functions and see what results you get!
              </p>
              <JsEditor3
                defaultCode={`function sayHello() {
  alert("Hello, world!");
}

function greet(name) {
  alert("Hello, " + name + "!");
}

function add(a, b) {
  return a + b;
}

const multiply = function(a, b) {
  return a * b;
};

const subtract = (a, b) => a - b;

sayHello();
greet("Alice");
var result = add(3, 4);
alert(result); // Outputs: 7
result = multiply(3, 4);
alert(result); // Outputs: 12
result = subtract(10, 5);
alert(result); // Outputs: 5`}
                onExecute={(code) => {
                  try {
                    eval(code);
                  } catch (error) {
                    console.error("Error executing code:", error);
                  }
                }}
              />
            </section>

            <section id="CodingStation" className="lesson-section">
              <h2>Time for Fun Coding!</h2>
              <p>
                Ready to try it yourself? Let's use the magic vortex - code
                editor below to experiment with functions and create your own
                examples!
              </p>
              <h2
                style={{
                  color: "var(--highlight-color2)",
                  textAlign: "center",
                }}
              >
                Let's get into Vortex - Play Around
              </h2>

              <h4 style={{ textAlign: "center" }}>
                Use the code editor to create different functions and see what
                you can do with them.
              </h4>
              <Mini_IDE />
              <br />
              <h2 style={{ textAlign: "center" }}>Here's a Quiz</h2>

              <Quiz
                question={question}
                correctAnswer={correctAnswer}
                badgeSrc={badge7}
                quizCompleted={quizCompleted}
                onCorrect={() => handleQuizCompletion(true)}
              />
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

export default Lesson7;
