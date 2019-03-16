let express = require('express');
let router = express.Router();
var mgdb = require('../../common/mgdb');

router.get('/',(req,res)=>{
    let {dataName,start,q,rule,num}=res.params;
    if(!dataName){
        res.redirect('/admin/error?msg=dataName为必传单数')
        return;
    }
    let common_data = {
    ...res.user_session,
    ...res.params,
    start:start+1,
    api_name:'banner'
    };
    mgdb(
        {
          collection:dataName
        },
        ({collection,client})=>{
          collection.find(
            q ? {title: eval('/'+ q +'/g') } : {},{
            projection:{
              _id:1,goodsId:1,title:1
            },
            sort:rule ? {[rule]:-1} : {'time':-1}
        }).toArray((err,result)=>{
        let checkResult=result.slice(start*num,start*num+num)//提取要分页的数据
        res.data={
            ...common_data,
            page_data:checkResult,
            page_num:Math.ceil(result.length/num)//计算总页数
        }
        res.render('banner', res.data);
        client.close();
        })
    });
})

router.use('/add', require('./banner/add'));
router.use('/check', require('./banner/check'));
router.use('/del', require('./banner/del'));

module.exports = router;