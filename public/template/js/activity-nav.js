export class ActNav{
    constructor(){
        this.init();
    }
    init(){
        $(".nav-move li").on("click",function(){
            console.log($(this).width())
            $(this).parent().stop().animate({
                left:131*-($(this).index()-4)
            })
        })
    }
}