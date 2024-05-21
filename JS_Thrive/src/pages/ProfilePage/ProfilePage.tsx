import React, { useEffect, useState } from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase.config';
import Logout from '../UserAuthentication/Logout';
import Loader from '../../components/Loader/Loader';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import Tooltip from '@mui/material/Tooltip';
import './ProfilePage.css';
import slothBadge from '../../resources/sloth_badge.png';
import slothBadgeGrey from '../../resources/Badges_grey/sloth_badge_grey.png';
import snailBadge from '../../resources/snail_badge.png';
import snailBadgeGrey from '../../resources/Badges_grey/snail_badge_grey.png';
import tortoiseBadge from '../../resources/tortoise_badge.png';
import tortoiseBadgeGrey from '../../resources/Badges_grey/tortoise_badge_grey.png';
import koalaBadge from '../../resources/koala_badge.png';
import koalaBadgeGrey from '../../resources/Badges_grey/koala_badge_grey.png';
import pandaBadge from '../../resources/panda_badge.png';
import pandaBadgeGrey from '../../resources/Badges_grey/panda_badge_grey.png';
import kangarooBadge from '../../resources/kangaroo_badge.png';
import kangarooBadgeGrey from '../../resources/Badges_grey/kangaroo_badge_grey.png';
import horseBadge from '../../resources/horse_badge.png';
import horseBadgeGrey from '../../resources/Badges_grey/horse_badge_grey.png';
import cheetahBadge from '../../resources/cheetah_badge.png';
import cheetahBadgeGrey from '../../resources/Badges_grey/cheetah_badge_grey.png';
import lionBadge from '../../resources/lion_badge.png';
import lionBadgeGrey from '../../resources/Badges_grey/lion_badge_grey.png';

const firestore = getFirestore(app);
const allBadges = [
  { color: slothBadge, grey: slothBadgeGrey, name: "Sloth: Keep Going!" },
  { color: tortoiseBadge, grey: tortoiseBadgeGrey, name: "Tortoise: You're Doing Great!" },
  { color: snailBadge, grey: snailBadgeGrey, name: "Snail: Slow and Steady!" },
  { color: koalaBadge, grey: koalaBadgeGrey, name: "Koala: Awesome Progress!" },
  { color: pandaBadge, grey: pandaBadgeGrey, name: "Panda: Keep Up the Good Work!" },
  { color: kangarooBadge, grey: kangarooBadgeGrey, name: "Kangaroo: Leaps and Bounds!" },
  { color: horseBadge, grey: horseBadgeGrey, name: "Horse: Gallop Ahead!" },
  { color: cheetahBadge, grey: cheetahBadgeGrey, name: "Cheetah: Speeding Up!" },
  { color: lionBadge, grey: lionBadgeGrey, name: "Lion: Roaring Success!" },
];

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [lessonsCompleted, setLessonsCompleted] = useState<number>(0);
  const [points, setPoints] = useState(0);
  const [userBadges, setUserBadges] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        subscribeToUserData(currentUser.uid);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

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
      setLoading(false);
    }, (error) => {
      console.error("Error fetching user data:", error);
      setError("Failed to load user data");
      setLoading(false);
    });
  };

  const calculateProgress = () => {
    const progressPercentage = (lessonsCompleted / 9) * 100;
    return progressPercentage.toFixed(1);
  };

  const renderBadges = () => {
    return allBadges.map((badge, index) => {
      const earnedBadge = userBadges.includes(badge.color);
      return (
        <Tooltip key={index} title={badge.name} arrow>
          <img
            onClick={() => {
              window.location.href = '/profile';
            }}
            src={earnedBadge ? badge.color : badge.grey}
            alt={`Badge ${index + 1}`}
            className="badge-image"
          />
        </Tooltip>
      );
    });
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
      <h1 className="profile-title">
        Progress <SignalCellularAltIcon sx={{ fontSize: '40px', position: 'relative', top: '7.2px' }} />
      </h1>
      {lessonsCompleted === 9 ? (
        <div className="congratulations-container">
          <h1>Congratulations! 🎉</h1>
          <p>You've completed all the lessons!</p>
          <h2>Keep Thriving!</h2>
          <button style={{borderColor:'black'}} className='button'
            onClick={() =>
              navigate('/certificate', {
                state: { user: { displayName: user?.displayName, email: user?.email } },
              })
            }
          >
            View Certificate
          </button>
        </div>
      ) : null}

      <div className="info-points-container">
        <div className="user-info-box">
          <h3 className="user-name">
            <span>Name:</span> {user?.displayName || 'Name not provided'}
          </h3>
          <h3 className="user-email">
            <span>E-mail:</span> {user?.email || 'Email not provided'}
          </h3>
        </div>
        <div className="profile-points-container">
          <h3>Points: </h3>
          <div className="coin-design">{points > 0 ? points : 'None'}</div>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {renderBadges()}
        </div>
      </div>
      <Logout />
    </div>
  );
};

export default ProfilePage;
