var Subject = require('../models/Subject');
const Course = require('../models/Course');

const subjectController = {};

// Create Subject
subjectController.create = function(req, res) {
    const subject = new Subject();
    subject.name = req.body.name;
    subject.courses = req.body.courses;
    
    subject.save((err, savedSubject) => {
      if (err) {
        console.log('Error on save!');
        res.status(500).send(err);
      } else {
        // update the course(s) to reference this subject
        Course.updateMany(
          { _id: { $in: req.body.courses } },
          { $push: { subjects: savedSubject._id } },
          function(err) {
            if (err) {
              console.log('Error updating courses:', err);
              res.status(500).send(err);
            } else {
              res.status(200).send({ subject: savedSubject });
            }
          }
        );
      }
    });
  };
  

  

// Read Subject
subjectController.read = function(req, res) {
    Subject.findById(req.params.id, function(err, subject) {
        if (err) {
            res.status(500).send(err);
        } else if (!subject) {
            res.status(404).send('Subject not found');
        } else {
            res.status(200).send(subject);
        }
    });
};

// Update Subject
subjectController.update = function(req, res) {
    Subject.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedSubject) => {
        if (err) {
            res.status(500).send(err);
        } else if (!updatedSubject) {
            res.status(404).send('Subject not found');
        } else {
            res.status(200).send(updatedSubject);
        }
    });
};

// Delete Subject
subjectController.delete = function(req, res) {
    Subject.findByIdAndRemove(req.params.id, (err, deletedSubject) => {
        if (err) {
            res.status(500).send(err);
        } else if (!deletedSubject) {
            res.status(404).send('Subject not found');
        } else {
            res.status(200).send('Subject successfully deleted');
        }
    });
};

// Show All Subjects
subjectController.showAll = function(req, res) {
    Subject.find({}, function(err, subjects) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(subjects);
        }
    });
};

// Show Subjects for a specific Course
subjectController.showByCourse = function(req, res) {
    var courseId = req.params.courseId;
    console.log('Before querying subjects for course');
    Subject.find({course: courseId}, function(err, subjects) {
        if (err) {
            console.log('Error querying subjects:', err);
            res.status(500).send(err);
        } else {
            console.log('Subjects:', subjects);
            res.status(200).send(subjects);
        }
    });
    console.log('After querying subjects for course');
};


// Add Subject to Course
subjectController.addSubjectToCourse = function(req, res) {
    const courseId = req.params.courseId;
    const subjectId = req.params.subjectId;
    
    Course.findById(courseId, function(err, course) {
      if (err) {
        console.log('Error finding course:', err);
        res.status(500).send(err);
      } else if (!course) {
        res.status(404).send('Course not found');
      } else {
        course.subjects.push(subjectId);
        course.save(function(err, updatedCourse) {
          if (err) {
            console.log('Error updating course:', err);
            res.status(500).send(err);
          } else {
            Subject.findById(subjectId, function(err, subject) {
              if (err) {
                console.log('Error finding subject:', err);
                res.status(500).send(err);
              } else if (!subject) {
                res.status(404).send('Subject not found');
              } else {
                subject.courses.push(courseId);
                subject.save(function(err, updatedSubject) {
                  if (err) {
                    console.log('Error updating subject:', err);
                    res.status(500).send(err);
                  } else {
                    res.status(200).send({ course: updatedCourse, subject: updatedSubject });
                  }
                });
              }
            });
          }
        });
      }
    });
  };
  

module.exports = subjectController;

