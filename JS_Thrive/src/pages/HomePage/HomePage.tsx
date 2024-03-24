// HomePage.js
import { Link } from 'react-router-dom';
import Logout from '../UserAuthentication/Logout';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page container">
      <div className="card">
        <h1>Hola JSThrivers!</h1>
        <p>Embark on your journey to learn JavaScript with interactive lessons and challenges.</p>
        <h3>Ready to dive in?</h3>
        <div className="link-container">
          <Link to="/register"><button className="button">Register</button></Link>
          <Link to="/login"><button className="button">Login</button></Link>
        </div>
        <Logout />
      </div>
    </div>
  );
};

export default HomePage;
