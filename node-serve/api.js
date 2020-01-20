const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');
// const marked = require('marked');
// const jwt = require('jsonwebtoken');  //用来生成token

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true    // 多语句查询
});
module.exports = {
  // 登入
  userLogin(req,res,next) {
    pool.getConnection((err, connection)=> {
       let postData = req.body;
      //  let content = { name: req.body.name }; // 要生成token的主题信息
      //  let secretOrPrivateKey = "jwt";// 这是加密的key（密钥）
      //  let token = jwt.sign(content, secretOrPrivateKey, {
      //   expiresIn: 60 * 60 * 1  // 1小时过期
      //  });
        var a   = [postData.username];
        var sql = sqlMap.user.queryUsername;
       connection.query(sql,a,(err,result) => {
        if (result.length === 0) {
          res.json({
            status: false,
            msg: '用户不存在'
          });
        } else {
          if (result[0].password !== postData.password) {
            res.json({
              status: false,
              msg: '密码错误'
            });
          } else {
            res.json({
              status: true,
              msg: '登录成功',
            });
          }
        }
        connection.release()
      })
    });
  },
  //所有文章
  getArticle(req, res, next) {
    pool.getConnection((err, connection) => {

      // let postData = req.query;//get请求参数在query里
      // let pageNum = parseInt(postData.pageNum || 1);// 页码
      // let end = parseInt(postData.pageSize || 5); // 默认页数
      // let start = (pageNum - 1) * end;
      
      connection.query(sqlMap.article.articles,(err, result) => {
        console.log(result)
        res.json(result);
      })
      connection.release();
    })
  },
  //注册
  setUser(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body;
      connection.query(sqlMap.user.queryUsername, [postData.username], (err, result) => {
        if (result.length !== 0) {
          res.json({
            status: false,
            msg: '用户已存在'
          });
          connection.release();
        } else {
          let username = postData.username, password = postData.password;
          connection.query(sqlMap.user.insert, [username, password], (err, result) => {
            let status = true, msg = '注册成功';
            if (err) {
              status = false;
              msg = '服务器出错,请稍后再试';
            }
            res.json({
              status: status,
              msg: msg
            });
            connection.release();
          })
        }
      })
    })
  },
   // 新增文章
  addArticle(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body,
        creat_at = new Date().getTime();
        console.log(postData);
        title = postData.title;
      connection.query(sqlMap.article.queryByTitle, [title], (err, result) => {
        if (result.length > 0) {
          res.json({
            status: false,
            msg: '文章标题已存在',
          });
          connection.release();
        } else {
          // postData.html, postData.tags, creat_at, 0, 0, postData.state
          connection.query(sqlMap.article.insert, [postData.username, title, postData.content,creat_at],(err, result) => {
            if (err !== null) {
              res.json({
                status: false,
                msg: '添加失败',
              });
            } else {
              res.json({
                status: true,
                msg: '添加成功',
              });
            }
            connection.release();
          })
        }
      })
    })
  },
   //删除文章
  delArticle(req, res, next) {
    pool.getConnection((err, connection) => {
      let postData = req.body;
      connection.query(sqlMap.article.delById, [postData.id], (err, result) => {
        if (err !== null) {
          res.json({
            status: false,
            msg: '删除失败',
          });
        } else {
          res.json({
            status: true,
            msg: '删除成功',
          });
        }
        connection.release();
      })
    })
  },
}