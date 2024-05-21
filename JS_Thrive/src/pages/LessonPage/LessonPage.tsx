import React from 'react';
import { Link } from 'react-router-dom';
import './LessonPage.css';

interface LessonPageProps {
  title: string;
  linkTo: string;
  style: React.CSSProperties;
  completed: boolean;
}

const LessonPage: React.FC<LessonPageProps> = ({ title, linkTo, style, completed }) => {
  const className = completed ? 'lesson-page completed' : 'lesson-page incomplete';
  
  return (
    <Link to={linkTo} className={className} style={style}>
      {title}
    </Link>
  );
};

export default LessonPage;
