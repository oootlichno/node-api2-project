import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCommentList from './PostCommentList';
import './PostList.css'; // Importing CSS file for styling

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/posts');
        setPosts(res.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="post-list">
      {posts.map(post => (
        <div key={post.id} className="post">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-contents">{post.contents}</p>
          <PostCommentList postId={post.id} />
        </div>
      ))}
    </div>
  );
};

export default PostList;