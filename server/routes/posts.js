import express from "express";
import Post from "../models/Post.js"; // Ensure `.js` extension is included

const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).send({ message: "Post created successfully", post });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Failed to create post", error: error.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.send(posts);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching posts", error: error.message });
  }
});

// Get a specific post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username")
      .populate("comments.author", "username");

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    res.send(post);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching post", error: error.message });
  }
});

// Update a post
router.put("/:id", async (req, res) => {
  try {
    const updates = {
      ...req.body,
      updatedAt: Date.now(),
    };

    const post = await Post.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    res.send({ message: "Post updated successfully", post });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating post", error: error.message });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    res.send({ message: "Post deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting post", error: error.message });
  }
});

// Add a comment to a post
router.post("/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    post.comments.push(req.body);
    post.updatedAt = Date.now();
    await post.save();

    res.status(201).send({ message: "Comment added successfully", post });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Failed to add comment", error: error.message });
  }
});

// Like a post
router.post("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    post.likes += 1;
    await post.save();

    res.send({ message: "Post liked successfully", likes: post.likes });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error liking post", error: error.message });
  }
});

export default router;
