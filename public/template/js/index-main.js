import "../libs/jquery-2.2.4.js";
import "../libs/jquery.banner.1.0.1.js";
import "../libs/jquery.cookie.js";
import {Nav} from "./index-nav.js";
import {Brand} from "./index-brand.js";
import { Mainlogin } from "./main-login.js";
import { Floor } from "./index-floor.js";
import { Idata } from "./index-data.js";

$("#banner").banner({
    items:$("#banner").children(".imgbox").children("li"),
    left:$("#banner").children(".btns").children("#left"),
    right:$("#banner").children(".btns").children("#right"),
    list:$("#banner").children(".list-b").children("span"),
    moveTime:2000,
    // autoPlay:false,
    delayTime:2000,
});

new Nav();
new Brand();
new Mainlogin();
new Floor();
new Idata();