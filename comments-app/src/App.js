import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './PostList';
import PostForm from './PostForm';
import PostCommentList from './PostCommentList';
import PostCommentForm from './PostCommentForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/new" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostList />} />
        <Route path="/posts/:id/comments" element={<PostCommentList />} />
        <Route path="/posts/:id/comments/new" element={<PostCommentForm />} />
      </Routes>
    </Router>
  );
}

export default App;

