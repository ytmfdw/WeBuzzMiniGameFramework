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
var LoginBonusDialogNew = /** @class */ (function (_super) {
    __extends(LoginBonusDialogNew, _super);
    function LoginBonusDialogNew() {
        var _this = _super.call(this) || this;
        _this.today = '';
        _this.today = '';
        //this.btnShareBonus.on(Laya.Event.CLICK, this, this.shareBonusClick);
        _this.btnClose.on(Laya.Event.CLICK, _this, _this.closeClick);
        //this.btnVideoBonus.on(Laya.Event.CLICK, this, this.videoBonusClick);
        _this.btnFreeGet.on(Laya.Event.CLICK, _this, _this.clickFreeGet);
        return _this;
    }
    LoginBonusDialogNew.prototype.closeClick = function (e) {
        e.stopPropagation();
        //删除自己
        this.close();
    };
    LoginBonusDialogNew.prototype.shareBonusClick = function () {
        //新策略：分享到群领取
        wx.updateShareMenu({
            withShareTicket: true,
            success: function () {
                // wxUtils.aldSendEventFunc('登陆大礼包免费领取弹出分享到群提示框', { 'level': '' + game.level });
                // wx.showModal({
                //     title: '提示',
                //     content: '请分享到微信群，才能领取哦！',
                //     confirmText: '分享到群',
                //     showCancel: true,
                //     cancelText: '我知道了',
                //     success: function (callBack) {
                //         if (callBack.confirm) {
                wxUtils.aldSendEventFunc('登陆大礼包免费领取拉起分享', { 'level': '' + game.level });
                SharedUtils.wxShareFunc(ShareState.LGBONUS, 'uid=' + game.userId + '&state=' + ShareState.LGBONUS);
                game.isShareLgBonus = true;
                //         }
                //         if (callBack.cancel) {
                //         }
                //     }
                // });
            }
        });
    };
    LoginBonusDialogNew.prototype.videoBonusClick = function () {
        var that = this;
        wxUtils.aldSendEventFunc('登陆大礼包领取拉起视频', { 'level': '' + game.level });
        wxUtils.showLgBonusVideoAd(function (ifShowAd) {
            log('看登陆大礼包视频观看之后回来,ifShowAd=' + ifShowAd);
            if (ifShowAd) {
                //成功播放视频
                wxUtils.aldSendEventFunc('登陆大礼包领取视频播放成功', { 'level': '' + game.level });
                //获得大礼包
                LifeCardUtils.addCoin(game.BonusCoinNum, 3);
                //累加看视频次数
                if (game.lgBonusMode === 3 || game.lgBonusMode === 4) {
                    game.lgBonusVideoTimes += 1;
                }
            }
            else {
                //没有视频播放了
                wxUtils.aldSendEventFunc('登陆大礼包领取视频播放失败', { 'level': '' + game.level });
                if (game.lgBonusMode === 4) {
                    wx.showModal({
                        title: '提示',
                        content: '非常抱歉，目前暂时没有可观看的视频。请稍后再试，谢谢您的理解！',
                        confirmText: '好的',
                        showCancel: false,
                    });
                }
                else {
                    //分享获得
                    that.shareBonusClick();
                }
            }
        });
    };
    //点击免费领取
    LoginBonusDialogNew.prototype.clickFreeGet = function (e) {
        e.stopPropagation();
        var that = this;
        log('lgBonusMode=' + game.lgBonusMode + ',lgBonusN=' + game.lgBonusN + 'lgBonusShareTimes=' + game.lgBonusShareTimes + ',lgBonusVideoTimes=' + game.lgBonusVideoTimes);
        wxUtils.aldSendEventFunc('登陆大礼包点击免费领取', { 'level': '' + game.level });
        switch (game.lgBonusMode) {
            case 1:
                //分享获取
                that.shareBonusClick();
                break;
            case 2:
                //分享N次，然后看视频
                if (game.lgBonusShareTimes < game.lgBonusN) {
                    //分享
                    that.shareBonusClick();
                }
                else {
                    //看视频
                    that.videoBonusClick();
                }
                break;
            case 3:
                //看N次视频，然后分享
                if (game.lgBonusVideoTimes < game.lgBonusN) {
                    //看视频
                    that.videoBonusClick();
                }
                else {
                    //分享
                    that.shareBonusClick();
                }
                break;
            case 4:
                //看N次视频，然后不能看，也不能分享
                if (game.lgBonusVideoTimes < game.lgBonusN) {
                    //看视频
                    that.videoBonusClick();
                }
                else {
                    //分享
                    //that.onChargeShare();
                }
                break;
            case 5:
                //直接获取金币
                wxUtils.aldSendEventFunc('登陆大礼包免费领取直接领取', { 'level': '' + game.level });
                LifeCardUtils.addCoin(game.BonusCoinNum, 3);
            default:
                break;
        }
    };
    LoginBonusDialogNew.prototype.setDay = function (t) {
        this.today = t;
        this.coinNumLabel.text = '' + game.BonusCoinNum;
        this.tipCoinCountLabel.text = 'x ' + game.BonusCoinNum;
    };
    return LoginBonusDialogNew;
}(ui.dialog_dir.dialogLoginBonusNewUI));
//# sourceMappingURL=LoginBonusDialogNew.js.map