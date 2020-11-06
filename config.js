/*
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 * 		框架设置类
 *
 *
 */
//是否是调试
var DEBUG = false;
//版本号
var VERSION = '0_1_0';
var APP_CNAME = '小程序名称';
var APP_ENAME = 'appName';
var APPID = 'appid';
var BASE_URL = "https://www.xxxx.com";
var SCREENHEIGHT = 1920;
var appListHeight = 1550;
var GAME_BANNER_HEIGHT = 100;
//自定义事件
var newUser = true;
//iphoneX下移距离
var IPHONEX_TOP = 120;
var LARGE_PHONE_H = 2000;
var ALL_LEVEL_KEY = "all_level_" + APP_ENAME;
//微信解密接口
var WXINFOPATH = 'https://Fxxk.com';
var APPNAME = APP_ENAME;
// 分享
var ShareState = {
    TIP: 1,
    OTHER: 0
};
// 是否统计ald
var ALD_ON = true;
// 是否开启ald分享
var ALD_SHARE_ON = true;
//开放域数据key
var openDataKey = 'level';
//channel
var userChannel = '';
//
var userStrategy = 'null';
var QUES = [];
var ifIphoneX = false;
var ICON_PATH = "";
// 是否加载完分包资源
var isLoadSubpackages = false;
var ifGotVersionSet = false;
var ifGotAppList = false;
var ifLoadNextBanner = false;
var ifGotArea = false;
var ifCheckArea = true;
var ifLimitArea = true;
var areaCon = false;
var ifNaviCheckArea = true;
var rN = 10;
var loadInterAdStatus = 0; //0:不显示, 1：显示中， 2：显示成功， 3：显示失败
var ifNextAppList = false;
var allques = [];
var quesall = [];
//
var channelFilter = { "default": 1 };
var LEVEL_STARS_ARR = [];
function aldSendOpenId(channel, openid) {
    //按渠道
    if (channel && (channel in channelFilter)) {
        var filter = channelFilter[channel];
        var flag = Math.random() < filter;
        if (flag) {
            if (typeof Laya.Browser.window.wx.aldSendOpenid === 'function') {
                Laya.Browser.window.wx.aldSendOpenid(openid);
            }
        }
    }
    else {
        //不包含渠道
        var filter = 1;
        if ('default' in channelFilter) {
            filter = channelFilter['default'];
        }
        var flag = Math.random() < filter;
        if (flag) {
            if (typeof Laya.Browser.window.wx.aldSendOpenid === 'function') {
                Laya.Browser.window.wx.aldSendOpenid(openid);
            }
        }
    }
}
/**
 * 
 */
var lastLoginDate = null;
var USER_LAST_LOGIN_DATE_KEY = "USER_LAST_LOGIN_DATE";
/**
 * 
 */
var dailyNavigateList = [];
var USER_DAILY_NAVIGATION_APPID_LIST_KEY = "USER_DAILY_NAVIGATION_APPID_LIST";
/**
 * 
 */
var allNavigateList = [];
var USER_ALL_NAVIGATION_APPID_LIST_KEY = "USER_ALL_NAVIGATION_APPID_LIST";
/**
 * 
 */
function currentDateString() {
    var current = new Date();
    var current_date = current.getFullYear() + "-" + current.getMonth() + "-" + current.getDate();
    return current_date;
}
function getSkinStr(skin) {
    if (skin.indexOf('?') > -1) {
        var idx = skin.indexOf('?');
        var tidx = skin.indexOf('icon/');
        var sidx = (tidx > -1) ? tidx : (idx - 16);
        return skin.substring(sidx, idx);
    }
    else {
        return skin;
    }
}
//
var NavigateAppArray = [];
//
function getAppIndex() {
    var chanceArray = [];
    var chance = 0;
    for (var i = 0; i < game.WAITING_APP_ARRAY.length; i++) {
        var tmp = game.WAITING_APP_ARRAY[i];
        chanceArray.push([chance, chance + tmp.chance]);
        chance += tmp.chance;
    }
    var rd = chance * Math.random();
    for (var j = 0; j < chanceArray.length; j++) {
        if (rd >= chanceArray[j][0] && rd < chanceArray[j][1]) {
            return j;
        }
    }
}
//
function getAppIndex2() {
    var chanceArray = [];
    var chance = 0;
    for (var i = 0; i < game.WAITING_APP_ARRAY.length; i++) {
        var tmp = game.WAITING_APP_ARRAY[i];
        for (var d = 0; d < tmp.chance; d++) {
            chanceArray.push(i);
        }
        chance += tmp.chance;
    }
    var chanceArray2 = shuffle(chanceArray);
    var rd = Math.floor(chance * Math.random());
    return chanceArray2[rd];
}
function shuffle(arr) {
    var i, j, temp;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}
;
function randomNaviList(array) {
    function randomsort(a, b) {
        return Math.random() > 0.5 ? -1 : 1;
    }
    array.sort(randomsort);
    return array;
}
//# sourceMappingURL=config.js.map