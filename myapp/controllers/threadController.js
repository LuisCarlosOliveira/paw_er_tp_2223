var mongoose = require("mongoose");
var Thread = require("../models/Thread");
var fs = require("fs");
var path = require("path");

var threadController = {};

// Mostra uma thread por id
threadController.show = function (req, res) {
  Thread.findById(req.params.id)
    .populate("posts")
    .select("-attachments.file")
    .exec((err, thread) => {
      // '.select('-attachments.file')' exclui o buffer da resposta
      if (err) {
        console.log("Erro ao ler thread");
        res.status(500).send(err);
      } else if (thread.hidden) {
        res.status(404).send("Thread não encontrada");
      } else {
        res.status(200).send(thread);
      }
    });
};

// mostra todos threads
// mostra todos threads
threadController.showAll = function (req, res) {
    const page = parseInt(req.query.page) || 1; // Defina a página para 1 se nenhum número de página for fornecido
    const limit = parseInt(req.query.limit) || 25; // Defina o limite para 25 se nenhum limite for fornecido
  
    const skip = (page - 1) * limit; // Quantos threads devemos pular
  
    Thread.find({ hidden: false })
      .select("-attachments.file")
      .sort({_id: -1}) // Ordenar por data de criação em ordem decrescente
      .skip(skip)
      .limit(limit)
      .exec((err, dbthreads) => {
        // '.select('-attachments.file')' exclui o buffer da resposta
        if (err) {
          console.log("Erro ao ler threads");
          res.status(500).send(err);
        } else {
          res.status(200).send(dbthreads);
        }
      });
  };
  

// cria 1 thread como resposta a um post de um form
threadController.create = function (req, res) {
  var thread = new Thread(req.body);
  thread.creator = req.userId;
  // verifica se existe um arquivo
  if (req.file) {
    // lê o arquivo e converte em Buffer
    let fileBuffer = fs.readFileSync(req.file.path);
    thread.attachments.push({
      name: req.file.originalname,
      file: fileBuffer,
    });
    // remove o arquivo temporário
    fs.unlinkSync(req.file.path);
  }

  // Salva a thread no banco de dados
  thread.save((err) => {
    if (err) {
      console.log("Erro ao gravar thread");
      res.status(500).send(err);
    } else {
      res.status(200).send(thread);
    }
  });
};

// apaga 1 thread
threadController.delete = function (req, res) {
  Thread.findById(req.params.id, function (err, thread) {
    if (err) {
      console.log("Erro ao encontrar thread");
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
            console.log("Erro ao apagar thread");
            res.status(500).send(err);
          } else {
            res.status(200).send("Thread eliminada com sucesso");
          }
        });
      }
    }
  });
};

// ocultar 1 thread
threadController.hide = function (req, res) {
  Thread.findById(req.params.id, function (err, thread) {
    if (err) {
      console.log("Erro ao encontrar thread");
      res.status(500).send(err);
    } else {
      if (thread.creator.toString() !== req.userId) {
        res.status(403).send("Insufficient permissions.");
      } else {
        Thread.findByIdAndUpdate(
          req.params.id,
          { hidden: true },
          { new: true },
          (err, updatedThread) => {
            if (err) {
              console.log("Erro ao ocultar thread");
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

// edita uma thread
threadController.edit = function (req, res) {
  Thread.findById(req.params.id, function (err, thread) {
    if (err) {
      console.log("Erro ao encontrar thread");
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
        // verifica se existe um arquivo
        if (req.file) {
          // lê o arquivo e converte em Buffer
          var fileBuffer = fs.readFileSync(req.file.path);
          updateData.attachments = [
            {
              name: req.file.originalname,
              file: fileBuffer,
            },
          ];
          // remove o arquivo temporário
          fs.unlinkSync(req.file.path);
        }

        Thread.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true },
          function (err, updatedThread) {
            if (err) {
              console.log("Erro ao editar thread");
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

module.exports = threadController;
