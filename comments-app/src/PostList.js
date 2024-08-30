import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCommentList from './PostCommentList';
import PostCommentForm from './PostCommentForm';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:9000/api/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div>
            {posts.map(post => (
                <div key={post.id} style={{ marginBottom: '2rem' }}>
                    <h2>{post.title}</h2>
                    <p>{post.contents}</p>
                    <PostCommentList postId={post.id} />
                    <PostCommentForm postId={post.id} />
                </div>
            ))}
        </div>
    );
};

export default PostList;