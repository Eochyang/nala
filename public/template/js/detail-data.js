export class Detail{
    constructor(){
        this.id = location.search.substr(1).split("=")[1];
        this.init()
    }
    init(){
        var that = this;
        $.ajax({
            url:"/api/list",
            success:function(res){
                that.res = res;
                that.display();
            }
        })
    }
    display(){
        for(var i=0;i<this.res.length;i++){
            if(this.res[i].goodsId == this.id){
                var pic = this.res[i].goods_pic;
                var type = this.res[i].type;
                var detail_pic = this.res[i].detail_pic;
                var str = "";
                var str1 = "";
                var str2 = "";

                $(".pic-t .view").attr("src",pic[0]);
                $(".pic-t span").css({backgroundImage:"url("+pic[0]+")"});
                $(".pic-r img").attr("src",pic[0]);

                for(var j=0;j<pic.length;j++){
                    str += `<li><img src="${pic[j]}">
                            <span class="iconfont icon-tubiaozhizuo-"></span>
                            </li>`;
                }
                $(".pic-c ul").html(str);

                $(".pic-b span").html("销量："+this.res[i].sale);
                $(".good-detail .title").html("<div class='title-t'><img src='"+this.res[i].country_pic+"'><span>"   +this.res[i].country+"</span></div><h1>"+this.res[i].title+"</h1><p>"+this.res[i].jieshao+"</p>")
                $(".good-detail .info .pifa span").html(this.res[i].price)
                $(".good-detail .info .liang span").html(this.res[i].goodnum+"片");

                for(var k=0;k<type.length;k++){
                    str1 += `<tr myid="${this.res[i].goodsId}" typeId="${type[k].typeId}"><td class="guige">
                        <p>${type[k].name}</p>
                        <p class="gray">${type[k].ma}</td>
                    <td class="jiage">${type[k].pri}</td>
                    <td class="number">${type[k].xiang}</td>
                    <td class="kucun">-</td>
                    <td>
                        <div class="num">
                            <span class="left">-</span>
                            <input type="text" value="0">
                            <span class="right">+</span>
                        </div>
                    </td>
                </tr>`
                }
                $(".pro-c table").append(str1);

                for(var m=0;m<detail_pic.length;m++){
                    str2 += `<img src="${detail_pic[m]}">`;
                }
                $(".part-img").html(str2);

                $(".brand-logo").html(this.res[i].logo);
            }
        }
    }
}