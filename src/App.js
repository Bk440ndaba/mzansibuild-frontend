import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Feed from './pages/Feed';
import CreateProject from './pages/CreateProject';
import ProjectDetail from './pages/ProjectDetail';
import Celebration from './pages/Celebration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/celebration" element={<Celebration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;