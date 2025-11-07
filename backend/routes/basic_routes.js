const express = require('express')
const {getAllArticles,postArticle,getArticle,updateArticle,deleteArticle} = require('../crud_ops/crud.js')
const roleAuth = require('../security_ops/roleAuth.js')

const router = express.Router();

router.get('/',(req,res)=>getAllArticles(req,res));
router.post('/',roleAuth(['admin']),(req,res)=>postArticle(req,res));
router.get('/:id',(req,res)=>getArticle(req,res));
router.put('/:id',roleAuth(['admin']),(req,res)=>updateArticle(req,res));
router.delete('/:id',roleAuth(['admin']),(req,res)=>deleteArticle(req,res));
module.exports = router;







