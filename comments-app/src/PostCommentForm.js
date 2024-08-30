import React, { useState } from 'react';
import axios from 'axios';

const PostCommentForm = ({ postId, onCommentAdded }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:9000/api/posts/${postId}/comments`, { text })
      .then(response => {
        onCommentAdded(response.data); // Notify parent component of the new comment
        setText(''); // Clear the input field
      })
      .catch(error => console.error('Error adding comment:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment"
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default PostCommentForm;