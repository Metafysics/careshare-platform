import React, { useEffect, useState } from 'react';

const LandingPage = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/cms/home')
      .then(res => res.json())
      .then(data => setContent(data.content));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default LandingPage;
