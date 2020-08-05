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
* name;
*/
var WatchVideo = /** @class */ (function (_super) {
    __extends(WatchVideo, _super);
    function WatchVideo() {
        var _this = _super.call(this) || this;
        _this.state = 0;
        _this.awardMoney = 0;
        _this.code = '';
        _this.status = 0; //0:不成功，1：成功且有视频，2：成功但无视频
        _this.type = '';
        _this.btnOpen.on(Laya.Event.CLICK, _this, _this.onOpen);
        _this.btnBack.on(Laya.Event.CLICK, _this, _this.onBack);
        _this.btnHome.on(Laya.Event.CLICK, _this, _this.onHome);
        return _this;
    }
    WatchVideo.prototype.setData = function (state, money, code, type) {
        log('hongbao type:' + type + ',state=' + state + ',money:' + money + ',code:' + code);
        if (state === 0) {
            // 红包未打开
            this.type = type;
            this.state = state;
            this.awardMoney = money;
            this.code = code;
            if (this.type == 'money') {
                this.openText.text = '看完整视频领红包';
            }
            else if (this.type == 'tool') {
                this.openText.text = '看完整视频领道具';
            }
            else if (this.type == 'tip') {
                this.openText.text = '看完整视频得提示';
            }
            else if (this.type == 'bonus') {
                this.openText.text = '看完整视频领黄金';
            }
            this.openView.visible = true;
            this.backView.visible = false;
        }
        else if (state === 1) {
            // 红包拆开
            this.state = state;
            if (this.type == 'money') {
                this.titleText.text = '现金红包';
                this.moneyText.text = '' + this.awardMoney.toFixed(2) + '元';
                this.congratText.text = '恭喜您获得现金红包';
                this.moneyText.visible = true;
                this.backText.text = '请返回' + game.watchVideoFromName + '领取';
            }
            else if (this.type == 'tool') {
                this.titleText.text = '获得道具';
                this.moneyText.text = '';
                this.congratText.text = '恭喜您获得道具';
                this.moneyText.visible = false;
                this.backText.text = '请返回' + game.watchVideoFromName + '领取';
            }
            else if (this.type == 'tip') {
                this.titleText.text = '获得提示';
                this.moneyText.text = '';
                this.congratText.text = '恭喜您获得提示';
                this.moneyText.visible = false;
                this.backText.text = '请返回' + game.watchVideoFromName + '展示';
            }
            else if (this.type == 'bonus') {
                this.titleText.text = '获得黄金';
                this.moneyText.text = '';
                this.congratText.text = '恭喜您获得黄金';
                this.moneyText.visible = true;
                this.backText.text = '请返回' + game.watchVideoFromName + '领取';
            }
            this.btnBackText.text = '返回' + game.watchVideoFromName;
            this.openView.visible = false;
            this.backView.visible = true;
        }
    };
    WatchVideo.prototype.onOpen = function () {
        log('点击开红包');
        var that = this;
        wxUtils.showOtherMoneyVideoAd(function (ifShowAd) {
            log('看红包视频观看之后回来,ifShowAd=' + ifShowAd);
            if (ifShowAd) {
                //成功播放视频，拆开红包
                that.setData(1);
                that.status = 1;
            }
            else {
                //没有视频播放了
                // wx.showModal({
                //     title: '温馨提示',
                //     content: '非常抱歉，目前暂时没有可观看的视频。请稍后再试，谢谢您的理解！',
                //     confirmText: '好的',
                //     showCancel: false,
                // });
                that.setData(1);
                that.status = 2;
            }
            wxUtils.aldSendEventFunc('从其它小游戏过来看完视频', { 'user': game.userId, 'appid': game.watchVideoFromAppid, 'appname': game.watchVideoFromName, 'status': that.status, 'type': that.type, 'money': that.awardMoney });
        });
    };
    WatchVideo.prototype.onBack = function () {
        log('打开红包，点击返回领取');
        var that = this;
        wx.navigateToMiniProgram({
            appId: game.watchVideoFromAppid,
            extraData: {
                from: APP_ENAME,
                type: that.type,
                code: that.code,
                status: that.status,
                money: that.awardMoney
            },
            envVersion: 'trial',
            success: function (res) {
                log('看完视频返回跳转成功'); //log({ 'user': game.userId , 'appid': game.watchVideoFromAppid , 'appname': game.watchVideoFromName, 'status':that.status, 'type':that.type, 'money':that.awardMoney })
                wxUtils.aldSendEventFunc('从其它小游戏过来看完视频返回成功', { 'user': game.userId, 'appid': game.watchVideoFromAppid, 'appname': game.watchVideoFromName, 'status': that.status, 'type': that.type, 'money': that.awardMoney });
                // 关闭当前页面,并返回首页
                game.goHome();
            },
            fail: function (err) {
                log('用户取消看视频跳转');
            }
        });
    };
    WatchVideo.prototype.onHome = function () {
        log('返回首页');
        if (this.state === 0) {
            wx.showModal({
                title: '温馨提示',
                content: '红包尚未拆开，现在返回有可能错过几个亿哦！',
                confirmText: '去开红包',
                showCancel: true,
                cancelText: '不要了',
                success: function (callBack) {
                    if (callBack.confirm) {
                    }
                    if (callBack.cancel) {
                        game.goHome();
                    }
                }
            });
        }
        else {
            game.goHome();
        }
    };
    return WatchVideo;
}(ui.page_dir.WatchVideoUI));
//# sourceMappingURL=WatchVideo.js.map