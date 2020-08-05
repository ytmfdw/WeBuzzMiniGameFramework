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
var ChargeDialog = /** @class */ (function (_super) {
    __extends(ChargeDialog, _super);
    function ChargeDialog() {
        var _this = _super.call(this) || this;
        _this.openRand = -1;
        _this.btnFreeCoin.on(Laya.Event.CLICK, _this, _this.clickFreeCoin);
        _this.btnClose.on(Laya.Event.CLICK, _this, _this.closeClick);
        //隐藏
        if (!game.ifShowBonus) {
            _this.btnFreeCoin.visible = false;
        }
        return _this;
    }
    ChargeDialog.prototype.closeClick = function (e) {
        e.stopPropagation();
        //删除自己
        this.close();
    };
    ChargeDialog.prototype.shareClick = function () {
        //e.stopPropagation();
        wx.updateShareMenu({
            withShareTicket: true,
            success: function () {
                wxUtils.aldSendEventFunc('金币充值免费领取拉起分享', { 'level': '' + game.level });
                SharedUtils.wxShareFunc(ShareState.CHARGE, 'uid=' + game.userId + '&state=' + ShareState.CHARGE);
                game.isShareCharge = true;
            }
        });
    };
    ChargeDialog.prototype.videoClick = function () {
        var that = this;
        wxUtils.aldSendEventFunc('金币充值领取拉起视频', { 'level': '' + game.level });
        wxUtils.showCoinVideoAd(function (ifShowAd) {
            log('看金币视频观看之后回来,ifShowAd=' + ifShowAd);
            if (ifShowAd) {
                //成功播放视频
                wxUtils.aldSendEventFunc('金币充值领取视频播放成功', { 'level': '' + game.level });
                wxUtils.aldSendEventFunc('视频播放成功', { 'level': '' + game.level });
                //获得金币
                coinUtils.addCoin(game.chargeCoinNum, 4);
                //累加看视频次数
                if (game.coinMode === 3 || game.coinMode === 4) {
                    game.coinVideoTimes += 1;
                }
            }
            else {
                //没有视频播放了
                wxUtils.aldSendEventFunc('金币充值领取视频播放失败', { 'level': '' + game.level });
                if (game.coinMode === 4) {
                    wx.showModal({
                        title: '提示',
                        content: '非常抱歉，目前暂时没有可观看的视频。请稍后再试，谢谢您的理解！',
                        confirmText: '好的',
                        showCancel: false,
                    });
                }
                else {
                    //分享获得
                    that.shareClick();
                }
            }
        });
    };
    //点击免费领取
    ChargeDialog.prototype.clickFreeCoin = function (e) {
        e.stopPropagation();
        // 设置当前关卡的分享视频参数
        if (game.level <= game.coinLevel) {
            game.coinMode = game.coinMode1;
            game.coinN = game.coinN1;
        }
        else {
            game.coinMode = game.coinMode2;
            game.coinN = game.coinN2;
        }
        var that = this;
        log('coinMode=' + game.coinMode + ',coinN=' + game.coinN + 'coinShareTimes=' + game.coinShareTimes + ',coinVideoTimes=' + game.coinVideoTimes);
        log('coinArr=');
        log(game.coinArr);
        wxUtils.aldSendEventFunc('金币充值点击免费领取', { 'level': '' + game.level });
        switch (game.coinMode) {
            case 1:
                //分享获取
                that.shareClick();
                break;
            case 2:
                //分享N次，然后看视频
                if (game.coinShareTimes < game.coinN) {
                    //分享
                    that.shareClick();
                }
                else {
                    //看视频
                    that.videoClick();
                }
                break;
            case 3:
                //看N次视频，然后分享
                // if (game.coinVideoTimes < game.coinN) {
                //     //看视频
                //     that.videoClick();
                // }
                // else {
                //     //分享
                //     that.shareClick();
                // }
                //新策略，通过概率控制
                var coinAllTimes = game.coinVideoTimes + game.coinShareTimes;
                var coinArrLen = game.coinArr.length;
                var videoRate = 1;
                if (coinAllTimes < coinArrLen) {
                    videoRate = game.coinArr[coinAllTimes];
                }
                else {
                    videoRate = game.coinArr[coinArrLen - 1];
                }
                var tmpRand = Math.random();
                log('coinAllTimes=' + coinAllTimes + ',videoRate=' + videoRate + ',tmpRand=' + tmpRand);
                if (tmpRand < videoRate) {
                    // 看视频
                    that.videoClick();
                }
                else {
                    //分享
                    that.shareClick();
                }
                break;
            case 4:
                //看N次视频，然后不能看，也不能分享
                if (game.coinVideoTimes < game.coinN) {
                    //看视频
                    that.videoClick();
                }
                else {
                    //分享
                    //that.onChargeShare();
                }
                break;
            case 5:
                //直接获取金币
                wxUtils.aldSendEventFunc('金币充值免费领取直接领取', { 'level': '' + game.level });
                coinUtils.addCoin(game.chargeCoinNum, 4);
            default:
                break;
        }
    };
    //设置显示 的文本
    ChargeDialog.prototype.setTipCount = function (count) {
        this.coinCountLabel.text = count + "";
        this.coinNumLabel.text = '' + game.chargeCoinNum;
    };
    return ChargeDialog;
}(ui.dialog_dir.dialogChargeUI));
//# sourceMappingURL=ChargeDialog.js.map