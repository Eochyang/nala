let express = require('express');
let router = express.Router()

router.get('/',(req,res)=>{
    let common = {
        ...res.user_session,
        page_header:'首页',
        active:'home'
    }
    res.render('home',common);

})

module.exports = router;