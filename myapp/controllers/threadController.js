var mongoose = require('mongoose');
var Thread = require('../models/Thread');

var threadController = {};

// mostra todos threads 
threadController.showAll = function(req, res){
    Thread.find({hidden: false}).exec((err, dbthreads)=>{
        if (err){
            console.log('Erro ao ler threads');
            res.status(500).send(err);
        } else {
            res.status(200).send(dbthreads);
        }
    })
}

// mostra 1 thread por id
threadController.show = function(req, res){
    Thread.findById(req.params.id).exec((err, dbthread)=>{
        if (err){
            console.log('Erro ao ler thread');
            res.status(500).send(err);
        } else if (dbthread.hidden) {
            res.status(404).send('Thread não encontrada');
        } else {
            res.status(200).send(dbthread);
        }
    })
}

// cria 1 thread como resposta a um post de um form
threadController.create = function(req,res){
    var thread = new Thread(req.body);
    thread.creator = req.userId; // assume que userId está disponível no req
    thread.save((err)=>{
        if (err){
            console.log('Erro ao gravar thread');
            res.status(500).send(err);
        } else {
            res.status(200).send(thread);
        }
    })
}

// apaga 1 thread
threadController.delete = function(req, res){
    Thread.findById(req.params.id, function(err, thread) {
        if (err){
            console.log('Erro ao encontrar thread');
            res.status(500).send(err);
        } else {
            if (thread.creator.toString() !== req.userId && req.userRole !== 'moderator' && req.userRole !== 'admin') {
                res.status(403).send('Insufficient permissions.');
            } else {
                Thread.remove({_id:req.params.id}).exec((err)=>{
                    if (err){
                        console.log('Erro ao apagar thread');
                        res.status(500).send(err);
                    } else {
                        res.status(200).send('Thread eliminada com sucesso');
                    }
                });
            }
        }
    });
}

// ocultar 1 thread
threadController.hide = function(req, res){
    Thread.findById(req.params.id, function(err, thread) {
        if (err){
            console.log('Erro ao encontrar thread');
            res.status(500).send(err);
        } else {
            if (thread.creator.toString() !== req.userId) {
                res.status(403).send('Insufficient permissions.');
            } else {
                Thread.findByIdAndUpdate(req.params.id, { hidden: true }, {new: true}, (err, updatedThread)=>{
                    if (err){
                        console.log('Erro ao ocultar thread');
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(updatedThread);
                    }
                });
            }
        }
    });
};

module.exports = threadController;
