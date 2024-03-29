// LessonContentPage.tsx
import React, { useEffect, useState } from 'react';
import LessonPage from './LessonPage';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import Loader from '../../components/Loader/Loader';
import { Navigate } from 'react-router-dom';

const LessonContentPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // Define user state with User type or null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader/>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <LessonPage title="Lesson 1: Introduction to Web Development and Setup" linkTo="/lesson1" />
      <LessonPage title="Lesson 2: Adding Structure to the Quiz App" linkTo="/lesson2" />
      <LessonPage title="Lesson 3: Making the Quiz Interactive with JavaScript" linkTo="/lesson3" />
      <LessonPage title="Lesson 4: Enhancing the Quiz with Styling" linkTo="/lesson4" />
      <LessonPage title="Lesson 5: Adding Feedback and Score Tracking" linkTo="/lesson5" />
      <LessonPage title="Lesson 6: Implementing Quiz Restart and High Score Tracking" linkTo="/lesson6" />
      <LessonPage title="Lesson 7: Enhancing the Quiz with Local Storage for Persistent Data" linkTo="/lesson7" />
      <LessonPage title="Lesson 8: Implementing Answer Validation and Feedback" linkTo="/lesson8" />
      <LessonPage title="Lesson 9: Enhancing User Experience and Finalizing the Quiz App" linkTo="/lesson9" />
     
     
    </div>
  );
};

export default LessonContentPage;
