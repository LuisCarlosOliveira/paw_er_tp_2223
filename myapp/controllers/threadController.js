var mongoose = require("mongoose");
var Thread = require("../models/Thread");
var fs = require("fs");
var path = require("path");

var threadController = {};

// Show thread by id
threadController.show = function (req, res) {
  Thread.findById(req.params.id)
    .populate("posts")
    .exec((err, thread) => {
      if (err) {
        console.log("Error reading thread");
        res.status(500).send(err);
      } else {
        if (thread.hidden) {
          if (req.userId !== thread.creator && req.userRole !== "admin" && req.userRole !== "moderator") {
            res.status(403).send("Insufficient permissions.");
          } else {
            res.status(200).send(thread);
          }
        } else {
          res.status(200).send(thread);
        }
      }
    });
};



// show all threads
threadController.showAll = function (req, res) {
    const page = parseInt(req.query.page) || 1; // Set page to 1 if no page nr given
    const limit = parseInt(req.query.limit) || 25; // Set the limit to 25 if no limit  given
  
    const skip = (page - 1) * limit; //  posts nr to skip based on page nr and limit of results per page.
  
    Thread.find({ hidden: false })
      .sort({_id: -1}) // Sort by creation date in descending order
      .skip(skip)
      .limit(limit)
      .exec((err, dbthreads) => {
        if (err) {
          console.log("Errr Reading threads");
          res.status(500).send(err);
        } else {
          res.status(200).send(dbthreads);
        }
      });
  };
  

// creates 1 thread in response to a form post
threadController.create = function (req, res) {
  var thread = new Thread(req.body);
  thread.creator = req.userId;
  if (req.file) {
    let fileBuffer = fs.readFileSync(req.file.path);
    thread.attachments.push({
      name: req.file.originalname,
      file: fileBuffer,
    });
    fs.unlinkSync(req.file.path);
  }
  thread.save((err) => {
    if (err) {
      console.log("Error saving thread");
      res.status(500).send(err);
    } else {
      res.status(200).send(thread);
    }
  });
};

// delete 1 thread
threadController.delete = function (req, res) {
  Thread.findById(req.params.id, function (err, thread) {
    if (err) {
      console.log("Error finding thread");
      res.status(500).send(err);
    } else {
      if (
        thread.creator.toString() !== req.userId &&
        req.userRole !== "moderator" &&
        req.userRole !== "admin"
      ) {
        res.status(403).send("Insufficient permissions.");
      } else {
        Thread.remove({ _id: req.params.id }).exec((err) => {
          if (err) {
            console.log("Error Deleting thread");
            res.status(500).send(err);
          } else {
            res.status(200).send("Thread deleted with success");
          }
        });
      }
    }
  });
};

// toggle hide a thread
threadController.hide = function (req, res) {
  Thread.findById(req.params.id, function (err, thread) {
    if (err) {
      console.log("Error finding  thread");
      res.status(500).send(err);
    } else {
      if (thread.creator.toString() !== req.userId) {
        res.status(403).send("Insufficient permissions.");
      } else {
        Thread.findByIdAndUpdate(
          req.params.id,
          { hidden: !thread.hidden }, 
          { new: true },
          (err, updatedThread) => {
            if (err) {
              console.log("Error hidden thread");
              res.status(500).send(err);
            } else {
              res.status(200).send(updatedThread);
            }
          }
        );
      }
    }
  });
};


// edit 1 thread
threadController.edit = function (req, res) {
  Thread.findById(req.params.id, function (err, thread) {
    if (err) {
      console.log("Error finding thread");
      res.status(500).send(err);
    } else {
      if (
        thread.creator.toString() !== req.userId &&
        req.userRole !== "moderator" &&
        req.userRole !== "admin"
      ) {
        res.status(403).send("Insufficient permissions.");
      } else {
        var updateData = req.body;
        if (req.file) {
          var fileBuffer = fs.readFileSync(req.file.path);
          updateData.attachments = [
            {
              name: req.file.originalname,
              file: fileBuffer,
            },
          ];
          fs.unlinkSync(req.file.path);
        }

        Thread.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true },
          function (err, updatedThread) {
            if (err) {
              console.log("Error editing thread");
              res.status(500).send(err);
            } else {
              res.status(200).send(updatedThread);
            }
          }
        );
      }
    }
  });
};

threadController.showBySubject = function (req, res) {
  const subjectId = req.params.subjectId;
  Thread.find({ subject: subjectId})
    .exec((err, threads) => {
      if (err) {
        console.log("Error reading threads");
        res.status(500).send(err);
      } else if (!threads.length) {
        res.status(404).send("Threads not found for this subject");
      } else {
        res.status(200).send(threads);
      }
    });
};


module.exports = threadController;
