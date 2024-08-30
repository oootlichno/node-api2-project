import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './PostList';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<PostList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

