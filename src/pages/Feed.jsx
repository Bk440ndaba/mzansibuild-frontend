import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Feed() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/feed')
      .then(res => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading feed...</div>;

  return (
    <div>
      <h1>Live Feed</h1>
      {projects.length === 0 && <p>No projects yet.</p>}
      {projects.map(project => (
        <div key={project.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          
         <h2>
            <Link to={`/projects/${project.id}`}>{project.title}</Link>
        </h2>

          <p>{project.description}</p>
          <p>Stage: {project.stage}</p>
          <p>Completed: {project.completed ? 'Yes' : 'No'}</p>
          <div>
            <strong>Comments:</strong>
            {project.comments?.map(comment => (
              <div key={comment.id}>- {comment.authorName}: {comment.content}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}