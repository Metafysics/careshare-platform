import React, { useEffect, useState } from 'react';

const SupportDashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/support')
      .then(res => res.json())
      .then(data => setTickets(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Support Dashboard</h1>
      {tickets.length === 0 && <p>Geen supportvragen gevonden.</p>}
      {tickets.map(ticket => (
        <div key={ticket._id} className="border p-4 rounded mb-3">
          <h2 className="font-semibold">{ticket.subject}</h2>
          <p><strong>Van:</strong> {ticket.name} ({ticket.email})</p>
          <p><strong>Status:</strong> {ticket.status}</p>
          <p>{ticket.message}</p>
          {ticket.response && <p><strong>Reactie:</strong> {ticket.response}</p>}
        </div>
      ))}
    </div>
  );
};

export default SupportDashboard;
