import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate, auth]);

  
  const points = 100; 

  return (
    <div className="profile-container">
      <h1 className="profile-title">Your Profile</h1>
      <p className="user-name">John Doe</p> 
      <p className="user-email">john.doe@example.com</p> 
      <p className="profile-points">Points: {points}</p>
    </div>
  );
};

export default ProfilePage;
