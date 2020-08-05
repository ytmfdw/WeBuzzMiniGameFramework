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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var dialog_dir;
    (function (dialog_dir) {
        var DialogSettingUI = /** @class */ (function (_super) {
            __extends(DialogSettingUI, _super);
            function DialogSettingUI() {
                return _super.call(this) || this;
            }
            DialogSettingUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.dialog_dir.DialogSettingUI.uiView);
            };
            DialogSettingUI.uiView = { "type": "Dialog", "props": { "width": 900, "height": 644 }, "child": [{ "type": "Image", "props": { "y": 322, "x": 450, "width": 900, "var": "imgBg", "skin": "subassets/comp/setting_bg_2.png", "height": 644, "anchorY": 0.5, "anchorX": 0.5, "sizeGrid": "20,20,20,20" }, "child": [{ "type": "Label", "props": { "y": 70, "x": 450, "width": 166, "valign": "middle", "text": "设  置", "skin": "subassets/skins/imgTextSheZhi.png", "height": 78, "fontSize": 60, "color": "#000000", "bold": true, "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Image", "props": { "y": 59, "x": 837, "width": 100, "var": "btnClose", "skin": "subassets/comp/imgClose.png", "height": 100, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 180, "x": 446, "width": 700, "var": "layoutMusic", "skin": "subassets/comp/setting_button.png", "height": 130, "anchorY": 0, "anchorX": 0.5, "sizeGrid": "0,40,0,40" }, "child": [{ "type": "Label", "props": { "y": 60, "x": 100, "width": 130, "valign": "middle", "text": "音  乐", "skin": "subassets/skins/imgTextYinYue.png", "height": 57, "fontSize": 50, "color": "#ffffff", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "CheckBox", "props": { "x": 510, "width": 128, "var": "cbMusic", "stateNum": 2, "skin": "comp/imgCbMusic.png", "height": 128 } }] }, { "type": "Image", "props": { "y": 339, "x": 446, "width": 700, "var": "layoutSound", "skin": "subassets/comp/setting_button.png", "height": 130, "anchorY": 0, "anchorX": 0.5, "sizeGrid": "0,40,0,40" }, "child": [{ "type": "Label", "props": { "y": 60, "x": 100, "width": 130, "valign": "middle", "text": "音  效", "skin": "subassets/skins/imgTextYinXiao.png", "height": 57, "fontSize": 50, "color": "#ffffff", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "CheckBox", "props": { "x": 510, "width": 128, "var": "cbSound", "stateNum": 2, "skin": "comp/imgCbSound.png", "height": 128 } }] }, { "type": "Image", "props": { "y": 498, "x": 446, "width": 700, "visible": false, "var": "layoutVirbrate", "skin": "subassets/comp/setting_button.png", "height": 130, "anchorY": 0, "anchorX": 0.5, "sizeGrid": "0,40,0,40" }, "child": [{ "type": "Label", "props": { "y": 60, "x": 100, "width": 130, "valign": "middle", "text": "震  动", "skin": "subassets/skins/imgTextZhenDong.png", "height": 57, "fontSize": 50, "color": "#ffffff", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "CheckBox", "props": { "y": 0, "x": 510, "width": 128, "var": "cbVirbrate", "stateNum": 2, "skin": "comp/imgCbVirbate.png", "height": 128 } }] }, { "type": "Label", "props": { "y": 91, "x": 29, "width": 200, "visible": false, "var": "versionLabel", "valign": "middle", "text": "版本：v0.0.1", "height": 40, "fontSize": 25, "color": "#212121", "align": "left" } }] }] };
            return DialogSettingUI;
        }(Dialog));
        dialog_dir.DialogSettingUI = DialogSettingUI;
    })(dialog_dir = ui.dialog_dir || (ui.dialog_dir = {}));
})(ui || (ui = {}));
(function (ui) {
    var item_dir;
    (function (item_dir) {
        var drawerItemUI = /** @class */ (function (_super) {
            __extends(drawerItemUI, _super);
            function drawerItemUI() {
                return _super.call(this) || this;
            }
            drawerItemUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.item_dir.drawerItemUI.uiView);
            };
            drawerItemUI.uiView = { "type": "View", "props": { "y": 90, "x": 70, "width": 140, "pivotY": 90, "pivotX": 70, "height": 180 }, "child": [{ "type": "Sprite", "props": { "y": 100, "x": 70, "width": 140, "var": "drawerItemSprite", "scaleY": 1, "scaleX": 1, "pivotY": 90, "pivotX": 70, "height": 180 }, "compId": 4, "child": [{ "type": "Image", "props": { "y": 8, "x": 8, "width": 124, "var": "itemIcon", "height": 124, "anchorY": 0, "anchorX": 0 } }, { "type": "Text", "props": { "y": 140, "x": 0, "width": 140, "var": "itemText", "valign": "middle", "text": "app", "height": 40, "fontSize": 28, "color": "#ffffff", "bold": false, "align": "center" } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 140, "skin": "comp/purple.png", "height": 140, "anchorY": 0, "anchorX": 0 } }, { "type": "Image", "props": { "y": 0, "x": 120, "width": 20, "var": "hotDot", "skin": "comp/red_dot.png", "height": 20 } }] }], "animations": [{ "nodes": [{ "target": 4, "keyframes": { "x": [{ "value": 70, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "x", "index": 0 }], "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 0 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 7 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 20 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 23 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 30 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 0 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 7 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 20 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 23 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 30 }] } }], "name": "scaleAni", "id": 1, "frameRate": 24, "action": 0 }] };
            return drawerItemUI;
        }(View));
        item_dir.drawerItemUI = drawerItemUI;
    })(item_dir = ui.item_dir || (ui.item_dir = {}));
})(ui || (ui = {}));
(function (ui) {
    var item_dir;
    (function (item_dir) {
        var drawerItemBigUI = /** @class */ (function (_super) {
            __extends(drawerItemBigUI, _super);
            function drawerItemBigUI() {
                return _super.call(this) || this;
            }
            drawerItemBigUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.item_dir.drawerItemBigUI.uiView);
            };
            drawerItemBigUI.uiView = { "type": "View", "props": { "y": 150, "x": 120, "width": 240, "pivotY": 150, "pivotX": 120, "height": 300 }, "child": [{ "type": "Sprite", "props": { "y": 170, "x": 120, "width": 240, "var": "drawerItemSprite", "scaleY": 1, "scaleX": 1, "pivotY": 150, "pivotX": 120, "height": 300 }, "compId": 4, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 240, "skin": "comp/purple-.png", "height": 300, "anchorY": 0, "anchorX": 0 } }, { "type": "Image", "props": { "y": 10, "x": 15, "width": 210, "var": "itemIcon", "height": 210, "anchorY": 0, "anchorX": 0 } }, { "type": "Text", "props": { "y": 220, "x": 0, "width": 240, "var": "itemText", "valign": "middle", "height": 60, "fontSize": 40, "color": "#000", "bold": false, "align": "center" } }, { "type": "Image", "props": { "y": -2, "x": 210, "width": 30, "var": "hotDot", "skin": "comp/red_dot.png", "height": 30 } }] }], "animations": [{ "nodes": [{ "target": 4, "keyframes": { "x": [{ "value": 120, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "x", "index": 0 }], "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 0 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 7 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 20 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 23 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 30 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 0 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 7 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 20 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 23 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 30 }] } }], "name": "scaleAni", "id": 1, "frameRate": 24, "action": 0 }] };
            return drawerItemBigUI;
        }(View));
        item_dir.drawerItemBigUI = drawerItemBigUI;
    })(item_dir = ui.item_dir || (ui.item_dir = {}));
})(ui || (ui = {}));
(function (ui) {
    var item_dir;
    (function (item_dir) {
        var drawerItemBig2UI = /** @class */ (function (_super) {
            __extends(drawerItemBig2UI, _super);
            function drawerItemBig2UI() {
                return _super.call(this) || this;
            }
            drawerItemBig2UI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.item_dir.drawerItemBig2UI.uiView);
            };
            drawerItemBig2UI.uiView = { "type": "View", "props": { "y": 150, "x": 120, "width": 240, "pivotY": 150, "pivotX": 120, "height": 300 }, "child": [{ "type": "Sprite", "props": { "y": 170, "x": 120, "width": 240, "var": "drawerItemSprite", "scaleY": 1, "scaleX": 1, "pivotY": 150, "pivotX": 120, "height": 300 }, "compId": 4, "child": [{ "type": "Image", "props": { "y": 12, "x": 12, "width": 216, "var": "itemIcon", "height": 216, "anchorY": 0, "anchorX": 0 } }, { "type": "Text", "props": { "y": 244, "x": 0, "width": 240, "var": "itemText", "valign": "middle", "text": "拯救小姐姐", "height": 40, "fontSize": 36, "color": "#000000", "bold": false, "align": "center" } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 240, "skin": "comp/purple.png", "height": 240, "anchorY": 0, "anchorX": 0 } }, { "type": "Image", "props": { "y": -8, "x": 200, "width": 40, "visible": false, "var": "hotDot", "skin": "comp/red_dot.png", "height": 40 } }] }], "animations": [{ "nodes": [{ "target": 4, "keyframes": { "y": [{ "value": 170, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "y", "index": 0 }, { "value": 170, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "y", "index": 7 }], "x": [{ "value": 120, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "x", "index": 0 }, { "value": 120, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "x", "index": 7 }, { "value": 120, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "x", "index": 20 }, { "value": 120, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "x", "index": 23 }], "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 0 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 7 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 20 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 23 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleY", "index": 30 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 0 }, { "value": 0.9, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 7 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 20 }, { "value": 1.1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 23 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 4, "key": "scaleX", "index": 30 }] } }], "name": "scaleAni", "id": 1, "frameRate": 24, "action": 0 }] };
            return drawerItemBig2UI;
        }(View));
        item_dir.drawerItemBig2UI = drawerItemBig2UI;
    })(item_dir = ui.item_dir || (ui.item_dir = {}));
})(ui || (ui = {}));
(function (ui) {
    var item_dir;
    (function (item_dir) {
        var NavLoginItemUI = /** @class */ (function (_super) {
            __extends(NavLoginItemUI, _super);
            function NavLoginItemUI() {
                return _super.call(this) || this;
            }
            NavLoginItemUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.item_dir.NavLoginItemUI.uiView);
            };
            NavLoginItemUI.uiView = { "type": "View", "props": { "width": 300, "height": 350 }, "child": [{ "type": "Sprite", "props": { "y": 175, "x": 135, "width": 300, "var": "rootLayout", "scaleY": 1, "scaleX": 1, "rotation": 0, "pivotY": 175, "pivotX": 135, "height": 350 }, "compId": 9, "child": [{ "type": "Image", "props": { "y": 150, "x": 150, "width": 275, "var": "gameIconImage", "height": 275, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 300, "var": "borderImg", "skin": "comp/purple.png", "height": 300 } }, { "type": "Text", "props": { "y": 300, "x": 0, "width": 300, "var": "gameNameLabel", "valign": "middle", "text": "最强连一连", "overflow": "hidden", "height": 50, "fontSize": 36, "font": "SimHei", "color": "#000", "align": "center" } }, { "type": "Image", "props": { "y": 20, "x": 270, "width": 40, "var": "hotImage", "skin": "comp/red_dot.png", "height": 40, "anchorY": 0.5, "anchorX": 0.5 } }] }], "animations": [{ "nodes": [{ "target": 9, "keyframes": { "scaleY": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "scaleY", "index": 0 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "scaleY", "index": 20 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "scaleY", "index": 40 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "scaleY", "index": 60 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "scaleY", "index": 80 }], "scaleX": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "scaleX", "index": 0 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "scaleX", "index": 20 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "scaleX", "index": 40 }, { "value": 0.8, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "scaleX", "index": 60 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "scaleX", "index": 80 }], "rotation": [{ "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "rotation", "index": 0 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "rotation", "index": 20 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "rotation", "index": 40 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "rotation", "index": 60 }, { "value": 0, "tweenMethod": "linearNone", "tween": true, "target": 9, "key": "rotation", "index": 80 }] } }], "name": "scaleAni", "id": 1, "frameRate": 20, "action": 0 }] };
            return NavLoginItemUI;
        }(View));
        item_dir.NavLoginItemUI = NavLoginItemUI;
    })(item_dir = ui.item_dir || (ui.item_dir = {}));
})(ui || (ui = {}));
(function (ui) {
    var item_dir;
    (function (item_dir) {
        var NavNextItemUI = /** @class */ (function (_super) {
            __extends(NavNextItemUI, _super);
            function NavNextItemUI() {
                return _super.call(this) || this;
            }
            NavNextItemUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.item_dir.NavNextItemUI.uiView);
            };
            NavNextItemUI.uiView = { "type": "View", "props": { "width": 400, "height": 500 }, "child": [{ "type": "Image", "props": { "y": 200, "width": 400, "var": "gameIconImage", "height": 400, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 30, "x": 370, "width": 50, "var": "hotImage", "skin": "comp/red_dot.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Sprite", "props": { "y": 400, "x": 0, "width": 400, "var": "maskView", "height": 100 }, "child": [{ "type": "Rect", "props": { "y": 0, "x": 0, "width": 400, "lineWidth": 1, "height": 100, "fillColor": "#aa45c3" } }] }, { "type": "Text", "props": { "y": 400, "x": 0, "width": 400, "var": "gameNameLabel", "valign": "middle", "overflow": "hidden", "height": 100, "fontSize": 66, "font": "SimHei", "color": "#fff", "align": "center" } }] };
            return NavNextItemUI;
        }(View));
        item_dir.NavNextItemUI = NavNextItemUI;
    })(item_dir = ui.item_dir || (ui.item_dir = {}));
})(ui || (ui = {}));
(function (ui) {
    var item_dir;
    (function (item_dir) {
        var NavPopItemUI = /** @class */ (function (_super) {
            __extends(NavPopItemUI, _super);
            function NavPopItemUI() {
                return _super.call(this) || this;
            }
            NavPopItemUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.item_dir.NavPopItemUI.uiView);
            };
            NavPopItemUI.uiView = { "type": "View", "props": { "width": 400, "height": 500 }, "child": [{ "type": "Image", "props": { "y": 200, "width": 400, "var": "itemIcon", "height": 400, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 30, "x": 370, "width": 50, "var": "hotDot", "skin": "comp/red_dot.png", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Sprite", "props": { "y": 400, "x": 0, "width": 400, "var": "maskView", "height": 100 }, "child": [{ "type": "Rect", "props": { "y": 0, "x": 0, "width": 400, "lineWidth": 1, "height": 100, "fillColor": "#8F8FF7" } }] }, { "type": "Text", "props": { "y": 400, "x": 0, "width": 400, "var": "itemText", "valign": "middle", "text": "水管大师", "overflow": "hidden", "height": 100, "fontSize": 50, "font": "SimHei", "color": "#fff", "align": "center" } }] };
            return NavPopItemUI;
        }(View));
        item_dir.NavPopItemUI = NavPopItemUI;
    })(item_dir = ui.item_dir || (ui.item_dir = {}));
})(ui || (ui = {}));
(function (ui) {
    var item_dir;
    (function (item_dir) {
        var NavPopItem1UI = /** @class */ (function (_super) {
            __extends(NavPopItem1UI, _super);
            function NavPopItem1UI() {
                return _super.call(this) || this;
            }
            NavPopItem1UI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.item_dir.NavPopItem1UI.uiView);
            };
            NavPopItem1UI.uiView = { "type": "View", "props": { "width": 320, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 160, "width": 320, "var": "itemIcon", "height": 320, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 15, "x": 305, "width": 30, "var": "hotDot", "skin": "comp/red_dot.png", "height": 30, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Sprite", "props": { "y": 320, "x": 0, "width": 320, "var": "maskView", "height": 80 }, "child": [{ "type": "Rect", "props": { "y": 0, "x": 0, "width": 320, "lineWidth": 1, "height": 80, "fillColor": "#8F8FF7" } }] }, { "type": "Text", "props": { "y": 320, "x": 0, "width": 320, "var": "itemText", "valign": "middle", "text": "水管大师", "overflow": "hidden", "height": 80, "fontSize": 42, "font": "SimHei", "color": "#fff", "align": "center" } }] };
            return NavPopItem1UI;
        }(View));
        item_dir.NavPopItem1UI = NavPopItem1UI;
    })(item_dir = ui.item_dir || (ui.item_dir = {}));
})(ui || (ui = {}));
(function (ui) {
    var item_dir;
    (function (item_dir) {
        var NavTopItemUI = /** @class */ (function (_super) {
            __extends(NavTopItemUI, _super);
            function NavTopItemUI() {
                return _super.call(this) || this;
            }
            NavTopItemUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.item_dir.NavTopItemUI.uiView);
            };
            NavTopItemUI.uiView = { "type": "View", "props": { "width": 270, "height": 270 }, "child": [{ "type": "Image", "props": { "width": 260, "var": "itemIcon", "height": 260, "centerY": 0, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 20, "x": 250, "width": 30, "var": "hotDot", "skin": "comp/red_dot.png", "height": 30, "anchorY": 0.5, "anchorX": 0.5 } }] };
            return NavTopItemUI;
        }(View));
        item_dir.NavTopItemUI = NavTopItemUI;
    })(item_dir = ui.item_dir || (ui.item_dir = {}));
})(ui || (ui = {}));
(function (ui) {
    var page_dir;
    (function (page_dir) {
        var GameInfoUI = /** @class */ (function (_super) {
            __extends(GameInfoUI, _super);
            function GameInfoUI() {
                return _super.call(this) || this;
            }
            GameInfoUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                View.regComponent("ImageRunTime", ImageRunTime);
                _super.prototype.createChildren.call(this);
                this.createView(ui.page_dir.GameInfoUI.uiView);
            };
            GameInfoUI.uiView = { "type": "View", "props": { "width": 1080, "height": 2000 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1080, "var": "bgImg", "skin": "comp/bg.png", "height": 2000 } }, { "type": "Sprite", "props": { "y": 10, "x": 0, "width": 1080, "var": "layoutLabel", "height": 100 }, "child": [{ "type": "Text", "props": { "y": 0, "x": 540, "width": 300, "var": "labelLevel", "valign": "middle", "text": "第 30 关", "pivotX": 150, "height": 100, "fontSize": 60, "font": "Arial", "color": "#ffffff", "bold": true, "align": "center" } }] }, { "type": "Sprite", "props": { "y": 130, "x": 0, "width": 1080, "var": "topNavView", "height": 270 }, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "width": 1080, "var": "topMask", "height": 270, "alpha": 1 }, "child": [{ "type": "Rect", "props": { "y": 0, "x": 0, "width": 1080, "lineWidth": 1, "height": 270, "fillColor": "#0f0101" } }] }, { "type": "List", "props": { "y": 0, "x": 0, "width": 1080, "var": "topList", "spaceY": 0, "spaceX": 0, "repeatY": 1, "repeatX": 4, "height": 270 } }] }, { "type": "Sprite", "props": { "y": 400, "x": 140, "width": 800, "var": "layout", "height": 1200 } }, { "type": "Sprite", "props": { "y": 1630, "x": 0, "width": 1080, "var": "btnTipLayout", "height": 100 }, "child": [{ "type": "Image", "props": { "y": 50, "x": 830, "width": 200, "var": "btnTip", "skin": "subassets/comp/imgBtnPop.png", "runtime": "ImageRunTime", "height": 100, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 50, "x": 240, "width": 200, "var": "btnRefresh", "skin": "subassets/comp/restart.png", "runtime": "ImageRunTime", "height": 100, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 50, "x": 540, "width": 100, "var": "btnSettings", "skin": "subassets/comp/setting.png", "runtime": "ImageRunTime", "height": 100, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Sprite", "props": { "y": 1771, "x": 0, "width": 1080, "var": "bottomApp", "height": 220 }, "child": [{ "type": "Image", "props": { "width": 1080, "visible": false, "var": "bottomAppBg", "skin": "comp/imgBgAlpha.png", "height": 220 } }, { "type": "View", "props": { "y": 10, "x": 0, "width": 1080, "var": "bottomAppList", "height": 210 } }] }] };
            return GameInfoUI;
        }(View));
        page_dir.GameInfoUI = GameInfoUI;
    })(page_dir = ui.page_dir || (ui.page_dir = {}));
})(ui || (ui = {}));
(function (ui) {
    var page_dir;
    (function (page_dir) {
        var LoadPageUI = /** @class */ (function (_super) {
            __extends(LoadPageUI, _super);
            function LoadPageUI() {
                return _super.call(this) || this;
            }
            LoadPageUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.page_dir.LoadPageUI.uiView);
            };
            LoadPageUI.uiView = { "type": "View", "props": { "width": 1080, "height": 2000 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1080, "var": "bgImg", "skin": "comp/bg.png", "height": 2500 } }, { "type": "Label", "props": { "y": 400, "x": 0, "width": 1080, "text": "游戏名称", "height": 150, "fontSize": 140, "color": "#e8532e", "bold": true, "align": "center" } }, { "type": "Sprite", "props": { "y": 900, "x": 190, "width": 700, "var": "progressLayout", "height": 200 }, "child": [{ "type": "Label", "props": { "y": 100, "width": 647, "var": "loadText", "valign": "middle", "text": "加载中...", "height": 50, "fontSize": 45, "color": "#9a9a9a", "align": "center" } }] }, { "type": "Sprite", "props": { "y": 1250, "x": 40, "width": 1000, "var": "readmeLayout", "height": 400 }, "child": [{ "type": "Label", "props": { "width": 1000, "text": "健康游戏忠告", "height": 80, "fontSize": 40, "color": "#343434", "bold": true, "align": "center" } }, { "type": "Label", "props": { "y": 80, "x": 0, "width": 1000, "var": "msgLabel", "text": "忠告内容", "leading": 28, "height": 237, "fontSize": 28, "color": "#1c1c1c", "bold": false, "align": "center" } }, { "type": "Label", "props": { "y": 326, "x": 0, "width": 1000, "text": "Powered by LayaAir Engine", "height": 49, "fontSize": 38, "color": "#666666", "bold": false, "align": "center" } }] }] };
            return LoadPageUI;
        }(View));
        page_dir.LoadPageUI = LoadPageUI;
    })(page_dir = ui.page_dir || (ui.page_dir = {}));
})(ui || (ui = {}));
(function (ui) {
    var page_dir;
    (function (page_dir) {
        var PassPageUI = /** @class */ (function (_super) {
            __extends(PassPageUI, _super);
            function PassPageUI() {
                return _super.call(this) || this;
            }
            PassPageUI.prototype.createChildren = function () {
                View.regComponent("ImageRunTime", ImageRunTime);
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.page_dir.PassPageUI.uiView);
            };
            PassPageUI.uiView = { "type": "View", "props": { "width": 1080, "height": 1920 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 1080, "var": "bgImg", "skin": "comp/passbg.png", "height": 1920 } }, { "type": "Sprite", "props": { "y": 47, "x": 100, "width": 880, "var": "contentLayout", "height": 1400 }, "child": [{ "type": "Label", "props": { "y": 90, "x": 0, "width": 880, "var": "levelLabel", "valign": "middle", "text": "第1关", "leading": 10, "height": 136, "fontSize": 60, "font": "SimHei", "color": "#1e1e1e", "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": 1284, "x": 440, "width": 477, "var": "btnNext", "skin": "comp/imgTextNext.png", "runtime": "ImageRunTime", "height": 153, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Sprite", "props": { "y": 380, "x": -100, "width": 1080, "visible": false, "var": "topApp", "height": 772 }, "child": [{ "type": "Image", "props": { "y": 9, "x": 540, "width": 580, "skin": "comp/passPopupBg.png", "height": 130, "anchorY": 0.5, "anchorX": 0.5, "sizeGrid": "30,30,30,30" }, "child": [{ "type": "Text", "props": { "y": 5, "x": -250, "width": 1080, "visible": true, "valign": "middle", "text": "百万玩家正在玩", "height": 103, "fontSize": 70, "font": "SimHei", "color": "#000000", "bold": true, "align": "center" } }] }, { "type": "Image", "props": { "y": 52, "x": 10, "width": 1057, "skin": "comp/passPopupBg.png", "height": 722, "sizeGrid": "30,30,30,30" } }, { "type": "View", "props": { "y": 80, "x": 0, "width": 1080, "var": "topAppList", "height": 640 } }] }] }, { "type": "Sprite", "props": { "y": 1400, "x": 0, "width": 1080, "visible": false, "var": "bottomApp", "height": 400 }, "child": [{ "type": "Rect", "props": { "y": 0, "x": 0, "width": 1080, "lineWidth": 1, "height": 200 } }, { "type": "Image", "props": { "y": 0, "x": 0, "width": 1080, "var": "bottomAppBg", "skin": "comp/imgBgAlpha.png", "height": 400, "alpha": 0.5 } }, { "type": "View", "props": { "y": 10, "x": 0, "width": 1080, "var": "bottomAppList", "height": 380 } }, { "type": "Text", "props": { "y": 0, "x": 0, "width": 120, "visible": false, "var": "bottomAppTitle", "valign": "top", "height": 20, "fontSize": 18, "font": "Microsoft YaHei", "color": "#ffffff", "align": "center" } }] }] };
            return PassPageUI;
        }(View));
        page_dir.PassPageUI = PassPageUI;
    })(page_dir = ui.page_dir || (ui.page_dir = {}));
})(ui || (ui = {}));
(function (ui) {
    var view;
    (function (view) {
        var ProgressViewUI = /** @class */ (function (_super) {
            __extends(ProgressViewUI, _super);
            function ProgressViewUI() {
                return _super.call(this) || this;
            }
            ProgressViewUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.view.ProgressViewUI.uiView);
            };
            ProgressViewUI.uiView = { "type": "View", "props": { "width": 700, "height": 58 }, "child": [{ "type": "Panel", "props": { "y": 29, "x": 350, "width": 700, "height": 58, "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 29, "x": 350, "width": 700, "var": "progressBg", "value": 0, "skin": "comp/imgProgressBarBg.png", "height": 58, "anchorY": 0.5, "anchorX": 0.5, "sizeGrid": "0,50,0,50" } }, { "type": "Image", "props": { "y": 29, "x": 350, "width": 700, "var": "progressBar", "skin": "comp/imgProgressBar.png", "height": 58, "anchorY": 0.5, "anchorX": 0.5, "sizeGrid": "0,50,0,50" }, "child": [{ "type": "Image", "props": { "y": 29, "x": -350, "width": 700, "var": "progressMask", "skin": "comp/imgProgressBar.png", "renderType": "mask", "height": 58, "anchorY": 0.5, "anchorX": 0.5, "sizeGrid": "0,50,0,50" } }] }] }, { "type": "Image", "props": { "width": 700, "skin": "comp/loginProgressGlass.png", "sizeGrid": "0,50,0,50" } }] };
            return ProgressViewUI;
        }(View));
        view.ProgressViewUI = ProgressViewUI;
    })(view = ui.view || (ui.view = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map
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
 *  同步工具类
 *
 */
var syncUtils = /** @class */ (function () {
    function syncUtils() {
    }
    //保存游戏数据
    syncUtils.saveUserData = function (level, score) {
        if (level <= game.all_level) {
            return;
        }
        //更新最高等级
        game.all_level = level;
        wx.setStorageSync(ALL_LEVEL_KEY, game.all_level);
        // 保存微信开放域数据
        var data = { key: openDataKey, value: game.all_level + "" };
        //微信游戏中心
        var utimestamp = Math.round((new Date()).getTime() / 1000);
        var wxValue = {
            "wxgame": {
                "score": game.all_level,
                "update_time": utimestamp
            }
        };
        var jsonWxValue = JSON.stringify(wxValue);
        log('jsonWxValue:' + jsonWxValue);
        var wxgameData = { key: 'wxLevel', value: jsonWxValue };
        wx.setUserCloudStorage({
            KVDataList: [data, wxgameData],
            success: function (res) {
                log(res);
            },
            fail: function (res) {
                log(res);
            }
        });
    };
    return syncUtils;
}());
//# sourceMappingURL=syncUtil.js.map
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
 *  声音工具类
 *
 */
var GAME_BG_MUSIC = null;
var CHOOSE = "subassets/sound/choose.mp3";
var LEVELCOMPLETED = "subassets/sound/Win.mp3";
var MOVE_SOUND = "subassets/sound/move.mp3";
var soundUtils = /** @class */ (function () {
    function soundUtils() {
    }
    soundUtils.playSound = function (music, vol) {
        if (isLoadSubpackages == false)
            return;
        if (isMute && isMute == true) {
            //静音模式
        }
        else {
            //播放音效
            // Laya.SoundManager.playSound(music);
            var audio = wx.createInnerAudioContext();
            audio.src = music;
            audio.loop = false;
            audio.play();
        }
    };
    //播放背景音乐
    soundUtils.playBgMusic = function () {
        if (isLoadSubpackages == false)
            return;
        if (GAME_BG_MUSIC == null)
            return;
        if (isMuteMusic && isMuteMusic == true) {
            Laya.SoundManager.stopMusic();
        }
        else {
            Laya.SoundManager.playMusic(GAME_BG_MUSIC);
        }
    };
    return soundUtils;
}());
//# sourceMappingURL=sound.js.map
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
 *  分享工具类
 *
 *
 */
var SharedUtils = /** @class */ (function () {
    function SharedUtils() {
    }
    //获取分享图片
    SharedUtils.getShareImg = function () {
        if (game.SHARED_IMG_ARR != null && game.SHARED_IMG_ARR.length > 0 && game.ifShowBonus === true && game.shareType === ShareState.MONEY) {
            var tr = Math.random();
            log('getShareImg random=' + tr);
            for (var i = 0; i < game.SHARED_IMG_ARR.length; i++) {
                var ele = game.SHARED_IMG_ARR[i];
                if (tr >= ele.min && tr < ele.max) {
                    if (ele.e) {
                        //需要绘制
                        return [ele.id, ele.url, ele.t, ele.p, ele.e];
                    }
                    else {
                        //无需绘制，直接返回
                        return [ele.id, ele.url, ele.t, ele.p];
                    }
                }
            }
            return ['P0', game.SHARED_URL, game.SHARED_TITLE, game.SHARED_PARAM];
        }
        else {
            return ['P0', game.SHARED_URL, game.SHARED_TITLE, game.SHARED_PARAM];
        }
    };
    //绘制分享图
    SharedUtils.drawShareImg = function (view, obj) {
        //绘制自定义图片
        var nickName = wx.getStorageSync('nickName');
        var avatarUrl = wx.getStorageSync('avatarUrl');
        //1.绘制头像
        if (obj.headpos) {
            var img = new Laya.Image();
            // downLoadFile(path, function (path) {
            img.skin = avatarUrl;
            // });
            if (obj.headpos.size) {
                img.width = obj.headpos.size;
                img.height = obj.headpos.size;
            }
            img.x = isNaN(obj.headpos.x) ? 0 : obj.headpos.x;
            img.y = isNaN(obj.headpos.y) ? 0 : obj.headpos.y;
            var maskImg = new Laya.Image();
            maskImg.width = img.width;
            maskImg.height = img.height;
            maskImg.skin = 'comp/mask.png';
            img.mask = maskImg;
            view.addChild(img);
        }
        //2,绘制昵称
        if (obj.namepos) {
            var name = new Laya.Text();
            name.text = nickName;
            name.fontSize = obj.namepos.fontSize ? obj.namepos.fontSize : 18;
            //字体颜色，默认为黑色
            name.color = obj.namepos.color ? obj.namepos.color : '#000000';
            name.width = obj.namepos.width ? obj.namepos.width : 500;
            name.height = obj.namepos.height ? obj.namepos.height : 20;
            name.overflow = 'hidden';
            name.x = obj.namepos.x ? obj.namepos.x : 0;
            name.y = obj.namepos.y ? obj.namepos.y : 0;
            name.align = obj.namepos.align ? obj.namepos.align : 'center';
            name.valign = obj.namepos.valign ? obj.namepos.valign : 'middle';
            name.bold = obj.namepos.bold ? obj.namepos.bold : false;
            view.addChild(name);
        }
        //3,绘制文字
        if (obj.texts && obj.texts.length > 0) {
            var len = obj.texts.length;
            for (var i = 0; i < len; i++) {
                var textObj = obj.texts[i];
                var textView = new Laya.Text();
                textView.text = textObj.text.replace(/{name}/g, nickName);
                textView.fontSize = textObj.fontSize ? textObj.fontSize : 18;
                //字体颜色，默认为黑色
                textView.color = textObj.color ? textObj.color : '#000000';
                textView.width = textObj.width ? textObj.width : 500;
                textView.height = textObj.height ? textObj.height : 20;
                textView.overflow = 'hidden';
                textView.x = textObj.x ? textObj.x : 0;
                textView.y = textObj.y ? textObj.y : 0;
                textView.align = textObj.align ? textObj.align : 'center';
                textView.valign = textObj.valign ? textObj.valign : 'middle';
                textView.bold = textObj.bold ? textObj.bold : false;
                textView.wordWrap = true;
                if (textObj.filter) {
                    //创建一个发光滤镜
                    var blur = isNaN(textObj.filter.blur) ? 8 : textObj.filter.blur;
                    var offX = isNaN(textObj.filter.offX) ? 8 : textObj.filter.offX;
                    var offY = isNaN(textObj.filter.offY) ? 8 : textObj.filter.offY;
                    var shadowFilter = new Laya.GlowFilter(textObj.filter.color, blur, offX, offY);
                    //设置滤镜为阴影滤镜
                    textView.filters = [shadowFilter];
                }
                view.addChild(textView);
            }
        }
    };
    //分享
    SharedUtils.wxShareFunc = function (type, query) {
        if (typeof wx === 'undefined')
            return;
        wxUtils.aldSendEventFunc('拉起分享', { 'detail': '' + type + '-' + game.userId });
        var tmpQuery = query ? query : ('uid=' + game.userId + '&state=' + ShareState.OTHER);
        game.shareType = type;
        game.shareQuery = tmpQuery;
        //确定分享图片
        var shareImgInfo = SharedUtils.getShareImg();
        log('shareImgInfo:');
        log(shareImgInfo);
        tmpQuery += ('&img=' + shareImgInfo[0] + '&' + shareImgInfo[3]);
        log('wxShare query:' + tmpQuery);
        //判断是否需要绘制分享图
        if (shareImgInfo.length === 4) {
            //无需绘制直接分享
            wxUtils.aldSendEventFunc('拉起分享图', { 'detail': shareImgInfo[0] });
            //记录拉起分享时间
            game.shareStartTime = (new Date()).getTime();
            if (ALD_SHARE_ON && typeof Laya.Browser.window.wx.aldShareAppMessage === 'function') {
                // 使用ald分享统计
                Laya.Browser.window.wx.aldShareAppMessage({
                    query: tmpQuery,
                    imageUrl: shareImgInfo[1],
                    title: shareImgInfo[2],
                    // success: function (res) {
                    // },
                    cancel: function (res) {
                        // log('取消分享:' + res);
                        wxUtils.aldSendEventFunc('取消分享', { 'detail': '' + type + '-' + game.userId });
                        game.shareCancel = true;
                    }
                });
            }
            else {
                wx.shareAppMessage({
                    query: tmpQuery,
                    imageUrl: shareImgInfo[1],
                    title: shareImgInfo[2],
                    cancel: function (res) {
                        log('取消分享:' + res);
                        wxUtils.aldSendEventFunc('取消分享', { 'detail': '' + type + '-' + game.userId });
                        game.shareCancel = true;
                    }
                });
            }
        }
        else {
            log('绘制分享图');
            var nickName = wx.getStorageSync('nickName');
            var tmpTitle = shareImgInfo[2].replace(/{name}/g, nickName); //替换name
            log('title:' + tmpTitle);
            var img = new Laya.Image();
            img.width = 500;
            img.height = 400;
            var sprite = new Laya.Sprite();
            sprite.width = 500;
            sprite.height = 400;
            sprite.visible = true;
            //调整到底层
            sprite.zOrder = -1;
            sprite.addChild(img);
            var spriteMask = new Laya.Sprite();
            spriteMask.width = 500;
            spriteMask.height = 400;
            spriteMask.graphics.drawRect(0, 0, sprite.width, sprite.height, '#232B3B');
            spriteMask.visible = true;
            sprite.addChild(spriteMask);
            Laya.stage.addChild(sprite);
            SharedUtils.drawShareImg(img, shareImgInfo[4]);
            Laya.timer.once(200, game, function () {
                img.loadImage(shareImgInfo[1], 0, 0, 500, 400, Laya.Handler.create(game, function () {
                    var htmlC = img.drawToCanvas(500, 400, 0, 0);
                    var canvas = htmlC.getCanvas();
                    canvas.toTempFilePath({
                        x: 0,
                        y: 0,
                        width: 500,
                        height: 400,
                        destWidth: 500,
                        destHeight: 400,
                        success: function (res) {
                            log('截图成功：');
                            log(res);
                            // 分享
                            wxUtils.aldSendEventFunc('拉起分享图', { 'detail': shareImgInfo[0] });
                            //记录拉起分享时间
                            game.shareStartTime = (new Date()).getTime();
                            if (ALD_SHARE_ON) {
                                // 使用ald分享统计
                                wx.aldShareAppMessage({
                                    query: tmpQuery,
                                    imageUrl: res.tempFilePath,
                                    title: tmpTitle,
                                    cancel: function (res) {
                                        log('取消分享:' + res);
                                        wxUtils.aldSendEventFunc('取消分享', { 'detail': '' + type + '-' + game.userId });
                                        game.shareCancel = true;
                                    }
                                });
                            }
                            else {
                                wx.shareAppMessage({
                                    query: tmpQuery,
                                    imageUrl: res.tempFilePath,
                                    title: tmpTitle,
                                    cancel: function (res) {
                                        log('取消分享:' + res);
                                        wxUtils.aldSendEventFunc('取消分享', { 'detail': '' + type + '-' + game.userId });
                                        game.shareCancel = true;
                                    }
                                });
                            }
                        },
                        complete: function () {
                            log('保存完成,销毁图片');
                            var father = img.parent;
                            father.destroy();
                        }
                    });
                }));
            });
        }
    };
    SharedUtils.fetchGroupId = function (shT, tp, callBack) {
        log('shareTicket:' + shT);
        if (!shT) {
            if (callBack) {
                callBack(null);
            }
        }
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        wx.login({
            success: function (res) {
                var code = encodeURIComponent(res.code);
                wx.getShareInfo({
                    shareTicket: shT,
                    success: function (res) {
                        var enData = encodeURIComponent(res.encryptedData);
                        var iv = encodeURIComponent(res.iv);
                        var deUrl = WXINFOPATH + "?appName=" + APPNAME + "&code=" + code + '&encryptedData=' + enData + '&iv=' + iv;
                        log('deUrl=' + deUrl);
                        wx.request({
                            url: deUrl,
                            dataType: 'json',
                            header: {
                                'content-type': 'application/json'
                            },
                            success: function (d) {
                                log('群信息：');
                                log(d);
                                wx.hideLoading();
                                if (callBack) {
                                    callBack(d.data.openGId, tp);
                                }
                            },
                            fail: function (e) {
                                wx.hideLoading();
                                if (callBack) {
                                    callBack(null);
                                }
                            }
                        });
                    },
                    fail: function (err) {
                        wx.hideLoading();
                        if (callBack) {
                            callBack(null);
                        }
                    }
                });
            },
            fail: function (error) {
                wx.hideLoading();
                if (callBack) {
                    callBack(null);
                }
            }
        });
    };
    return SharedUtils;
}());
//# sourceMappingURL=SharedUtils.js.map
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
 *  统一日志
 *
 */
function log(msg) {
    if (DEBUG) {
        console.log(msg);
    }
}
//# sourceMappingURL=log.js.map
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
 *  点击特效脚本
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
ImageRunTime逻辑类
*/
var ImageRunTime = /** @class */ (function (_super) {
    __extends(ImageRunTime, _super);
    function ImageRunTime() {
        var _this = _super.call(this) || this;
        _this.scaleTime = 100;
        //设置组件的中心点
        _this.anchorX = _this.anchorY = 0.5;
        //添加鼠标按下事件侦听。按时时缩小按钮。
        _this.on(Laya.Event.MOUSE_DOWN, _this, _this.scaleSmal);
        //添加鼠标抬起事件侦听。抬起时还原按钮。
        _this.on(Laya.Event.MOUSE_UP, _this, _this.scaleBig);
        //添加鼠标离开事件侦听。离开时还原按钮。
        _this.on(Laya.Event.MOUSE_OUT, _this, _this.scaleBig);
        return _this;
    }
    ImageRunTime.prototype.scaleBig = function () {
        //变大还原的缓动效果
        Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, this.scaleTime);
    };
    ImageRunTime.prototype.scaleSmal = function () {
        //缩小至0.8的缓动效果
        Laya.Tween.to(this, { scaleX: 0.8, scaleY: 0.8 }, this.scaleTime);
    };
    return ImageRunTime;
}(Laya.Image));
//# sourceMappingURL=imageRunTime.js.map
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
 *  题目定义
 *
 */
//新手引导
var GUIDE_DATA = [];
//总题目个数
var allQuestionLen = 100;
//# sourceMappingURL=question.js.map
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
 *  Map 键值对 工具类
 *
 */
var Map = /** @class */ (function () {
    function Map() {
        //键集合
        this.container = {};
    }
    /**
     * 存值
     * @param key
     * @param value
     */
    Map.prototype.put = function (key, value) {
        //先查询是否存在该键
        //如果不存在，就新创建一个
        try {
            if (key != null && key != "")
                this.container[key] = value;
        }
        catch (e) {
            return e;
        }
    };
    /**
     * 取值
     */
    Map.prototype.get = function (key) {
        try {
            return this.container[key];
        }
        catch (e) {
            return e;
        }
    };
    /**
     * 是否包含key
     * @param key
     */
    Map.prototype.containsKey = function (key) {
        try {
            for (var p in this.container) {
                if (p == key)
                    return true;
            }
            return false;
        }
        catch (e) {
            return e;
        }
    };
    /**
     * 判断是否包含指定value
     */
    Map.prototype.containsValue = function (value) {
        try {
            for (var p in this.container) {
                if (this.container[p] === value)
                    return true;
            }
            return false;
        }
        catch (e) {
            return e;
        }
    };
    ;
    /**
     *
     * @param key  删除map中指定的key
     */
    Map.prototype.remove = function (key) {
        try {
            delete this.container[key];
        }
        catch (e) {
            return e;
        }
    };
    ;
    /**
     *  清空map
     */
    Map.prototype.clear = function () {
        try {
            delete this.container;
            this.container = {};
        }
        catch (e) {
            return e;
        }
    };
    ;
    /**
     * 判断map是否为空
     */
    Map.prototype.isEmpty = function () {
        if (this.keyArray().length == 0)
            return true;
        else
            return false;
    };
    ;
    /**
     * 获取map的大小
     */
    Map.prototype.size = function () {
        return this.keyArray().length;
    };
    /**
     *  返回map中的key值数组
     */
    Map.prototype.keyArray = function () {
        var keys = new Array();
        for (var p in this.container) {
            keys.push(p);
        }
        return keys;
    };
    /**
     * 返回map中的value值数组
     */
    Map.prototype.valueArray = function () {
        var values = new Array();
        var keys = this.keyArray();
        for (var i = 0; i < keys.length; i++) {
            values.push(this.container[keys[i]]);
        }
        return values;
    };
    return Map;
}());
//# sourceMappingURL=Map.js.map
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
 *  该文件是公共设置
 *
 */
//没有定义的
var UNDEFINED = 'undefined';
var COLORNONE = -1;
/**结束时动画时间 */
var BOX_ANI_TIME = 300;
/**首页demo动画时长（每个格子) */
var BLOCK_ANI_DURATION = 300;
var STAR_DURATION = 500;
//游戏状态
var GAME_STATE = {
    NONE: -1,
    PLAYING: 0,
    PAUSE: 1,
    ANI: 2,
    GAMEOVER: 3,
    DEATH: 4,
};
//坐标点
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
// game config=====================
/**
 * 游戏相关的设置，请在此处设置
 */
//game config  end =================
/**判断两点是否相邻 */
function isNear(p1, p2) {
    return (((p1.y === p2.y) && Math.abs(p1.x - p2.x) === 1) || (p1.x === p2.x && Math.abs(p1.y - p2.y) === 1));
}
//从point1移动到point2,转过的角度    
function getPointAngle(point1, point2) {
    if (point2.x == point1.x && point2.y == point1.y) {
        return 0;
    }
    if (point2.x > point1.x && point2.y > point1.y) { //第一象限
        return Math.atan((point2.y - point1.y) / (point2.x - point1.x)) / Math.PI * 180;
    }
    else if (point2.x < point1.x && point2.y > point1.y) {
        return Math.atan((point1.x - point2.x) / (point2.y - point1.y)) / Math.PI * 180 + 90;
    }
    else if (point2.x < point1.x && point2.y < point1.y) {
        return Math.atan((point1.y - point2.y) / (point1.x - point2.x)) / Math.PI * 180 + 180;
    }
    else if (point2.x > point1.x && point2.y < point1.y) {
        return Math.atan((point2.x - point1.x) / (point1.y - point2.y)) / Math.PI * 180 + 270;
    }
    if (point2.x == point1.x && point2.y > point1.y) {
        return 90; //下
    }
    else if (point2.x == point1.x && point2.y < point1.y) {
        return 270; //上
    }
    else if (point2.x > point1.x && point2.y == point1.y) {
        return 360; //右
    }
    else {
        return 180; //左
    }
}
/**计算两点间距离 */
function getDistance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}
/**
 * 震动时间
 * @param time  毫秒数
 */
function vibrate(time) {
    // if (isNoVirbate) return;
    // Log.d('virbrate  time:' + time);
    var count = time / 15;
    var index = 0;
    var obj = { count: count, index: index };
    Laya.timer.loop(15, obj, function () {
        // Log.d('virbrate  loop   index:' + index);
        Laya.Browser.window.wx.vibrateShort();
        index++;
        if (index > count) {
            Laya.timer.clearAll(obj);
            obj = null;
        }
    });
}
function vibrateLong() {
    // if (isNoVirbate) return;
    Laya.Browser.window.wx.vibrateLong();
}
function playPart(obj) {
    log("playPart =======");
    Laya.loader.load('ani/PiaoLuo.part', Laya.Handler.create(this, function (settings) {
        log("playPart =======left ");
        var Particle2D = Laya.Particle2D;
        // 创建 Particle2D 实例
        var partIns = new Particle2D(settings);
        Laya.stage.addChild(partIns);
        partIns.pos(0, 100);
        // 开始发射粒子
        partIns.emitter.start();
        // 播放
        partIns.play();
        //一秒后销毁对像
        Laya.timer.once(5000, obj, function () {
            log("playPart =======left destory ");
            partIns.emitter.clear();
            partIns.stop();
            partIns.removeSelf();
        });
    }), null, Laya.Loader.JSON);
}
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.d = function (msg) {
        if (msg === void 0) { msg = ""; }
        if (DEBUG) {
            console.log(msg);
        }
    };
    Log.e = function (msg) {
        if (msg === void 0) { msg = ""; }
        console.error(msg);
    };
    return Log;
}());
//============设置模块==============
//是否静音
var MUTE = "MUTE_KEY";
var MUTE_MUSIC = "MUTE_MUSIC_KEY";
var NOVIRBATE = "NOVIRBATE_KEY";
var isMute = false;
var isMuteMusic = false;
//是否震动
var isNoVirbate = false;
//=======================end====================
//# sourceMappingURL=Common.js.map
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
 *  公共动效
 *
 */
/**
* 震动一个控件
* @param view
* @param time
*/
function vibrateView(view, time) {
    var initPos = { x: view.x, y: view.y };
    //定义参数  
    var count = time ? (time / 10) : 50;
    var loop = 0; //震动次数  
    var offX;
    var offY;
    var dir = 1; //震动方向。1正，-1反  
    var rotation;
    Laya.timer.loop(10, view, function () {
        loop++;
        //随机获取震动方向  
        dir = Math.random() > .5 ? 1 : -1;
        //随机获取X轴移动量  
        offX = Math.random() * 5 * dir + initPos.x;
        //随机获取Y轴移动量  
        offY = Math.random() * 5 * dir * -1 + initPos.y;
        // rotation = Math.random() * 5 * dir + vibrateObj.rotation;
        Laya.Tween.to(view, { x: offX, y: offY }, 10, Laya.Ease.linearNone, Laya.Handler.create(view, function () {
            if (loop > count) {
                Laya.timer.clearAll(view);
                view.x = initPos.x;
                view.y = initPos.y;
                return;
            }
        }));
    });
}
/**
 * 控件像波浪形抖动
 * 按顺序波动
 *
 * @param {Array<Laya.Sprite>} views
 */
function rippleViews(views, stime, scale) {
    var len = views.length;
    var scalTime = stime ? stime : 100;
    var scaleN = scale ? scale : 1.1;
    var _loop_1 = function (i) {
        //先清掉该控件上的所有动效
        var aniView = views[i];
        Laya.Tween.clearTween(aniView);
        //再按顺序进行波动
        Laya.timer.once(i * scalTime, aniView, function () {
            Laya.Tween.to(aniView, { scaleX: scaleN, scaleY: scaleN }, scalTime, Laya.Ease.linearIn, Laya.Handler.create(aniView, function () {
                Laya.Tween.to(aniView, { scaleX: 1, scaleY: 1 }, scalTime, Laya.Ease.linearOut);
            }));
        });
    };
    for (var i = 0; i < len; i++) {
        _loop_1(i);
    }
}
/**膨胀动画时间  */
var SCALE_DURATION = 100;
/**闪烁动画时间  */
var TWINKLE_DURATION = 100;
/**膨胀动画  x方向拉伸，y方向压缩
 *
 * @param caller 执行域
 * @param view  动画对象
 * @param scaleXY 膨胀系数，默认0.2
 */
function scaleAni(caller, view, scaleXY) {
    var obj = { scale: 0 };
    var thiz = caller;
    var scaleTmp = scaleXY ? scaleXY : 0.2;
    Laya.Tween.to(obj, {
        scale: scaleTmp,
        update: new Laya.Handler(thiz, function () {
            view.scaleX = 1 + obj.scale;
            view.scaleY = 1 - obj.scale;
        })
    }, SCALE_DURATION, Laya.Ease.bounceInOut, Laya.Handler.create(thiz, function () {
        obj = { scale: 0 };
        Laya.Tween.to(obj, {
            scale: scaleTmp,
            update: new Laya.Handler(thiz, function () {
                view.scaleX = 1 + scaleTmp - obj.scale;
                view.scaleY = 1 - scaleTmp + obj.scale;
            })
        }, SCALE_DURATION, Laya.Ease.bounceInOut);
    }));
}
/**
* 抖动动画效果    旋转抖动（动画对象描点设置为中心点)
* @param caller
* @param view
* @param count     不用传入
*/
function sharkAni(caller, view, count, times, callBack) {
    var index = count ? count : 0;
    var r = index % 4 === 0 ? 15 : (index % 4 === 1 ? 0 : (index % 4 === 2 ? -15 : 0));
    Laya.Tween.to(view, {
        rotation: r
    }, 60, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        if (index <= (4 * (times ? times : 5))) {
            sharkAni(caller, view, index + 1, times, callBack);
        }
        else {
            //播放完成回调
            if (callBack) {
                callBack();
            }
        }
    }));
}
/**
 * 抖动动画效果  左右抖动
 * @param caller 执行域
 * @param view 动画对象
 * @param count 抖动动画索引，不用传或传入0
 * @param times 抖动次数，默认5次
 * @param callBack 动画完成后回调
 */
function sharkAniLeftRight(caller, view, count, times, callBack) {
    var index = count ? count : 0;
    var r = index % 4 === 0 ? 0 : (index % 4 === 1 ? 20 : (index % 4 === 2 ? 0 : -20));
    var t = view.x + r;
    Laya.Tween.to(view, {
        x: t
    }, 10, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        if (index <= (3 * (times ? times : 5))) {
            sharkAniLeftRight(caller, view, ++index, times, callBack);
        }
        else {
            //播放完成回调
            if (callBack) {
                callBack();
            }
        }
    }));
}
/**
 * 闪烁动画
 * @param caller 执行域
 * @param view 动画对象
 * @param count 动画次数索引，请传入null或0
 * @param times 闪烁次数
 * @param callBack 动画完成后回调
 */
function twinkle(caller, view, count, times, callBack) {
    var index = count ? count : 0;
    var r = index % 2 === 0 ? 0.5 : 1;
    Laya.Tween.to(view, {
        alpha: r
    }, TWINKLE_DURATION, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        if (index <= (2 * (times ? times : 1))) {
            twinkle(caller, view, index + 1, times, callBack);
        }
        else {
            //播放完成回调
            log('播放完成回调');
            if (callBack) {
                log('播放完成回调 callBack');
                callBack();
            }
        }
    }));
}
/**跳动动画
 *
 * @param caller 执行域
 * @param view  动画对象,必需要设置描点为中心
 * @param skipHeight 跳跃高度，默认为控件高度一半
 * @param skipNum 跳跃次数，默认为3次
 * @param callBack 完成回调
 * @param skipIndex 跳跃索引，不用传入，或传0
 */
function skipAni(caller, view, skipHeight, skipNum, callBack, skipIndex) {
    var obj = { scale: 0 };
    var thiz = caller;
    var h = view.height;
    var baseY = view.y;
    var height = skipHeight ? skipHeight : (h * 3 / 4);
    var skipCount = skipNum ? skipNum : 3;
    var skips = skipIndex ? skipIndex : 0;
    //计算本次高度
    height = height / (skips + 1);
    Laya.Tween.to(obj, {
        scale: height,
        update: new Laya.Handler(thiz, function () {
            view.y = baseY - obj.scale;
        })
    }, 100, Laya.Ease.bounceInOut, Laya.Handler.create(thiz, function () {
        obj = { scale: 0 };
        Laya.Tween.to(obj, {
            scale: height,
            update: new Laya.Handler(thiz, function () {
                view.y = baseY - height + obj.scale;
            })
        }, 100, Laya.Ease.bounceInOut, Laya.Handler.create(thiz, function () {
            // scaleAni(thiz, view);
            if (skips >= skipCount) {
                if (callBack) {
                    callBack();
                }
            }
            else {
                skipAni(caller, view, skipHeight, skipNum, callBack, skips + 1);
            }
        }));
    }));
}
function scaleInAni(caller, view) {
    // log('scaleInAni')
    Laya.Tween.to(view, {
        scaleX: 0.8,
        scaleY: 0.8
    }, 550, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        Laya.Tween.to(view, {
            scaleX: 1.0,
            scaleY: 1.0
        }, 550, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        }));
    }));
}
function scaleOutAni(caller, view) {
    // log('scaleInAni')
    Laya.Tween.to(view, {
        scaleX: 1.2,
        scaleY: 1.2
    }, 550, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        Laya.Tween.to(view, {
            scaleX: 1.0,
            scaleY: 1.0
        }, 550, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        }));
    }));
}
/**
 * 白屏闪烁特效
 *
 * @param {Laya.Sprite} content
 */
function twinkleView(content, callBack) {
    var w = content.width;
    var h = content.height;
    var img = new Laya.Image();
    img.skin = "comp/blurredCircle.png";
    img.size(w * 2, h * 2);
    img.alpha = 0;
    img.anchorX = 0.5;
    img.anchorY = 0.5;
    img.pos(w / 2, h / 2);
    content.addChild(img);
    Laya.Tween.to(img, {
        scaleX: 4,
        scaleY: 4,
        alpha: 0.5
    }, 500, Laya.Ease.linearOut, Laya.Handler.create(img, function () {
        Laya.Tween.to(img, {
            scaleX: 1,
            scaleY: 1,
            alpha: 0
        }, 500, Laya.Ease.linearIn, Laya.Handler.create(img, function () {
            img.destroy();
            if (callBack) {
                callBack();
            }
        }));
    }));
}
/**震屏效果临时变量 */
var vibrateObj = {
    x: 0, y: 0, rotation: 0, view: null
};
/**
 * 调用该方法前，请将view的描点设置为中心点
 * 震屏效果
 * 三个变量：x水平方向  5,y垂直方向  5,rotation旋转角度  10
 * @param view
 * @param time  持续时间 以毫秒为单位
 */
function vibrateScreen(view, callBack, time) {
    if (vibrateObj.view) {
        Laya.timer.clearAll(vibrateObj);
        //说明上一次的动画还没完成
        vibrateObj.view.x = vibrateObj.x;
        vibrateObj.view.y = vibrateObj.y;
        vibrateObj.view.rotation = vibrateObj.rotation;
    }
    //先清除该对象上的缓和时间
    vibrateObj.x = view.x;
    vibrateObj.y = view.y;
    vibrateObj.rotation = view.rotation;
    vibrateObj.view = view;
    //定义参数  
    var count = time ? (time / 10) : 50;
    var loop = 0; //震动次数  
    var offX;
    var offY;
    var dir = 1; //震动方向。1正，-1反  
    var rotation;
    Laya.timer.loop(10, vibrateObj, function () {
        loop++;
        //随机获取震动方向  
        dir = Math.random() > .5 ? 1 : -1;
        //随机获取X轴移动量  
        offX = Math.random() * 7 * dir + vibrateObj.x;
        //随机获取Y轴移动量  
        offY = Math.random() * 7 * dir * (-1) + vibrateObj.y;
        // rotation = Math.random() * 5 * dir + vibrateObj.rotation;
        if (loop > count) {
            view.x = vibrateObj.x;
            view.y = vibrateObj.y;
            view.rotation = vibrateObj.rotation;
            vibrateObj.view = null;
            if (callBack) {
                callBack();
            }
            Laya.timer.clearAll(vibrateObj);
            return;
        }
        Laya.Tween.to(view, { x: offX, y: offY, rotation: rotation }, 10, Laya.Ease.linearNone);
    });
}
//# sourceMappingURL=AniUtils.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
 * 小彩带特效
 */
var SmallCaiDai = /** @class */ (function (_super) {
    __extends(SmallCaiDai, _super);
    function SmallCaiDai() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.father = null;
        _this.speedInitX = 10; //x方向的初始速度
        _this.speedInitY = 50; //y方向的初始速度
        _this.aInitX = 2; //x方向的加速度，最大值，随机数
        _this.aInitY = 1; //y方向的加速度，恒定值
        return _this;
    }
    /**
     * @param star  被爆的星星
     * @param father  容器
     **/
    SmallCaiDai.prototype.init = function (father, x, y) {
        this.father = father;
        var rnd = Math.floor(Math.random() * 19) + 1;
        this.skin = 'caidai/caidai' + rnd + '.png';
        var scaleValue = Math.random() * 50;
        var w = scaleValue;
        var h = scaleValue;
        this.width = w;
        this.height = h;
        //创建红色颜色滤镜
        // var redFilter: Laya.ColorFilter = new Laya.ColorFilter(colorMatrix);
        // this.filters = [redFilter];
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.rotation = Math.random() * 360;
        this.pos(x ? x : 0, y ? y : 0);
        this.father.addChild(this);
        this.popup();
    };
    SmallCaiDai.prototype.popup = function () {
        var thiz = this;
        var index = 0;
        var starX = this.x;
        var starY = this.y;
        var speedX = Math.random() >= 0.5 ? Math.random() * this.speedInitX : -Math.random() * this.speedInitX;
        var aX = (speedX > 0 ? -Math.random() : Math.random()) * this.aInitX;
        var aY = this.aInitY;
        var speedY = -Math.random() * this.speedInitY;
        Laya.timer.frameLoop(1, thiz, function () {
            //结束条件,跑到外面去了就结束并移除
            if (thiz.x < 0 || thiz.x > thiz.father.width || thiz.y > thiz.father.height || thiz.y < 0) {
                // thiz.visible = false;
                Laya.timer.clearAll(thiz);
                thiz.destroy();
                return;
            }
            //x方向匀减速 a与speedX方向相反
            var moveX = speedX * index + 0.5 * aX * index * index;
            thiz.x = starX + moveX;
            //y方向也是匀减速
            var moveY = speedY * index + 0.5 * aY * index * index;
            thiz.y = starY + moveY;
            index++;
        });
    };
    return SmallCaiDai;
}(Laya.Image));
var CaiDai = /** @class */ (function () {
    function CaiDai(x, y, father) {
        this.father = null;
        this.baseCount = 30;
        this.rndMax = 30;
        this.father = father;
        // Laya.loader.load("res/atlas/caidai.atlas", Laya.Handler.create(this, this.loaded, [x, y, this.father]), null, Laya.Loader.ATLAS);
        this.loaded(x, y, this.father);
    }
    CaiDai.prototype.loaded = function (x, y, father) {
        // log('caidai father:'+father.width+','+father.height);
        //随机产生大量的小彩带
        var max = this.baseCount + Math.floor(Math.random() * this.rndMax);
        for (var i = 0; i < max; i++) {
            var caidai = Laya.Pool.getItemByClass('SmallCaiDai', SmallCaiDai);
            caidai.init(father, x, y);
        }
    };
    /**
     * 展示动画效果
     *
     * @static
     * @param {number} x
     * @param {number} y
     * @param {Laya.Sprite} [father]
     * @memberof CaiDai
     */
    CaiDai.show = function (x, y, father) {
        // log('彩带：x=' + x);
        // log('彩带：y=' + y);
        if (CaiDai.self) {
            CaiDai.self.loaded(x, y, father ? father : Laya.stage);
        }
        else {
            CaiDai.self = new CaiDai(x, y, father ? father : Laya.stage);
        }
    };
    /**
     * 得到单例实例，有可能 为null
     */
    CaiDai.getSelf = function () {
        return CaiDai.self;
    };
    CaiDai.self = null;
    return CaiDai;
}());
//# sourceMappingURL=CaiDai.js.map
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
 * 游戏主页，在该界面提供画板，由此画板实现游戏逻辑功能
 * 主要成员：
 *  layout:Laya.Sprite  ：游戏画板，游戏逻辑在该画板上呈现
 * 主要函数：
 *  initGameUi()  游戏加载
 *
 *  onSettings()    点击设置
 *  onReplay()      点击重新开始
 *  gameStateChange()   游戏体状态回调
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//单例，自己的实例
var gameUiSelf = null;
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    //================end=================
    function GameUI() {
        var _this = _super.call(this) || this;
        _this.hasOver = 0;
        _this.adCount = 0;
        _this.clickTip = false;
        //是新手引导吗？
        _this.isGuide = false;
        _this.ifShowUserTip = false;
        _this.showUserTipIndex = 0;
        _this.gameState = GAME_STATE.NONE;
        _this.level = 0;
        gameUiSelf = _this;
        _this.btnTip.on(Laya.Event.CLICK, _this, _this.onFreeTip);
        _this.btnRefresh.on(Laya.Event.CLICK, _this, _this.onRefresh);
        _this.btnSettings.on(Laya.Event.CLICK, _this, _this.onSettings);
        //调整位置
        _this.setViews();
        _this.hasOver = 0;
        _this.adCount = 0;
        return _this;
    }
    GameUI.prototype.onRefresh = function (e) {
        e.stopPropagation();
    };
    //设置
    GameUI.prototype.onSettings = function (e) {
        e.stopPropagation();
        soundUtils.playSound(CHOOSE);
        SettingDialog.getSelf().popup();
    };
    //恢复初始情况
    GameUI.prototype.onReplay = function (e) {
        e.stopPropagation();
        soundUtils.playSound(CHOOSE);
        if (this.gameState == GAME_STATE.GAMEOVER)
            return;
        game.replayGame(game.level);
    };
    GameUI.prototype.setViews = function () {
        // log('width=' + Laya.stage.width + ',height=' + SCREENHEIGHT);
        if (SCREENHEIGHT > LARGE_PHONE_H) {
            this.layoutLabel.y += IPHONEX_TOP - 30;
            this.topNavView.y += IPHONEX_TOP;
            this.layout.y += IPHONEX_TOP;
            this.btnTipLayout.y += IPHONEX_TOP;
        }
        this.height = SCREENHEIGHT;
        this.bgImg.height = this.height;
        this.bgImg.x = 0;
        this.bgImg.y = 0;
    };
    GameUI.prototype.homeClick = function (e) {
        e.stopPropagation();
        //清空过关数据
        game.videoTip = 0;
        game.shareTip = 0;
        game.coinTip = 0;
        game.startTime = 0;
        game.costTime = 0;
        //隐藏banner
        wxUtils.hideBanner();
        //先清空gameUI中的对象
        //去掉动画
        this.removeGif();
        //删除自己
        this.removeSelf();
        //返回到等级界面
    };
    //设置等级
    GameUI.prototype.setLevel = function (levelIndex) {
        // this.labelGrade.text = levelIndex + ' 级';
        this.labelLevel.text = '第 ' + game.level + ' 关';
    };
    //初始化游戏界面： arr:题目数组
    GameUI.prototype.initGameUi = function (index, tip) {
        log('initGameUi');
        //判断是否显示悬浮按钮
        //前三关新手引导
        this.level = index;
        this.isGuide = (index <= 3);
        this.clickTip = false;
        this.showUserTipIndex = 0;
        this.ifShowUserTip = false;
        //设置金币数量
        this.removeGif();
        this.hasOver = 0;
        //设置关卡
        this.setLevel(index);
        var thiz = this;
        thiz.btnTip.visible = true;
        thiz.btnRefresh.visible = true;
        //底部显示
        game.setGameUiNavi();
        //计算提示金币数
        if (game.CoinNumMode === 1) {
            game.useTipCoinNum = Math.floor(Math.ceil(1.0 * game.level / game.CoinNumCount) * game.CoinNumCount * game.TipCoinRate);
            game.BonusCoinNum = Math.floor((Math.ceil(1.0 * game.level / game.CoinNumCount) + 1) * game.CoinNumCount * game.BonusCoinRate);
            game.chargeCoinNum = game.useTipCoinNum;
        }
        //进入游戏===========
    };
    GameUI.prototype.showTipAni = function (flag) {
        // this.imgHintGlow.alpha = flag ? 0 : 1;
        // this.imgHintGlow.visible = true;
        // Laya.Tween.to(this.imgHintGlow, { alpha: flag ? 1 : 0 }, 500, null, Laya.Handler.create(this, this.showTipAni, [!flag]), 500);
    };
    /**
     * 游戏状态改变
     *
     * @private
     * @param {number} state
     * @param {*} obj
     * @memberof GameUI
     */
    GameUI.prototype.gameStateChange = function (self, gameState) {
        if (gameState == GAME_STATE.GAMEOVER) {
            if (self.hasOver == 1)
                return;
            //清除定时器
            Laya.timer.clear(self, self.showTipAni);
            // Laya.Tween.clearAll(self.imgHintGlow);
            // self.imgHintGlow.visible = false;
            self.hasOver = 1;
            self.gameOver();
        }
    };
    //底部导量不同类型 
    GameUI.prototype.showBottomAppList = function () {
        //更新待跳转列表
        if (game.WAITING_APP_ARRAY != null && game.WAITING_APP_ARRAY.length > 0) {
            // this.showGameViewAppList();
            if (game.gameBottomAppType == 5) {
                this.bottomApp.height = 440;
                this.bottomAppList.height = 420;
            }
            else {
                this.bottomApp.height = 220;
                this.bottomAppList.height = 210;
            }
            // log('showBottomAppList: '+ (this.btnTipLayout.y + this.btnTipLayout.height)+','+(game.SCREENHEIGHT - this.bottomApp.height) );
            if ((this.btnTipLayout.y + this.btnTipLayout.height) < (SCREENHEIGHT - this.bottomApp.height - (ifIphoneX ? 50 : 0))) {
                //底部空间放得下
                this.bottomApp.y = SCREENHEIGHT - this.bottomApp.height - (ifIphoneX ? 50 : 0);
                this.bottomAppList.removeChildren();
                //背景矩形
                this.bottomAppBg.height = this.bottomApp.height;
                this.bottomApp.visible = true;
                var bottomType = game.gameBottomAppType;
                if (bottomType == 1) {
                    // 随机选择5款游戏导流
                    var drawerArr = [];
                    for (var index = 0; index < game.WAITING_APP_ARRAY.length; index++) {
                        drawerArr.push(index);
                    }
                    var indexArray = [];
                    if (drawerArr.length <= 5) {
                        indexArray = drawerArr;
                    }
                    else {
                        while (indexArray.length < 5) {
                            var ta = Math.floor(Math.random() * drawerArr.length);
                            indexArray.push(drawerArr[ta]);
                            drawerArr.splice(ta, 1);
                        }
                    }
                    var bottomItemArray = [];
                    for (var i = 0; i < indexArray.length; i++) {
                        var gameInfo = game.WAITING_APP_ARRAY[indexArray[i]];
                        var gameInfo1 = JSON.parse(JSON.stringify(gameInfo));
                        gameInfo1["bottom"] = "game-" + bottomType;
                        bottomItemArray.push(gameInfo1);
                    }
                }
                else if (bottomType == 2) {
                    //10款来回往返
                    // if (!this.bottomView2) {
                    var bottomItemArray = [];
                    for (var i = 0; i < game.WAITING_APP_ARRAY.length; i++) {
                        var gameInfo = game.WAITING_APP_ARRAY[i];
                        var gameInfo1 = JSON.parse(JSON.stringify(gameInfo));
                        gameInfo1["bottom"] = "game-" + bottomType;
                        bottomItemArray.push(gameInfo1);
                    }
                }
                else if (bottomType == 3) {
                    // 5款跳动，每6s更换一批
                }
                else if (bottomType == 4) {
                    // 循环移动
                    // if (!this.bottomView4) {
                }
                else if (bottomType == 5) {
                    // 10款同时出现跳动，两行显示
                }
                wxUtils.aldSendEventFunc('出现底部导量', { 'from': 'game' });
            }
        }
        else {
            this.bottomApp.visible = false;
        }
    };
    //展示顶部导量 
    GameUI.prototype.showTopAppList = function () {
    };
    GameUI.prototype.navViewAni = function () {
        var currentIndex = this.topList.startIndex;
        if (currentIndex < this.topList.array.length - 4) {
            this.topList.tweenTo(currentIndex + 1, 320);
        }
        else {
            this.topList.tweenTo(0, 320);
        }
    };
    /**
     * 列表刷新 Handler
     * @param cell
     * @param index
     */
    GameUI.prototype.renderListHandler = function (cell, index) {
        cell.setData(cell.dataSource);
    };
    //看视频获取提示
    GameUI.prototype.showVideoTip = function () {
        //e.stopPropagation();
        var that = this;
        wxUtils.aldSendEventFunc('免费提示拉起视频', { 'level': '' + game.level });
        wxUtils.showTipVideoAd(function (ifShowAd) {
            log('看提示视频观看之后回来,ifShowAd=' + ifShowAd);
            if (ifShowAd) {
                //成功播放视频
                wxUtils.aldSendEventFunc('免费提示视频播放成功', { 'level': '' + game.level });
                wxUtils.aldSendEventFunc('视频播放成功', { 'level': '' + game.level });
                //获得提示
                game.videoTip += 1;
                wx.showToast({
                    title: '获得提示',
                    icon: 'success',
                    duration: 500,
                    mask: true,
                });
                that.showTipFunc();
                //累加看视频次数
                if (game.tipMode === 3 || game.tipMode === 4) {
                    game.tipVideoTimes += 1;
                }
            }
            else {
                //没有视频播放了
                wxUtils.aldSendEventFunc('免费提示视频播放失败', { 'level': '' + game.level });
                if (game.tipMode === 4) {
                    wx.showModal({
                        title: '提示',
                        content: '非常抱歉，目前暂时没有可观看的视频。请稍后再试，谢谢您的理解！',
                        confirmText: '好的',
                        showCancel: false,
                    });
                }
            }
        });
    };
    //点击免费提示
    GameUI.prototype.onFreeTip = function (e) {
        e.stopPropagation();
        soundUtils.playSound(CHOOSE);
        // 设置当前关卡的分享视频参数
        if (this.clickTip) {
            //已经点击了提示
            return;
        }
        if (DEBUG) {
            this.showTipFunc();
            return;
        }
        if (game.level <= game.tipLevel) {
            game.tipMode = game.tipMode1;
            game.tipN = game.tipN1;
        }
        else {
            game.tipMode = game.tipMode2;
            game.tipN = game.tipN2;
        }
        var that = this;
        // log('tipMode=' + game.tipMode + ',tipN=' + game.tipN + 'tipShareTimes=' + game.tipShareTimes + ',tipVideoTimes=' + game.tipVideoTimes);
        // log('tipArr='); log(game.tipArr);
        wxUtils.aldSendEventFunc('点击免费提示', { 'level': '' + game.level });
        that.showVideoTip();
    };
    //去掉引导动画
    GameUI.prototype.removeGif = function () {
    };
    //显示提示
    GameUI.prototype.showTipFunc = function () {
    };
    GameUI.prototype.gameOver = function () {
        // if (this.hasOver == 1) return;
        var that = this;
        //判断游戏是否结束
        if (this.hasOver == 1) { //过关
            this.gameState = GAME_STATE.GAMEOVER;
            this.removeGif();
            Laya.stage.offAll();
            soundUtils.playSound(LEVELCOMPLETED);
            // vibrate(45);
            wxUtils.aldSendEventFunc('用户过关', { 'level': game.level });
            if (game.level == allQuestionLen) {
                wxUtils.aldSendEventFunc('用户通关', { 'level': game.level });
            }
            //隐藏banner
            if (wxUtils.gameBannerAd) {
                wxUtils.gameBannerAd.hide();
            }
            //过关动效
            playPart(this);
            Laya.timer.once(1000, this, function () {
                //插屏广告判断
                loadInterAdStatus = 0;
                game.passLevelsN += 1;
                if ((game.passLevelsN > game.showInterN) && (game.passLevelsN % game.showInterCount == 0)) {
                    wxUtils.showInterAd();
                }
                Laya.timer.once(2500, gameUiSelf, function () {
                    //根据插屏显示情况来决定是否直接过关
                    // log('loadInterAdStatus=' + loadInterAdStatus);
                    if (loadInterAdStatus !== 2) {
                        //没有弹出插屏
                        loadInterAdStatus = 0;
                        game.showBonus(game.level, 0, 3);
                    }
                });
            });
            // return true;
        }
        // return false;
    };
    return GameUI;
}(ui.page_dir.GameInfoUI));
;
//# sourceMappingURL=GameInfo.js.map
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
 * 游戏结算页
 * 该页面在游戏结束后调用
 * 实现了过关提示，及游戏奖励
 * 主要函数：
 *  Restart()       重新玩本关
 *  nextClick()     点击下一关
 *  setData()       设置过关提示
 *  setBannerNaviView()     设置底部banner
 *  setBottomAppList()      设置导量
 *
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PassPage = /** @class */ (function (_super) {
    __extends(PassPage, _super);
    function PassPage() {
        var _this = _super.call(this) || this;
        _this.data = null;
        _this.height = SCREENHEIGHT;
        _this.bgImg.height = _this.height;
        _this.btnNext.on(Laya.Event.CLICK, _this, _this.nextClick);
        _this.data = null;
        if (SCREENHEIGHT >= LARGE_PHONE_H) {
            //Iphone X往下移
            _this.contentLayout.y += IPHONEX_TOP;
        }
        return _this;
    }
    PassPage.prototype.Restart = function (e) {
        e.stopPropagation();
        soundUtils.playSound(CHOOSE);
        game.initGame(game.level);
    };
    PassPage.prototype.nextClick = function (e) {
        e.stopPropagation();
        //隐藏banner
        wxUtils.hideBanner();
        soundUtils.playSound(CHOOSE);
        Laya.timer.clear(this, this.setTopAppList);
        wxUtils.aldSendEventFunc('点击下一关', { 'level': '' + game.level, 'ifLoadBanner': ifLoadNextBanner });
        //升级
        game.level++;
        game.initGame(game.level);
    };
    //设置显示文本
    PassPage.prototype.setData = function (data) {
        wxUtils.aldSendEventFunc('下一关展示', { 'level': game.level });
        this.data = data;
        var that = this;
        that.levelLabel.text = '闯过第' + game.level + '关';
        ifLoadNextBanner = false;
        wxUtils.hideBanner();
        this.bottomApp.visible = false;
        this.topApp.visible = false;
        this.btnNext.visible = true;
        this.btnNext.scaleX = 0;
        this.btnNext.scaleY = 0;
    };
    PassPage.prototype.setBannerNaviView = function () {
        wxUtils.showNextBanner();
    };
    //设置底部导量矩阵
    PassPage.prototype.setBottomAppList = function () {
        //更新待跳转列表
    };
    //设置顶部导量矩阵
    PassPage.prototype.setTopAppList = function () {
    };
    PassPage.prototype.scaleAniLoop = function () {
        // log('scaleAniLoop')
        for (var i = 0; i < 5; i++) {
            var item = this.bottomAppList.getChildAt(i);
            scaleInAni(this, item);
        }
    };
    return PassPage;
}(ui.page_dir.PassPageUI));
;
//# sourceMappingURL=PassPage.js.map
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
 * 设置对话框
 *
 * 背景音乐设置
 *
 * 音效设置
 *
 * 震动设置
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SettingDialog = /** @class */ (function (_super) {
    __extends(SettingDialog, _super);
    function SettingDialog() {
        var _this = _super.call(this) || this;
        _this.btnClose.on(Laya.Event.CLICK, _this, _this.clickClose);
        _this.cbSound.on(Laya.Event.CLICK, _this, _this.clickSound);
        _this.cbMusic.on(Laya.Event.CLICK, _this, _this.clickMusic);
        _this.cbVirbrate.on(Laya.Event.CLICK, _this, _this.clickVirbate);
        return _this;
    }
    SettingDialog.prototype.clickClose = function (e) {
        e.stopPropagation();
        this.close();
    };
    SettingDialog.prototype.clickVirbate = function (e) {
        e.stopPropagation();
        isNoVirbate = !isNoVirbate;
        Laya.Browser.window.wx.setStorageSync(NOVIRBATE, isNoVirbate);
    };
    SettingDialog.prototype.clickMusic = function (e) {
        e.stopPropagation();
        isMuteMusic = !isMuteMusic;
        Laya.Browser.window.wx.setStorageSync(MUTE_MUSIC, isMuteMusic);
        soundUtils.playBgMusic();
    };
    SettingDialog.prototype.clickSound = function (e) {
        e.stopPropagation();
        isMute = !isMute;
        Laya.Browser.window.wx.setStorageSync(MUTE, isMute);
    };
    SettingDialog.getSelf = function () {
        if (SettingDialog.self == null) {
            SettingDialog.self = new SettingDialog();
        }
        return SettingDialog.self;
    };
    SettingDialog.prototype.init = function () {
        this.cbSound.selected = isMute;
        this.cbMusic.selected = isMuteMusic;
        this.cbVirbrate.selected = isNoVirbate;
    };
    SettingDialog.prototype.popup = function () {
        _super.prototype.popup.call(this);
        this.init();
    };
    SettingDialog.self = null;
    return SettingDialog;
}(ui.dialog_dir.DialogSettingUI));
//# sourceMappingURL=SettingsDialog.js.map
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
 *  资源加载
 *
 *
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LoadPage = /** @class */ (function (_super) {
    __extends(LoadPage, _super);
    function LoadPage() {
        var _this = _super.call(this) || this;
        _this.progressBar = null;
        _this.progress = 0;
        _this.subpackage = [
            'subassets'
        ];
        _this.stateFlag = [];
        _this.subLen = 0;
        //加载索引值
        _this.loadIndex = 0;
        _this.min = 0;
        _this.max = 100;
        _this.totalProgress = [0, 0, 0];
        _this.callBack = null;
        _this.msg = "抵制不良游戏，拒绝盗版游戏，注意自我保护，谨防受骗上当。\n适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活。";
        _this.progressBar = new ProgressBar();
        _this.progressLayout.addChild(_this.progressBar);
        _this.subLen = _this.subpackage.length;
        _this.on(Laya.Event.COMPONENT_REMOVED, _this, _this.onRemove);
        _this.msgLabel.text = _this.msg;
        return _this;
    }
    LoadPage.prototype.setCallBack = function (callBack) {
        this.callBack = callBack;
    };
    LoadPage.getSelf = function (callBack) {
        if (LoadPage.self == null) {
            LoadPage.self = new LoadPage();
        }
        if (callBack) {
            LoadPage.self.setCallBack(callBack);
            LoadPage.self.loadRes(callBack);
        }
        return LoadPage.self;
    };
    LoadPage.prototype.loadRes = function (callBack) {
        this.callBack = callBack;
        this.setProgress(0);
        var thiz = this;
        var loadTask = wx.loadSubpackage({
            name: thiz.subpackage[0],
            success: function (res) {
                // 分包加载成功后通过 success 回调
                Log.d(res);
                thiz.stateFlag[0] = true;
                //将题目数组赋值给question
            },
            fail: function (res) {
                // 分包加载失败通过 fail 回调
                thiz.stateFlag[0] = false;
            },
            complete: function () {
                thiz.loadIndex++;
                log("分包加载完成:::" + thiz.subpackage[0]);
                log("分包加载完成");
                thiz.onCompelete(true);
            }
        });
        loadTask.onProgressUpdate(function (res) {
            log('下载进度  i=>' + 0 + res.progress);
            log('已经下载的数据长度' + res.totalBytesWritten);
            log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
            thiz.totalProgress[0] = res.totalBytesWritten / res.totalBytesExpectedToWrite * 100;
            var per = (thiz.totalProgress[0]) / 100;
            thiz.setProgress(per * 100);
        });
    };
    LoadPage.prototype.setProgress = function (progress, min, max) {
        if (!isNaN(min)) {
            this.min = min;
        }
        if (!isNaN(max)) {
            this.max = max;
        }
        this.progress = progress;
        //根据百分比，计算应该移动的距离 
        //该移动的距离 
        this.progressBar.setProgress(this.progress);
        // this.progressBar.x = moveX;
        this.loadText.text = '正在玩命加载...' + Math.round(progress) + '%';
    };
    /**
 * 加载结束
 *
 * @private
 * @memberof LoadPage
 */
    LoadPage.prototype.onCompelete = function (flag) {
        if (this.callBack) {
            this.callBack(flag);
        }
        this.removeSelf();
    };
    LoadPage.prototype.onRemove = function () {
        log("移出舞台");
        LoadPage.self = null;
        this.destroy();
    };
    LoadPage.self = null;
    return LoadPage;
}(ui.page_dir.LoadPageUI));
//# sourceMappingURL=LoadPage.js.map
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
 *  自定义控件：进度条
 *  主要函数：
 *      setProgress(progress: number, max?: number, min?: number, callBack?: Function): void 设置进度
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ProgressBar = /** @class */ (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar() {
        var _this = _super.call(this) || this;
        _this.maxValue = 100; //最大值
        _this.minValue = 0; //最小值
        _this.progress = 0; //当前进度值
        return _this;
    }
    ProgressBar.prototype.getProgress = function () {
        return this.progress;
    };
    /**
     * 设置进度
     * @param progress  进度值
     * @param max   最大值
     * @param min   最小时
     * @param callBack  进度完成时的回调
     */
    ProgressBar.prototype.setProgress = function (progress, max, min, callBack) {
        if (!isNaN(min)) {
            this.minValue = min;
        }
        if (!isNaN(max)) {
            this.maxValue = max;
        }
        //判断是否为回退
        var isBack = progress < this.progress;
        this.progress = progress;
        //根据百分比，计算应该移动的距离 
        //该移动的距离 
        var per = this.progress / (this.maxValue - this.minValue) * this.progressBar.width;
        var moveX = -this.progressBar.width / 2 + per;
        //计算mask的位置
        // 如果是回退，就从0开始
        if (isBack) {
            this.progressMask.x = -this.progressBar.width / 2;
            Laya.Tween.to(this.progressMask, { x: moveX }, 500, null, Laya.Handler.create(this, function () {
                if (callBack) {
                    callBack();
                }
            }));
        }
        else {
            Laya.Tween.to(this.progressMask, { x: moveX }, 500, null, Laya.Handler.create(this, function () {
                if (callBack) {
                    callBack();
                }
            }));
        }
    };
    return ProgressBar;
}(ui.view.ProgressViewUI));
//# sourceMappingURL=ProgressView.js.map
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
 *  游戏框架入口
 *  实现了：
 *      1.界面大小定义及适配
 *      2.登录
 *      3.缓存读取
 *      4.云开发初始
 *      5.资源加载
 *
 */
var Browser = Laya.Browser;
var WebGL = Laya.WebGL;
//主程序入口类
var Game = /** @class */ (function () {
    function Game() {
        this.isWX = false;
        this.isIos = true;
        //是否点击了分享获得提示
        this.isShareTip = false;
        //是否分享获取大礼包
        this.isShareBonus = false;
        //是否点击了分享获得登陆奖励
        this.isShareLgBonus = false;
        //是否分享充值金币
        this.isShareCharge = false;
        //群分享ticket
        this.shareTicket = null;
        //是否登录
        this.isLogin = false;
        //是否加载完资源
        this.isLoadAssets = false;
        //onShow参数
        this.onShowRes = null;
        //onShow query
        this.QueryState = null;
        //链接用户ID
        this.uid = '';
        //设置是否开启通关奖励功能
        this.ifShowBonus = false;
        this.ifShowBanner = false;
        this.ifShowInter = false;
        this.showInterN = 3; //每次登陆后第四关才显示插屏
        this.showInterCount = 2; //每几关显示插屏
        this.passLevelsN = 0;
        //版本设置
        this.VersionSettings = {};
        this.tipMode = 4;
        this.tipN = 999;
        this.coinMode = 4;
        this.coinN = 999;
        this.bonusMode = 4;
        this.bonusN = 999;
        this.lgBonusMode = 4;
        this.lgBonusN = 999;
        this.tipArr = [1];
        this.coinArr = [1];
        this.bonusArr = [1];
        this.tipLevel = 30;
        this.tipMode1 = 5;
        this.tipN1 = 999;
        this.tipMode2 = 5;
        this.tipN2 = 999;
        this.coinLevel = 30;
        this.coinMode1 = 4;
        this.coinN1 = 999;
        this.coinMode2 = 3;
        this.coinN2 = 999;
        this.bonusLevel = 30;
        this.bonusMode1 = 4;
        this.bonusN1 = 999;
        this.bonusMode2 = 3;
        this.bonusN2 = 999;
        this.CoinNumMode = 0; //0表示固定金币数，1表示金币数随关卡变化
        this.CoinNumCount = 10; //金币随关卡变化每过CoinNumCount关变化，默认10
        this.BonusCount = 5; //过关奖励每过BonusCount关奖励一次,默认5
        this.BonusCoinNum = 20; //大礼包的金币个数
        this.BonusCoinRate = 2.0; //mode=1时，大礼包金币数与关卡的比例
        this.bonusGetTimes = 0; //本次登录期间的礼包领取次数
        //金币
        this.TipCoinRate = 1.0; //mode=1时，提示花费金币数与关卡的比例
        this.useTipCoinNum = 10; //提示一次需要的金币数量
        this.chargeCoinNum = 10; //一次充值的金币数
        this.coinNum = 0; //金币数量
        //分享图片
        this.SHARED_URL = 'subassets/share.jpg';
        this.SHARED_TITLE = "据说只有1%的人能过关，是你吗？";
        this.SHARED_PARAM = "";
        this.SHARED_IMG_ARR = [
            {
                "id": "P0",
                "url": "subassets/share.jpg",
                "t": "据说只有1%的人能过关，是你吗？",
                "p": "",
                "min": 0,
                "max": 1
            }
        ];
        //导流app
        this.ifShowOtherApp = false;
        this.GOTO_APPID = "";
        this.GOTO_APPNAME = '';
        this.GOTO_APPSKIN = '';
        this.GOTO_APPGIF = null;
        this.GOTO_APPPATH = '';
        this.GOTO_OTHER = 0;
        this.GOTO_QR = "";
        this.GOTO_APPID2 = "";
        this.GOTO_APPNAME2 = '';
        this.GOTO_APPSKIN2 = '';
        this.GOTO_APPGIF2 = null;
        this.GOTO_APPPATH2 = '';
        this.GOTO_OTHER2 = 0;
        this.GOTO_QR2 = "";
        this.GOTO_APPID3 = "";
        this.GOTO_APPNAME3 = '';
        this.GOTO_APPSKIN3 = '';
        this.GOTO_APPGIF3 = null;
        this.GOTO_APPPATH3 = '';
        this.GOTO_OTHER3 = 0;
        this.GOTO_QR3 = "";
        this.GOTO_APPID4 = "";
        this.GOTO_APPNAME4 = '';
        this.GOTO_APPSKIN4 = '';
        this.GOTO_APPGIF4 = null;
        this.GOTO_APPPATH4 = '';
        this.GOTO_OTHER4 = 0;
        this.GOTO_QR4 = "";
        this.gameFlowType = 4; //游戏页悬浮显示几个    
        this.GOTO_APP_ARRAY = NavigateAppArray;
        this.DRAWER_APP_ARRAY = NavigateAppArray;
        this.WAITING_APP_ARRAY = [];
        //当前登录用户
        this.userId = '';
        this.openId = '';
        this.nickName = '';
        this.avatarUrl = '';
        //用户level
        this.all_level = 0;
        //舞台参数
        this.scaleX = 1;
        this.scaleY = 1;
        this.screenWidth = 1080;
        this.pixelRatio = 1;
        //当前等级
        this.level = 1;
        //用户各等级level
        this.userLevel = null;
        this.levelcount = null;
        this.levelArr = null;
        //用户授权button
        this.userButton = null;
        //分享到群ID列表
        this.shareToGroupIdArr = [];
        //页面参数
        this.openDataContext = null;
        this.sharedCanvas = null;
        this.gameUi = null;
        this.passPage = null;
        this.tipShareTimes = 0;
        this.tipVideoTimes = 0;
        this.coinShareTimes = 0;
        this.coinVideoTimes = 0;
        this.bonusShareTimes = 0;
        this.bonusVideoTimes = 0;
        this.lgBonusShareTimes = 0;
        this.lgBonusVideoTimes = 0;
        //记录过关情况
        this.videoTip = 0;
        this.shareTip = 0;
        this.coinTip = 0;
        this.startTime = 0;
        this.costTime = 0;
        //底部导量，概率控制
        this.gameBottomModel = 0.5; //显示banner概率
        this.passBottomModel = 1;
        this.gameBottomAppType = 4; //底部导量类型
        //分享code
        this.shareCode = '';
        this.shareMoney = 0;
        this.shareMode = 1;
        this.shareUseTime = 4000;
        this.shareCancel = false;
        this.shareStartTime = 0;
        this.shareBackTime = 0;
        this.shareType = 0;
        this.shareQuery = '';
        this.nextChangeTime = 0; // 下一关导量项更新时间
        this.scene = 0;
        //过关页banner覆盖
        this.passBannerDelay = -1;
        this.passBtnDelay = 600;
        this.ifPopupBonus = false;
        //重复跳转模式
        this.repeatNavType = 0;
        this.navAppList = [];
        //取消跳转弹窗
        this.cancelBtnDelay = 2000;
        this.cancelLevel = 1;
        //自动弹出跳转
        this.autoNaviLevel = 300;
        this.goodIconList = [];
        this.goodIconLevel = 1;
        this.loginIconList = [];
        this.navi3Visible = false;
        this.navi3All = false;
        // 下一关导量顺序，1-下一关在前，2-pop框在前
        this.nextNaviOrderMode = 1;
        this.specChannelList = [];
        //初始化Laya
        Laya.MiniAdpter.init(true);
        console.log(VERSION);
        //尺寸调整
        if (typeof wx !== 'undefined') {
            this.isWX = true;
            wx.showLoading({
                title: '加载中...',
                mask: true
            });
            Browser.window.systemInfo = wx.getSystemInfoSync();
            var platform = Browser.window.systemInfo.platform;
            var model = Browser.window.systemInfo.model;
            //判断是不是ios平台
            if (platform && platform.indexOf('android') != -1) {
                this.isIos = false;
            }
            log('model:' + model);
            if (model.indexOf('iPhone X') !== -1) {
                ifIphoneX = true;
            }
        }
        //初始化云开发
        if (!Laya.Browser.window.wx.cloud) {
            log('请使用 2.2.3 或以上的基础库以使用云能力');
        }
        else {
            Laya.Browser.window.wx.cloud.init({
                env: ENV_ID,
                traceUser: true,
            });
        }
        // 获取本地数据
        this.getUserDataFromStorage();
        //初始化版本设置
        this.initVersionSettings();
        //加载laya
        this.loadLaya();
    }
    Game.prototype.getUserDataFromStorage = function () {
        log('Game Version: ' + VERSION);
        log('题目数量：' + allQuestionLen);
        //从本地缓存获取数据
        var tmp_level = wx.getStorageSync(ALL_LEVEL_KEY);
        if (tmp_level === '' || tmp_level === undefined || tmp_level === null) {
            //首次登陆或者本地无缓存，设置成0
            wx.setStorageSync(ALL_LEVEL_KEY, 0);
            this.all_level = 0;
        }
        else {
            this.all_level = Math.floor(tmp_level);
        }
        //获取本地金币数量
        var tmp_coin = wx.getStorageSync('CoinNum');
        if (tmp_coin === '' || tmp_coin === undefined || tmp_coin === null) {
            //本地无金币,初始10枚
            this.coinNum = 10;
        }
        else {
            this.coinNum = Math.floor(tmp_coin);
        }
        //获取openId
        var tmp_openId = wx.getStorageSync('openId');
        if (tmp_openId && tmp_openId != '' && tmp_openId != undefined && tmp_openId != null) {
            this.openId = tmp_openId;
        }
        log('openId:' + this.openId);
        // 获取channel
        var lauch = wx.getLaunchOptionsSync();
        userScene = lauch.scene;
        var channel = wx.getStorageSync('userChannel');
        if (lauch.query && lauch.query.channel) {
            //登录参数有channel
            userChannel = lauch.query.channel;
            wx.setStorageSync('userChannel', userChannel);
        }
        else {
            if (channel) {
                //本地有channel
                userChannel = channel;
            }
        }
        log('userChannel=' + userChannel);
        //获得跳转列表
        var current_date = currentDateString(); //'2020-2-3';
        var login_date = Laya.Browser.window.wx.getStorageSync(USER_LAST_LOGIN_DATE_KEY);
        if (login_date) {
            if (current_date != login_date) {
                Laya.Browser.window.wx.setStorageSync(USER_LAST_LOGIN_DATE_KEY, current_date);
            }
        }
        else {
            Laya.Browser.window.wx.setStorageSync(USER_LAST_LOGIN_DATE_KEY, current_date);
        }
    };
    /*
    * 1. 获取当前版本的功能设置
    */
    Game.prototype.initVersionSettings = function () {
        var that = this;
        //获取settings
        var db = Laya.Browser.window.wx.cloud.database();
        var docid = 'version_' + VERSION;
        db.collection('settings_block')
            .doc(docid)
            .get()
            .then(function (res) {
            log('getVersionSettings:');
            //获取设置后，再登录
            that.login();
        }).catch(function (e) {
            log(e);
            that.login();
            that.DRAWER_APP_ARRAY = NavigateAppArray;
            that.GOTO_APP_ARRAY = NavigateAppArray;
            ifGotAppList = true;
            // that.setOtherApp();
            that.setGameUiNavi();
            //设置定时更新导流app
            // Laya.timer.loop(1000 * 5, that, that.setOtherApp);
        });
    };
    Game.prototype.setSpecialSetting = function () {
    };
    /*
    * 2. 登录
    */
    Game.prototype.login = function () {
        log("================login================");
        log("userChannel = " + userChannel);
        log('openid=' + this.openId);
        var that = this;
        var channel = userChannel;
        /*  if (DEBUG) {
              channel = "test";
          }*/
        if (that.openId && that.openId.length > 8) {
            aldSendOpenId(channel, that.openId);
        }
        else {
            Laya.Browser.window.wx.cloud.callFunction({
                name: 'login'
            }).then(function (res) {
                log(res.result);
                if (res.result.data && res.result.data.length > 0) {
                    that.openId = res.result.data[0]._openid;
                    wx.setStorageSync('openId', that.openId);
                    log('openid: ' + that.openId);
                }
                aldSendOpenId(channel, that.openId);
            }).catch(function (err) {
                log(err);
            });
        }
    };
    /**
     * 3. Laya加载
     */
    Game.prototype.loadLaya = function () {
        //消除锯齿
        Laya.Config.isAntialias = true;
        //对话框设置
        Laya.UIConfig.closeDialogOnSide = false;
        //计算真实高度
        this.pixelRatio = Browser.window.systemInfo.pixelRatio;
        this.scaleX = Browser.window.systemInfo.screenWidth / 1080;
        this.scaleY = Browser.window.scaleX;
        this.screenWidth = Browser.window.systemInfo.screenWidth;
        SCREENHEIGHT = Math.floor(Browser.window.systemInfo.screenHeight / this.scaleX);
        log('scaleX:' + this.scaleX + ',screen width: ' + Browser.window.systemInfo.screenWidth + ', height: ' + Browser.window.systemInfo.screenHeight + ', HEIRHGT:' + SCREENHEIGHT);
        //初始化舞台
        Laya.init(1080, SCREENHEIGHT, WebGL);
        Laya.stage.bgColor = '';
        //最小宽度，竖屏，保持宽度
        Laya.stage.scaleMode = "fixedwidth";
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "middle";
        Laya.loader.retryNum = 0;
        var urls = ["res/atlas/comp.atlas"];
        //资源加载完成后，获取数据
        Laya.loader.load(urls, Laya.Handler.create(this, this.onAssetLoaded), Laya.Handler.create(this, this.onLoading), Laya.Loader.ATLAS);
        // 侦听加载失败
        Laya.loader.on(Laya.Event.ERROR, this, this.onError);
    };
    ;
    Game.prototype.onError = function (e) {
    };
    Game.prototype.onLoading = function (progress) {
    };
    Game.prototype.showLogin = function () {
        if (isLoadSubpackages && ifGotVersionSet) {
            if (game.loginIconList.length > 0 && game.specChannelList.length > 0 && userScene == 1037 && game.specChannelList.indexOf(userChannel) > -1) {
                game.updateWaitingNavAppList();
                var bottomItemArray = [];
                for (var i = 0; i < game.loginIconList.length; i++) {
                    var gameIcon = game.loginIconList[i];
                    for (var j = 0; j < game.WAITING_APP_ARRAY.length; j++) {
                        if (game.WAITING_APP_ARRAY[j].skin == gameIcon) {
                            var gameInfo = game.WAITING_APP_ARRAY[j];
                            var gameInfo1 = JSON.parse(JSON.stringify(gameInfo));
                            bottomItemArray.push(gameInfo1);
                            break;
                        }
                    }
                }
            }
        }
    };
    Game.prototype.onAssetLoaded = function () {
        wx.hideLoading();
        var that = this;
        log('加载游戏页');
        wxUtils.aldSendEventFunc('登录后加载游戏页', { 'level': '' + that.all_level });
        var loadPage = LoadPage.getSelf(function () {
            isLoadSubpackages = true;
            that.isLoadAssets = true;
            soundUtils.playBgMusic();
            if (that.all_level >= allQuestionLen) {
                that.initGame(that.all_level);
            }
            else {
                that.initGame(that.all_level + 1);
            }
            that.showLogin();
        });
        Laya.stage.addChild(loadPage);
        //检查小程序更新
        wxUtils.checkForUpdate();
    };
    //清空舞台
    Game.prototype.clearStage = function () {
        //隐藏banner
        wxUtils.hideBanner();
        if (!Laya.stage) {
            return;
        }
        try {
            if (this.gameUi) {
                Laya.stage.removeChild(this.gameUi);
                //如果有引导动画，也得移除
                this.gameUi.removeGif();
            }
        }
        catch (e) { //log('移除 gameUi 失败' + e); 
        }
        ;
        try {
            if (this.passPage)
                Laya.stage.removeChild(this.passPage);
        }
        catch (e) { //log('移除 passPage 失败' + e); 
        }
        ;
    };
    //初始化游戏界面
    Game.prototype.initGame = function (levelIndex) {
        //进入了游戏界面
        this.level = levelIndex;
        //计算当前等级及索引
        //从数组获得题目
        if (this.level > allQuestionLen) {
            log('出错了，题目没有那么多！');
            wx.showModal({
                title: '提示',
                content: '新的一波题目正在路上，马上就要发布了，您可以先玩下其他游戏！',
                confirmText: '好的',
                showCancel: false
            });
            this.level--;
            return;
        }
        //清空舞台
        this.clearStage();
        if (this.gameUi === null) {
            this.gameUi = new GameUI();
        }
        Laya.stage.addChild(this.gameUi);
        this.gameUi.initGameUi(levelIndex, false);
    };
    //刷新游戏界面
    Game.prototype.replayGame = function (levelIndex) {
        this.initGame(levelIndex);
    };
    //判断是否奖励
    Game.prototype.showBonus = function (level, score, starNum) {
        this.ifPopupBonus = false;
        // 保存用户数据
        syncUtils.saveUserData(level, score);
        //显示passpage
        this.showNext(score, starNum);
    };
    //显示passpage
    Game.prototype.showNext = function (score, starNum) {
        if (this.gameUi) {
            Laya.stage.removeChild(this.gameUi);
        }
        var timesec = game.costTime;
        Laya.stage.offAll();
        //播放音效
        if (this.passPage === null) {
            this.passPage = new PassPage();
        }
        var data = {
            level: game.all_level,
            timesec: timesec,
            score: score,
            starNum: starNum
        };
        game.passPage.setData(data);
        if (game.nextNaviOrderMode == 1) {
            game.passPage.setBannerNaviView();
            Laya.stage.addChild(game.passPage);
        }
    };
    //回到主页
    Game.prototype.goHome = function () {
        if (Laya.stage == null)
            return;
        //清空舞台
        wxUtils.hideBanner();
        this.clearStage();
        Laya.stage.removeChildren(0, Laya.stage.numChildren - 1);
        Laya.stage.offAll();
        log('加载游戏页');
        if (this.all_level >= allQuestionLen) {
            this.initGame(this.all_level);
        }
        else {
            this.initGame(this.all_level + 1);
        }
    };
    //更新跳转列表
    Game.prototype.updateHistoryNavAppList = function (appid) {
    };
    //更新当前可跳转的app列表
    Game.prototype.updateWaitingNavAppList = function () {
    };
    //设置游戏页导量
    Game.prototype.setGameUiNavi = function () {
    };
    return Game;
}());
//程序入口
var game = new Game();
/*
 * 4. Wx OnShow 入口
*/
wx.onShow(function (res) {
    game.onShowRes = res;
    game.shareTicket = res.shareTicket;
    game.QueryState = res.query.state;
    if (!game.userId) {
        game.userId = wx.getStorageSync('myUserId');
    }
    log('onShow:');
    log(res);
    var ifShareAward = (game.shareType === ShareState.TIP || game.shareType === ShareState.BONUS || game.shareType === ShareState.LGBONUS || game.shareType === ShareState.CHARGE || game.shareType === ShareState.MONEY || game.shareType === ShareState.DOUBLE);
    //判断分享模式
});
wx.onHide(function () {
    // syncUtils.syncUserData();
});
//# sourceMappingURL=Game.js.map
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
 *  微信小游戏 工具类
 *  主要功能：
 *      Banner展示
 *      插屏展示
 *      视频播放
 *      分享
 *
 */
/**
 * 7. 微信分享设置
 */
wx.showShareMenu({
    withShareTicket: false
});
wx.onShareAppMessage(function () {
    var tmp_query = 'uid=' + game.userId + '&state=' + ShareState.MENU;
    tmp_query += ('&img=P0&' + game.SHARED_PARAM);
    log('wxShare query:' + tmp_query);
    game.shareType = ShareState.MENU;
    game.shareQuery = tmp_query;
    return {
        query: tmp_query,
        title: game.SHARED_TITLE,
        imageUrl: game.SHARED_URL
    };
});
var wxUtils = /** @class */ (function () {
    function wxUtils() {
    }
    //看视频获取提示 
    wxUtils.showTipVideoAd = function (callBack) {
        log('showTipVideoAd onLoading=' + wxUtils.onLoading);
        if (wxUtils.onLoading)
            return; //如果正在加载视频则直接返回
        //创建广告
        wxUtils.onLoading = true;
        if (wxUtils.tipVideoAd == null) {
            wxUtils.tipVideoAd = wx.createRewardedVideoAd({
                adUnitId: 'adunit-e710f84840844d07'
            });
        }
        if (wxUtils.tipVideoAd != null) {
            wxUtils.tipVideoAd.load()
                .then(function () {
                //显示广告
                wxUtils.tipVideoAd.show().then(function () {
                    log('视频显示');
                    wxUtils.onLoading = false;
                });
                //静音背景音乐
                //Laya.SoundManager.stopSound(BG_MUSIC);
            })
                .catch(function (err) {
                //广告加载错误
                callBack(false);
                wxUtils.onLoading = false;
            });
            //添加回调
            wxUtils.tipVideoAd.onClose(function (status) {
                log('视频广告close回调');
                wxUtils.tipVideoAd.offClose();
                //播放背景音乐
                soundUtils.playBgMusic();
                if ((status && status.isEnded) || status === undefined) {
                    //正常播放结束
                    callBack(true);
                }
                else {
                    //播放未完成
                    wx.showModal({
                        title: '提示',
                        content: '视频未完整播放，无法获取提示！',
                        confirmText: '好的',
                        showCancel: false,
                    });
                }
            });
            wxUtils.tipVideoAd.onError(function (res) {
                log('tipVideoAd error:');
                log(res);
            });
        }
    };
    //显示游戏页面banner
    wxUtils.showGameBanner = function () {
        if (!game.ifShowBanner)
            return;
        if (wxUtils.gameBannerAd) {
            wxUtils.gameBannerAd.hide();
            wxUtils.gameBannerAd.destroy();
        }
        var tH = game.gameUi.btnTipLayout.y + game.gameUi.btnTipLayout.height;
        // log('Game Banner tH=' + tH);
        wxUtils.gameBannerAd = wx.createBannerAd({
            adUnitId: 'adunit-45e1a93752f4357d',
            style: {
                left: 0,
                top: tH * game.scaleX,
                width: Math.floor(0.8 * game.screenWidth),
                height: (SCREENHEIGHT - tH) * game.scaleX
            }
        });
        wxUtils.gameBannerAd.onResize(function (size) {
            var tmpHt = Browser.window.systemInfo.screenHeight - size.height - (ifIphoneX ? 20 : 0);
            var tmpWt = (game.screenWidth - size.width) / 2;
            if (tmpHt > tH * game.scaleX) {
                //高度够用
                wxUtils.gameBannerAd.style.top = tmpHt;
                wxUtils.gameBannerAd.style.left = tmpWt;
                wxUtils.gameBannerAd.show();
                wxUtils.aldSendEventFunc('广告加载成功-banner', {
                    'from': 'gameBanner'
                });
            }
            else {
                //尝试显示导量
                wxUtils.hideBanner();
                if (gameUiSelf && areaCon) { //非特殊区域时显示导量
                    gameUiSelf.showBottomAppList();
                }
            }
        });
        wxUtils.gameBannerAd.onError(function (res) {
            log(res);
            wxUtils.aldSendEventFunc('广告加载出错-banner', {
                'errCode': res.errCode,
                'errMsg': res.errMsg,
                'from': 'gameBanner'
            });
            //显示导量矩阵
            wxUtils.hideBanner();
            var ifShowNavi = (ifNaviCheckArea == false) || (ifNaviCheckArea && areaCon);
        });
    };
    //显示过关页面banner
    wxUtils.showNextBanner = function () {
        if (!game.ifShowBanner)
            return;
        if (wxUtils.nextBannerAd) {
            wxUtils.nextBannerAd.hide();
            wxUtils.nextBannerAd.destroy();
        }
        var tH = game.passPage.contentLayout.y + game.passPage.contentLayout.height;
        wxUtils.nextBannerAd = wx.createBannerAd({
            adUnitId: 'adunit-45e1a93752f4357d',
            style: {
                left: 0,
                top: tH * game.scaleX,
                width: game.screenWidth,
                height: (SCREENHEIGHT - tH) * game.scaleX
            }
        });
        wxUtils.nextBannerAd.onResize(function (size) {
            var tmpHt = Browser.window.systemInfo.screenHeight - size.height - (ifIphoneX ? 20 : 0);
            if (tmpHt > tH * game.scaleX) {
                //高度够用
                // wxUtils.nextBannerAd.style.top = tmpHt;
                wxUtils.nextBannerAd.show().then(function () {
                    wxUtils.aldSendEventFunc('广告加载成功-banner', {
                        'from': 'nextBanner'
                    });
                    ifLoadNextBanner = true;
                    if (game.passBannerDelay >= 0) {
                        //btn覆盖，60ms后上移btn
                        Laya.timer.once(game.passBannerDelay, game, function () {
                            var ty = game.passPage.btnNext.y - 300;
                            Laya.Tween.to(game.passPage.btnNext, { y: ty }, 300, Laya.Ease.linearNone);
                        });
                    }
                });
                ;
            }
        });
        wxUtils.nextBannerAd.onError(function (res) {
            log(res);
            wxUtils.aldSendEventFunc('广告加载出错-banner', {
                'errCode': res.errCode,
                'errMsg': res.errMsg,
                'from': 'nextBanner'
            });
        });
    };
    wxUtils.showPopBanner = function () {
        if (!game.ifShowBanner)
            return;
        if (wxUtils.popBannerAd) {
            wxUtils.popBannerAd.hide();
            wxUtils.popBannerAd.destroy();
        }
        var tH = 1760 + IPHONEX_TOP;
        wxUtils.popBannerAd = wx.createBannerAd({
            adUnitId: 'adunit-45e1a93752f4357d',
            style: {
                left: 0,
                top: tH * game.scaleX,
                width: 300
            }
        });
        wxUtils.popBannerAd.onResize(function (size) {
            var tmpHt = Browser.window.systemInfo.screenHeight - size.height - (ifIphoneX ? 20 : 0);
            var tmpWt = (game.screenWidth - size.width) / 2;
            if (tmpHt > tH * game.scaleX) {
                //高度够用
                // wxUtils.popBannerAd.style.top = tmpHt;
                wxUtils.popBannerAd.style.left = tmpWt;
                wxUtils.popBannerAd.show().then(function () {
                    wxUtils.aldSendEventFunc('广告加载成功-banner', {
                        'from': 'popBanner'
                    });
                    // ifLoadNextBanner = true;
                });
            }
            else {
                console.error("banner too high, don't show.");
            }
        });
        wxUtils.popBannerAd.onError(function (res) {
            log(res);
            wxUtils.aldSendEventFunc('广告加载出错-banner', {
                'errCode': res.errCode,
                'errMsg': res.errMsg,
                'from': 'popBanner'
            });
        });
    };
    wxUtils.showInterAd = function () {
        if (game.ifShowInter == false)
            return;
        var curTime = (new Date()).getTime();
        // log('加载插屏广告：' + curTime);
        loadInterAdStatus = 1;
        wxUtils.aldSendEventFunc('加载插屏广告', {});
        if (wxUtils.interstitialAd == null) {
            // 创建插屏广告
            if (typeof Laya.Browser.window.wx.createInterstitialAd === 'function') {
                wxUtils.interstitialAd = Laya.Browser.window.wx.createInterstitialAd({
                    adUnitId: 'adunit-8f5d7dbc5705e720'
                });
            }
        }
        if (wxUtils.interstitialAd) {
            if (loadInterAdStatus == 1) {
                // log('准备显示插屏：' + ((new Date()).getTime() - curTime))
                wxUtils.interstitialAd.show().then(function () {
                    var dtime = ((new Date()).getTime() - curTime);
                    log('插屏广告显示: dtime=' + dtime + ',loadInterAdStatus=' + loadInterAdStatus);
                    wxUtils.aldSendEventFunc('插屏广告显示', { 'status': loadInterAdStatus, 'dtime': dtime });
                    loadInterAdStatus = 2;
                }).catch(function (err) {
                    var dtime = ((new Date()).getTime() - curTime);
                    log('插屏广告出错: dtime=' + dtime);
                    log(err);
                    loadInterAdStatus = 3;
                    wxUtils.aldSendEventFunc('插屏广告出错', { 'status': loadInterAdStatus, 'dtime': dtime });
                });
            }
            else {
                log('已经显示过关页面了');
            }
            //添加回调
            wxUtils.interstitialAd.onClose(function () {
                log('插屏广告close回调');
                wxUtils.interstitialAd.offClose();
                //关闭插屏后显示下一关
                var gameIndex = Laya.stage.getChildIndex(game.gameUi);
                if (gameIndex >= 0) {
                    //在游戏页面
                    game.showBonus(game.level, 0, 3);
                }
            });
        }
    };
    //隐藏banner
    wxUtils.hideBanner = function () {
        if (wxUtils.gameBannerAd) {
            wxUtils.gameBannerAd.hide();
            wxUtils.gameBannerAd.destroy();
        }
        if (wxUtils.nextBannerAd) {
            wxUtils.nextBannerAd.hide();
            wxUtils.nextBannerAd.destroy();
        }
        if (wxUtils.popBannerAd) {
            wxUtils.popBannerAd.hide();
            wxUtils.popBannerAd.destroy();
        }
    };
    //ald事件统计
    wxUtils.aldSendEventFunc = function (name, obj) {
        var spEventNames = [];
        if (ALD_ON) {
            if (typeof Laya.Browser.window.wx.aldSendEvent === 'function') {
                if (spEventNames.indexOf(name) == -1) {
                    // Laya.Browser.window.wx.aldSendEvent(name);
                }
                else {
                    // 添加channel
                    obj['channel'] = userChannel;
                    Laya.Browser.window.wx.aldSendEvent(name, obj);
                }
            }
        }
    };
    /**
     * 检查版本更新
     */
    wxUtils.checkForUpdate = function () {
        if (typeof Laya.Browser.window.wx.getUpdateManager === 'function') {
            var updateManager_1 = Laya.Browser.window.wx.getUpdateManager();
            updateManager_1.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                log("版本更新信息：");
                log(res.hasUpdate);
            });
            updateManager_1.onUpdateReady(function () {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                Laya.Browser.window.wx.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启以使用？',
                    cancelText: "知道了",
                    confirmText: "重启",
                    success: function (res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager_1.applyUpdate();
                        }
                        else {
                        }
                    }
                });
            });
        }
    };
    /**
         * 设置 gif 动图播放
         * @param obj 图片对象
         * @param total 总图片数
         * @param path 图片地址
         * @param delay 两帧之间的时间间隔
         * @param gap 一个循环结束后是否停顿
         */
    wxUtils.setGIF = function (obj, total, path, delay, gap) {
        if (gap === void 0) { gap = true; }
        Laya.timer.clearAll(obj);
        var indx = 0;
        Laya.timer.loop(delay, obj, loopImage);
        function loopImage() {
            var idx = indx;
            if (gap == true) {
                if (indx >= 2 * total) {
                    indx = 0;
                    idx = 0;
                }
                else if (indx >= total) {
                    idx = total - 1;
                }
            }
            else {
                if (indx >= total) {
                    indx = 0;
                    idx = 0;
                }
            }
            obj.skin = path + idx + ".jpg";
            indx += 1;
        }
    };
    wxUtils.tipVideoAd = null;
    wxUtils.onLoading = false;
    wxUtils.gameBannerAd = null;
    wxUtils.nextBannerAd = null;
    wxUtils.popBannerAd = null;
    // 定义插屏广告
    wxUtils.interstitialAd = null;
    return wxUtils;
}());
//# sourceMappingURL=wxUtils.js.map