import { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 
import BoltIcon from '@mui/icons-material/Bolt';

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="home-page container">
      <div className="card">
        <h1>
          Hola J
          <BoltIcon
            className={`thunder ${isHovered ? 'animated' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
              fontSize: 55, verticalAlign: 'middle'
            }}
          />
          Thrivers!
        </h1>
        <p>Kick-start your journey to learn JavaScript with interactive lessons and challenges.</p>
        <p>Fast-track Your Skills, Crush Challenges, Stay Lit 🔥</p>
        <h2>Ready to dive in?</h2>
        <Link to='/lesson'>
          <button className='button'>Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
