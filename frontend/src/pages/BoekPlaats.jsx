import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BoekPlaats = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [prijsPerDag, setPrijsPerDag] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:5000/api/availabilities?providerId=${providerId}`)
      .then(res => res.json())
      .then(data => {
        setAvailableDates(data);
        if (data.length > 0) setPrijsPerDag(data[0].pricePerDay);
      });
  }, [providerId]);

  const toggleDate = (date) => {
    setSelectedDates(prev =>
      prev.includes(date)
        ? prev.filter(d => d !== date)
        : [...prev, date]
    );
  };

  const handleBoek = async () => {
    const res = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: localStorage.getItem('userId'),
        providerId,
        selectedDates
      })
    });
    const data = await res.json();
    if (res.ok) {
      navigate(`/betaling/${data.paymentId}`);
    } else {
      alert(data.error || 'Boeken mislukt');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📅 Kies je dagen</h1>

      {availableDates.map((a) => (
        <label key={a.date} className="flex items-center mb-2">
          <input
            type="checkbox"
            value={a.date}
            onChange={() => toggleDate(a.date)}
            checked={selectedDates.includes(a.date)}
            className="mr-2"
          />
          {new Date(a.date).toLocaleDateString()} - €{a.pricePerDay.toFixed(2)}
        </label>
      ))}

      {selectedDates.length > 0 && (
        <div className="mt-4">
          <p>Totaal: <strong>€{(selectedDates.length * prijsPerDag).toFixed(2)}</strong></p>
          <button onClick={handleBoek} className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
            Bevestigen & Betalen
          </button>
        </div>
      )}
    </div>
  );
};

export default BoekPlaats;
