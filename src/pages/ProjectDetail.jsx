import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newMilestone, setNewMilestone] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [projRes, mileRes] = await Promise.all([
        axios.get(`http://localhost:8080/projects/${id}`),
        axios.get(`http://localhost:8080/projects/${id}/milestones`)
      ]);

      setProject(projRes.data);
      setMilestones(mileRes.data);
      setComments(projRes.data.comments || []);
    } catch (err) {
      console.error(err);
      alert('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(
        `http://localhost:8080/projects/${id}/comments?userId=${user.id}`,
        newComment,
        { headers: { 'Content-Type': 'text/plain' } }
      );

      setNewComment('');
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to add comment');
    }
  };

  const addMilestone = async () => {
    if (!newMilestone.title) return;

    try {
      await axios.post(
        `http://localhost:8080/projects/${id}/milestones`,
        newMilestone
      );

      setNewMilestone({ title: '', description: '' });
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to add milestone');
    }
  };

  const toggleMilestone = async (milestoneId, currentCompleted) => {
    const milestone = milestones.find(m => m.id === milestoneId);
    if (!milestone) return;

    const updated = { ...milestone, completed: !currentCompleted };

    try {
      await axios.put(
        `http://localhost:8080/projects/${id}/milestones/${milestoneId}`,
        updated
      );

      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to update milestone');
    }
  };

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!project) return <div className="text-white p-6">Project not found</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-6">

      <button
        onClick={() => navigate('/feed')}
        className="text-green-500 hover:underline"
      >
        ← Back to Feed
      </button>

      {}
      <div className="bg-gray-900 border border-green-500 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-green-400 mb-2">
          {project.title}
        </h1>

        <p className="text-gray-300 mb-3">{project.description}</p>

        <div className="text-sm text-gray-400 space-y-1">
          <p>Stage: <span className="text-white">{project.stage}</span></p>
          <p>Support: <span className="text-white">{project.supportNeeded || 'None'}</span></p>
          <p>
            Status:{' '}
            <span className={project.completed ? 'text-green-500' : 'text-red-400'}>
              {project.completed ? 'Completed' : 'In Progress'}
            </span>
          </p>
        </div>
      </div>

      {}
      <div className="bg-gray-900 border border-green-500 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">
          Milestones
        </h2>

        {milestones.length === 0 && (
          <p className="text-gray-400">No milestones yet.</p>
        )}

        <div className="space-y-2 mb-4">
          {milestones.map(m => (
            <div key={m.id} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={m.completed}
                onChange={() => toggleMilestone(m.id, m.completed)}
              />
              <div>
                <p className={m.completed ? 'line-through text-gray-500' : ''}>
                  <strong>{m.title}</strong> - {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {}
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Title"
            value={newMilestone.title}
            onChange={e =>
              setNewMilestone({ ...newMilestone, title: e.target.value })
            }
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"
          />
          <input
            type="text"
            placeholder="Description"
            value={newMilestone.description}
            onChange={e =>
              setNewMilestone({ ...newMilestone, description: e.target.value })
            }
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md"
          />
          <button
            onClick={addMilestone}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
          >
            Add Milestone
          </button>
        </div>
      </div>

      {}
      <div className="bg-gray-900 border border-green-500 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">
          Comments
        </h2>

        {comments.length === 0 && (
          <p className="text-gray-400 mb-3">No comments yet.</p>
        )}

        <div className="space-y-2 mb-4">
          {comments.map(c => (
            <div key={c.id} className="bg-gray-800 p-2 rounded-md text-sm">
              <span className="text-green-400 font-medium">
                {c.authorName}
              </span>
              <span className="text-gray-300">: {c.content}</span>
            </div>
          ))}
        </div>

        <textarea
          rows="3"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md mb-2"
        />

        <button
          onClick={addComment}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
        >
          Post Comment
        </button>
      </div>

    </div>
  );
}