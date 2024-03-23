import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  const navigate = useNavigate();
  const points = 100;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/login');
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  // Conditional rendering based on the user state
  if (!user) {
    // If user isn't set, show a message and login button
    return (
      <div className="login-redirect-container">
        <p>Please Login to View the Profile</p>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
    );
  }

  // Show profile content if user is set
  return (
    <div className="profile-container">
      <h1 className="profile-title">Your Profile</h1>
      {/* Display user-specific information */}
      <p className="user-name">{user.displayName || 'John Doe'}</p>
      <p className="user-email">{user.email || 'john.doe@example.com'}</p>
      <p className="profile-points">Points: {points}</p>
    </div>
  );
};

export default ProfilePage;
