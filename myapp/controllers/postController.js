var mongoose = require("mongoose");
var Post = require("../models/Post");
var fs = require("fs");
var path = require("path");
var Thread = require("../models/Thread");

var postController = {};

// Mostra um post pelo ID
postController.show = function (req, res) {
  Post.findById(req.params.id)
    .select("-attachments.file")
    .exec((err, dbpost) => {
      // '.select('-attachments.file')' exclui o buffer da resposta
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


// Mostra todos os posts 25 pp
postController.showAll = function (req, res) {
    const page = parseInt(req.query.page) || 1; // Defina a página para 1 se nenhum número de página for fornecido
    const limit = parseInt(req.query.limit) || 25; // Defina o limite para 25 se nenhum limite for fornecido
  
    const skip = (page - 1) * limit; // Quantos posts devemos pular
  
    Post.find({})
      .select("-attachments.file")
      .sort({_id: -1}) // Ordenar por data de criação em ordem decrescente
      .skip(skip)
      .limit(limit)
      .exec((err, dbposts) => {
        // '.select('-attachments.file')' exclui o buffer da resposta
        if (err) {
          console.log("Erro ao ler posts");
          res.status(500).send(err);
        } else {
          res.status(200).send(dbposts);
        }
      });
  };
  

// Cria um post
postController.create = function (req, res) {
    var post = new Post(req.body);
    post.creator = req.userId;
    // Verifica se existe um arquivo
    if (req.file) {
      // Lê o arquivo e converte em Buffer
      let fileBuffer = fs.readFileSync(req.file.path);
      post.attachments.push({
        name: req.file.originalname,
        file: fileBuffer,
      });
      // Remove o arquivo temporário
      fs.unlinkSync(req.file.path);
    }
  
    // Salva o post no banco de dados
    post.save((err, savedPost) => {
      if (err) {
        console.log("Erro ao gravar post");
        res.status(500).send(err);
      } else {
        // Adiciona o post à thread correspondente
        Thread.findById(req.body.thread, function (err, thread) {
          if (err) {
            console.log("Erro ao encontrar thread");
            res.status(500).send(err);
          } else {
            // Verifica se a thread existe
            if (thread) {
              thread.posts.push(savedPost._id);
              thread.save((err) => {
                if (err) {
                  console.log("Erro ao adicionar post à thread");
                  res.status(500).send(err);
                } else {
                  res.status(200).send(savedPost);
                }
              });
            } else {
              res.status(404).send("Thread não encontrada");
            }
          }
        });
      }
    });
  };
  

// Edita um post
postController.edit = function (req, res) {
  var postId = req.params.id;
  var updatedPost = req.body;

  Post.findById(postId, function (err, post) {
    if (err) {
      console.log("Erro ao encontrar post");
      res.status(500).send(err);
    } else {
      if (
        post.creator.toString() !== req.userId &&
        req.userRole !== "moderator" &&
        req.userRole !== "admin"
      ) {
        res.status(403).send("Insufficient permissions.");
      } else {
        // Atualiza o conteúdo do post, se fornecido
        if (updatedPost.content) {
          post.content = updatedPost.content;
        }

        // Atualiza o anexo do post, se fornecido
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

        // Salva as alterações no post
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

// Apaga um post
postController.delete = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      console.log("Erro ao encontrar post");
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
            console.log("Erro ao apagar post");
            res.status(500).send(err);
          } else {
            res.status(200).send("Post eliminado com sucesso");
          }
        });
      }
    }
  });
};

postController.upvotePost = function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            res.status(500).send(err);
        } else {
            // Verifica se o usuário já votou
            if (post.voters.includes(req.userId)) {
                res.status(403).send("User has already voted on this post.");
            } else {
                post.upvotes += 1;
                post.voters.push(req.userId);
                post.save(function(err) {
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

postController.downvotePost = function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            res.status(500).send(err);
        } else {
            // Verifica se o usuário já votou
            if (post.voters.includes(req.userId)) {
                res.status(403).send("User has already voted on this post.");
            } else {
                post.downvotes += 1;
                post.voters.push(req.userId);
                
                // Verifica se o post deve ser ocultado
                if (post.downvotes > 10 || (post.upvotes / (post.downvotes + post.upvotes)) < 0.1) {
                    post.hidden = true;
                }
                
                post.save(function(err) {
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


module.exports = postController;
