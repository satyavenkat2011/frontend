import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import AdminPage from './components/AdminPage';
import Login from './components/Login';
import Home from './components/Home'; // Assuming you want a home page

const App = () => {
    return (
        <Router>
            <div>
                {/* Button to navigate to login */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/adminpage" element={<AdminPage />} />
                    
                </Routes>
            </div>
        </Router>
    );
};

export default App;
