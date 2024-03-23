import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="home-link">JSThrive</NavLink>
      </div>
      <div>
        <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "")} end>Home</NavLink>
        <NavLink to="/lesson" className={({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "")}>Lessons</NavLink>
        <NavLink to="/profile" className={({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "")}>Profile</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
