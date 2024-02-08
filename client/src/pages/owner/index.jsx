// LoginPage.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineUser } from 'react-icons/ai';
import styles from '../../styles/login.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/owner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log('Login successful!');
        router.replace('/owner/panel');
      } else {
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <AiOutlineUser className={styles.userIcon} />
        <h1 className={styles.title}>Login</h1>
        <form>
          <label className={styles.label}>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </label>
          <button type="button" onClick={handleLogin} className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
