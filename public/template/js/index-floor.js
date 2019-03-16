export class Floor{
    constructor(){
        this.init();
        this.index = 0;
    }
    init(){
        $("#floor ul li:not(:last)").click(function(){
            $("html").stop().animate({
                scrollTop: $(".louti").eq($(this).index()).offset().top
                });
        })
        $("#floor ul li").last().click(function(){
            $("html").stop().animate({
                scrollTop: 0
                });
        })
        $(window).scroll(function(){
            if($(".a").offset().top/1.5 < $(document).scrollTop() ){
                $("#floor").stop().fadeIn();
            }else{
                $("#floor").stop().fadeOut();
            }
            this.index = Math.floor(($(document).scrollTop() - $(".a").offset().top+0.5)/($(".a").height()+$(".a").next().height()));
            if(this.index<0){
                this.index =0;
            }
            $("#floor ul li:not(:last)").eq(index).css("background","#bb1d2a").siblings().css("background","");
        })
    }
}