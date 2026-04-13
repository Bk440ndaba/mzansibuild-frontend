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
      // Comments are inside the project object 
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
      await axios.post(`http://localhost:8080/projects/${id}/comments?userId=${user.id}`, newComment, {
        headers: { 'Content-Type': 'text/plain' }
      });
      setNewComment('');
      fetchData(); // refresh, getting new comments
    } catch (err) {
      console.error(err);
      alert('Failed to add comment');
    }
  };

  const addMilestone = async () => {
    if (!newMilestone.title) return;
    try {
      await axios.post(`http://localhost:8080/projects/${id}/milestones`, newMilestone);
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
      await axios.put(`http://localhost:8080/projects/${id}/milestones/${milestoneId}`, updated);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Failed to update milestone');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div>
      <button onClick={() => navigate('/feed')}>← Back to Feed</button>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <p>Stage: {project.stage}</p>
      <p>Support needed: {project.supportNeeded || 'None'}</p>
      <p>Completed: {project.completed ? ' Yes' : ' No'}</p>

      <hr />
      <h2>Milestones</h2>
      {milestones.length === 0 && <p>No milestones yet.</p>}
      <ul>
        {milestones.map(m => (
          <li key={m.id}>
            <input
              type="checkbox"
              checked={m.completed}
              onChange={() => toggleMilestone(m.id, m.completed)}
            />
            <strong>{m.title}</strong> - {m.description}
          </li>
        ))}
      </ul>

      <h3>Add Milestone</h3>
      <input
        type="text"
        placeholder="Title"
        value={newMilestone.title}
        onChange={e => setNewMilestone({ ...newMilestone, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newMilestone.description}
        onChange={e => setNewMilestone({ ...newMilestone, description: e.target.value })}
      />
      <button onClick={addMilestone}>Add Milestone</button>

      <hr />
      <h2>Comments</h2>
      {comments.length === 0 && <p>No comments yet.</p>}
      <ul>
        {comments.map(c => (
          <li key={c.id}><strong>{c.authorName}</strong>: {c.content}</li>
        ))}
      </ul>
      <textarea
        rows="3"
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="Write a comment"
      />
      <button onClick={addComment}>Post Comment</button>
    </div>
  );
}