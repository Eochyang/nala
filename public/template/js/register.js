import "../libs/jquery-2.2.4.js";

class Register{
    constructor(){
        this.url = "http://www.liyangyf.com/ctrl/register.php";
        this.v = true;
        this.init();
        this.Reg();
    }
    init(){
        var that = this;
        $(".zhuce").click(function(){
            if($(".check").prop('checked')){
                $(".check").next().html("");
                if(that.v){
                    that.load();
                }else{
                    alert("还有未填写的哦！");
                }  
            }else{
                $(".check").next().html("请选中我哦！");
            }
        })
    }
    Reg(){
        $(".phone").on("blur",function(){
            var reg = /^1[3|4|5|8]\d{9}$/;
            if(reg.test($(this).val())){
                $(this).next().html("手机号格式正确");
                this.v = true;
            }else{
                if($(this).val()!=""){
                    $(this).next().html("手机号格式错误");
                }
                this.v = false;
            }
        })
        $(".pass").on("blur",function(){
            var reg = /^[a-zA-Z_][\w]{5,15}$/;
            if(reg.test($(this).val())){
                $(this).next().html("密码格式正确");
                this.v = true;
            }else{
                if($(this).val()!=""){
                    $(this).next().html("密码格式错误");
                }
                this.v = false;
            }
            if($(".pass2").val()!="" && $(".pass").val()!=$(".pass2").val()){
                $(".pass2").next().html("两次密码不同！");
                this.v = false;
            }
        })
        $(".pass2").on("blur",function(){
            if($(".pass").val()==$(".pass2").val()&&$(".pass").val()!=""){
                $(this).next().html("密码相同");
                this.v = true;
            }else{
                if($(this).val()!=""){
                    $(this).next().html("两次密码不同！");
                }
                this.v = false;
            }
        })
    }
    load(){
        $.ajax({
            url:'/api/reg',
            data:{
                username:$(".phone").val(),
                password:$(".pass").val()
            },
            success:function(res){
                switch(res){
                    case "0":
                        $(".phoney").html("重名");
                        console.log(1);
                        break;
                    case "1":
                        alert("成功，3秒后跳转到登录");
                        console.log(1);
                        setTimeout(() => {
                            location.href = "../html/login.html";
                        }, 3000);
                        break;
                    case "2":
                        $(".phoney").html("不允许为空");
                        console.log(1);
                        break;
                }
            },
        })
    }
}

new Register();