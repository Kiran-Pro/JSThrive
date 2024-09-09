/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import LessonNavigator from "../../../components/LessonNavigator";
import "./Lessons.css";
import icon from "../../../resources/boxes.png";
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
import badge2 from "../../../resources/tortoise_badge.png";
import LessonDirector from "./LessonDirector";
import JsEditor from "../../../components/codeEditor/JsEditor";

const defaultCode2 = `var secondsInAMinute = 60;
var minutesInAnHour = 60;
var secondsInAnHour = secondsInAMinute * minutesInAnHour;
alert(secondsInAnHour);`;

const question = "How many ways to describe a variable";
const correctAnswer = "3";

const lessons = [
  { label: "Variables?", href: "#Variables" },
  { label: "Declare Variable", href: "#Declare Variable" },
  { label: "DataTypes", href: "#DataTypes" },
  { label: "CodingStation", href: "#CodingStation" },
];

function Lesson2() {
  const [currentLesson, setCurrentLesson] = useState(2);
  const totalLessons = 9;
  const [, setProgress] = useState(22);
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
          setQuizCompleted(userData.lessonQuizzes?.lesson2 || false);
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
      const newBadge = badge2;

      try {
        await updateDoc(userDocRef, {
          lessonsCompleted: increment(1),
          badges: arrayUnion(newBadge),
          points: increment(100),
          [`lessonQuizzes.lesson2`]: true,
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
          <h1 className="lesson-title">
            Let's Learn About Variables and Data Types!
          </h1>
          <div className="lesson-content">
            <br />
            <br />
            <section id="Variables" className="lesson-section">
              <h2>Meet Variables!</h2>
              <p>
                Imagine you have a box where you can keep your favorite toys,
                candies, or even your age. That box is like a variable in
                JavaScript! It holds onto things for you so you can use them
                later in your programs.
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
              <p>Here, we're putting "Bob", true, 35 in a box</p>
              <p>
                Consider <i>box</i> is a Variable
              </p>
              <p>
                Now there are some ways to declare variable before that let's
                understand what's a Syntax
              </p>
              <h2 id="Syntax">Syntax</h2>
              <p>
                includes lots of symbols, including parentheses (), semicolons ;
                curly brackets {}, plus signs + and a few words that might seem
                mysterious at first (like var and console.log). These are all
                part of JavaScript’s syntax—that is, JavaScript’s rules for how
                to combine symbols and words to create working programs. When
                you’re learning a new programming language, one of the trickiest
                parts is getting used to the rules for how to write different
                kinds of instructions to the computer. When you’re first
                starting out, it’s easy to forget when to include parentheses,
                or to mix up the order in which you need to include certain
                values. But as you practice, you’ll start to get the hang of it.
              </p>
              <br />
              <h2>Let's Thrive!</h2>
              <p>
                Try it out! Think of your favorite color and pretend it's stored
                in a variable called <code>favoriteColor</code>. You can change
                the color anytime you want!
              </p>
              <br />
              <h3 id="Declare Variable">Ways to declare a Variable:</h3>
              <p>
                To create a new variable, use the keyword <b>var</b>, followed
                by the name of the variable. A keyword is a word that has
                special meaning in JavaScript. In this case, when we type var,
                JavaScript knows that we are about to enter the name of a new
                variable. For example, here’s how you’d make a new variable
                called nick:
              </p>
              <b>var nick</b>
              <br />
              <i>undefined</i>
              <br />
              <p>
                We’ve created a new variable called nick. The console spits out
                undefined in response. But this isn’t an error! That’s just what
                JavaScript does whenever a command doesn’t return a value.
              </p>
              <p>To give the variable a value, use the equal sign:</p>
              <b>var nick = 12</b>
              <p>
                Here we assigned <b>12</b> to <b>nick</b>
              </p>
              <p>we can modify it later by arithmetic operations</p>
              <br />

              <h2>Seconds in an Hour</h2>
              <br />
              <p>
                First we create two new variables called secondsInAMinute and
                minutesInAnHour and make them both 60 (because, as we know,
                there are 60 seconds in a minute and 60 minutes in an hour).
                Then we create a variable called secondsInAnHour and set its
                value to the result of multiplying secondsInAMinute and
                minutesInAnHour. After, we enter secondsInAnHour, which is like
                saying, “Tell me the value of secondsInAnHour right now!”
                JavaScript then gives you the answer: it’s 3600.
              </p>
              <br />
              <JsEditor
                defaultCode={defaultCode2}
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
            <br />

            <section id="DataTypes" className="lesson-section">
              <h2>Explore Data Types</h2>
              <p>
                Now, let's talk about the different types of things JavaScript
                understands:
              </p>
              <ul>
                <li>
                  <strong>Numbers:</strong> Like your age or how many cookies
                  you have.
                </li>
                <li>
                  <strong>Strings:</strong> These are words or sentences, like
                  your name or your favorite color.
                </li>
                <li>
                  <strong>Booleans:</strong> These are like answering yes or no
                  questions. For example, are you hungry? (true or false).
                </li>
                <li>
                  <strong>Undefined:</strong> When something hasn't been given a
                  value yet, it's called undefined. It's like having an empty
                  box that hasn't been filled yet.
                </li>
                <li>
                  <strong>Null:</strong> Sometimes you might want to say that
                  something doesn't exist. That's null. It's like having an
                  empty box on purpose.
                </li>
              </ul>
            </section>
            <br />
            <br />
            <section id="CodingStation" className="lesson-section">
              <h2>Time for Fun Coding!</h2>
              <p>
                Ready to try it yourself? Let's use the magic vortex - code
                editor below to create your own variables and make cool things
                happen!
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
                Use the code editor to create variables for your characters,
                their age, and what they like to do.
              </h4>
              <h3 style={{ textAlign: "center" }}>Create 3 characters below</h3>
              <JsEditor
                defaultCode="write Here!"
                onExecute={(code2) => {
                  try {
                    eval(code2);
                  } catch (error) {
                    console.error("Error executing code:", error);
                  }
                }}
              />
              <br />
              <h2 style={{ textAlign: "center" }}>Here's a Quiz</h2>

              <Quiz
                question={question}
                correctAnswer={correctAnswer}
                badgeSrc={badge2}
                quizCompleted={quizCompleted}
                onCorrect={() => handleQuizCompletion(true)}
              />
            </section>
            <br />
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

export default Lesson2;
