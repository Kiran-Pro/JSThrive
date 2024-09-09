/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import LessonNavigator from "../../../components/LessonNavigator";
import "./Lessons.css";
import icon from "../../../resources/array.png";
import JsEditor from "../../../components/codeEditor/JsEditor";
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
import badge3 from "../../../resources/snail_badge.png";
import LessonDirector from "./LessonDirector";
import Mini_IDE from "../../../components/codeEditor/Mini_codeEditor/Mini_IDE";

const defaultCode3 = `var fruits = ["Apple", "Banana", "Mango"];
alert(fruits.join(", "));`;

const question = "What is an array in JavaScript?";
const correctAnswer = "collection";

const lessons = [
  { label: "Introduction", href: "#Introduction" },
  { label: "Creating Arrays", href: "#CreatingArrays" },
  { label: "Array Methods", href: "#ArrayMethods" },
  { label: "CodingStation", href: "#CodingStation" },
];

function Lesson3() {
  const [currentLesson, setCurrentLesson] = useState(3);
  const totalLessons = 9; // Assuming there are 9 lessons total
  const [, setProgress] = useState(33); // Progress in percentage
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
          setQuizCompleted(userData.lessonQuizzes?.lesson3 || false);
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
      const newBadge = badge3;

      try {
        await updateDoc(userDocRef, {
          lessonsCompleted: increment(1),
          badges: arrayUnion(newBadge),
          points: increment(100),
          [`lessonQuizzes.lesson3`]: true,
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
          <h1 className="lesson-title">Arrays in JavaScript</h1>
          <div className="lesson-content">
            <br />
            <br />
            <section id="Introduction" className="lesson-section">
              <h2>Introduction to Arrays</h2>

              <p>
                Arrays are like magical lists that can hold multiple items in a
                single variable. Imagine a treasure chest that can store a
                collection of valuable items like gold coins, jewels, and
                potions. In JavaScript, arrays can store numbers, strings,
                objects, and even other arrays.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={icon} alt="icon" width="300px" />
              </div>
              <p>
                Consider an array as a special box where you can keep a list of
                your favorite fruits: ["Apple", "Banana", "Mango"].
              </p>
              <p>Let's explore how to create and use arrays in JavaScript!</p>
              <br />
            </section>

            <section id="CreatingArrays" className="lesson-section">
              <h2>Creating Arrays</h2>
              <p>
                To create an array, you can use square brackets and separate
                each item with a comma. Here’s an example:
              </p>
              <pre>
                <code>
                  <b>var</b> fruits = ["Apple", "Banana", "Mango"];
                </code>
              </pre>
              <p>
                Each item in the array is called an element, and they are
                accessed using their index (position) in the array. Indexes
                start from 0, so "Apple" is at index 0, "Banana" is at index 1,
                and "Mango" is at index 2.
              </p>
              <p>You can also create an empty array and add items later:</p>
              <pre>
                <code>
                  <b>var</b> fruits = [];
                </code>
              </pre>
              <p>
                Then you can use the <code>push</code> method to add items:
              </p>
              <pre>
                <code>fruits.push("Apple");</code>
              </pre>
              <pre>
                <code>fruits.push("Banana");</code>
              </pre>
              <pre>
                <code>fruits.push("Mango");</code>
              </pre>
              <br />
            </section>

            <section id="ArrayMethods" className="lesson-section">
              <h2>Array Methods</h2>
              <p>
                JavaScript arrays come with a variety of built-in methods to
                help you manipulate and interact with the items they contain.
                Here are a few useful methods:
              </p>
              <ul>
                <li>
                  <strong>push(item):</strong> Adds an item to the end of the
                  array.
                </li>
                <li>
                  <strong>pop():</strong> Removes the last item from the array.
                </li>
                <li>
                  <strong>shift():</strong> Removes the first item from the
                  array.
                </li>
                <li>
                  <strong>unshift(item):</strong> Adds an item to the beginning
                  of the array.
                </li>
                <li>
                  <strong>length:</strong> Returns the number of items in the
                  array.
                </li>
                <li>
                  <strong>join(separator):</strong> Combines all array items
                  into a single string, separated by the specified separator.
                </li>
              </ul>
              <br />
              <h2>Example</h2>
              <p>
                Let’s see an example of how we can use some of these methods:
              </p>
              <pre>
                <code>
                  <b>var</b> fruits = ["Apple", "Banana", "Mango"];
                  alert(fruits.join(", ")); // Output: Apple, Banana, Mango
                </code>
              </pre>
              <JsEditor
                defaultCode={defaultCode3}
                onExecute={(code) => {
                  try {
                    eval(code);
                  } catch (error) {
                    console.error("Error executing code:", error);
                  }
                }}
              />
            </section>
            <br />

            <section id="MoreArrayFun" className="lesson-section">
              <h2>More Array Fun!</h2>
              <p>
                Arrays can store different types of data at the same time. You
                can have an array that contains numbers, strings, and even other
                arrays:
              </p>
              <pre>
                <code>
                  <b>var</b> mixedArray = [42, "Hello", [1, 2, 3]];
                </code>
              </pre>
              <p>
                Accessing elements in an array is easy. You can use the index to
                get an element:
              </p>
              <pre>
                <code>
                  <b>var</b> firstFruit = fruits[0]; // Apple
                </code>
              </pre>
              <pre>
                <code>
                  <b>var</b> secondFruit = fruits[1]; // Banana
                </code>
              </pre>
              <p>Remember, the index starts from 0!</p>
              <p>Let's add some elements to our mixed array and print them:</p>
              <JsEditor
                defaultCode={`<b>var</b> mixedArray = [42, "Hello", [1, 2, 3]];
alert(mixedArray[1]); // Hello`}
                onExecute={(code) => {
                  try {
                    eval(code);
                  } catch (error) {
                    console.error("Error executing code:", error);
                  }
                }}
              />
            </section>
            <br />

            <section id="MoreArrayExamples" className="lesson-section">
              <h2>More Array Examples</h2>
              <p>
                Here are more examples to help you understand how arrays work:
              </p>
              <pre>
                <code>
                  // Creating an array of numbers <br />
                  <b>var</b> numbers = [1, 2, 3, 4, 5]; alert(numbers.length);
                  // 5
                </code>
              </pre>
              <pre>
                <code>
                  // Adding and removing items <br />
                  numbers.push(6); // [1, 2, 3, 4, 5, 6] numbers.pop(); // [1,
                  2, 3, 4, 5]
                </code>
              </pre>
              <pre>
                <code>
                  // Joining elements into a string <br />
                  <b>var</b> joinedNumbers = numbers.join(" - ");
                  alert(joinedNumbers); // "1 - 2 - 3 - 4 - 5"
                </code>
              </pre>
              <JsEditor
                defaultCode={`<b>var</b> numbers = [1, 2, 3, 4, 5];
alert(numbers.join(" - ")); // "1 - 2 - 3 - 4 - 5"`}
                onExecute={(code) => {
                  try {
                    eval(code);
                  } catch (error) {
                    console.error("Error executing code:", error);
                  }
                }}
              />
            </section>
            <br />

            <section id="CodingStation" className="lesson-section">
              <h2>Time for Fun Coding!</h2>
              <p>
                Ready to try it yourself? Let's use the magic vortex - code
                editor below to create your own arrays and experiment with
                different methods!
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
                Use the code editor to create an array of your favorite movies
                and manipulate it using different methods.
              </h4>
              <Mini_IDE />
              <br />
              <h2 style={{ textAlign: "center" }}>Here's a Quiz</h2>

              <Quiz
                question={question}
                correctAnswer={correctAnswer}
                badgeSrc={badge3}
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

export default Lesson3;
