import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7'; 
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useTheme } from '../../Provider/ThemeContext';

const Navbar = () => {
  const { lightMode, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${lightMode ? 'light-theme' : ''}`}>
      <div className="navbar-brand">
        <NavLink to="/" className="home-link">J<span>&#x26A1;</span>Thrive</NavLink>
      </div>
      <div>
        <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "")} end>Home</NavLink>
        <NavLink to="/lesson" className={({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "")}>Lessons</NavLink>
        <NavLink to="/profile" className="profile">
          <AccountCircleIcon sx={{ fontSize: 33, verticalAlign: 'middle',pr:2.23}} />
        </NavLink>
        <span className="theme-icon" onClick={toggleTheme}>
          {lightMode ? <Brightness4Icon sx={{ fontSize: 33, verticalAlign: 'middle' }} /> : <Brightness7Icon sx={{ fontSize: 33, verticalAlign: 'middle' }} />}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
