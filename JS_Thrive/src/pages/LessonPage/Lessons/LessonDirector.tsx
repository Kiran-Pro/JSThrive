import React from 'react';
import ExploreIcon from '@mui/icons-material/Explore';

interface LessonNavigatorProps {
  items: { label: string, href: string }[];
}

const LessonDirector: React.FC<LessonNavigatorProps> = ({ items }) => {
  return (
    <div className='lesson-nav'>
      <ul>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          Lesson Navigator
          <ExploreIcon sx={{ color: '#32908F', fontSize: '28px' }} />
        </h2>
        <br />
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonDirector;
