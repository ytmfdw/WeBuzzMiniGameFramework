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


import Browser = Laya.Browser;
import WebGL = Laya.WebGL;

//主程序入口类
class Game {
    public isWX: boolean = false;
    public isIos: boolean = true;
    //是否点击了分享获得提示
    public isShareTip: boolean = false;
    //是否分享获取大礼包
    public isShareBonus: boolean = false;
    //是否点击了分享获得登陆奖励
    public isShareLgBonus: boolean = false;
    //是否分享充值金币
    public isShareCharge: boolean = false;
    //群分享ticket
    public shareTicket: any = null;
    //是否登录
    public isLogin: boolean = false;
    //是否加载完资源
    public isLoadAssets: boolean = false;
    //onShow参数
    public onShowRes: any = null;
    //onShow query
    public QueryState: any = null;
    //链接用户ID
    public uid: string = '';
    //设置是否开启通关奖励功能
    public ifShowBonus: boolean = false;
    public ifShowBanner: boolean = false;
    public ifShowInter: boolean = false;
    public showInterN: number = 3; //每次登陆后第四关才显示插屏
    public showInterCount: number = 2; //每几关显示插屏
    public passLevelsN: number = 0;
    //版本设置
    public VersionSettings: any = {};
    public tipMode: number = 4;
    public tipN: number = 999;
    public coinMode: number = 4;
    public coinN: number = 999;
    public bonusMode: number = 4;
    public bonusN: number = 999;
    public lgBonusMode: number = 4;
    public lgBonusN: number = 999;
    public tipArr: any = [1];
    public coinArr: any = [1];
    public bonusArr: any = [1];

    public tipLevel: number = 30;
    public tipMode1: number = 5;
    public tipN1: number = 999;
    public tipMode2: number = 5;
    public tipN2: number = 999;
    public coinLevel: number = 30;
    public coinMode1: number = 4;
    public coinN1: number = 999;
    public coinMode2: number = 3;
    public coinN2: number = 999;
    public bonusLevel: number = 30;
    public bonusMode1: number = 4;
    public bonusN1: number = 999;
    public bonusMode2: number = 3;
    public bonusN2: number = 999;

    public CoinNumMode: number = 0;  //0表示固定金币数，1表示金币数随关卡变化
    public CoinNumCount: number = 10; //金币随关卡变化每过CoinNumCount关变化，默认10

    public BonusCount: number = 5;   //过关奖励每过BonusCount关奖励一次,默认5
    public BonusCoinNum: number = 20; //大礼包的金币个数
    public BonusCoinRate: number = 2.0; //mode=1时，大礼包金币数与关卡的比例
    public bonusGetTimes: number = 0;  //本次登录期间的礼包领取次数
    //金币
    public TipCoinRate: number = 1.0; //mode=1时，提示花费金币数与关卡的比例
    public useTipCoinNum: number = 10; //提示一次需要的金币数量
    public chargeCoinNum: number = 10; //一次充值的金币数
    public coinNum: number = 0; //金币数量

    //分享图片
    public SHARED_URL: string = 'subassets/share.jpg';
    public SHARED_TITLE: string = "据说只有1%的人能过关，是你吗？";
    public SHARED_PARAM: string = "";
    public SHARED_IMG_ARR: any = [
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
    public ifShowOtherApp: boolean = false;
    public GOTO_APPID: string = "";
    public GOTO_APPNAME: string = '';
    public GOTO_APPSKIN: string = '';
    public GOTO_APPGIF: any = null;
    public GOTO_APPPATH: string = '';
    public GOTO_OTHER: number = 0;
    public GOTO_QR: string = "";
    public GOTO_APPID2: string = "";
    public GOTO_APPNAME2: string = '';
    public GOTO_APPSKIN2: string = '';
    public GOTO_APPGIF2: any = null;
    public GOTO_APPPATH2: string = '';
    public GOTO_OTHER2: number = 0;
    public GOTO_QR2: string = "";
    public GOTO_APPID3: string = "";
    public GOTO_APPNAME3: string = '';
    public GOTO_APPSKIN3: string = '';
    public GOTO_APPGIF3: any = null;
    public GOTO_APPPATH3: string = '';
    public GOTO_OTHER3: number = 0;
    public GOTO_QR3: string = "";
    public GOTO_APPID4: string = "";
    public GOTO_APPNAME4: string = '';
    public GOTO_APPSKIN4: string = '';
    public GOTO_APPGIF4: any = null;
    public GOTO_APPPATH4: string = '';
    public GOTO_OTHER4: number = 0;
    public GOTO_QR4: string = "";
    public gameFlowType: number = 4; //游戏页悬浮显示几个    

    public GOTO_APP_ARRAY: any = NavigateAppArray;
    public DRAWER_APP_ARRAY: any = NavigateAppArray;
    public WAITING_APP_ARRAY: any = [];

    //当前登录用户
    public userId: string = '';
    public openId: string = '';
    public nickName: string = '';
    public avatarUrl: string = '';
    //用户level
    public all_level: number = 0;
    //舞台参数
    public scaleX: number = 1;
    public scaleY: number = 1;
    public screenWidth: number = 1080;
    public pixelRatio: number = 1;
    //当前等级
    public level: number = 1;
    //用户各等级level
    public userLevel: any = null;
    public levelcount: any = null;
    public levelArr: any = null;
    //用户授权button
    public userButton: any = null;
    //分享到群ID列表
    public shareToGroupIdArr: string[] = [];

    //页面参数
    public openDataContext: any = null;
    public sharedCanvas: any = null;
    public gameUi: GameUI = null;
    public passPage: PassPage = null;

   
    public tipShareTimes: number = 0;
    public tipVideoTimes: number = 0;
    public coinShareTimes: number = 0;
    public coinVideoTimes: number = 0;
    public bonusShareTimes: number = 0;
    public bonusVideoTimes: number = 0;
    public lgBonusShareTimes: number = 0;
    public lgBonusVideoTimes: number = 0;

    //记录过关情况
    public videoTip: number = 0;
    public shareTip: number = 0;
    public coinTip: number = 0;
    public startTime: number = 0;
    public costTime: number = 0;

    //底部导量，概率控制
    public gameBottomModel: number = 0.5; //显示banner概率
    public passBottomModel: number = 1;
    public gameBottomAppType: number = 4; //底部导量类型

    //分享code
    public shareCode: string = '';
    public shareMoney: number = 0;

    public shareMode: number = 1;   
    public shareUseTime: number = 4000; 
    public shareCancel: boolean = false;
    public shareStartTime: number = 0;
    public shareBackTime: number = 0;
    public shareType: number = 0;
    public shareQuery: string = '';

    public nextChangeTime: number = 0;  // 下一关导量项更新时间

    public scene: number = 0;

    //过关页banner覆盖
    public passBannerDelay: number = -1;
    public passBtnDelay: number = 600;

    public ifPopupBonus: boolean = false;

    //重复跳转模式
    public repeatNavType: number = 0;
    public navAppList: any = [];

    //取消跳转弹窗
    public cancelBtnDelay: number = 2000;
    public cancelLevel: number = 1;

    //自动弹出跳转
    public autoNaviLevel: number = 300;

    public goodIconList: any = [];
    public goodIconLevel: number = 1;

    public loginIconList: any = [];
    public navi3Visible: boolean = false;
    public navi3All: boolean = false;
    // 下一关导量顺序，1-下一关在前，2-pop框在前
    public nextNaviOrderMode: number = 1;
    public specChannelList: Array<string> = [];

    constructor() {
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
            let platform: any = Browser.window.systemInfo.platform;
            let model: any = Browser.window.systemInfo.model;
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
        } else {
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

    public getUserDataFromStorage() {
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

    }

    /*
    * 1. 获取当前版本的功能设置
    */
    public initVersionSettings() {
        var that = this;
        //获取settings
        const db = Laya.Browser.window.wx.cloud.database();
        let docid = 'version_' + VERSION;
        db.collection('settings_block')
            .doc(docid)
            .get()
            .then(res => {
                log('getVersionSettings:');
                //获取设置后，再登录
                that.login();

            }).catch(e => {
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
    }

    public setSpecialSetting() {

    }

    /*
    * 2. 登录
    */
    public login() {
        log("================login================");
        log("userChannel = " + userChannel);
        log('openid=' + this.openId);
        var that = this;
        let channel = userChannel;
        /*  if (DEBUG) {
              channel = "test";
          }*/
        if (that.openId && that.openId.length > 8) {
            aldSendOpenId(channel, that.openId);
        }
        else {
            Laya.Browser.window.wx.cloud.callFunction({
                name: 'login'
            }).then(res => {
                log(res.result);
                if (res.result.data && res.result.data.length > 0) {
                    that.openId = res.result.data[0]._openid;
                    wx.setStorageSync('openId', that.openId);
                    log('openid: ' + that.openId);
                }
                aldSendOpenId(channel, that.openId);
            }).catch(err => {
                log(err);
            });
        }
    }

    /**
     * 3. Laya加载
     */
    public loadLaya() {
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

    public onError(e) {

    }

    public onLoading(progress) {

    }

    public showLogin(): void {
        if (isLoadSubpackages && ifGotVersionSet) {
            if (game.loginIconList.length > 0 && game.specChannelList.length > 0 && userScene == 1037 && game.specChannelList.indexOf(userChannel) > -1) {
                game.updateWaitingNavAppList();
                let bottomItemArray: Array<any> = [];
                for (let i = 0; i < game.loginIconList.length; i++) {
                    let gameIcon = game.loginIconList[i];
                    for (let j = 0; j < game.WAITING_APP_ARRAY.length; j++) {
                        if (game.WAITING_APP_ARRAY[j].skin == gameIcon) {
                            let gameInfo = game.WAITING_APP_ARRAY[j];
                            let gameInfo1 = JSON.parse(JSON.stringify(gameInfo));
                            bottomItemArray.push(gameInfo1);
                            break;
                        }
                    }
                }
               
            }
        }
    }

    public onAssetLoaded() {
        wx.hideLoading();
        var that = this;
        log('加载游戏页');
        wxUtils.aldSendEventFunc('登录后加载游戏页', { 'level': '' + that.all_level });
        let loadPage = LoadPage.getSelf(function () {
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
    }


    //清空舞台
    public clearStage() {
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
        } catch (e) { //log('移除 gameUi 失败' + e); 
        };

        try {
            if (this.passPage)
                Laya.stage.removeChild(this.passPage);
        } catch (e) { //log('移除 passPage 失败' + e); 
        };

    }

    //初始化游戏界面
    public initGame(levelIndex: number) {
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


    }

    //刷新游戏界面
    public replayGame(levelIndex: number) {
        this.initGame(levelIndex);
    }

    //判断是否奖励
    public showBonus(level, score, starNum) {
        this.ifPopupBonus = false;
        // 保存用户数据
        syncUtils.saveUserData(level, score);
        //显示passpage
        this.showNext(score, starNum);
    }

    //显示passpage
    public showNext(score, starNum) {
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

    }

    //回到主页
    public goHome() {
        if (Laya.stage == null) return;
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
    }


    //更新跳转列表
    public updateHistoryNavAppList(appid: string) {

    }

    //更新当前可跳转的app列表
    public updateWaitingNavAppList() {

    }

    //设置游戏页导量
    public setGameUiNavi() {

    }

}

//程序入口
var game = new Game();

/*
 * 4. Wx OnShow 入口
*/
wx.onShow(res => {
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

