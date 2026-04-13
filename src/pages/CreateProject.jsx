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
    <div>
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br/>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label><br/>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Stage:</label><br/>
          <select value={stage} onChange={e => setStage(e.target.value)}>
            <option>IDEA</option>
            <option>BUILDING</option>
            <option>TESTING</option>
            <option>COMPLETED</option>
          </select>
        </div>
        <div>
          <label>Support Needed:</label><br/>
          <input type="text" value={supportNeeded} onChange={e => setSupportNeeded(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>Create Project</button>
      </form>
    </div>
  );
}