/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import LessonNavigator from '../../../components/LessonNavigator';
import './Lessons.css';
import icon from '../../../resources/conditions.png';
import icon2 from '../../../resources/for.png';
import JsEditor3 from '../../../components/codeEditor/JsEditor';
import Quiz from '../../../components/Quiz/Quiz';
import { firestore, app } from '../../../firebase.config';
import { doc, updateDoc, arrayUnion, onSnapshot, increment } from 'firebase/firestore';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import badge6 from '../../../resources/kangaroo_badge.png';
import LessonDirector from './LessonDirector';
import JsEditor2 from '../../../components/codeEditor/JsEditor';

const question = 'What does a "for" loop do in JavaScript?';
const correctAnswer = 'repeat a block of code';

const lessons = [
  { label: 'Introduction', href: '#Introduction' },
  { label: 'If Statements', href: '#IfStatements' },
  { label: 'Switch Statements', href: '#SwitchStatements' },
  { label: 'For Loops', href: '#ForLoops' },
  { label: 'While Loops', href: '#WhileLoops' },
  { label: 'CodingStation', href: '#CodingStation' },
];

function Lesson6() {
  const [currentLesson, setCurrentLesson] = useState(6);
  const totalLessons = 9; 
  const [progress, setProgress] = useState(66); 
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
        setQuizCompleted(userData.lessonQuizzes?.lesson6 || false); 
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
      const newBadge = badge6;

      try {
        await updateDoc(userDocRef, {
          lessonsCompleted: increment(1),
          badges: arrayUnion(newBadge),
          points: increment(100),
          [`lessonQuizzes.lesson6`]: true, 
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
          <h1 className="lesson-title">Conditions and Loops in JavaScript</h1>
          <div className="lesson-content">
            <section id="Introduction" className="lesson-section">
              <h2>Introduction to Conditions and Loops</h2>
            
              <div className="figure">
              <p>
                Conditions and loops are fundamental concepts in programming that allow you to control the flow of your code. Think of conditions as decision-making tools and loops as repetitive tasks.
              </p>
                <img src={icon} alt="icon" width="300px" />
              </div>
              <p>Let's explore how conditions and loops work in JavaScript!</p>
            </section>

            <section id="IfStatements" className="lesson-section">
              <h2>If Statements</h2>
              <p>
                If statements are used to make decisions in your code. If a condition is true, a block of code will run. If it's false, the block of code will be skipped. Here's an example:
              </p>
              <pre>
                <code>
                  <b>var</b> time = 10;
                  <br />
                  <b>if</b> (time &lt; 12) {'{'}
                  <br />
                  &nbsp;&nbsp;alert("Good morning!");
                  <br />
                  {'}'}
                </code>
              </pre>
              <p>
                In this example, if the variable <b>time</b> is less than 12, the message "Good morning!" will be displayed.
              </p>
            </section>

            <section id="SwitchStatements" className="lesson-section">
              <h2>Switch Statements</h2>
              <p>
                Switch statements are used to perform different actions based on different conditions. They are like a series of if statements, but more organized. Here's an example:
              </p>
              <pre>
                <code>
                  <b>var</b> day = "Monday";
                  <br />
                  <b>switch</b> (day) {'{'}
                  <br />
                  &nbsp;&nbsp;<b>case</b> "Monday":
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;alert("Start of the work week!");
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<b>break</b>;
                  <br />
                  &nbsp;&nbsp;<b>case</b> "Friday":
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;alert("Almost the weekend!");
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<b>break</b>;
                  <br />
                  &nbsp;&nbsp;<b>default</b>:
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;alert("Another day!");
                  <br />
                  {'}'}
                </code>
              </pre>
              <p>
                In this example, the message displayed will depend on the value of the variable <b>day</b>.
              </p>
            </section>

            <section id="ForLoops" className="lesson-section">
              <h2>For Loops</h2>
              
              <div className="figure">
              <p>
                For loops are used to repeat a block of code a specified number of times. They are great for tasks like counting or iterating over arrays. Here's an example:
              </p>
                <img src={icon2} alt="icon" width="300px" />
              </div>
              <pre>
                <code>
                  <b>for</b> (<b>var</b> i = 0; i &lt; 5; i++) {'{'}
                  <br />
                  &nbsp;&nbsp;alert("Number: " + i);
                  <br />
                  {'}'}
                </code>
              </pre>
              <p>
                In this example, the message "Number: " followed by the current value of <b>i</b> will be displayed five times, from 0 to 4.
              </p>
            </section>

            <section id="WhileLoops" className="lesson-section">
              <h2>While Loops</h2>
              <p>
                While loops are used to repeat a block of code as long as a specified condition is true. Here's an example:
              </p>
              <pre>
                <code>
                  <b>var</b> i = 0;
                  <br />
                  <b>while</b> (i &lt; 5) {'{'}
                  <br />
                  &nbsp;&nbsp;alert("Number: " + i);
                  <br />
                  &nbsp;&nbsp;i++;
                  <br />
                  {'}'}
                </code>
              </pre>
              <p>
                In this example, the message "Number: " followed by the current value of <b>i</b> will be displayed as long as <b>i</b> is less than 5.
              </p>
            </section>

            <section id="MoreConditionAndLoopFun" className="lesson-section">
              <h2>More Fun with Conditions and Loops!</h2>
              <p>
                Let's experiment with conditions and loops using the code editor below. Try creating different conditions and loops and see what results you get!
              </p>
              <JsEditor3
                defaultCode={`var time = 10;
if (time < 12) {
  alert("Good morning!");
}

var day = "Monday";
switch (day) {
  case "Monday":
    alert("Start of the work week!");
    break;
  case "Friday":
    alert("Almost the weekend!");
    break;
  default:
    alert("Another day!");
}

for (var i = 0; i < 5; i++) {
  alert("Number: " + i);
}

var i = 0;
while (i < 5) {
  alert("Number: " + i);
  i++;
}`}
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
                Ready to try it yourself? Let's use the magic vortex - code editor below to experiment with conditions and loops and create your own examples!
              </p>
              <h2 style={{ color: 'var(--highlight-color2)', textAlign: 'center' }}>Let's get into Vortex - Play Around</h2>

              <h4 style={{ textAlign: 'center' }}>
                Use the code editor to create different conditions and loops to control the flow of your code.
              </h4>
              <JsEditor2 defaultCode='write Here!' onExecute={(code) => {
                try {
                  eval(code);
                } catch (error) {
                  console.error('Error executing code:', error);
                }
              }}/>
              <br />
              <h2 style={{ textAlign: 'center' }}>Here's a Quiz</h2>

              <Quiz question={question} correctAnswer={correctAnswer} badgeSrc={badge6} quizCompleted={quizCompleted} onCorrect={() => handleQuizCompletion(true)} />
            </section>
          </div>
        </div>

        <LessonNavigator currentLesson={currentLesson} totalLessons={totalLessons} onNextLesson={handleNextLesson} onPreviousLesson={handlePreviousLesson} />
      </div>
    </div>
  );
}

export default Lesson6;
