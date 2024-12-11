import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login'); // Navigate to the login page
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to the Home Page</h1>
            <button style={styles.button} onClick={goToLogin}>
                Go to Login
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(120deg, #a1c4fd, #c2e9fb)',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        textAlign: 'center',
    },
    title: {
        fontSize: '3em',
        fontWeight: 'bold',
        marginBottom: '1em',
        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
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
    buttonHover: {
        backgroundColor: '#5da7d1',
        transform: 'translateY(-2px)',
    },
};

export default Home;
