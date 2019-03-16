export class Goods{
    constructor(){
        this.init();
        this.num = 0;
    }
    init(){
        var that = this;
        $(".pro-c table").on("click","span",function(event){
            that.num = $(this).siblings("input").val();
            that.id = $(this).parent().parent().parent().attr("myid");
            that.typeid = $(this).parent().parent().parent().attr("typeId");
            if($(event.target).attr("class")=="left"){
                if(that.num > 1) that.num --;
            }
            if($(event.target).attr("class")=="right"){
                that.num ++;
            }
            $(this).siblings("input").val(that.num);
            that.setGoods();
        })
    }
    setGoods(){
        this.goods = $.cookie("goods")===null ? [] : JSON.parse($.cookie("goods"));
        if(this.goods.length < 1){
            this.goods.push({
                id:this.id,
                typeId:this.typeid,
                num:this.num
            })
        }else{
            var onoff = true;
            for(var i=0;i<this.goods.length;i++){
                if(this.goods[i].typeId === this.typeid){
                    this.goods[i].num = this.num;
                    onoff = false;
                    break;
                }
            }
            if(onoff){
                this.goods.push({
                    id:this.id,
                    typeId:this.typeid,
                    num:this.num
                })
            }
        }
        $.cookie("goods",JSON.stringify(this.goods));
        // console.log($.cookie("goods"));
    }
}