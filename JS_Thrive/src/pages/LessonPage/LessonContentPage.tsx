import React from 'react';
import LessonPage from './LessonPage';
import './LessonPage.css'

const LessonContentPage: React.FC = () => {
  

  return (
    <div className="lesson-content-container">
      <LessonPage title="JavaScript?" linkTo="/lesson1" />
      <LessonPage title="Variables and Data Types" linkTo="/lesson2" />

      {/*It's Still Under Development*/}
      
      {/* <LessonPage title="Arrays" linkTo="/lesson3" />
      <LessonPage title="Objects" linkTo="/lesson4" />
      <LessonPage title="Conditions" linkTo="/lesson5" />
      <LessonPage title="Loops" linkTo="/lesson6" />
      <LessonPage title="PseudoCode" linkTo="/lesson7" />
      <LessonPage title="Functions" linkTo="/lesson8" />
      <LessonPage title="Hangman" linkTo="/lesson9" /> */}
    </div>
  );
};

export default LessonContentPage;