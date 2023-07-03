var mongoose = require("mongoose");
var Post = require("../models/Post");
var fs = require("fs");
var path = require("path");
var Thread = require("../models/Thread");

var postController = {};

// show  post by ID
postController.show = function (req, res) {
  Post.findById(req.params.id)
    .exec((err, dbpost) => {
      if (err) {
        console.log("Erro ao ler post");
        res.status(500).send(err);
      } else if (!dbpost) {
        res.status(404).send("Post não encontrado");
      } else {
        res.status(200).send(dbpost);
      }
    });
};

// Show all posts. 25 per pp
postController.showAll = function (req, res) {
  const page = parseInt(req.query.page) || 1; // Set page to 1 if no page nr given
  const limit = parseInt(req.query.limit) || 25; // Set the limit to 25 if no limit  given

  const skip = (page - 1) * limit; //  posts nr to skip based on page nr and limit of results per page.

  Post.find({})
    .sort({ _id: -1 }) // Sort by creation date in descending order
    .skip(skip)
    .limit(limit)
    .exec((err, dbposts) => {
      if (err) {
        console.log("Error reading posts");
        res.status(500).send(err);
      } else {
        res.status(200).send(dbposts);
      }
    });
};

// Create post
postController.create = function (req, res) {
  var post = new Post(req.body);
  post.creator = req.userId;
  if (req.file) {
    let fileBuffer = fs.readFileSync(req.file.path);
    post.attachments.push({
      name: req.file.originalname,
      file: fileBuffer,
    });
    // Remove temporary file
    fs.unlinkSync(req.file.path);
  }

  post.save((err, savedPost) => {
    if (err) {
      console.log("Error saving post");
      res.status(500).send(err);
    } else {
      Thread.findById(req.body.thread, function (err, thread) {
        if (err) {
          console.log("Error finding thread");
          res.status(500).send(err);
        } else {
          if (thread) {
            thread.posts.push(savedPost._id);
            thread.save((err) => {
              if (err) {
                console.log("Error adding post to thread");
                res.status(500).send(err);
              } else {
                res.status(200).send(savedPost);
              }
            });
          } else {
            res.status(404).send("Thread not found");
          }
        }
      });
    }
  });
};

// Edit  post
postController.edit = function (req, res) {
  var postId = req.params.id;
  var updatedPost = req.body;

  Post.findById(postId, function (err, post) {
    if (err) {
      console.log("Error finding post");
      res.status(500).send(err);
    } else {
      if (
        post.creator.toString() !== req.userId &&
        req.userRole !== "moderator" &&
        req.userRole !== "admin"
      ) {
        res.status(403).send("Insufficient permissions.");
      } else {
        if (updatedPost.content) {
          post.content = updatedPost.content;
        }
        // Update post attachment if provided
        if (req.file) {
          let fileBuffer = fs.readFileSync(req.file.path);
          post.attachments = [
            {
              name: req.file.originalname,
              file: fileBuffer,
            },
          ];
          fs.unlinkSync(req.file.path);
        }
        post.save((err) => {
          if (err) {
            console.log("Erro ao editar post");
            res.status(500).send(err);
          } else {
            res.status(200).send(post);
          }
        });
      }
    }
  });
};

// delete post
postController.delete = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log("Error finding post");
      res.status(500).send(err);
    } else {
      if (
        post.creator.toString() !== req.userId &&
        req.userRole !== "moderator" &&
        req.userRole !== "admin"
      ) {
        res.status(403).send("Insufficient permissions.");
      } else {
        Post.remove({ _id: req.params.id }).exec((err) => {
          if (err) {
            console.log("Error deleting post");
            res.status(500).send(err);
          } else {
            res.status(200).send("Post deleted with success");
          }
        });
      }
    }
  });
};

postController.upvotePost = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      res.status(500).send(err);
    } else {
      // Check if the user has already voted
      if (post.voters.includes(req.userId)) {
        res.status(403).send("User has already voted on this post.");
      } else {
        post.upvotes += 1;
        post.voters.push(req.userId);
        post.save(function (err) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(post);
          }
        });
      }
    }
  });
};

postController.downvotePost = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      res.status(500).send(err);
    } else {
      // Check if the user has already voted
      if (post.voters.includes(req.userId)) {
        res.status(403).send("User has already voted on this post.");
      } else {
        post.downvotes += 1;
        post.voters.push(req.userId);

        // check post must be hidden
        if (
          post.downvotes > 10 ||
          post.upvotes / (post.downvotes + post.upvotes) < 0.1
        ) {
          post.hidden = true;
        }

        post.save(function (err) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(post);
          }
        });
      }
    }
  });
};

// Show all post from thread
postController.showByThread = function (req, res) {
  var threadId = req.params.id;

  Post.find({ thread: threadId })
    .sort({ _id: -1 }) // Sort by creation date in descending order
    .exec((err, dbposts) => {   
      if (err) {
        console.log("Error reading posts");
        res.status(500).send(err);
      } else if (!dbposts) {
        res.status(404).send("No posts found in thread");
      } else {
        res.status(200).send(dbposts);
      }
    });
};

postController.toggleHidePost = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log("Error finding post");
      res.status(500).send(err);
    } else {
      if (
        post.creator.toString() !== req.userId &&
        req.userRole !== "moderator" &&
        req.userRole !== "admin"
      ) {
        res.status(403).send("Insufficient permissions.");
      } else {
        post.hidden = !post.hidden;
        post.save(function (err) {
          if (err) {
            console.log("Error hide/unhide post");
            res.status(500).send(err);
          } else {
            res.status(200).send(post);
          }
        });
      }
    }
  });
};

module.exports = postController;
