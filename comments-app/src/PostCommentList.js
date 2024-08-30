import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostCommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9000/api/posts/${postId}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error('Error fetching comments:', error));
  }, [postId]);

  const handleDeleteComment = (commentId) => {
    axios.delete(`http://localhost:9000/api/comments/${commentId}`)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== commentId));
      })
      .catch(error => console.error('Error deleting comment:', error));
  };

  return (
    <div>
      <h3>Comments:</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <p>{comment.text}</p>
              <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default PostCommentList;