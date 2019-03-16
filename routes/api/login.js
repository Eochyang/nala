let express = require('express');
let router = express.Router();
let mgdb = require('../../common/mgdb');

router.get('/',(req,res,next)=>{
    let {username,password} = req.query;
    mgdb({
        collection:'user'
    },({collection,client})=>{
        collection.find({username,password}).toArray((err,result)=>{
            if(!err & result.length>0){
                res.send(result[0]);
            }else{
                res.send('0');
            }
            client.close();
        }) 
    });
})

module.exports = router;