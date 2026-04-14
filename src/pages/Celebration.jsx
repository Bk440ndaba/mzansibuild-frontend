import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Celebration() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/celebration')
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
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-500 text-xl">Loading celebration wall...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-500"> Celebration Wall </h1>
          <p className="text-gray-400 mt-2">Completed projects - great work!</p>
        </div>

        {projects.length === 0 ? (
          <div className="bg-gray-900 border border-green-500 rounded-lg p-8 text-center">
            <p className="text-gray-300">No completed projects yet.</p>
            <p className="text-gray-500 mt-2">Keep building - your first completion will appear here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map(project => (
              <div key={project.id} className="bg-gray-900 border border-green-500 rounded-lg p-6 shadow-lg transform transition hover:scale-102">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-green-400">{project.title}</h2>
                    <p className="text-gray-300 mt-1">{project.description}</p>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <span className="bg-green-900/50 text-green-300 px-2 py-1 rounded text-sm">
                        Stage: {project.stage}
                      </span>
                      <span className="bg-green-900/50 text-green-300 px-2 py-1 rounded text-sm">
                         Completed
                      </span>
                    </div>
                    {project.supportNeeded && (
                      <p className="text-yellow-600 text-sm mt-2">Support needed: {project.supportNeeded}</p>
                    )}
                  </div>
                  <div className="text-4xl"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}