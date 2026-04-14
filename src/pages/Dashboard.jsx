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

  if (!user) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      
      {}
      <nav className="bg-gray-900 border-b border-green-500 px-6 py-4 flex justify-between items-center">
        <div className="flex gap-6">
          <Link to="/dashboard" className="text-green-500 font-semibold hover:text-green-400">
            Dashboard
          </Link>
          <Link to="/feed" className="text-gray-300 hover:text-green-400">
            Feed
          </Link>
          <Link to="/create-project" className="text-gray-300 hover:text-green-400">
            New Project
          </Link>
          <Link to="/celebration" className="text-gray-300 hover:text-green-400">
            Celebration
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-medium transition"
        >
          Logout
        </button>
      </nav>

      {}
      <div className="p-6">
        <div className="bg-gray-900 border border-green-500 rounded-lg p-6 shadow-lg max-w-xl">
          <h1 className="text-2xl font-bold text-green-500 mb-2">
            Welcome, {user.name} 
          </h1>
          <p className="text-gray-400">
            Select a page from the navigation above to get started.
          </p>
        </div>

        {}
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}