;(function(){
    "use strict";
    $.fn.extend({
        banner:function(options){
            this.LOCAL ={
                autoPlay:options.autoPlay==false ? false : true,
                moveTime:options.moveTime || 300,
                delayTime:options.delayTime || 2000,
                index:0,
                iprve:options.items.length - 1,
                onoff:false,
                timer:null,
                aftercolor:options.list.eq(0).css("backgroundColor"),
                beforecolor:options.list.eq(1).css("backgroundColor"),
            }
            var that = this;
            if(options.list != undefined && options.list.length != 0){
                this.LOCAL.onoff = true;
                this.LOCAL.moveList=function(i,type){
                    options.items.eq(that.LOCAL.index).css({
                        left:0
                    }).stop().animate({
                        left: -options.items.eq(0).width() * type
                    }).end().eq(i).css({
                        left: options.items.eq(0).width() * type
                    }).stop().animate({
                        left:0
                    })
                }
                // console.log()
                options.list.on("click",function(){
                    // console.log(that.LOCAL.index,$(this).index())
                    if($(this).index() > that.LOCAL.index){ //图片往左
                        that.LOCAL.moveList($(this).index(),1);
                    }
                    if($(this).index() < that.LOCAL.index){
                        options.items.eq(that.LOCAL.index).css({
                            left:0
                        }).stop().animate({
                            left:options.items.eq(0).width()
                        }).end().eq($(this).index()).css({
                            left:-options.items.eq(0).width()
                        }).stop().animate({
                            left:0
                        })
                    }
                    that.LOCAL.index = $(this).index();
                    options.list.css({background:that.LOCAL.beforecolor}).eq(that.LOCAL.index).css({background:that.LOCAL.aftercolor});
                })
            }
            this.LOCAL.movebtn=function(type){
                options.items.eq(that.LOCAL.iprve).css({
                    left:0
                }).stop().animate({
                    left: -options.items.eq(0).width() * type
                }).end().eq(that.LOCAL.index).css({
                    left: options.items.eq(0).width() * type
                }).stop().animate({
                    left:0
                })
                if(that.LOCAL.onoff){
                    options.list.css({background:that.LOCAL.beforecolor}).eq(that.LOCAL.index).css({background:that.LOCAL.aftercolor});
                }
            }
            this.LOCAL.rightclick = function(){
                if(that.LOCAL.index == options.items.length - 1){
                    that.LOCAL.index = 0;
                    that.LOCAL.iprve = options.items.length - 1;
                }else{
                    that.LOCAL.index++;
                    that.LOCAL.iprve = that.LOCAL.index - 1;
                }
                that.LOCAL.movebtn(1);
            }
            if(options.left != undefined && options.left != 0 && options.right != undefined && options.right != 0){
                options.left.on("click",function(){
                    if(that.LOCAL.index == 0){
                        that.LOCAL.index = options.items.length - 1;
                        that.LOCAL.iprve = 0;
                    }else{
                        that.LOCAL.index--;
                        that.LOCAL.iprve = that.LOCAL.index + 1;
                    }
                    that.LOCAL.movebtn(-1);
                    // console.log(that.LOCAL.index,that.LOCAL.iprve);
                });
                options.right.on("click",this.LOCAL.rightclick);
            }
            
            this.LOCAL.auto=function(){
                that.LOCAL.timer = setInterval(function(){
                    that.LOCAL.rightclick();
                },that.LOCAL.delayTime);
            }
            if(this.LOCAL.autoPlay){
                this.LOCAL.auto();
                this.hover(function(){
                    clearInterval(that.LOCAL.timer);
                },function(){
                    that.LOCAL.auto();
                })
            }

        }
    })
})();