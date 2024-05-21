/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import LessonPage from './LessonPage';
import './LessonPage.css';
import { firestore, app } from '../../firebase.config';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const LessonContentPage: React.FC = () => {
  const lessons = [
    { title: "JavaScript?", linkTo: "/lesson1" },
    { title: "Variables", linkTo: "/lesson2" },
    { title: "Arrays", linkTo: "/lesson3" },
    { title: "Objects", linkTo: "/lesson4" },
    { title: "Operators", linkTo: "/lesson5" },
    { title: "Loops", linkTo: "/lesson6" },
    { title: "Functions", linkTo: "/lesson7" },
    { title: "PseudoCode", linkTo: "/lesson8" },
    { title: "Game Time", linkTo: "/lesson9" },
  ];

  const lessonPositions = [
    { top: '30%', left: '28%' },
    { top: '2%', left: '47%' },
    { top: '30%', left: '47%' },
    { top: '3%', left: '67%' },
    { top: '30%', left: '80%' },
    { top: '70%', left: '80%' },
    { top: '60%', left: '47%' },
    { top: '60%', left: '18%' },
    { top: '10%', left: '10%' },
  ];

  const [completedLessons, setCompletedLessons] = useState<boolean[]>(new Array(lessons.length).fill(false));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(firestore, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const lessonCompletion = lessons.map((_, index) => userData.lessonQuizzes[`lesson${index + 1}`] || false);
          setCompletedLessons(lessonCompletion);
        }
      }
    });
    return () => unsubscribe();
  }, [lessons]);

  return (
    <div className="lesson-content-container">
      <div className="lesson-map">
        {lessons.map((lesson, index) => (
          <LessonPage
            key={index}
            title={lesson.title}
            linkTo={lesson.linkTo}
            style={lessonPositions[index]}
            completed={completedLessons[index]}
          />
        ))}
      </div>
      <div className="lesson-legend">
        <h2>Lesson Order</h2>
        <ul>
          {lessons.map((lesson, index) => (
            <li key={index} className={completedLessons[index] ? 'completed' : 'incomplete'}>
              {lesson.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LessonContentPage;
