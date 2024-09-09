/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import LessonNavigator from "../../../components/LessonNavigator";
import "./Lessons.css";
import icon from "../../../resources/pseudocode.png";
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
import badge8 from "../../../resources/cheetah_badge.png";
import LessonDirector from "./LessonDirector";
import Mini_IDE_Simple from "../../../components/codeEditor/Mini_IDE_Simple";

const question = "What is PseudoCode?";
const correctAnswer = "simplified way of writing programming logic";

const lessons = [
  { label: "Introduction", href: "#Introduction" },
  { label: "Why Use PseudoCode?", href: "#WhyUsePseudoCode" },
  { label: "Writing PseudoCode", href: "#WritingPseudoCode" },
  { label: "Example 1: Summing Numbers", href: "#Example1" },
  { label: "Example 2: Finding the Largest Number", href: "#Example2" },
  { label: "From PseudoCode to Code", href: "#FromPseudoCodeToCode" },
  { label: "CodingStation", href: "#CodingStation" },
];

function Lesson8() {
  const [currentLesson, setCurrentLesson] = useState(8);
  const totalLessons = 9;
  const [, setProgress] = useState(88);
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
          setQuizCompleted(userData.lessonQuizzes?.lesson8 || false);
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
      const newBadge = badge8;

      try {
        await updateDoc(userDocRef, {
          lessonsCompleted: increment(1),
          badges: arrayUnion(newBadge),
          points: increment(100),
          [`lessonQuizzes.lesson8`]: true,
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
          <h1 className="lesson-title">PseudoCode in Programming</h1>
          <div className="lesson-content">
            <section id="Introduction" className="lesson-section">
              <h2>Introduction to PseudoCode</h2>

              <div className="figure">
                <p>
                  PseudoCode is a simplified way of writing the steps and logic
                  of a program without worrying about the specific syntax of a
                  programming language. It's like an outline of your code
                  written in plain language that helps you plan and understand
                  the flow of your program.
                </p>
                <img src={icon} alt="PseudoCode" width="300px" />
              </div>
            </section>

            <section id="WhyUsePseudoCode" className="lesson-section">
              <h2>Why Use PseudoCode?</h2>
              <ul>
                <li>
                  <b>Clarifies Thinking:</b> Helps you organize your thoughts
                  and plan the structure of your program.
                </li>
                <li>
                  <b>Language Independent:</b> Can be understood by anyone,
                  regardless of the programming language they use.
                </li>
                <li>
                  <b>Easy to Understand:</b> Uses plain language to describe
                  logic, making it easier to communicate ideas.
                </li>
                <li>
                  <b>Prevents Errors:</b> Helps you identify and fix logical
                  errors before writing actual code.
                </li>
              </ul>
            </section>

            <section id="WritingPseudoCode" className="lesson-section">
              <h2>Writing PseudoCode</h2>
              <p>
                When writing PseudoCode, you should focus on the logic and flow
                of your program rather than the syntax. Here's a simple example:
              </p>
              <pre className="code-block">
                <code>
                  {`PseudoCode to add two numbers:
1. Start
2. Initialize variables num1 and num2 with values
3. Add num1 and num2 and store the result in sum
4. Display the sum
5. End`}
                </code>
              </pre>
              <p>
                PseudoCode is written in a way that anyone can understand, even
                if they are not familiar with programming.
              </p>
            </section>

            <section id="Example1" className="lesson-section">
              <h2>Example 1: Summing Numbers</h2>
              <p>Let's write PseudoCode to sum numbers in a list:</p>
              <pre className="code-block">
                <code>
                  {`PseudoCode to sum numbers in a list:
1. Start
2. Initialize a list of numbers
3. Initialize sum to 0
4. For each number in the list, add it to sum
5. Display sum
6. End`}
                </code>
              </pre>
              <p>
                This PseudoCode outlines the logic to sum numbers in a list
                without worrying about syntax.
              </p>
            </section>

            <section id="Example2" className="lesson-section">
              <h2>Example 2: Finding the Largest Number</h2>
              <p>
                Let's write PseudoCode to find the largest number in a list:
              </p>
              <pre className="code-block">
                <code>
                  {`PseudoCode to find the largest number in a list:
1. Start
2. Initialize a list of numbers
3. Initialize largest to the first number in the list
4. For each number in the list, if the number is greater than largest, update largest
5. Display largest
6. End`}
                </code>
              </pre>
              <p>Now, let's convert this PseudoCode into JavaScript code:</p>
              <pre className="code-block">
                <code>
                  {`// JavaScript code to find the largest number in a list
function findLargestNumber(list) {
  let largest = list[0];
  for (let i = 1; i < list.length; i++) {
    if (list[i] > largest) {
      largest = list[i];
    }
  }
  return largest;
}
const numbers = [1, 2, 3, 4, 5];
console.log(findLargestNumber(numbers)); // Outputs: 5`}
                </code>
              </pre>
            </section>

            <section id="MorePseudoCodeExamples" className="lesson-section">
              <h2>More PseudoCode Examples</h2>
              <p>
                Let's look at a few more examples to help solidify your
                understanding:
              </p>
              <pre className="code-block">
                <code>
                  {`PseudoCode to check if a number is even or odd:
1. Start
2. Initialize a number
3. If the number is divisible by 2, display "Even"
4. Else, display "Odd"
5. End`}
                </code>
              </pre>
              <pre className="code-block">
                <code>
                  {`// JavaScript code to check if a number is even or odd
function checkEvenOdd(number) {
  if (number % 2 === 0) {
    console.log("Even");
  } else {
    console.log("Odd");
  }
}
const number = 7;
checkEvenOdd(number); // Outputs: Odd`}
                </code>
              </pre>
            </section>

            <section id="CodingStation" className="lesson-section">
              <h2>Time for Fun Coding!</h2>
              <p>
                Ready to try it yourself? Let's use the magic vortex - code
                editor below to write your own PseudoCode and convert it into
                JavaScript!
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
                Use the code editor to write PseudoCode for a problem and then
                convert it into JavaScript code.
              </h4>
              <Mini_IDE_Simple htmlCode="" />
              <br />
              <h2 style={{ textAlign: "center" }}>Here's a Quiz</h2>

              <Quiz
                question={question}
                correctAnswer={correctAnswer}
                badgeSrc={badge8}
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

export default Lesson8;
