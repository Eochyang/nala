export class Idata{
    constructor(){
        this.init();
    }
    init(){
        var that = this;
        $.ajax({
            url:"/api/html",
            success:function(res){
                that.res = res;
                that.display();
            }
        })
    }
    display(){
        var str = "";
        for(var i=0;i<this.res.length;i++){
            str += `<li>
            <div class="news-list-t">
                <a href="#">
                    <img src="${this.res[i].src}">
                </a>
            </div>
            <div class="news-list-b">
                <p class="name">
                    <i>一般贸易</i>
                    <a href="#">${this.res[i].name}</a>
                </p>
                <p class="price">${this.res[i].price}</p>
                <div class="sale">
                    <span class="sa">已售：${this.res[i].sale}件</span>
                    <span class="sb">起批量>${this.res[i].num}件</span>
                </div>
                <p class="label">
                    <em class="ding" data-tipmessage="该商品支持订货">订</em>
                </p>
            </div>
        </li>`;
        }
        $(".news-b .news-r ul").html(str);
    }
}