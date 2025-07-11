import React, { useState } from 'react';

const Support = () => {
  const [form, setForm] = useState({ name: '', email: '', role: 'parent', subject: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSuccess(true);
      setForm({ name: '', email: '', role: 'parent', subject: '', message: '' });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Support</h1>
      {success && <p className="mb-4 text-green-600">Je bericht is verzonden, we nemen contact op!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Naam" required className="w-full p-2 border rounded" />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="E-mail" required className="w-full p-2 border rounded" />
        <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="parent">Ouder</option>
          <option value="provider">Kinderopvang</option>
        </select>
        <input name="subject" value={form.subject} onChange={handleChange} placeholder="Onderwerp" required className="w-full p-2 border rounded" />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Bericht" required className="w-full p-2 border rounded" rows={4} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Verstuur</button>
      </form>
    </div>
  );
};

export default Support;
