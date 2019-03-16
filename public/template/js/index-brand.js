export class Brand{
    constructor(){
        this.init();
    }
    init(){
        $(".hot li").hover(function(){
            $(this).children().css({"background-color":" #bb1d2a","color":"#fff"}).parent().siblings().children().css({"background":"#fff","color":"#333"});
        })
    }
}