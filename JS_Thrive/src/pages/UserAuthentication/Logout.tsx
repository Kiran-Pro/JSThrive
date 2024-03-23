import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config'; 
import { FirebaseError } from 'firebase/app';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('User logged out successfully!');
    } catch (error: unknown) {
      alert((error as FirebaseError).message);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
