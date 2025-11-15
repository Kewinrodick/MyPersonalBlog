const express = require('express');
const { getAllArticles, postArticle, getArticle, updateArticle, deleteArticle } = require('../crud_ops/crud.js');

const requireAuth = require('../security_ops/authmiddleware.js')

const router = express.Router();

// User routes
router.get('/', getAllArticles);
router.get('/:id', getArticle);

// Admin-only routes
router.post('/',requireAuth, postArticle);
router.put('/:id', requireAuth, updateArticle);
router.delete('/:id', requireAuth, deleteArticle);

module.exports = router;
