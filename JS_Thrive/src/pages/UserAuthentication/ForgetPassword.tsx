import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth'; 
import { auth } from '../../firebase.config';
import { FirebaseError } from 'firebase/app';
import styles from './UserAuthentication.module.css';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      await sendPasswordResetEmail(auth, email); 
      setResetSent(true);
    } catch (error: unknown) {
      setError((error as FirebaseError).message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Forgot Password</h2>
      {resetSent ? (
        <p>An email with password reset instructions has been sent to your inbox.</p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className={styles.inputField}
          />
          <button type="submit" className={styles.button}>
            Reset Password
          </button>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
