import { User, getAuth, onAuthStateChanged } from 'firebase/auth'; // Import User type
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './ProfilePage.css';
import Logout from '../UserAuthentication/Logout';
import Loader from '../../components/Loader/Loader';

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null); // Define user state with User type or null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader/>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-container">
      <u>
      <h2 className="profile-title">Dashboard</h2>
      </u>
      <p className="user-name">Name: {user.displayName || 'Name not provided'}</p>
      <p className="user-email">E-mail: {user.email || 'Email not provided'}</p>
      <p className="profile-points">Points: 100</p>
      <Logout/>
    </div>
  );
};

export default ProfilePage;
