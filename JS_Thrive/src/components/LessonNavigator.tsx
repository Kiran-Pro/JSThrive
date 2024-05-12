import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
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
    <div>
     <button
      className="button" 
      onClick={handlePreviousLesson}
      disabled={currentLesson === 1}
      style={{
    border: 'none',
    padding: 0,
    backgroundColor: 'transparent',
    cursor: currentLesson === 1 ? 'not-allowed' : 'pointer', // Set cursor to not-allowed if disabled
  }}
>
  <ArrowCircleLeftIcon sx={{ color: currentLesson === 1 ? 'gray' : 'var(--highlight-color)', fontSize: '60px' }} />
</button>

<button
  className='button'
  onClick={handleNextLesson}
  disabled={currentLesson === totalLessons}
  style={{
    border: 'none',
    padding: 0,
    backgroundColor: 'transparent',
    cursor: currentLesson === totalLessons ? 'not-allowed' : 'pointer', // Set cursor to not-allowed if disabled
  }}
>
  <ArrowCircleRightIcon sx={{ color: currentLesson === totalLessons ? 'gray' : 'var(--highlight-color)', fontSize: '60px' }} />
</button>

    </div>
  );
}

export default LessonNavigator;
