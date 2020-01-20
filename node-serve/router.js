const express = require('express');
const router = express.Router();
const api = require('./api');
// const multer = require("multer"); //图片上传
// const fs = require('fs');

//注册
router.post('/setUser',(req,res,next)=>{
  api.setUser(req,res,next);
});
//登入
router.post('/userLogin',(req,res,next)=>{
    api.userLogin(req,res,next);
});
//获取博客数据
router.get('/articles', (req, res, next) => {
  api.getArticle(req, res, next);
});
//个人添加文章
router.post('/articles',(req,res,next)=>{
  api.addArticle(req,res,next);
});
//删除文章
router.post('/delArticle',(req,res,next)=>{
  api.delArticle(req,res,next);
})



module.exports = router;