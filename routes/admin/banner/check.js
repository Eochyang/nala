let express = require('express');
let router = express.Router();
let path = require('path');
let mgdb = require('../../../common/mgdb');
let fs = require('fs');
let uploadUrl = require('../../../config/global').upload.banner;

router.get("/",(req,res)=>{
    let {dataName,_id} = res.params;
    if(!dataName || !_id){
        res.redirect('/admin/error?msg=dataName和_id为必传')
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
            data={
              ...common_data,
              page_data:result[0]
            }
            res.render('./banner/check.ejs',data);
          }else{
            res.redirect('/admin/error?error=1&msg='+dataName+'集合链接有误');
          }
          client.close();
        })
      })
})


router.post("/submit",(req,res)=>{
  // console.log(req.body);
  let {goodsId,title,price,sale,goodnum,logo,country,jieshao,typeId,name,ma,xiang,pri,dataName,_id,start,q,num,rule} = req.body;
  let time = Date.now()
  let pro,country_pic,fenlei,detail,more;
  let arr_detail=[];
  let arr_more=[];   
  console.log(req.files);
  req.files.forEach((items)=>{
      if(items.fieldname == 'pro'){
          pro = uploadUrl + items.filename + path.parse(items.originalname).ext
      }
      if(items.fieldname == 'country_pic'){
          country_pic = uploadUrl + items.filename + path.parse(items.originalname).ext
      }   
      if(items.fieldname == 'fenlei'){
          fenlei = uploadUrl + items.filename + path.parse(items.originalname).ext
      }   
      if(items.fieldname == 'detail'){
          detail = uploadUrl + items.filename + path.parse(items.originalname).ext;
          arr_detail.push(detail);
      }   
      if(items.fieldname == 'more'){
          more = uploadUrl + items.filename + path.parse(items.originalname).ext;
          arr_more.push(more);
      }   
      fs.renameSync(items.path,items.path + path.parse(items.originalname).ext)
  })
    mgdb(
        {
          collection:dataName
        },
        ({collection,client,ObjectID})=>{
          collection.updateOne(
            {_id:ObjectID(_id)},
            {$set:{goodsId,img:pro,title,price,sale,goodnum,logo,country_pic,country,jieshao,type:[{typeId,typeimg:fenlei,name,ma,xiang,pri}],goods_pic:arr_detail,detail_pic:arr_more}},
            (err,result)=>{
                console.log(result)
              if(!err && result.result.n){
                res.send('/admin/banner?dataName='+dataName+'&start='+(start-0+1)+'&q='+q+'&rule='+rule+'&num='+num)
              }else{
                res.send('/admin/error?error=1&msg='+dataName+'集合链接有误')
              }
              client.close();
            }
          )
        }
      );
})
module.exports = router;