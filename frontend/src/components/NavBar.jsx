import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [badge, setBadge] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('notificatieBadge');
    if (stored) setBadge(parseInt(stored));
  }, []);

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/" className="font-bold text-lg">Careshare</Link>
        <Link to="/wie-zijn-we">Wie zijn we</Link>
        <Link to="/partners">Partners</Link>
        <Link to="/notificaties" className="relative">
          🔔
          {badge > 0 && (
            <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white rounded-full px-2">
              {badge}
            </span>
          )}
        </Link>
      </div>
      <div>
        <Link to="/logout" className="text-sm text-gray-600">Uitloggen</Link>
      </div>
    </nav>
  );
};

export default NavBar;
