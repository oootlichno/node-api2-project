// implement your server here
const express = require('express');
const postRoutes = require('./posts/posts-router'); 
const server = express();

server.use(express.json()); 

server.use('/api/posts', postRoutes); 

server.use('/', (req, res) => res.send('API up and running!'));

module.exports = server;