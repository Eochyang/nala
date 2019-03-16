export class Mainlogin{
    constructor(){
        this.init();
    }
    init(){
        if($.cookie("user")){
            $(".login").html($.cookie("user"));
            $(".login").attr("title","切换账号");
            $(".car a").attr("href","car.html");
            $(".denglu").html("<p>用户"+$.cookie("user")+"</p>");
        }else{
            $(".login").html("请登录");
            $(".login").attr("title","");
            $(".car a").attr("href","login.html");
            $(".denglu").html("<a href='login.html' class='login1'>登录</a><a href='register.html' class='reg'>注册</a>");
            
        }
    }
}