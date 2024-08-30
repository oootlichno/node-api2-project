import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostForm() {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, contents }),
    });
    if (response.ok) {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        placeholder="Contents"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostForm;