import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; 
import BoltIcon from '@mui/icons-material/Bolt';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../../firebase.config';
import comic from '../../resources/comic.png';
import comic2 from '../../resources/comic2.png';

const HomePage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="home-page container">
      
        
  {user ? (
  <div className="card">
    <div
      className="secOne"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1>
        Hola J
        <BoltIcon
          className={`thunder ${isHovered ? 'animated' : ''}`}
          sx={{
            fontSize: 55,
            verticalAlign: 'middle'
          }}
        />
        Thrivers!
      </h1>
      <img width='350px' src={comic} alt="comic" />
    </div>
    <Link to="/lesson">
      <button className="button loggedIn">Continue your Journey</button>
    </Link>
  </div>
) : (
  <>

  
  <div className="card">
  
        <div
          className="secOne"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h1>
            Hola J
            <BoltIcon
              className={`thunder ${isHovered ? 'animated' : ''}`}
              sx={{
                fontSize: 55,
                verticalAlign: 'middle'
              }}
            />
            Thrivers!
          </h1>
          <img width='350px' src={comic} alt="comic" />
        </div>
        <p>Kick-start your journey to learn JavaScript on your own pace from scratch.</p>
        <p>Track Your Progress, Learn More, Stay Lit 🔥</p>
        <h2>Ready to Thrive?</h2>
      

        </div>
        <div className='card'>
        <h2>What do we need?</h2>
        <div className='secOne'>
          <div className='innerSec'>
            <p>
              Before we thrive into the exciting world of JavaScript, let's make sure you've got our basics covered. You'll need to know two super cool languages: <strong>HTML</strong> and <strong>CSS</strong>! 
            </p>
            <p>
              HTML is like the blueprint of a website, while CSS adds all the colors, styles, and decorations to make it look fabulous!
            </p>
          </div>
          <img src={comic2} alt="coffee" width='350px' />
        </div>
        <Link to="/lesson">
      <button className="button">Get Started</button>
    </Link>
      </div>
        </>
 
)}

    </div>
  );
};

export default HomePage;
