import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BoltIcon from '@mui/icons-material/Bolt';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useTheme } from '../../Context/ThemeContext';
import { useState } from 'react';

const Navbar = () => {
  const { lightMode, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className={`navbar ${lightMode ? 'light-theme' : ''}`}>
      <div className="navbar-brand">
        <NavLink to="/" className="home-link" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          J
          <BoltIcon
            className={`thunder ${isHovered ? 'animated' : ''}`}
            sx={{ fontSize: 23, verticalAlign: 'middle' }}
          />
          Thrive
        </NavLink>
      </div>
      <div>
        <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "")} end>Home</NavLink>
        <NavLink to="/lesson" className={({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "")}>Lessons</NavLink>
        <NavLink to="/gamepage" className="gamepage">
        <SportsEsportsIcon sx={{fontSize: 33, verticalAlign: 'middle', pr: 2.23 }}/>
        </NavLink>
        <NavLink to="/profile" className="profile">
          <AccountCircleIcon sx={{ fontSize: 33, verticalAlign: 'middle', pr: 2.23 }} />
        </NavLink>
        <span className="theme-icon" onClick={toggleTheme}>
          {lightMode ? <DarkModeIcon sx={{ fontSize: 33, verticalAlign: 'middle' }} /> : <LightModeIcon sx={{ fontSize: 33, verticalAlign: 'middle' }} />}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
