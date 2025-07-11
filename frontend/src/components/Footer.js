import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/cms/footer')
      .then(res => res.json())
      .then(data => setContent(data.content));
  }, []);

  return (
    <footer className="bg-gray-100 p-6 text-center text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: content }} />
  );
};

export default Footer;
