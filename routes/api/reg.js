let express = require('express');
let router = express.Router();
let mgdb = require('../../common/mgdb');

router.get('/',(req,res,next)=>{
    let {username,password} = req.query;
    mgdb({
        collection:'user'
    },({collection,client})=>{
        collection.find({username}).toArray((err,result)=>{
            if(!err && result.length>0){
                res.send('0');
            }else{
                collection.insertOne(
                    {username,password},(err,result)=>{
                        res.send('1')
                        client.close();
                    });
            }
        client.close();
        }) 
    });
})

module.exports = router;