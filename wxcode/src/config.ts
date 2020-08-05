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
const DEBUG = false;
//版本号
const VERSION = '0_0_1';
const APP_CNAME = '';
const APP_ENAME = '';
const APPID = '	';
const BASE_URL = "";
//云开发id
const ENV_ID = "";

var SCREENHEIGHT = 1920;
var appListHeight = 1550;
//正常状态
const STATE_NORMAL = 1;
//当前选中状态
const STATE_SELECTED = 2;
//锁定状态
const STATE_LOCKED = 3;
//奖励状态
const STATE_BONUS = 4;

//主页打开提示币对话框
const CHARGE_DIALOG_HOME = 1;
//游戏中打开提示币对话框
const CHARGE_DIALOG_GAME = 2;
//获取金币数量
const HELP_COIN_NUM = 3;

//方块间隙调整阈值
const GAME_BANNER_HEIGHT = 100;

//iphoneX下移距离
const IPHONEX_TOP = 130;
const LARGE_PHONE_H = 2000;
//切换页面:PassPage
const PAGE_PASS = 1;
const WX_SHARE_KEY = 'sharedContent';

const ALL_LEVEL_KEY = "all_level_" + APP_ENAME;

//微信解密接口
const WXINFOPATH = '';
const APPNAME = '';

//每个level题目数量
const LEVEL_SCORE_STR = 'levelScoreStr'
var levelScoreObj = {};

// 分享
const ShareState = {
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
}

// 是否统计ald
var ALD_ON = true;
// 是否开启ald分享
var ALD_SHARE_ON = true;

//开放域数据key
const openDataKey = 'level';

const runPkAppid = 'wx0df340653291122c';

//用户信息button
var userButton = null;

//channel
var userChannel: string = '';
var userScene: number = 0;

//level name
const LEVEL_NAME_ARR = [
	"新手",
	"初级",
	"中级",
	"高级",
	"专家",
	"大师"
];

var QUES = [];

var ifIphoneX: boolean = false;

var QINIU_ICON_PATH = "";
var SUB_ICON_PATH = "icon/";
var ICON_PATH = "";

// 是否加载完分包资源
var isLoadSubpackages: boolean = false;

var ifGotVersionSet: boolean = false;
var ifGotAppList: boolean = false;

var ifLoadNextBanner: boolean = false;

var ifGotArea: boolean = false;
var ifCheckArea: boolean = true;
var ifLimitArea: boolean = true;
var areaCon: boolean = false;
var ifNaviCheckArea: boolean = true;

var rN = 10;

var loadInterAdStatus: number = 0; //0:不显示, 1：显示中， 2：显示成功， 3：显示失败

var ifNextAppList: boolean = false;

//channel过滤参数
var channelFilter = { "default": 1 };

var LEVEL_STARS_ARR: any = [];

function aldSendOpenId(channel: string, openid: string) {
	log("=========aldSendOpenId   channel:" + channel + ",openid:" + openid);

}

/**
 * 用户上一次登录日期
 */
var lastLoginDate: string = null;
const USER_LAST_LOGIN_DATE_KEY: string = "USER_LAST_LOGIN_DATE";
/**
 * 当日跳转列表
 */
var dailyNavigateList: Array<string> = [];
const USER_DAILY_NAVIGATION_APPID_LIST_KEY: string = "USER_DAILY_NAVIGATION_APPID_LIST";
/**
 * 历史跳转列表
 */
var allNavigateList: Array<string> = [];
const USER_ALL_NAVIGATION_APPID_LIST_KEY: string = "USER_ALL_NAVIGATION_APPID_LIST";

/**
 * 当日日期
 */
function currentDateString(): string {
	var current = new Date();
	var current_date = current.getFullYear() + "-" + current.getMonth() + "-" + current.getDate();
	return current_date;
}

function getSkinStr(skin: string): string {
	if (skin.indexOf('?') > -1) {
		let idx = skin.indexOf('?');
		let tidx = skin.indexOf('icon/');
		let sidx = (tidx > -1) ? tidx : (idx - 16);
		return skin.substring(sidx, idx);
	}
	else {
		return skin;
	}
}

//默认导量数组
var NavigateAppArray: any = [];