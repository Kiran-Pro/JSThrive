import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase.config';
import Logout from '../UserAuthentication/Logout';
import Loader from '../../components/Loader/Loader';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import './ProfilePage.css';

const firestore = getFirestore(app);  // Initialize Firestore

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [lessonsCompleted, setLessonsCompleted] = useState<number>(0);
  const [points, setPoints] = useState(0);
  const [userBadges, setUserBadges] = useState<string[]>([]);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        subscribeToUserData(currentUser.uid);
      } else {
        setUser(null);
        setLoading(false); // Ensure loading is set to false if no user is found
      }
    });

    // Cleanup the auth listener on component unmount
    return () => unsubscribe();
  }, []);

  const subscribeToUserData = (userId: string) => {
    const userDocRef = doc(firestore, "users", userId);
    return onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setLessonsCompleted(userData.lessonsCompleted);
        setUserBadges(userData.badges || []);
        setPoints(userData.points || 0);
      } else {
        console.log("No user data available");
      }
      setLoading(false); // Set loading to false after attempting to fetch data
    }, (error) => {
      console.error("Error fetching user data:", error);
      setError("Failed to load user data");
      setLoading(false);
    });
  };

  // Assuming `lessonsCompleted` is correctly incremented by 1 for each lesson completion.
  const calculateProgress = () => {
    const progressPercentage = (lessonsCompleted / 9) * 100;
    return progressPercentage.toFixed(1); // Ensure this calculation is based on the count of lessons.
  };

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
      <h1 className="profile-title">Progress <SignalCellularAltIcon sx={{fontSize:'40px',position:'relative',top:'7.2px'}}/></h1>
      
     

      <div className="info-points-container">
        <div className="user-info-box">
          <h3 className="user-name"><span>Name:</span> {user.displayName || 'Name not provided'}</h3>
          <h3 className="user-email"><span>E-mail:</span> {user.email || 'Email not provided'}</h3>
        </div>
        <div className="profile-points-container">
          <h3>Points: </h3>
          <div className="coin-design">
            {points > 0 ? points : 'None'}
          </div>
        </div>
      </div>
      <div className="progress-bar-container">
        {lessonsCompleted > 0 ? (
          <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}>
            {calculateProgress()}%
          </div>
        ) : (
          <div className="no-progress"> Progress: None</div>
        )}
      </div>

      <div className="badge-container">
        <div>
          <h3>Badges</h3>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          {userBadges.length > 0 ? (
            userBadges.map((src, index) => (
              <img key={index} src={src} alt={`Badge ${index + 1}`} className="badge-image" />
            ))
          ) : (
            <p>None</p>
          )}
        </div>
      </div>
      <Logout />
    </div>
  );
};

export default ProfilePage;
