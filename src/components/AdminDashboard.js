import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then((response) => response.json())
      .then((data) => {
        // Filter out admin users and exclude the role column
        const filteredUsers = data.filter((user) => user.role !== 'ADMIN');
        setUsers(filteredUsers);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const goToAdminPage = () => {
    navigate('/adminpage');
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <h2 style={styles.title}>Admin Dashboard</h2>
        <div style={styles.navButtons}>
          <button style={styles.navButton} onClick={goToAdminPage}>
            Admin Page
          </button>
          <button style={styles.navButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div style={styles.content}>
        {user ? (
          <div style={styles.welcomeBox}>
            <p style={styles.welcomeText}>Welcome, {user.email}!</p>
            <p style={styles.roleText}>Your Role: {user.role}</p>
            <h3 style={styles.subTitle}>Customer Data</h3>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Username</th>
                  <th style={styles.th}>Full Name</th>
                  <th style={styles.th}>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>{user.username}</td>
                    <td style={styles.td}>{user.fullName}</td>
                    <td style={styles.td}>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={styles.errorText}>Please log in to access the dashboard.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(120deg, #a1c4fd, #c2e9fb)',
    color: '#333',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#005f99',
    color: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
  title: {
    margin: 0,
    fontSize: '1.8em',
    fontWeight: 'bold',
  },
  navButtons: {
    display: 'flex',
    gap: '10px',
  },
  navButton: {
    padding: '10px 20px',
    fontSize: '1em',
    backgroundColor: '#82c7eb',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
  },
  welcomeBox: {
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    width: '90%',
    maxWidth: '500px',
  },
  welcomeText: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  roleText: {
    fontSize: '1.2em',
    color: '#555',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#005f99',
    color: 'white',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  },
  errorText: {
    fontSize: '1.2em',
    color: '#d9534f',
  },
};

export default AdminDashboard;
