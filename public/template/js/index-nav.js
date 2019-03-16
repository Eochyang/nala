export class Nav{
    constructor(){
        this.index = 0;
        this.init();
    }
    init(){
        var that = this;
        $(".nav-c>ul li").hover(function(){
            $(this).parent().siblings(".third").stop().fadeIn();
            that.index = $(this).index();
            that.ready();
        },function(){
            $(this).parent().siblings(".third").stop().fadeOut();
        })
        $(".third").hover(function(){
            $(this).stop().fadeIn();
        },function(){
            $(this).stop().fadeOut();
        })
    }
    ready(){
        var that = this;
        $.ajax({
            url:"../data/nav-data"+that.index+".json",
            success:function(res){
                that.res = res;
                that.display();
            },
            error:function(){
                console.log(1);
            }
        })
    }
    display(){
        var str = "";
        for(var i=0;i<this.res.length;i++){
            str += `<li class="clear">
            <div class="td-tit">${this.res[i].title}
            <span> > </span>
            </div>
            <div class="td-con">${this.res[i].name}</div>
            </li>`;
        }
        $(".third ul").html(str);
    }
}