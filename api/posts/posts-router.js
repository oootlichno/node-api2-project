// implement your posts router here
const express = require("express");
const Post = require("./posts-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  Post.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The post information could not be retrieved",
      });
    });
});

router.post("/", async (req, res) => {
    try {
      const { title, contents } = req.body;
  
      if (!title || !contents) {
        return res.status(400).json({
          message: "Please provide title and contents for the post",
        });
      }
  
      const newPost = { title, contents };
      const insertedPost = await Post.insert(newPost); 
  
      const createdPost = await Post.findById(insertedPost.id); 
  
      res.status(201).json(createdPost);
    } catch (error) {
      console.error("Error while saving the post to the database:", error);
      res.status(500).json({
        message: "There was an error while saving the post to the database",
        error: error.message,
      });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { title, contents } = req.body;
  
      if (!title || !contents) {
        return res.status(400).json({
          message: "Please provide title and contents for the post",
        });
      }
  
      const updatedCount = await Post.update(id, { title, contents });
  
      if (updatedCount === 0) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      }
  
      const updatedPost = await Post.findById(id);
  
      res.status(200).json(updatedPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "The post information could not be modified",
      });
    }
  });

router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      const postToDelete = await Post.findById(id);
  
      if (!postToDelete) {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      } else {
        await Post.remove(id);
          res.json(postToDelete);
      }
    } catch (err) {
      res.status(500).json({
        message: "The post could not be removed",
      });
    }
  });


  router.get("/:id/comments", async (req, res) => {
    try {
      const postId = req.params.id;
      
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      }
            const comments = await Post.findPostComments(postId);
      res.status(200).json(comments);
      
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "The comments information could not be retrieved",
      });
    }
  });


module.exports = router;
