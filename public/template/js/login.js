import "../libs/jquery-2.2.4.js";
import "../libs/jquery.cookie.js";

class Login{
    constructor(){
        this.url = "http://www.liyangyf.com/ctrl/login.php";
        this.init();
    }
    init(){
        var that = this;
        $(".denglu").click(()=>{
            that.load()
        })
    }
    load(){
        var that = this;
        $.ajax({
            url:'/api/login',
            data:{
                username:$(".user").val(),
                password:$(".pass").val()
            },
            success:function(res){
                switch(res){
                    case "0":
                        alert("用户名密码不符");
                        break;
                    default:
                        that.res = res;
                        console.log(that.res.username);
                        $.cookie("user",that.res.username,{path:'/'});
                        alert("成功，3秒后跳转");
                        setTimeout(() => {
                            location.href = "index.html";
                        }, 3000);
                        console.log(that.res.user);
                }
            }
        })
    }
}

new Login();