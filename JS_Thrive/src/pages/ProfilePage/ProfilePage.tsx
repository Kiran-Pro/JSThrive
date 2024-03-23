import './ProfilePage.css'; 

const ProfilePage = () => {
  
  const points = 100; 

  return (
    <div className="profile-container">
      <h1 className="profile-title">Your Profile</h1>
      <p className="profile-points">Points: {points}</p>
    </div>
  );
};

export default ProfilePage;
