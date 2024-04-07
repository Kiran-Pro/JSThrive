import React, { useEffect, useState } from 'react';
import LessonPage from './LessonPage'; 

interface Lesson {
  id: number;
  title: string;
  linkTo: string;
}

const LessonContentPage: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/lessons')
      .then(response => response.json())
      .then(data => setLessons(data))
      .catch(error => console.error("Fetching lessons failed", error));
  }, []);

  return (
    <div className="lesson-content-container">
      {lessons.map(lesson => (
        <LessonPage key={lesson.id} title={lesson.title} linkTo={lesson.linkTo} />
      ))}
    </div>
  );
};

export default LessonContentPage;
