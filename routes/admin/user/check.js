let express = require('express');
let router = express.Router();
let mgdb = require('../../../common/mgdb');
var uploadUrl = require('../../../config/global').upload.user;
var path = require('path');
var fs = require('fs');

router.get('/',(req,res)=>{
    let {_id,dataName} = res.params;

    if(!_id || !dataName){
        res.redirect('/admin/error?msg=_id和dataName为必传参数')
        return;
    }

    let common_data = {
        ...res.user_session,
        ...res.params,
        page_header:dataName + '修改',
      };
      
    mgdb({
        collection:dataName
        },({collection,client,ObjectID})=>{
        collection.find({
            _id:ObjectID(_id)
        }).toArray((err,result)=>{
            if(!err){
            console.log(result[0]);
            res.data={
                ...common_data,
                page_data:result[0]
            }
            res.render('./user/check.ejs', res.data);
            }else{
            res.redirect('/admin/error?error=1&msg='+dataName+'集合链接有误');
            }
            client.close();
        })
    })
})

router.post('/submit',(req,res,next)=>{
    let start = req.body.start ? req.body.start - 0 : require('../../../config/global').page_start - 0; 
    let num = req.body.num ? req.body.num-0 : require('../../../config/global').page_num-0; 

    let {username,password,nikename,follow,fans,dataName,icon_old,_id,q,rule} = req.body;

    let icon = req.files.length ? uploadUrl + req.files[0].filename + path.parse(req.files[0].originalname).ext : '';
  
    if(icon){
      fs.renameSync(
        req.files[0].path,
        req.files[0].path + path.parse(req.files[0].originalname).ext
      )
    }else{
      icon = icon_old;
    }
    mgdb({
        collection:dataName
    },({collection,client,ObjectID})=>{
        collection.updateOne({
            _id:ObjectID(_id)
        },{
            $set:{username,password,follow,fans,nikename,icon}
          },(err,result)=>{
            if(!err && result.result.n){
                res.send('/admin/user?dataName='+dataName+'&start='+(start+1)+'&num='+num+'&q='+q+'&rule='+rule);
            }else{
                res.send('/admin/error?msg=集合操作有误')
            }
        })
    });
})

module.exports = router;