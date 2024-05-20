import React from 'react';
import LessonPage from './LessonPage';
import './LessonPage.css'

const LessonContentPage: React.FC = () => {
  

  return (
    <div className="lesson-content-container">
      <LessonPage title="JavaScript?" linkTo="/lesson1" />
      <LessonPage title="Variables and Data Types" linkTo="/lesson2" />
      <LessonPage title="Arrays" linkTo="/lesson3" /> 
      <LessonPage title="Objects" linkTo="/lesson4" />
      <LessonPage title="Operators" linkTo="/lesson5" />
      <LessonPage title="Loops" linkTo="/lesson6" />
      <LessonPage title="Functions" linkTo="/lesson7" />
      <LessonPage title="PseudoCode" linkTo="/lesson8" />
    <LessonPage title="Let' create a Game" linkTo="/lesson9" />
    
    </div>
  );
};

export default LessonContentPage;