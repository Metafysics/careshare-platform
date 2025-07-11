import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const secties = [
  { key: 'home', label: '🏠 Landingspagina' },
  { key: 'over', label: '🎯 Wie zijn we' },
  { key: 'partners', label: '🤝 Partners' },
  { key: 'footer', label: '🌐 Footer info' }
];

const CMSDashboard = () => {
  const [inhoud, setInhoud] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/cms')
      .then(res => res.json())
      .then(data => setInhoud(data.reduce((acc, curr) => ({ ...acc, [curr.slug]: curr.content }), {})));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🛠️ CMS Beheer</h1>
      <ul className="space-y-4">
        {secties.map(s => (
          <li key={s.key} className="border rounded p-4 bg-white shadow flex justify-between items-center">
            <div>
              <div className="font-semibold text-lg">{s.label}</div>
              <div className="text-sm text-gray-500 truncate max-w-md">
                {inhoud[s.key]?.substring(0, 100) || 'Geen inhoud ingevoerd'}
              </div>
            </div>
            <button
              onClick={() => navigate(`/cms/${s.key}`)}
              className="bg-blue-600 text-white text-sm px-4 py-2 rounded"
            >
              Bewerken
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CMSDashboard;
