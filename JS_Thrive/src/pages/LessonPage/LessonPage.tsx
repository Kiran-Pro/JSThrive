// LessonPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LessonPage.css';

interface LessonPageProps {
  title: string;
  linkTo: string;
}

const LessonPage: React.FC<LessonPageProps> = ({ title, linkTo }) => {
  return (
    <div className="lesson-container">
      
      <h3 className="lesson-title">{title}</h3>
      <Link to={linkTo} className="button">
        Start Lesson
      </Link>
    </div>
  );
};

export default LessonPage;
