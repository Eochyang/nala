import "../libs/jquery-2.2.4.js";
import "../libs/jquery.banner.1.0.1.js";
import "../libs/jquery.cookie.js";
import { Mainlogin } from "./main-login.js";

class Car{
    constructor(){
        this.num = 0;
        this.init();
        this.addEvent();
        
    }
    init(){
        var that = this;
        $.ajax({
            url:"/api/list",
            success:function(res){
                that.res = res;
                that.getCookie()
            }
        })
    }
    getCookie(){
        this.goods = JSON.parse($.cookie("goods"));
        this.display()
    }
    display(){
        var str = "";
        var str1 = 0;
        for(var i=0;i<this.res.length;i++){
            for(var j=0;j<this.goods.length;j++){
                if(this.goods[j].id === this.res[i].goodsId){
                    for(var k =0 ; k < this.res[i].type.length;k++){
                        if(this.res[i].type[k].typeId == this.goods[j].typeId){
                            // console.log(this.goods[j].typeId);
                            str += `<tr myid="${this.res[i].goodsId}" typeId="${this.res[i].type[k].typeId}"><td class="cho"><input type="checkbox" class="check" checked/></td>
                                    <td class="guige">
                                    <img src="${this.res[i].type[k].typeimg}" />
                                    <p class="tit">${this.res[i].type[k].name}</p>
                                    <p class="gray">${this.res[i].type[k].ma}</p>
                                    </td>
                                    <td class="jiage">${this.res[i].type[k].pri}</td>
                                    <td>
                                        <div class="num">
                                        <span class="left">-</span>
                                        <input type="text" value="${this.goods[j].num}">
                                        <span class="right">+</span>
                                        </div>
                                    </td>
                                    <td class="zj">￥${((this.res[i].type[k].pri).replace(/[\￥]/,"")*(this.goods[j].num)).toFixed(2)}</td>
                                    <td class="del"><em>删除</em></td>
                                    </tr>`
                            str1 += parseFloat((this.res[i].type[k].pri).replace(/[\￥]/,""))*parseFloat((this.goods[j].num));
                        }
                    }        
                }
            }
        }
        $(".main-c table").append(str);
        str1 = str1.toFixed(2);
        $(".pay p i").html("￥"+str1);
        this.check();
    }
    addEvent(){
        var that = this;
        $(".main-c table").on("click","span",function(event){
            that.num = $(this).siblings("input").val();
            that.id = $(this).parent().parent().parent().attr("myid");
            that.typeid = $(this).parent().parent().parent().attr("typeId");
            that.tr = $(this).parents("table").children().children();
            if($(event.target).attr("class")=="left"){
                if(that.num > 1) that.num --;
            }
            if($(event.target).attr("class")=="right"){
                that.num ++;
            }
            that.zj = (($(this).parent().parent().siblings(".jiage").html().replace(/[\￥]/,""))*that.num).toFixed(2);
            $(this).siblings("input").val(that.num);
            $(this).parent().parent().siblings(".zj").html("￥"+that.zj);
            that.setGoods();
            that.changezj();
        })
        $(".main-c table").on("click","em",function(){
            that.typeid = $(this).parent().parent().attr("typeId");
            $(this).parent().parent().remove();
            that.moveGoods();
            that.changezj();
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
                    // console.log(this.goods[i].typeId,this.typeid)
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
    changezj(){
        var b = 0;
        for(var i=0;i<$("td input.check:checked").length;i++){
            var a = parseFloat($($("td input.check:checked")[i]).parent().siblings(".zj").html().replace(/[\￥]/,""));
                b = a + b;
        }
        b = b.toFixed(2);
        $(".pay p i").html("￥"+b);
    }
    moveGoods(){
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].typeId == this.typeid){
                this.goods.splice(i,1)
            }
        }
        $.cookie("goods",JSON.stringify(this.goods))
    }
    check(){
        $("th input").change(()=>{
            var isChecked = $("th input").prop('checked');
            $("td input").prop("checked",isChecked);
            this.changezj();
        })
        $("td input").change(()=>{
            var all = $("td input.check").length;
            var checks = $("td input.check:checked").length;
            var isAllChecked = all === checks;
            $("th input").prop("checked",isAllChecked);
            this.changezj();
        })
    }

}

new Car();
new Mainlogin()