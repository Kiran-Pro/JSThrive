/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import LessonNavigator from '../../../components/LessonNavigator';
import Icon from '../../../resources/htmlUnderstanding.jpeg';
import './Lessons.css';
import JsEditor3 from '../../../components/codeEditor/JsEditor';
import Quiz from '../../../components/Quiz/Quiz';
import { firestore, app } from '../../../firebase.config'; 
import { doc, updateDoc, arrayUnion, onSnapshot, increment } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import LessonDirector from './LessonDirector';
import badge from "../../../resources/sloth_badge.png";

const defaultCode = `alert("JS IS AWESOME")`;
const question = 'Name of the friendly wizard?';
const correctAnswer = 'JavaScript';
const lessons = [
  { label: 'JavaScript?', href: '#JavaScript?' },
  { label: 'Visual Understanding - JS', href: '#Figure' },
  { label: 'Runnn', href: '#Coding Station - Alert' },
];

function Lesson1() {
  const [currentLesson, setCurrentLesson] = useState(1);
  const totalLessons = 9; 
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(11); 
  const [badges, setBadges] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [lessonsCompleted, setLessonsCompleted] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false); 

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
        setQuizCompleted(userData.lessonQuizzes?.lesson1 || false); 
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
      const newBadge = badge;
  
      try {
        await updateDoc(userDocRef, {
          lessonsCompleted: increment(1),
          badges: arrayUnion(newBadge),
          points: increment(100),
          [`lessonQuizzes.lesson1`]: true,
        });
       
        setLessonsCompleted(prev => {
          const newCount = prev + 1;
          setProgress((newCount / totalLessons) * 100);
          return newCount;
        });
        setBadges(prev => [...prev, newBadge]);
        setPoints(prev => prev + 100);
        setQuizCompleted(true); 
        console.log("Profile updated successfully with additional points and badge");
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    }
  };
  

  const handleNextLesson = () => {
    if (isCompleted) {
      setCurrentLesson(prevLesson => prevLesson + 1);
    }
  };

  const handlePreviousLesson = () => {
    setCurrentLesson(prevLesson => prevLesson - 1);
  };

  return (
    <div className='main-con'>
      <LessonDirector items={lessons} />
      <div className="lesson-container">
        <div className='inner-con'>
          <h1 className="lesson-title">Chronicles of JavaScript</h1>
          <div className="lesson-content">
            <section id="JavaScript?" className="lesson-section">
              Once upon a time, there was a magical land called the Internet.
              In this land, there lived a friendly wizard named JavaScript.
              Now, JavaScript was not your ordinary wizard - instead of casting spells with wands,
              it used special words and commands to make things happen on web pages.
              <br />
              <br />
              Now, let's imagine JavaScript as a friendly helper who understands different types of things.
              For example, it knows about numbers, like how many candies you have, or strings,
              which are like words or sentences you can write. It even knows about true or false statements,
              just like answering "yes" or "no" to questions.
              <br />
              <br />
              But wait, there's more! JavaScript can also gather lots of things together,
              just like collecting toys in a box. These collections are called arrays.
              And if you want to describe something in more detail, JavaScript can create objects,
              which are like little treasure chests holding lots of information.
              <br />
              <br />
              Now, imagine you have a special notebook where you can write down things you want to remember.
              This notebook is like a variable in JavaScript. You can write down the number of candies you have,
              the words to a song, or even if it's sunny outside.
              <br />
              <br />
              So, JavaScript is like a friendly wizard that helps you create amazing things on the Internet
              by understanding different types of things, collecting them together,
              and remembering them in special notebooks. With JavaScript by your side, you can bring
              your ideas to life and make the Internet a more magical place!
              <br />
            </section>
            <br />
            <div id="Figure" className='figure'>
              <img src={Icon} width='450px' alt="Icon" />
              <h2 className='lesson-title'>Basically, JS is like Human Brain that Controls the Whole Body (HTML)</h2>
            </div>
            <br />
            <br />
            <section id='Coding Station - Alert'>
              Now, Imagine yourself at your coding station,
              ready to bring your ideas to life. There's a special button called "Run it" waiting for your touch.
              Clicking it unleashes the magic of your code, making it come alive on your screen.
              And guess what? An alert pops up to visualize the code that you typed at your coding station! So, go ahead,
              click <strong>Run it</strong> and witness!
            </section>
<br />
            <div className='editor-container'>
              <JsEditor3 defaultCode={defaultCode} onExecute={(code) => {
                try {
                  eval(code);
                } catch (error) {
                  console.error('Error executing code:', error);
                }
              }} />
            </div>
            <br />
            <section>
              The Friendly Wizard is going to introduce fundamental programming concepts such as variables,
              data types, conditionals, loops, functions, and objects.
            </section>
            <br />
            <Quiz question={question} correctAnswer={correctAnswer} badgeSrc={badge} onCorrect={() => handleQuizCompletion(true)} quizCompleted={quizCompleted} />
          </div>
          <br />
          <h1>Ready to Thrive?</h1>
          <br />
          <LessonNavigator
            currentLesson={currentLesson}
            totalLessons={totalLessons}
            onNextLesson={handleNextLesson}
            onPreviousLesson={handlePreviousLesson}
          />
        </div>
      </div>
    </div>
  );
}

export default Lesson1;
