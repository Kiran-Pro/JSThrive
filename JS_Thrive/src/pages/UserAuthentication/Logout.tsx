// Logout Component
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { useNotification } from '../../Context/NotificationContext';

const Logout = () => {
  const { showMessage } = useNotification();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showMessage("User logged out successfully \u2713");

    } catch (error) {
      console.error(error);
      showMessage('Logout failed. Please try again.');
    }
  };

  return (
    <div>
      <button className="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
