import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import { auth } from '../../firebase.config';
import { IconButton, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from './UserAuthentication.module.css';

const Login = () => {
  const [email, setEmail] = useState('test1@gmail.com');
  const [password, setPassword] = useState('test@1234');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile'); 
    } catch (error: unknown) {
      setError((error as Error).message); // Use Error type
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.inputField}
          disabled={loading}
          style={{
            borderColor: error && '#ff0000' 
          }}
        />

        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className={styles.inputField}
            disabled={loading}
            style={{
              borderColor: error && '#ff0000' 
            }}
            
          />
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            className={styles.Eyeicon}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </div>

        <a href="/forgetPass" className={styles.link}>Forgot Password?</a>
        <Button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        <h4>Don't have an account? <a href="/register" className={styles.hover_text}>Register</a> here </h4>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default Login;
