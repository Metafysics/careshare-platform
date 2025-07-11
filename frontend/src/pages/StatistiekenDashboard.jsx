import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const StatistiekenDashboard = () => {
  const [stats, setStats] = useState({ aanvragen: [], boekingen: [], omzet: [] });

  useEffect(() => {
    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const renderChart = (data, label, kleur) => (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-2">{label}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={kleur} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Statistieken</h1>
      {renderChart(stats.aanvragen, 'Aantal Aanvragen per Maand', '#3b82f6')}
      {renderChart(stats.boekingen, 'Aantal Boekingen per Maand', '#10b981')}
      {renderChart(stats.omzet, 'Omzet per Maand (€)', '#f59e0b')}
    </div>
  );
};

export default StatistiekenDashboard;
