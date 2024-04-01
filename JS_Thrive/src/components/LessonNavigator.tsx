import { useNavigate } from "react-router-dom";

interface LessonNavigatorProps {
  currentLesson: number;
  totalLessons: number;
  onNextLesson: () => void;
  onPreviousLesson: () => void;
}

function LessonNavigator({ currentLesson, totalLessons, onNextLesson, onPreviousLesson }: LessonNavigatorProps) {
  const navigate = useNavigate();

  const handleNextLesson = () => {
    onNextLesson();
    navigate(`/lesson${currentLesson + 1}`);
  };

  const handlePreviousLesson = () => {
    onPreviousLesson();
    navigate(`/lesson${currentLesson - 1}`);
  };

  return (
    <div className="lesson-navigation">
      <button className="button" onClick={handlePreviousLesson} disabled={currentLesson === 1}>
        Previous Lesson
      </button>
      <button className="button" onClick={handleNextLesson} disabled={currentLesson === totalLessons}>
        Next Lesson
      </button>
    </div>
  );
}

export default LessonNavigator;
