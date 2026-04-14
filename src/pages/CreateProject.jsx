import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stage, setStage] = useState('IDEA');
  const [supportNeeded, setSupportNeeded] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/projects', {
        title,
        description,
        stage,
        supportNeeded,
        completed: false,
        userId: user.id
      });
      navigate('/feed');
    } catch (err) {
      console.error(err);
      alert('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 text-white">
      <div className="bg-gray-900 border border-green-500 rounded-lg shadow-lg p-8 w-full max-w-xl">

        <h1 className="text-2xl font-bold text-green-500 mb-6">
          Create New Project 
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              rows="4"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Stage</label>
            <select
              value={stage}
              onChange={e => setStage(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option>IDEA</option>
              <option>BUILDING</option>
              <option>TESTING</option>
              <option>COMPLETED</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Support Needed</label>
            <input
              type="text"
              value={supportNeeded}
              onChange={e => setSupportNeeded(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-md font-semibold transition"
          >
            {loading ? 'Creating...' : 'Create Project'}
          </button>

        </form>
      </div>
    </div>
  );
}