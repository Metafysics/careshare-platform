import React, { useEffect, useState } from 'react';

const OuderBeheer = () => {
  const [ouders, setOuders] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/users?role=parent')
      .then(res => res.json())
      .then(data => setOuders(data));
  }, []);

  const gefilterd = ouders.filter(o =>
    o.name.toLowerCase().includes(filter.toLowerCase()) ||
    o.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">👨‍👩‍👧 Ouderinformatie</h1>

      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Zoek op ouder naam of e-mail"
        className="mb-4 px-3 py-2 border rounded w-full"
      />

      {gefilterd.map((ouder) => (
        <div key={ouder._id} className="border rounded p-4 mb-3">
          <div className="font-bold text-lg">👤 {ouder.name}</div>
          <div className="text-sm text-gray-600">{ouder.email}</div>
          <div className="text-sm text-gray-500">Laatste login: {ouder.lastLogin ? new Date(ouder.lastLogin).toLocaleDateString() : 'Onbekend'}</div>
        </div>
      ))}
    </div>
  );
};

export default OuderBeheer;
