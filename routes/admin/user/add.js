let express = require('express');
let router = express.Router();
let path = require('path');
let mgdb = require('../../../common/mgdb');
let uploadUrl = require('../../../config/global').upload.user;

router.get('/',(req,res)=>{
    let {dataName} = res.params;
    if(!dataName){
        res.redirect('/admin/error?msg=dataName为必传参数')
        return ;
    }
    let common = {
        ...res.user_session,
        ...res.params,
        page_header:dataName+'添加',
    }
    res.render('./user/add',common);
})

router.post('/submit',(req,res)=>{
    let dataName = req.body.dataName;
    if(!dataName){
        res.send('/admin/error?msg=dataName为必传参数');
        return;
    }
    let {username,password} = req.body;
    let time = Date.now();

    mgdb(
        {
          collection:dataName
        },
        ({collection,client})=>{
          collection.find({username}).toArray((err,result)=>{
            if(!err && result.length>0){
              res.send('/admin/error?error=1&msg=用户名已存在')
            }else{
              collection.insertOne(
                {username,password,time},
                (err,result)=>{
                  if(!err && result.result.n){
                    res.send('/admin/user?dataName='+dataName+'&start=1')
                  }else{
                    res.send('/admin/error?error=1&msg='+dataName+'集合链接有误')
                  }
                  client.close();
                }
              )
            }
          })
        });
})
module.exports = router;