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