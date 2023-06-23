const Course = require('../models/Course');

const courseController = {};

// Create Course
courseController.create = function(req, res, next) {
    const course = new Course(req.body);

    course.save((err, savedCourse) => {
        if (err) {
            console.log('Error on save!');
            res.status(500).send(err);
        } else {
            res.status(200).send({ course: savedCourse });
        }
    });
};

// Read Course
courseController.read = function(req, res) {
    Course.findById(req.params.id, function(err, course) {
        if (err) {
            res.status(500).send(err);
        } else if (!course) {
            res.status(404).send('Course not found');
        } else {
            res.status(200).send(course);
        }
    });
};

// Update Course
courseController.update = function(req, res) {
    Course.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedCourse) => {
        if (err) {
            res.status(500).send(err);
        } else if (!updatedCourse) {
            res.status(404).send('Course not found');
        } else {
            res.status(200).send(updatedCourse);
        }
    });
};

// Delete Course
courseController.delete = function(req, res) {
    Course.findByIdAndRemove(req.params.id, (err, deletedCourse) => {
        if (err) {
            res.status(500).send(err);
        } else if (!deletedCourse) {
            res.status(404).send('Course not found');
        } else {
            res.status(200).send('Course successfully deleted');
        }
    });
};

// Show All Courses
courseController.showAll = function(req, res) {
    Course.find({}, function(err, courses) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(courses);
        }
    });
};


// Show Course By Name
courseController.showByName = function(req, res) {
    Course.findOne({name: req.params.name}, function(err, course) {
        if (err) {
            res.status(500).send(err);
        } else if (!course) {
            res.status(404).send('Course not found');
        } else {
            res.status(200).send(course);
        }
    });
};

module.exports = courseController;
