let express = require('express');
let router = express.Router();
let mgdb = require('../../common/mgdb');

router.get('/',(req,res,next)=>{
    mgdb({
        collection:'list'
    },({collection,client})=>{
        collection.find({}).toArray((err,result)=>{
            res.send(result);
            client.close();
        }) 
    });
})

module.exports = router;