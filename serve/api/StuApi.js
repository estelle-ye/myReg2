const models = require('../db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')

const conn = mysql.createConnection(models.mysql)
conn.connect()




//测试
router.get('/test',(req,res)=>{
  const sql="SELECT * FROM user"
  conn.query(sql,function(err,result){
    if(err){
      res.json({message:"test err",err:err})
      console.log(err)
    }
    res.json({message:"test ok",result:result})
  })
})
// 接口：增加信息
router.post('/add', (req, res) => {
  const params = req.body
  var deg  //创建随机数
  var createDeg=function(){
      deg='158932'+Math.floor(Math.random()*10000)
      conn.query(`SELECT * FROM user WHERE 10deg = ? `,[deg],function(err,result){
        if(err){
          console.log(err)
        }
        if(result.length==0){
          return deg
        }else{
          createDeg()
        }
      })
  }
  conn.query(`SELECT * FROM user WHERE mobile = ?`,[params.mobile],function(err,result){
    if(err){
      console.log(err);
    }
    if(result.length==0){
          console.log('添加', params);
          createDeg()
          conn.query(`insert into user(name,mobile,10deg) values (?,?,?)`, [params.name,params.mobile,deg], function (err, result) {
          if (err) {
            res.json({code:400,message:'失败',result:err})
          }
          if (result) {
            res.json({code:200,message:'注册成功'})
          }
        })
    }else{
      res.json({code:100,message:'数据已存在'})
    }
  })
})

// 接口：查询数据
router.post('/confirmation', (req, res) => {
  const sql = 'select * from user WHERE mobile = ?';
  const params = req.body
  conn.query(sql, [params.mobile], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      res.json(result)
    }
  })
})

// 接口：修改信息
router.post('/update', (req, res) => {
  const sql = 'UPDATE user SET  title = ? ,email = ? ,company = ? ,country = ? ,province = ? WHERE mobile = ? ';
  const params = req.body
  console.log('修改', params)
  conn.query(sql, [params.title,params.email,params.company,params.country,params.province,params.mobile], function (err, result) {
    if (err) {
      res.send({code:400,message:'失败',result:err})
    }
    if (result.affectedRows==0) {
      res.send({code:101,message:'更新数据不存在'})
      console.log(result)
    }else{//////////更新数据成功后，执行更新response
      console.log('获取response')
      conn.query('SELECT response FROM user WHERE mobile = ?',[params.mobile],function(err,result){
        if(err){
          res.send({code:401,message:'获取response失败',result:err})
        }
        if(result){
          var newCode="[USER-INFO]"//需要追加的代码
          var newValue=[].concat(newCode,)//设置追加
          console.log(newValue)
          conn.query('UPDATE user SET response= ? WHERE mobile = ?',[newValue,params.mobile],function(err,result){
            if(err){
              res.send({code:402,message:'response写入失败',result:err})
              console.log(err)
            }
            if(result){
              res.send({code:200,message:'response写入成功',result:result})
              console.log(result)
            }
          })
        }
      })
    }
  })
})

//接口：更新问卷response信息
router.post('/response/survery',(req,res)=>{
  const params=req.body
  console.log('修改问卷',params)
  conn.query('SELECT response FROM user WHERE mobile = ?',[params.mobile],function(err,result){
    if(err){
      res.json({code:400,message:'读取resopnse失败',result:err})
    }
    if(result){
      var newCode=params.response+"[USER-SURV]"//需要追加的代码
      var newValue=result[0].response.concat(newCode)//设置追加
      conn.query('UPDATE user SET response = ? WHERE mobile = ?',[newValue,params.mobile],function(err,result){
        if(err){
          res.json({code:400,message:'问卷修改失败',result:err})
        }
        if(result){
          res.json({code:200,message:'写入response成功',result:result})
        }
      })
    }
  })


})

//接口：更新门票response信息
router.post('/response/ticket',(req,res)=>{
  const params=req.body
  console.log('修改门票',params)
  conn.query('SELECT response FROM user WHERE mobile = ?',[params.mobile],function(err,result){
    if(err){
      res.json({code:400,message:'读取resopnse失败',result:err})
    }
    if(result){

      var newCode=params.response+"[USER-PAY]"//需要追加的代码
      var newValue=result[0].response.concat(newCode)//设置追加
      console.log(newValue)
      conn.query('UPDATE user SET response = ? WHERE mobile = ?',[newValue,params.mobile],function(err,result){
        if(err){
          res.json({code:400,message:'门票response修改失败',result:err})
        }
        if(result){
          res.json({code:200,message:'写入门票response成功',result:result})
        }
      })
    }
  })


})

//接口：获取response   /checkProcess post
router.post('/checkProcess',(req,res)=>{
  const params = req.body
  console.log('获取步骤response',params)
  conn.query('SELECT response FROM user WHERE mobile = ?',[params.mobile],function(err,result){
    if(err){
      res.json({code:400,message:'获取步骤response失败',result:err})
    }
    if(result){
      res.json({code:200,message:'获取步骤process成功',result:result})
    }
  })
})

module.exports = router