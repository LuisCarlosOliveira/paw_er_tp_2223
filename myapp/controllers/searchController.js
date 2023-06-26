const express = require('express');
const Post = require('../models/Post');

// Controlador de pesquisa
const searchController = {};

// Método de pesquisa
searchController.searchPosts = (req, res) => {
    let { term, type, course, subject, page, limit } = req.query;
    let query = {};

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 25;

    const skip = (page - 1) * limit;

    // Verifica se o curso e a unidade curricular estão presentes e adiciona-os à consulta.
    if(course) {
        query.course = course;
    }

    if(subject) {
        query.subject = subject;
    }

    switch(type) {
        case 'title':
            // Usa uma expressão regular para permitir pesquisas parciais no título
            query.title = new RegExp(term, 'i');
            break;
        case 'tags':
            // Usa uma expressão regular para permitir pesquisas parciais nas tags
            query.tags = new RegExp(term, 'i');
            break;
        case 'images':
            query.hasImages = term === 'true';
            break;
        default:
            return res.status(400).json({ error: 'Invalid search type' });
    }

    Post.find(query)
        .skip(skip)
        .limit(limit)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
};


module.exports = searchController;
