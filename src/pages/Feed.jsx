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

  if (loading) {
    return <div className="text-white p-6">Loading feed...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-green-500 mb-6">
        Live Feed
      </h1>

      {projects.length === 0 && (
        <p className="text-gray-400">No projects yet.</p>
      )}

      <div className="space-y-6">
        {projects.map(project => (
          <div
            key={project.id}
            className="bg-gray-900 border border-green-500 rounded-lg p-6 shadow-md hover:shadow-green-500/20 transition"
          >
            <h2 className="text-xl font-semibold text-green-400 mb-2">
              <Link to={`/projects/${project.id}`} className="hover:underline">
                {project.title}
              </Link>
            </h2>

            <p className="text-gray-300 mb-3">{project.description}</p>

            <div className="text-sm text-gray-400 space-y-1 mb-4">
              <p>Stage: <span className="text-white">{project.stage}</span></p>
              <p>
                Completed:{' '}
                <span className={project.completed ? 'text-green-500' : 'text-red-400'}>
                  {project.completed ? 'Yes' : 'No'}
                </span>
              </p>
            </div>

            {}
            <div className="border-t border-gray-700 pt-3">
              <p className="text-sm text-gray-400 mb-2">Comments</p>

              {project.comments?.length === 0 && (
                <p className="text-gray-500 text-sm">No comments yet.</p>
              )}

              <div className="space-y-2">
                {project.comments?.map(comment => (
                  <div
                    key={comment.id}
                    className="bg-gray-800 p-2 rounded-md text-sm"
                  >
                    <span className="text-green-400 font-medium">
                      {comment.authorName}
                    </span>
                    <span className="text-gray-300">: {comment.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}