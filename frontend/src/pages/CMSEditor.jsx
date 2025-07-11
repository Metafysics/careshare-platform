import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CMSEditor = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/cms/${slug}`)
      .then(res => res.ok ? res.json() : { content: '' })
      .then(data => setContent(data.content || ''));
  }, [slug]);

  const handleSave = async () => {
    await fetch(`http://localhost:5000/api/cms/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    navigate('/cms');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">✏️ Bewerken: {slug}</h1>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={15}
        className="w-full border p-4 rounded mb-4"
      />
      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Opslaan
      </button>
    </div>
  );
};

export default CMSEditor;
