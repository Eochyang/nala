let express = require('express');
let router = express.Router();
let mgdb = require('../../common/mgdb');
router.get('/',(req,res)=>{
    res.render('login',{});

})
router.post('/submit',(req,res)=>{
    console.log(req.body);
    let {username,password} = req.body;
    mgdb({
        collection:'admin'
    },({collection,client})=>{
        collection.find({username,password},{_id:0}).toArray((err,result)=>{
            if(!err && result.length>0){
                // res.redirect('/admin/success?msg=登录成功');
                req.session['username'] = result[0].username;
                req.session['icon'] = result[0].icon;
                res.redirect('/admin/home');
            }else{
                res.redirect('/admin/error?msg=登录失败，用户名或密码错误');
            }
        })
        client.close();
    })

})

module.exports = router;      