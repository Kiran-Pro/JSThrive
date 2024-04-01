import './ProfilePage.css'
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '../../firebase.config';
import Logout from '../UserAuthentication/Logout';
import Loader from '../../components/Loader/Loader';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const auth = getAuth(app); 
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
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2 className="profile-title">Dashboard</h2>
      <p className="user-name">Name: {user.displayName || 'Name not provided'}</p>
      <p className="user-email">E-mail: {user.email || 'Email not provided'}</p>
      <p className="profile-points">Points: 100</p>
      <Logout />
    </div>
  );
};

export default ProfilePage;
