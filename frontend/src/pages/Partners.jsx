import React, { useEffect, useState } from 'react';

const Partners = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/cms/partners')
      .then(res => res.json())
      .then(data => setContent(data.content));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6" dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default Partners;
