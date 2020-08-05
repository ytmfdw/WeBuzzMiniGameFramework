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
var BonusDialog = /** @class */ (function (_super) {
    __extends(BonusDialog, _super);
    function BonusDialog() {
        var _this = _super.call(this) || this;
        _this.openRand = -1;
        _this.coinNum = 1;
        _this.bonusType = 0; //0:大礼包，1：快速通关礼包
        _this.btnClose.on(Laya.Event.CLICK, _this, _this.closeClick);
        _this.btnFreeGet.on(Laya.Event.CLICK, _this, _this.clickFreeGet);
        return _this;
    }
    BonusDialog.prototype.closeClick = function (e) {
        e.stopPropagation();
        //删除自己
        this.close();
    };
    BonusDialog.prototype.shareBonusClick = function () {
        var that = this;
        //新策略：分享到群领取
        wx.updateShareMenu({
            withShareTicket: true,
            success: function () {
                if (that.bonusType === 0) {
                    wxUtils.aldSendEventFunc('过关大礼包免费领取拉起分享', { 'user': game.userId, 'level': game.level, 'coin=': that.coinNum });
                }
                SharedUtils.wxShareFunc(ShareState.BONUS, 'uid=' + game.userId + '&state=' + ShareState.BONUS);
                game.isShareBonus = true;
            }
        });
    };
    BonusDialog.prototype.videoBonusClick = function () {
        var that = this;
        if (that.bonusType == 0) {
            wxUtils.aldSendEventFunc('过关大礼包领取拉起视频', { 'user': game.userId, 'level': game.level, 'coin=': that.coinNum });
            wxUtils.showBonusVideoAd(function (ifShowAd) {
                log('看大礼包视频观看之后回来,ifShowAd=' + ifShowAd);
                if (ifShowAd) {
                    //成功播放视频
                    wxUtils.aldSendEventFunc('过关大礼包领取视频播放成功', { 'user': game.userId, 'level': game.level, 'coin=': that.coinNum });
                    wxUtils.aldSendEventFunc('视频播放成功', { 'user': game.userId, 'level': game.level, 'coin=': that.coinNum });
                    //获得大礼包
                    coinUtils.addCoin(that.coinNum, 2);
                    //累加看视频次数
                    if (game.bonusMode === 3 || game.bonusMode === 4) {
                        game.bonusVideoTimes += 1;
                    }
                }
                else {
                    //没有视频播放了
                    wxUtils.aldSendEventFunc('过关大礼包领取视频播放失败', { 'user': game.userId, 'level': game.level, 'coin=': that.coinNum });
                    if (game.bonusMode === 4) {
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
        }
    };
    // 通过视频或分享领取
    BonusDialog.prototype.getBonusFunc = function () {
        var that = this;
        //设置当前关卡的分享视频参数 
        if (game.level <= game.bonusLevel) {
            game.bonusMode = game.bonusMode1;
            game.bonusN = game.bonusN1;
        }
        else {
            game.bonusMode = game.bonusMode2;
            game.bonusN = game.bonusN2;
        }
        log('bonusMode=' + game.bonusMode + ',bonusN=' + game.bonusN + 'bonusShareTimes=' + game.bonusShareTimes + ',bonusVideoTimes=' + game.bonusVideoTimes);
        log('bonusArr:');
        log(game.bonusArr);
        switch (game.bonusMode) {
            case 1:
                //分享获取
                that.shareBonusClick();
                break;
            case 2:
                //分享N次，然后看视频
                if (game.bonusShareTimes < game.bonusN) {
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
                //新策略，通过概率控制
                var bonusAllTimes = game.bonusVideoTimes + game.bonusShareTimes;
                var bonusArrLen = game.bonusArr.length;
                var videoRate = 1;
                if (bonusAllTimes < bonusArrLen) {
                    videoRate = game.bonusArr[bonusAllTimes];
                }
                else {
                    videoRate = game.bonusArr[bonusArrLen - 1];
                }
                var tmpRand = Math.random();
                log('bonusAllTimes=' + bonusAllTimes + ',videoRate=' + videoRate + ',tmpRand=' + tmpRand);
                if (tmpRand < videoRate) {
                    // 看视频
                    that.videoBonusClick();
                }
                else {
                    //分享
                    that.shareBonusClick();
                }
                break;
            case 4:
                //看N次视频，然后不能看，也不能分享
                if (game.bonusVideoTimes < game.bonusN) {
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
                if (that.bonusType === 0) {
                    coinUtils.addCoin(that.coinNum, 2);
                    wxUtils.aldSendEventFunc('过关大礼包免费领取直接领取', { 'user': game.userId, 'level': game.level, 'coin=': that.coinNum });
                }
            default:
                break;
        }
    };
    BonusDialog.prototype.clickFreeGet = function (e) {
        e.stopPropagation();
        //点击免费领取
        wxUtils.aldSendEventFunc('过关大礼包点击免费领取', { 'user': game.userId, 'level': game.level, 'coin=': this.coinNum });
        this.getBonusFunc();
    };
    BonusDialog.prototype.clickGetNow = function (e) {
        e.stopPropagation();
        //快速通关礼包，直接领取
        wxUtils.aldSendEventFunc('快速过关礼包直接领取', { 'user': game.userId, 'level': game.level, 'time': game.costTime, 'coin=': this.coinNum });
        coinUtils.addCoin(this.coinNum, 2);
    };
    BonusDialog.prototype.clickGetDouble = function (e) {
        e.stopPropagation();
        //快速通关礼包，翻倍领取
        wxUtils.aldSendEventFunc('快速过关礼包点击翻倍领取', { 'user': game.userId, 'level': game.level, 'time': game.costTime, 'coin=': this.coinNum });
        this.getBonusFunc();
    };
    BonusDialog.prototype.setData = function (cn, type) {
        this.coinNum = cn;
        this.bonusType = type;
        this.coinNumLabel.text = 'x ' + this.coinNum;
        if (type === 0) {
            // 大礼包
            game.bonusGetTimes += 1; //弹出即累积一次
            wxUtils.aldSendEventFunc('显示过关大礼包', { 'user': game.userId, 'level': game.level, 'coin=': this.coinNum });
        }
    };
    return BonusDialog;
}(ui.dialog_dir.dialogBonusUI));
//# sourceMappingURL=BonusDialog.js.map