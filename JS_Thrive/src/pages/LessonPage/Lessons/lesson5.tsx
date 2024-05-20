/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import LessonNavigator from '../../../components/LessonNavigator';
import './Lessons.css';
import icon from '../../../resources/operator.png';
import JsEditor3 from '../../../components/codeEditor/JsEditor';
import Quiz from '../../../components/Quiz/Quiz';
import { firestore, app } from '../../../firebase.config';
import { doc, updateDoc, arrayUnion, onSnapshot, increment } from 'firebase/firestore';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import badge5 from '../../../resources/panda_badge.png';
import LessonDirector from './LessonDirector';
import Mini_IDE from '../../../components/codeEditor/Mini_codeEditor/Mini_IDE';

const question = 'What is the result of 3 + 4 * 2?';
const correctAnswer = '11';

const lessons = [
  { label: 'Introduction', href: '#Introduction' },
  { label: 'Arithmetic Operators', href: '#ArithmeticOperators' },
  { label: 'Comparison Operators', href: '#ComparisonOperators' },
  { label: 'Logical Operators', href: '#LogicalOperators' },
  { label: 'Assignment Operators', href: '#AssignmentOperators' },
  { label: 'CodingStation', href: '#CodingStation' },
];

function Lesson5() {
  const [currentLesson, setCurrentLesson] = useState(5);
  const totalLessons = 9;
  const [progress, setProgress] = useState(55);
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
        setQuizCompleted(userData.lessonQuizzes?.lesson5 || false); 
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
      const newBadge = badge5;

      try {
        await updateDoc(userDocRef, {
          lessonsCompleted: increment(1),
          badges: arrayUnion(newBadge),
          points: increment(100),
          [`lessonQuizzes.lesson5`]: true, 
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
          <h1 className="lesson-title">JavaScript Operators</h1>
          <div className="lesson-content">
            <section id="Introduction" className="lesson-section">
              <h2>Introduction to Operators</h2>
             
              <div className="figure">
              <p>
                Operators are special symbols in JavaScript that perform operations on variables and values. Think of them as tools that help you work with data. There are different types of operators in JavaScript, each serving a unique purpose.
              </p>
                <img src={icon} alt="icon" width="300px" />
              </div>
              <p>Let's explore the different types of operators!</p>
            </section>

            <section id="ArithmeticOperators" className="lesson-section">
              <h2>Arithmetic Operators</h2>
              <p>
                Arithmetic operators perform basic mathematical operations like addition, subtraction, multiplication, and division. Here are some common arithmetic operators:
              </p>
              <pre>
                <code>
                  <b>var</b> a = 5;
                  <br />
                  <b>var</b> b = 3;
                  <br />
                  <br />
                  a + b; // Addition, outputs: 8
                  <br />
                  a - b; // Subtraction, outputs: 2
                  <br />
                  a * b; // Multiplication, outputs: 15
                  <br />
                  a / b; // Division, outputs: 1.6667
                  <br />
                  a % b; // Modulus (remainder), outputs: 2
                </code>
              </pre>
              <p>
                Imagine you have 5 apples and you get 3 more. Using the addition operator (<b>+</b>), you now have 8 apples. Similarly, if you give away 2 of those apples, using the subtraction operator (<b>-</b>), you now have 6 apples left.
              </p>
            </section>

            <section id="ComparisonOperators" className="lesson-section">
              <h2>Comparison Operators</h2>
              <p>
                Comparison operators compare two values and return a boolean value (true or false). Here are some common comparison operators:
              </p>
              <pre>
                <code>
                  <b>var</b> a = 5;
                  <br />
                  <b>var</b> b = 3;
                  <br />
                  <br />
                  a == b; // Equal to, outputs: false
                  <br />
                  a != b; // Not equal to, outputs: true
                  <br />
                  a &gt; b; // Greater than, outputs: true
                  <br />
                  a &lt; b; // Less than, outputs: false
                  <br />
                  a &gt;= b; // Greater than or equal to, outputs: true
                  <br />
                  a &lt;= b; // Less than or equal to, outputs: false
                </code>
              </pre>
              <p>
                Imagine comparing the ages of two people. If person A is 5 years old and person B is 3 years old, using the greater than operator (<b>&gt;</b>), you can see that person A is older than person B.
              </p>
            </section>

            <section id="LogicalOperators" className="lesson-section">
              <h2>Logical Operators</h2>
              <p>
                Logical operators are used to combine multiple boolean expressions or values. Here are the three main logical operators:
              </p>
              <pre>
                <code>
                  <b>var</b> a = true;
                  <br />
                  <b>var</b> b = false;
                  <br />
                  <br />
                  a && b; // Logical AND, outputs: false
                  <br />
                  a || b; // Logical OR, outputs: true
                  <br />
                  !a; // Logical NOT, outputs: false
                </code>
              </pre>
              <p>
                Imagine you have two conditions: "I have money" and "The store is open". If both conditions are true, using the AND operator (<b>&&</b>), you can go shopping. But if either condition is false, you cannot go shopping.
              </p>
            </section>

            <section id="AssignmentOperators" className="lesson-section">
              <h2>Assignment Operators</h2>
              <p>
                Assignment operators are used to assign values to variables. Here are some common assignment operators:
              </p>
              <pre>
                <code>
                  <b>var</b> a = 5;
                  <br />
                  <br />
                  a += 2; // Equivalent to a = a + 2, outputs: 7
                  <br />
                  a -= 2; // Equivalent to a = a - 2, outputs: 5
                  <br />
                  a *= 2; // Equivalent to a = a * 2, outputs: 10
                  <br />
                  a /= 2; // Equivalent to a = a / 2, outputs: 5
                  <br />
                  a %= 2; // Equivalent to a = a % 2, outputs: 1
                </code>
              </pre>
              <p>
                Imagine you have a piggy bank with 5 coins. If you add 2 more coins, using the addition assignment operator (<b>+=</b>), you now have 7 coins. If you spend 2 coins, using the subtraction assignment operator (<b>-=</b>), you now have 5 coins again.
              </p>
            </section>

            <section id="MoreOperatorFun" className="lesson-section">
              <h2>More Operator Fun!</h2>
              <p>
                Let's experiment with operators using the code editor below. Try creating different expressions and see what results you get!
              </p>
              <JsEditor3
                defaultCode={`var a = 5;
var b = 3;
alert(a + b); // Outputs: 8
alert(a > b); // Outputs: true
alert(a && b); // Outputs: 3 (non-zero value is treated as true)
alert(a += b); // Outputs: 8`}
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
                Ready to try it yourself? Let's use the magic vortex - code editor below to experiment with different operators and create expressions!
              </p>
              <h2 style={{ color: 'var(--highlight-color2)', textAlign: 'center' }}>Let's get into Vortex - Play Around</h2>

              <h4 style={{ textAlign: 'center' }}>
                Use the code editor to create different expressions using arithmetic, comparison, logical, and assignment operators.
              </h4>
              <Mini_IDE/>
              <br />
              <h2 style={{ textAlign: 'center' }}>Here's a Quiz</h2>

              <Quiz question={question} correctAnswer={correctAnswer} badgeSrc={badge5} quizCompleted={quizCompleted} onCorrect={() => handleQuizCompletion(true)} />
            </section>
          </div>
        </div>

        <LessonNavigator currentLesson={currentLesson} totalLessons={totalLessons} onNextLesson={handleNextLesson} onPreviousLesson={handlePreviousLesson} />
      </div>
    </div>
  );
}

export default Lesson5;
