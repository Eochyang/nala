let express = require('express');
let router = express.Router();
let mgdb = require('../../../common/mgdb')

router.get('/',(req,res)=>{
    let {dataName,_id,start,num,q,rule} = res.params;
    if(!dataName || !_id){
        res.redirect('/admin/error?msg=dataName和_id为必传参数');
        return ;
    }
    mgdb({
        collection:dataName
    },({collection,client,ObjectID})=>{
        collection.deleteOne({_id:ObjectID(_id)},(err,result)=>{
            if(!err && result.result.n){
                res.redirect('/admin/user?dataName='+dataName+'&start='+(start+1)+'&num='+num+'&q='+q+'&rule='+rule);
            }else{
                res.redirect('/admin/error?msg='+dataName+'操作有误')
            }
            client.close();
        })
    });
})

module.exports = router;