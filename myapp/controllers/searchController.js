const express = require("express");
const Post = require("../models/Post");
const Thread = require("../models/Thread");

const searchController = {};

searchController.searchPosts = (req, res) => {
  let { term, type } = req.query;
  let query = {};

  switch (type) {
    case "title":
      // allow partial searches on the title
      query.title = new RegExp(term, "i");
      break;
    case "tags":
      query.tags = new RegExp(term, "i");
      break;
    case "images":
      // Check if the thread has images or no
      query.hasImages = term === "true";
      break;
    default:
      return res.status(400).json({ error: "Invalid search type" });
  }

  Post.find(query)
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

searchController.searchThreads = (req, res) => {
  let { term, type } = req.query;
  let query = {};

  switch (type) {
    case "title":
      //allow partial searches on the title
      query.title = new RegExp(term, "i");
      break;
    case "tags":
      query.tags = new RegExp(term, "i");
      break;
    case "images":
      // Check if the thread has images or no
      query.attachments =
        term === "true" ? { $not: { $size: 0 } } : { $size: 0 };
      break;
    default:
      return res.status(400).json({ error: "Invalid search type" });
  }

  Thread.find(query)
    .select("-attachments.file")
    .then((threads) => {
      res.json(threads);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

module.exports = searchController;
