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
        this.ifShowBonus = false;
        this.ifShowBanner = true;
        this.ifShowInter = true;
        this.showInterN = 0; //每次登陆后第四关才显示插屏
        this.showInterCount = 1; //每几关显示插屏
        this.passLevelsN = 0;
        //版本设置
        this.VersionSettings = {};
        this.tipMode = 3;
        this.tipN = 999;
        this.tipArr = [1];
        this.tipLevel = 5;
        this.tipMode1 = 5;
        this.tipN1 = 2;
        this.tipMode2 = 3;
        this.tipN2 = 2;
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
        //分享到群ID列表
        this.shareToGroupIdArr = [];
        //页面参数
        this.openDataContext = null;
        this.sharedCanvas = null;
        this.gameUi = null;
        this.passPage = null;
        //分享+视频云控
        this.tipShareTimes = 0;
        this.tipVideoTimes = 0;
        //底部导量，概率控制
        this.gameBottomModel = 0.5; //显示banner概率
        this.passBottomModel = 1;
        this.gameBottomAppType = 4; //底部导量类型
        //分享code
        this.shareCode = '';
        this.shareMoney = 0;
        this.shareMode = 1; //分享模式控制: 0:分享后点击，1：分享看取消事件
        this.shareUseTime = 4000; //分享时间限制3s
        this.shareCancel = false;
        this.shareStartTime = 0;
        this.shareBackTime = 0;
        this.shareType = 0;
        this.shareQuery = '';
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
        this.autoNaviLevel = 9999;
        this.goodIconList = [];
        this.goodIconLevel = 1;
        this.nextChangeTime = 4000; // 下一关导量项更新时间
        this.navi3Visible = true;
        this.navi3Banner = false;
        // 下一关导量顺序，1-下一关在前，2-pop框在前
        this.nextNaviOrderMode = 2;
        this.gridAdShowArr = [1, 1]; //是否显示格子广告 
        this.NAVI_COUNT = 40;
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
        //统一迁移到webuzz接口
        //初始化云开发
        // if (!Laya.Browser.window.wx.cloud) {
        //     log('请使用 2.2.3 或以上的基础库以使用云能力');
        // } else {
        //     Laya.Browser.window.wx.cloud.init({
        //         env: 'brainout-9oq7t',
        //         traceUser: true,
        //     });
        // }
        // 获取本地数据
        this.getUserDataFromStorage();
        //初始化版本设置
        this.initVersionSettings();
        //加载laya
        this.loadLaya();
        this.getArSetting();
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
        //获取openId
        var tmp_openId = wx.getStorageSync('openId');
        if (tmp_openId && tmp_openId != '' && tmp_openId != undefined && tmp_openId != null) {
            this.openId = tmp_openId;
        }
        log('openId:' + this.openId);
        //自定义事件
        if (tmp_openId && tmp_openId.length > 8) {
            newUser = false;
        }
        else {
            newUser = true;
        }
        // 获取channel
        var lauch = wx.getLaunchOptionsSync();
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
            else {
                //自定义事件
                userChannel = "null";
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
        // 生涯跳转列表
        var all_nav_list = Laya.Browser.window.wx.getStorageSync(USER_ALL_NAVIGATION_APPID_LIST_KEY);
        if (all_nav_list) {
            allNavigateList = JSON.parse(all_nav_list);
        }
        else {
            allNavigateList = [];
        }
        // 当日跳转列表
        if (login_date != current_date) {
            dailyNavigateList = [];
            Laya.Browser.window.wx.setStorageSync(USER_DAILY_NAVIGATION_APPID_LIST_KEY, JSON.stringify(dailyNavigateList));
        }
        else {
            var daily_nav_list = Laya.Browser.window.wx.getStorageSync(USER_DAILY_NAVIGATION_APPID_LIST_KEY);
            if (daily_nav_list) {
                dailyNavigateList = JSON.parse(daily_nav_list);
            }
            else {
                dailyNavigateList = [];
                Laya.Browser.window.wx.setStorageSync(USER_DAILY_NAVIGATION_APPID_LIST_KEY, JSON.stringify(dailyNavigateList));
            }
        }
    };
    /*
    * 1. 获取当前版本的功能设置
    */
    //统一迁移到webuzz接口
    Game.prototype.initVersionSettings = function () {
        var that = this;
        //获取settings
        wx.request({
            url: 'https://www.xxx.com',
            data: {
                appid: APPID,
                version: VERSION
            },
            method: "POST",
            success: function (obj) {
                log(obj.data);
                if (obj.data.code == 1) {
                    if (obj.data.data) {
                        that.DRAWER_APP_ARRAY = obj.data.data;
                        that.GOTO_APP_ARRAY = obj.data.data;
                        ifGotAppList = true;
                        that.setGameUiNavi();
                    }
                    else {
                        that.DRAWER_APP_ARRAY = NavigateAppArray;
                        that.GOTO_APP_ARRAY = NavigateAppArray;
                        ifGotAppList = true;
                        that.setGameUiNavi();
                    }
                    log("get cloud navi setting");
                    // 注意，如此时游戏页顶部导流视图已显示，需更新导流视图内容
                    var settings = obj.data.setting;
                    if (settings) {
                        log(settings);
                        game.VersionSettings = settings;
                        ifGotVersionSet = true;
                        if (settings.channelFilter !== undefined) {
                            channelFilter = settings.channelFilter;
                        }
                        if (settings.ifShowBonus !== undefined) {
                            game.ifShowBonus = settings.ifShowBonus;
                        }
                        //导流appId
                        if (settings.ifShowOtherApp !== undefined) {
                            game.ifShowOtherApp = settings.ifShowOtherApp;
                        }
                        if (settings.ifShowBanner !== undefined) {
                            game.ifShowBanner = settings.ifShowBanner;
                        }
                        //
                        if (settings.tipLevel !== undefined) {
                            game.tipLevel = settings.tipLevel;
                        }
                        if (settings.tipMode1 !== undefined) {
                            game.tipMode1 = settings.tipMode1;
                        }
                        if (settings.tipN1 !== undefined) {
                            game.tipN1 = settings.tipN1;
                        }
                        if (settings.tipMode2 !== undefined) {
                            game.tipMode2 = settings.tipMode2;
                        }
                        if (settings.tipN2 !== undefined) {
                            game.tipN2 = settings.tipN2;
                        }
                        if (settings.tipArr !== undefined) {
                            game.tipArr = settings.tipArr;
                        }
                        if (settings.gameBottomModel !== undefined) {
                            game.gameBottomModel = settings.gameBottomModel;
                        }
                        if (settings.passBottomModel !== undefined) {
                            game.passBottomModel = settings.passBottomModel;
                        }
                        if (settings.gameBottomAppType !== undefined) {
                            game.gameBottomAppType = settings.gameBottomAppType;
                        }
                        if (settings.shareMode !== undefined) {
                            game.shareMode = settings.shareMode;
                        }
                        if (settings.shareUseTime !== undefined) {
                            game.shareUseTime = settings.shareUseTime;
                        }
                        //ald统计开关
                        if (settings.ALD_ON !== undefined) {
                            ALD_ON = settings.ALD_ON;
                        }
                        if (settings.ALD_SHARE_ON !== undefined) {
                            ALD_SHARE_ON = settings.ALD_SHARE_ON;
                        }
                        // 
                        if (settings.passBannerDelay !== undefined) {
                            game.passBannerDelay = settings.passBannerDelay;
                        }
                        if (settings.passBtnDelay !== undefined) {
                            game.passBtnDelay = settings.passBtnDelay;
                        }
                        if (settings.ifCheckArea !== undefined) {
                            ifCheckArea = settings.ifCheckArea;
                        }
                        if (settings.ifNaviCheckArea !== undefined) {
                            ifNaviCheckArea = settings.ifNaviCheckArea;
                        }
                        //是否显示插屏
                        if (settings.ifShowInter !== undefined) {
                            game.ifShowInter = settings.ifShowInter;
                        }
                        if (settings.showInterN !== undefined) {
                            game.showInterN = settings.showInterN;
                        }
                        if (settings.showInterCount !== undefined) {
                            game.showInterCount = settings.showInterCount;
                        }
                        //重复跳转模式
                        if (settings.repeatNavType !== undefined) {
                            game.repeatNavType = settings.repeatNavType;
                        }
                        if (settings.cancelBtnDelay !== undefined) {
                            game.cancelBtnDelay = settings.cancelBtnDelay;
                        }
                        if (settings.cancelLevel !== undefined) {
                            game.cancelLevel = settings.cancelLevel;
                        }
                        if (settings.autoNaviLevel !== undefined) {
                            game.autoNaviLevel = settings.autoNaviLevel;
                        }
                        if (settings.goodIconList !== undefined) {
                            game.goodIconList = settings.goodIconList;
                        }
                        if (settings.goodIconLevel !== undefined) {
                            game.goodIconLevel = settings.goodIconLevel;
                        }
                        if (settings.navi3Visible !== undefined) {
                            game.navi3Visible = settings.navi3Visible;
                        }
                        if (settings.navi3Banner !== undefined) {
                            game.navi3Banner = settings.navi3Banner;
                        }
                        if (settings.nextNaviOrderMode !== undefined) {
                            game.nextNaviOrderMode = settings.nextNaviOrderMode;
                        }
                        if (settings.nextChangeTime !== undefined) {
                            game.nextChangeTime = settings.nextChangeTime;
                        }
                        // 格子广告显示
                        if (settings.gridAdShowArr !== undefined) {
                            game.gridAdShowArr = settings.gridAdShowArr;
                        }
                        if (settings.naviCount !== undefined) {
                            game.NAVI_COUNT = settings.naviCount;
                        }
                        if (settings.strategy !== undefined) {
                            userStrategy = settings.strategy;
                        }
                        game.setSpecialSetting();
                    }
                }
                //获取设置后再登录
                that.login();
            },
            fail: function (error) {
                //获取设置后再登录
                that.login();
                that.DRAWER_APP_ARRAY = NavigateAppArray;
                that.GOTO_APP_ARRAY = NavigateAppArray;
                ifGotAppList = true;
                that.setGameUiNavi();
            }
        });
    };
    Game.prototype.getArSetting = function () {
        //获取导流app列表
        var that = this;
        wx.request({
            url: "https://xxx.com",
            dataType: 'json',
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                log(res.data);
                if (res.data.state >= 0) {
                    ifLimitArea = res.data.data.cityLimit && res.data.data.hourLimit;
                }
                ifGotArea = true;
                that.setSpecialSetting();
                that.setGameUiNavi();
            },
            fail: function (err) {
                ifGotArea = true;
                ifLimitArea = true;
                that.setSpecialSetting();
                that.setGameUiNavi();
                log(err);
            }
        });
    };
    Game.prototype.setSpecialSetting = function () {
        if (ifGotVersionSet && ifGotArea) {
            areaCon = (ifCheckArea == false) || (ifCheckArea == true && ifLimitArea == false);
            if (areaCon == false) {
                game.passBannerDelay = -1;
            }
        }
        return;
    };
    /*
    * 2. 登录
    */
    //统一迁移到webuzz接口
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
            wxUtils.aldSendEventFunc('登录后加载游戏页', {});
        }
        else {
            wx.login({
                success: function (res) {
                    if (res.code) {
                        //发起网络请求
                        wx.request({
                            url: 'https://xxx.com',
                            data: {
                                code: res.code,
                                appid: APPID
                            },
                            method: 'POST',
                            success: function (obj) {
                                log("openid done.");
                                log(obj);
                                that.openId = obj.data.data;
                                // 缓存用户openid
                                wx.setStorageSync('openId', that.openId);
                                aldSendOpenId(channel, that.openId);
                                wxUtils.aldSendEventFunc('登录后加载游戏页', {});
                            },
                            fail: function (error) {
                                log(error);
                                wxUtils.aldSendEventFunc('登录后加载游戏页', {});
                            }
                        });
                    }
                    else {
                        log('登录失败！' + res.errMsg);
                        wxUtils.aldSendEventFunc('登录后加载游戏页', {});
                    }
                },
                fail: function (err) {
                    log('登录失败！' + err.errMsg);
                    wxUtils.aldSendEventFunc('登录后加载游戏页', {});
                }
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
    Game.prototype.onAssetLoaded = function () {
        wx.hideLoading();
        var that = this;
        log('加载游戏页');
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
            //加载其他分包
            that.loadOtherLevel(1);
        });
        Laya.stage.addChild(loadPage);
        //检查小程序更新
        wxUtils.checkForUpdate();
    };
    Game.prototype.loadOtherLevel = function (grade) {
        var thiz = game;
        loadSubLevel(grade, function (grade) {
            if (grade >= 5) {
                return;
            }
            thiz.loadOtherLevel(grade + 1);
        });
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
            }
        }
        catch (e) {
        }
        ;
        try {
            if (this.passPage)
                Laya.stage.removeChild(this.passPage);
        }
        catch (e) {
        }
        ;
    };
    //初始化游戏界面
    Game.prototype.initGame = function (levelIndex) {
        //进入了游戏界面
        this.level = levelIndex;
        if (this.level > allQuestionLen) {
            log('出错了，题目没有那么多！');
            wx.showModal({
                title: '提示',
                content: '新的一波题目正在路上，马上就要发布了，您可以先玩下其他游戏！',
                confirmText: '好的',
                showCancel: false,
                success: function (callBack) {
                    if (callBack.confirm) {
                        //跳转到导量
                        appListDialog.getSelf().setData("game-pass");
                    }
                }
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
        this.gameUi.initGameUi(levelIndex);
    };
    //刷新游戏界面
    Game.prototype.replayGame = function (levelIndex) {
        this.initGame(levelIndex);
    };
    //显示passpage
    Game.prototype.showNext = function (level, score, starNum) {
        this.ifPopupBonus = false;
        syncUtils.saveUserData(level, score);
        if (this.gameUi) {
            // log('remove gameui')
            this.gameUi.layout.removeChild(this.gameUi.gameView);
            Laya.stage.removeChild(this.gameUi);
        }
        Laya.stage.offAll();
        //播放音效
        if (this.passPage === null) {
            this.passPage = new PassPage();
        }
        var data = {
            level: game.all_level,
            score: score,
            starNum: starNum
        };
        game.passPage.setData(data);
        if (game.nextNaviOrderMode == 1) {
            game.passPage.setupBannerNavi();
            Laya.stage.addChild(game.passPage);
        }
        else {
            var ifShowNavi = (ifNaviCheckArea == false) || (ifNaviCheckArea && areaCon);
            game.updateWaitingNavAppList();
            if (ifShowNavi && game.WAITING_APP_ARRAY != null && game.WAITING_APP_ARRAY.length > 0) {
                wxUtils.aldSendEventFunc('取消跳转-弹出导量框', { 'from': 'passpage' });
                appListDialog.getSelf().setData("dialog-next");
                ifNextAppList = true;
            }
            else {
                game.passPage.setupBannerNavi();
                Laya.stage.addChild(game.passPage);
            }
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
        if (dailyNavigateList.indexOf(appid) == -1) {
            dailyNavigateList.push(appid);
            Laya.Browser.window.wx.setStorageSync(USER_DAILY_NAVIGATION_APPID_LIST_KEY, JSON.stringify(dailyNavigateList));
        }
        if (allNavigateList.indexOf(appid) == -1) {
            allNavigateList.push(appid);
            Laya.Browser.window.wx.setStorageSync(USER_ALL_NAVIGATION_APPID_LIST_KEY, JSON.stringify(allNavigateList));
        }
    };
    //更新当前可跳转的app列表
    Game.prototype.updateWaitingNavAppList = function () {
        if (game.GOTO_APP_ARRAY != null && game.GOTO_APP_ARRAY.length > 0) {
            //剔除已跳转的
            game.WAITING_APP_ARRAY = [];
            for (var i = 0; i < game.GOTO_APP_ARRAY.length; i++) {
                var app = game.GOTO_APP_ARRAY[i];
                //统一迁移到webuzz接口
                if ((app.filter == 1 && dailyNavigateList.indexOf(app.appid) > -1)
                    || (app.filter == 2 && allNavigateList.indexOf(app.appid) > -1)) {
                    continue;
                }
                //未跳转的
                game.WAITING_APP_ARRAY.push(app);
            }
        }
    };
    //设置游戏页导量
    Game.prototype.setGameUiNavi = function () {
        if (ifGotAppList && ifGotArea && this.gameUi) {
            // 底部导量
            if (this.gameBottomModel < 0) {
                //什么都不显示
                wxUtils.hideBanner();
                this.gameUi.bottomApp.visible = false;
            }
            else {
                var tmpBoRd = Math.random();
                log('gameBottomModel=' + this.gameBottomModel + ',tmpBoRd=' + tmpBoRd);
                if (tmpBoRd < this.gameBottomModel) {
                    //显示banner
                    wxUtils.showGameBanner();
                    this.gameUi.bottomApp.visible = false;
                }
                else {
                    //显示导量矩阵
                    wxUtils.hideBanner();
                    this.gameUi.showBottomAppList();
                }
            }
            // wxUtils.showGameBanner();
            // 顶部导量
            this.gameUi.showTopAppList();
            // 游戏页格子广告
            if (this.gridAdShowArr[0] == 1 && this.level > 3) {
                wxUtils.showGamePageGridAd();
            }
        }
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
    var ifShareAward = (game.shareType === ShareState.TIP);
    //判断分享模式
    if (game.shareMode === 0) {
        //分享后去点链接模式
    }
    else if (game.shareMode === 1 && game.shareStartTime > 0 && ifShareAward) {
        // 直接分享模式
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        game.shareBackTime = (new Date()).getTime();
        var tmpShareUseTime = game.shareBackTime - game.shareStartTime;
        //延时判断是否有取消或超时
        Laya.timer.once(1000, game, function () {
            wx.hideLoading();
            log('判断是否有取消分享：' + game.shareCancel + ',分享用时：' + tmpShareUseTime + ',分享用时阈值：' + game.shareUseTime);
            if (game.shareCancel || (tmpShareUseTime < game.shareUseTime)) {
                // 取消分享或者分享用时太短，提示分享失败
                wxUtils.aldSendEventFunc('取消分享或用时太短', { 'detail': '' + game.shareType + '-' + game.userId + '-' + tmpShareUseTime });
                wx.showModal({
                    title: '温馨提示',
                    content: '分享失败，请分享到不同群',
                    showCancel: true,
                    cancelText: '取消',
                    confirmText: '确定',
                    success: function (callBack) {
                        if (callBack.confirm) {
                            SharedUtils.wxShareFunc(game.shareType, game.shareQuery);
                        }
                        else if (callBack.cancel) {
                        }
                    }
                });
            }
            else {
                //分享成功，直接获利
                wxUtils.aldSendEventFunc('直接分享判断成功', { 'detail': '' + game.shareType + '-' + game.userId + '-' + tmpShareUseTime });
                log('shareType=' + game.shareType + ',shareQuery=' + game.shareQuery);
                if (game.shareType === ShareState.TIP) {
                    wxUtils.aldSendEventFunc('免费提示直接分享并获得提示', { 'level': '' + game.level });
                    //获得提示
                    wx.showToast({
                        title: '获得提示',
                        icon: 'success',
                        duration: 500,
                        mask: true,
                    });
                    gameUiSelf.showTipFunc();
                    game.tipShareTimes += 1;
                }
            }
            //重置参数
            game.shareCancel = false;
            game.shareStartTime = 0;
            game.shareBackTime = 0;
        });
    }
    //判断是否从其它小程序跳转过来
    if (res.referrerInfo && res.referrerInfo.appId && res.scene && res.scene == 1037) {
        var fromAppId = res.referrerInfo.appId;
        //更新跳转列表
        if (allNavigateList.indexOf(fromAppId) == -1) {
            allNavigateList.push(fromAppId);
        }
        //判断是否带跳转列表过来 
        if (res.referrerInfo.extraData && res.referrerInfo.extraData.type === 'navi' && res.referrerInfo.extraData.list) {
            var other_list = JSON.parse(res.referrerInfo.extraData.list);
            log('other_list:');
            log(other_list);
            //更新跳转列表
            for (var i = 0; i < other_list.length; i++) {
                var tappid = other_list[i];
                if (allNavigateList.indexOf(tappid) == -1) {
                    allNavigateList.push(tappid);
                }
            }
        }
        Laya.Browser.window.wx.setStorageSync(USER_ALL_NAVIGATION_APPID_LIST_KEY, JSON.stringify(allNavigateList));
        log('从其它小程序跳转过来：fromAppId=' + fromAppId);
        wxUtils.aldSendEventFunc('从其它小程序跳转过来', { 'fromApp': fromAppId });
    }
    //记录分享图点击
    if (res && res.query && res.query.img) {
        log('点击分享图：' + res.query.img);
        wxUtils.aldSendEventFunc('点击分享图', { 'detail': res.query.img });
    }
});
wx.onHide(function () {
    // syncUtils.syncUserData();
});
//# sourceMappingURL=Game.js.map