export class Fdj{
    constructor(){
        this.init();
    }
    init(){
        var that = this;
        $(".pic-t").hover(function(){
            $(this).children("img").css({opacity:".4"}).next().css({display:"block"}).parent().next().css({display:"block"});
            that.move();
        },function(){
            $(this).children("img").css({opacity:"1"}).next().css({display:"none"}).parent().next().css({display:"none"});
        })
        $(".pic-c ul").on("mouseover","li",function(){
            $(this).css({border:"1px solid #bb1d2a"}).children("span").css({display: "block"}).parent().siblings().css({border:0}).children("span").css({display:"none"});

            $(this).parent().parent().siblings(".pic-t").children("img").attr("src",$(this).children("img").attr("src")).next().css({backgroundImage:"url("+$(this).children("img").attr("src")+")"}).parent().siblings(".pic-r").children("img").attr("src",$(this).children("img").attr("src"));
        })
    }
    move(){
        $(".pic-t").on("mousemove",function(event){
            var eve = event || window.event;
            var l = eve.offsetX-$(this).children("span").width()/2;
            var t = eve.offsetY-$(this).children("span").height()/2;
            if(l<0) l=0;
            if(t<0) t=0;
            if(l>$(this).width()-$(this).children("span").width())
                l=$(this).width()-$(this).children("span").width();
            if(t>$(this).height()-$(this).children("span").height())
                t=$(this).height()-$(this).children("span").height();
                    
            $(this).children("span").css({left:l,top:t,backgroundPosition:-l+"px "+ -t + "px"});

            var lSim=l/($(this).width()-$(this).children("span").width());
            var rSim=t/($(this).height()-$(this).children("span").height());
            
            $(".pic-r img").css({
                left:lSim * ($(".pic-r").width()-$(".pic-r img").width()),
                top:rSim * ($(".pic-r").height()-$(".pic-r img").height())
            })
        })
    }

}
new Fdj();