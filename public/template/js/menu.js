export class Menu{
    constructor(){
        this.init();
    }
    init(){
        $(".nav-l a").hover(function(){
            $(this).parent().next().stop().fadeIn();
        },function(){
            $(this).parent().next().stop().fadeOut();
        })
        $(".nav-c").hover(function(){
            $(this).stop().fadeIn();
        },function(){
            $(this).stop().fadeOut();
        })
    }
}