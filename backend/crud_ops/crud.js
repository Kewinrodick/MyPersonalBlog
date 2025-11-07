const mongoose = require('mongoose')

const Articles = require('../module/articleModule.js')

const getAllArticles = async(req,res)=>{
    try{
        const data = await Articles.find();
        res.status(200).json(data);
    }catch(err){
        console.error(err.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

const postArticle = async(req,res)=>{
    try{
        const {title,content} = req.body;
        const newArticle = new Articles({
            title,
            content,
        })
        await newArticle.save();
        res.status(201).json(newArticle);
    }catch(err){
        console.err(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}
const getArticle = async(req,res)=>{
    try{
        const data = await Articles.findById(req.params.id);
        if(!data){
            return res.status(404).json({message:"Article Not Found"});
        }
        res.status(200).json(data);
    }catch(err){
        console.error(err.message);
        res.status(500).json({message:"Intenal Server Error"})
    }
}
const updateArticle = async(req,res)=>{
    try{
        
        const updatedArticle = await Articles.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedArticle){
            return res.status(404).json({message:"Article Not Found"});
        }
        
        res.status(200).json(newArticle);
    }catch(err){
        console.err(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}
const deleteArticle = async(req,res)=>{
    try{
    
        const deletedArticle = await Articles.findByIdAndDelete(req.params.id);
        if(!deletedArticle){
            return res.status(404).json({message:"Article Not Found"});
        }
        
        res.status(200).json({message:"Article Deleted Successfully!"});
    }catch(err){
        console.err(err);
        res.status(500).json({message:"Internal Server Error"});
    }
}


module.exports = {getAllArticles,postArticle,getArticle,updateArticle,deleteArticle}