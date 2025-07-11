import React, { useEffect, useState } from 'react';

const Notificaties = () => {
  const [notificaties, setNotificaties] = useState([]);
  const [ongelezenTeller, setOngelezenTeller] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    fetch(`http://localhost:5000/api/notifications/${userId}`)
      .then(res => res.json())
      .then(data => {
        setNotificaties(data);
        setOngelezenTeller(data.filter(n => !n.read).length);
        localStorage.setItem('notificatieBadge', data.filter(n => !n.read).length);
      });
  }, []);

  const markeerAlsGelezen = async (id) => {
    await fetch(`http://localhost:5000/api/notifications/${id}/mark-read`, {
      method: 'PATCH'
    });
    setNotificaties(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    setOngelezenTeller(prev => prev - 1);
    localStorage.setItem('notificatieBadge', ongelezenTeller - 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">🔔 Meldingen</h1>
        <div className="text-sm text-gray-500">Ongelezen: {ongelezenTeller}</div>
      </div>

      {notificaties.length === 0 && (
        <p className="text-gray-500">Je hebt nog geen meldingen.</p>
      )}

      {notificaties.map((n) => (
        <div key={n._id} className={`border p-4 mb-3 rounded ${n.read ? 'bg-gray-100' : 'bg-yellow-50'}`}>
          <div className="flex justify-between">
            <h2 className="font-semibold">{n.title}</h2>
            {!n.read && (
              <button onClick={() => markeerAlsGelezen(n._id)} className="text-blue-500 text-sm hover:underline">Markeer als gelezen</button>
            )}
          </div>
          <p className="text-sm mt-1">{n.message}</p>
          {n.link && (
            <a href={n.link} className="text-blue-600 text-sm hover:underline mt-2 inline-block">Bekijk opvang →</a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Notificaties;
