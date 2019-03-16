export class Djs{
    constructor(){
        this.timer = null;
        this.init();
        this.load();
    }
    init(){
        for(var i=0;i<$(".nav-move").children().length-1;i++){
            if(new Date().getHours()<parseInt($(".nav-move").children().eq(i+1).find("span").html()) && new Date().getHours()>=parseInt($(".nav-move").children().eq(i).find("span").html())){
                $(".nav-move").stop().animate({
                    left:131*-($(".nav-move").children().eq(i).index()-4)
                })
                this.end = parseInt($(".nav-move").children().eq(i+1).find("span").html());
                $(".nav-move").children().eq(i).find(".status").html("快抢中");
                $(".nav-move").children().eq(i).siblings().find(".status").html("即将开抢");
            }
        }
    }
    load(){
        var that = this;
        this.timer = setInterval(()=>{
            $.ajax({
                url:"../data/djs.php",
                data:{
                    start:new Date().getTime(),
                    end:new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),that.end).getTime()
                },
                success:(res)=>{
                    var day = parseInt(res/1000/60/60/24);
                    var h = parseInt(res/1000/60/60) - day*24;
                    var m = parseInt(res/1000/60) - day*24*60 - h*60;
                    var s = parseInt(res/1000) - day*24*60*60 - h*60*60 - m*60;
                    $(".timer .h").html(that.Zero(h)).next().html(that.Zero(m)).next().html(that.Zero(s));
                    if(res<0){
                        that.init();
                    }
                },
            })
        },1000)
    }
    Zero(n){
        if(n<10||n.length<2){
            return "0"+n;
        }else{
            return ""+n;
        }
    }
}