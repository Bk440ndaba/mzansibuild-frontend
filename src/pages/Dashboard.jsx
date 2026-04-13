import { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <nav style={{ background: '#333', padding: '10px', color: 'white' }}>
        <Link to="/dashboard" style={{ marginRight: '10px', color: 'white' }}>Dashboard</Link>
        <Link to="/feed" style={{ marginRight: '10px', color: 'white' }}>Feed</Link>
        <Link to="/create-project" style={{ marginRight: '10px', color: 'white' }}>New Project</Link>
        <Link to="/celebration" style={{ marginRight: '10px', color: 'white' }}>Celebration</Link>
        <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      </nav>
      <div style={{ padding: '20px' }}>
        <h1>Welcome, {user.name}!</h1>
        <p>Select a page from the menu above.</p>
      </div>
    </div>
  );
}