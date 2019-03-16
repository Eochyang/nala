let express = require('express');
let router = express.Router();
let mgdb = require('../../common/mgdb');

router.get('/',(req,res)=>{
    let {start,num,q,rule,dataName}=res.params;
    if (!dataName) {
        res.redirect('/admin/error?msg=dataName为必传参数')
        return;
    }
    let common = {
        ...res.user_session,
        ...res.params,
        start:start+1,
        api_name:'user'
    };
    mgdb(
        {
          collection:dataName
        },
        ({collection,client})=>{
          collection.find(
            q ? {username: eval('/'+ q +'/g') } : {},{
            projection:{
              _id:1,username:1,time:1
            },
            sort:rule ? {[rule]:-1} : {'time':-1}
          }).toArray((err,result)=>{
            let checkResult=result.slice(start*num,start*num+num)//提取要分页的数据
            res.data={
              ...common,
              page_data:checkResult,
              page_num:Math.ceil(result.length/num)//计算总页数
            }
            res.render('user', res.data);
            client.close();
          })
        }
      );

})

router.use('/add', require('./user/add'));
router.use('/check', require('./user/check'));
router.use('/del', require('./user/del'));

module.exports = router;