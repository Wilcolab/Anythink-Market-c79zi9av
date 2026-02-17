const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
//Hey GitHub Copilot, can you help me with this code? I want to create a route that allows users to post comments on a blog post. The comment should include the user's name, the comment text, and the ID of the blog post it belongs to. I also want to make sure that the comment is saved in the database and that the user receives a response confirming that their comment was posted successfully.

// Route to post a comment on a blog post
router.post("/comments", async (req, res) => {
  try {
    const { name, text, postId } = req.body;

    // Validate the input
    if (!name || !text || !postId) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new comment
    const newComment = new Comment({
      name,
      text,
      postId,
    });

    // Save the comment to the database
    await newComment.save();

    // Send a response confirming that the comment was posted successfully
    res.status(201).json({ message: "Comment posted successfully.", comment: newComment });
  } catch (error) {
    console.error("Error posting comment:", error);
    res.status(500).json({ message: "An error occurred while posting the comment." });
  }
});