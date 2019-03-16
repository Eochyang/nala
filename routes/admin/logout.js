let express = require('express');
let router = express.Router();

router.get('/',(req,res)=>{
    delete req.session.username;
    delete req.session.icon;
    res.redirect('/admin/login');
})

module.exports = router;