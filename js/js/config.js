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
var VERSION = '0_0_1';
var APP_CNAME = '';
var APP_ENAME = '';
var APPID = '	';
var BASE_URL = "";
//云开发id
var ENV_ID = "";
var SCREENHEIGHT = 1920;
var appListHeight = 1550;
//正常状态
var STATE_NORMAL = 1;
//当前选中状态
var STATE_SELECTED = 2;
//锁定状态
var STATE_LOCKED = 3;
//奖励状态
var STATE_BONUS = 4;
//主页打开提示币对话框
var CHARGE_DIALOG_HOME = 1;
//游戏中打开提示币对话框
var CHARGE_DIALOG_GAME = 2;
//获取金币数量
var HELP_COIN_NUM = 3;
//方块间隙调整阈值
var GAME_BANNER_HEIGHT = 100;
//iphoneX下移距离
var IPHONEX_TOP = 130;
var LARGE_PHONE_H = 2000;
//切换页面:PassPage
var PAGE_PASS = 1;
var WX_SHARE_KEY = 'sharedContent';
var ALL_LEVEL_KEY = "all_level_" + APP_ENAME;
//微信解密接口
var WXINFOPATH = '';
var APPNAME = '';
//每个level题目数量
var LEVEL_SCORE_STR = 'levelScoreStr';
var levelScoreObj = {};
// 分享
var ShareState = {
    TIP: 1,
    BONUS: 2,
    LGBONUS: 3,
    CHARGE: 4,
    GROUPRANK: 5,
    INVITE: 6,
    MENU: 7,
    MONEY: 8,
    DOUBLE: 9,
    OTHER: 0
};
// 是否统计ald
var ALD_ON = true;
// 是否开启ald分享
var ALD_SHARE_ON = true;
//开放域数据key
var openDataKey = 'level';
var runPkAppid = 'wx0df340653291122c';
//用户信息button
var userButton = null;
//channel
var userChannel = '';
var userScene = 0;
//level name
var LEVEL_NAME_ARR = [
    "新手",
    "初级",
    "中级",
    "高级",
    "专家",
    "大师"
];
var QUES = [];
var ifIphoneX = false;
var QINIU_ICON_PATH = "";
var SUB_ICON_PATH = "icon/";
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
//channel过滤参数
var channelFilter = { "default": 1 };
var LEVEL_STARS_ARR = [];
function aldSendOpenId(channel, openid) {
    log("=========aldSendOpenId   channel:" + channel + ",openid:" + openid);
}
/**
 * 用户上一次登录日期
 */
var lastLoginDate = null;
var USER_LAST_LOGIN_DATE_KEY = "USER_LAST_LOGIN_DATE";
/**
 * 当日跳转列表
 */
var dailyNavigateList = [];
var USER_DAILY_NAVIGATION_APPID_LIST_KEY = "USER_DAILY_NAVIGATION_APPID_LIST";
/**
 * 历史跳转列表
 */
var allNavigateList = [];
var USER_ALL_NAVIGATION_APPID_LIST_KEY = "USER_ALL_NAVIGATION_APPID_LIST";
/**
 * 当日日期
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
//默认导量数组
var NavigateAppArray = [];
//# sourceMappingURL=config.js.map