import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [userRole, setUserRole] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/admin/login', {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        console.log(response.data); // Log the response for debugging
        setLoginMessage(response.data.message); // "Login successful"
        setUserRole(response.data.role); // Set role
        alert('Login successful!');

        // Optionally, store user data (email, role) in localStorage or sessionStorage
        localStorage.setItem(
          'user',
          JSON.stringify({ email: email, role: response.data.role })
        );

        // Redirect to AdminDashboard.js after login
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : 'An error occurred.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
      {loginMessage && <p style={styles.message}>{loginMessage}</p>}
      {userRole && <p style={styles.role}>Role: {userRole}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(120deg, #a1c4fd, #c2e9fb)',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    padding: '20px',
  },
  title: {
    fontSize: '2.5em',
    fontWeight: 'bold',
    marginBottom: '1em',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
  },
  error: {
    color: 'red',
    marginBottom: '1em',
    fontSize: '1em',
  },
  input: {
    width: '80%',
    maxWidth: '400px',
    padding: '12px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1em',
    transition: 'all 0.3s ease',
  },
  button: {
    padding: '12px 20px',
    fontSize: '1.2em',
    fontWeight: 'bold',
    backgroundColor: '#82c7eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.3s, background-color 0.3s',
    boxShadow: '0 5px 15px rgba(130, 199, 235, 0.5)',
  },
  message: {
    color: '#4caf50',
    fontSize: '1em',
    marginTop: '1em',
  },
  role: {
    color: '#555',
    fontSize: '1em',
    marginTop: '1em',
  },
};

export default Login;
