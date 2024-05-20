import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../../firebase.config';
import { FirebaseError } from 'firebase/app';
import styles from './UserAuthentication.module.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // User is successfully created, now update their profile with the name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // Create a Firestore document for the new user with the specified schema
      const userDocRef = doc(firestore, 'users', userCredential.user.uid);
      await setDoc(userDocRef, {
        lessonsCompleted: 0,
        badges: [],
        points: 0,
        lessonQuizzes: {
          lesson1: false,
          lesson2: false,
          lesson3: false,
          lesson4: false,
          lesson5: false,
          lesson6: false,
          lesson7: false,
          lesson8: false,
          lesson9: false,
          
        },
      });

      alert('User registered successfully!');
      navigate('/login');
    } catch (error: unknown) {
      setError((error as FirebaseError).message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className={styles.inputField}
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className={styles.inputField}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className={styles.inputField}
          />
        </div>
        <div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className={styles.inputField}
          />
        </div>
        <button type="submit" className={styles.button}>Register</button>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Register;
