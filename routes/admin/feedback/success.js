let express = require('express');
let router = express.Router();

router.get('/',(req,res)=>{
    res.render('./feedback/success',{msg:req.query.msg});
})

module.exports = router;