// HomePage.js
import { Link } from 'react-router-dom';
import './HomePage.css';
import Logout from '../UserAuthentication/Logout';

const HomePage = () => {
  return (
    <div className="home-page container">
      <div className="card">
        <h1>Hola J<span>&#x26A1;</span>Thrivers!</h1>
        <p>Kick-start your journey to learn JavaScript with interactive lessons and challenges.</p>
        <p>Fast-track Your Skills, Crush Challenges, Stay Lit 🔥</p>
        <h2>Ready to dive in?</h2>
        <Link to='/lesson'>
          <button className='button'>Get Started</button>
        </Link>
        <Logout/>
       
      </div>
    </div>
  );
};

export default HomePage;
