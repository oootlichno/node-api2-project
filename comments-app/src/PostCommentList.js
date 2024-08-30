import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostCommentList.css'; // Importing CSS file for styling

const PostCommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/posts/${postId}/comments`);
        setComments(res.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:9000/api/comments/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comment-list">
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id} className="comment">
            <p className="comment-text">{comment.text}</p>
            <button className="delete-button" onClick={() => handleDelete(comment.id)}>Delete</button>
          </div>
        ))
      ) : (
        <p className="no-comments">No comments yet.</p>
      )}
    </div>
  );
};

export default PostCommentList;