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
var bannerDialog = /** @class */ (function (_super) {
    __extends(bannerDialog, _super);
    function bannerDialog() {
        var _this = _super.call(this) || this;
        _this.btnClose.on(Laya.Event.CLICK, _this, _this.closeClick);
        return _this;
    }
    bannerDialog.prototype.closeClick = function (e) {
        e.stopPropagation();
        game.bannerClickTime = 0;
        wx.removeStorageSync('bannerClickInfo');
        //删除自己
        if (this.banner) {
            this.banner.hide();
            this.banner.destroy();
        }
        this.close();
        if (game.moneyDialog) {
            game.moneyDialog.ifClickConfirm = false;
        }
    };
    bannerDialog.prototype.closeBack = function () {
        game.bannerClickTime = 0;
        wx.removeStorageSync('bannerClickInfo');
        //删除自己
        if (this.banner) {
            this.banner.hide();
            this.banner.destroy();
        }
        this.close();
        if (game.moneyDialog) {
            game.moneyDialog.ifClickConfirm = false;
        }
    };
    //显示banner
    bannerDialog.prototype.showBanner = function () {
        var that = this;
        // 隐藏gamebanner
        wxUtils.hideBanner();
        if (game.ifNoBannerAd === true) {
            // 直接拉视频
            that.showVideo();
        }
        else {
            // 先尝试拉banner
            // 创建banner
            if (that.banner) {
                that.banner.hide();
                that.banner.destroy();
            }
            wx.showLoading({
                title: '加载中...',
                mask: true
            });
            game.bannerClickTime = 0;
            wx.removeStorageSync('bannerClickInfo');
            var tH = 380;
            // var bannerId = 'adunit-f6161da1c21c8386';
            // if (Math.random() > 0.5) {
            var bannerId = 'adunit-774835f0b5a40564';
            // }
            that.banner = wx.createBannerAd({
                adUnitId: bannerId,
                style: {
                    left: 0,
                    top: tH * game.scaleX,
                    width: game.screenWidth,
                    height: (game.SCREENHEIGHT - tH) * game.scaleX
                }
            });
            that.banner.onError(function (error) {
                log('banner error');
                log(error);
                wx.hideLoading();
                // wx.showModal({
                //     title: '温馨提示',
                //     content: '对不起，暂时没有可观看的广告！请稍后再试吧',
                //     confirmText: '我知道了',
                //     showCancel: false,
                //     success: function (callBack) {
                //         if (callBack.confirm) {
                //             that.close();
                //             if (game.moneyDialog) {
                //                 game.moneyDialog.close();
                //                
                //             }
                //         }
                //     }
                // });
                // 新策略：banner没有了拉视频
                that.showVideo();
                if (error.errCode === 0 || error.errCode === 1004 || error.errCode === -10000) {
                    game.ifNoBannerAd = true;
                }
                var tmpTimes = wxUtils.bannerSuccessTimes(0);
                wxUtils.aldSendEventFunc('广告加载出错-banner', {
                    'user': game.userId,
                    'errCode': error.errCode,
                    'errMsg': error.errMsg,
                    'success': tmpTimes,
                    'from': 'bannerDialog',
                    'bannerId': bannerId
                });
            });
            that.banner.onLoad(function (res) {
                that.banner.show().then(function (res) {
                    wx.hideLoading();
                    // 记录banner点击标志
                    game.bannerClickTime = (new Date()).getTime();
                    log('bannerClickTime=' + game.bannerClickTime + ',hongbaoMoney=' + game.moneyDialog.money);
                    wx.setStorageSync('bannerClickInfo', { 'clickTime': game.bannerClickTime, 'money': game.moneyDialog.money });
                    wxUtils.aldSendEventFunc('翻倍banner加载成功', {
                        'user': game.userId,
                        'bannerId': bannerId
                    });
                    wxUtils.aldSendEventFunc('广告加载成功-banner', {
                        'user': game.userId,
                        'bannerId': bannerId
                    });
                    wxUtils.bannerSuccessTimes(1);
                });
            });
        }
    };
    //播放视频
    bannerDialog.prototype.showVideo = function () {
        var that = this;
        wxUtils.aldSendEventFunc('红包翻倍拉起视频', { 'detail': game.userId + '-' + game.level });
        wxUtils.showDoubleVideoAd(function (ifShowAd) {
            log('看红包视频观看之后回来,ifShowAd=' + ifShowAd);
            if (ifShowAd === 1) {
                //成功播放视频
                wxUtils.aldSendEventFunc('红包翻倍视频播放成功', { 'detail': game.userId + '-' + game.level });
                //翻倍红包
                that.onBannerClicked();
            }
            else if (ifShowAd === 0) {
                //没有视频播放了
                game.ifNoVideoAd = true;
                wxUtils.aldSendEventFunc('红包翻倍视频播放失败', { 'detail': game.userId + '-' + game.level });
                //分享翻倍
                that.shareDouble();
            }
            else if (ifShowAd === 2) {
                // 视频未播放完成
                wx.showModal({
                    title: '温馨提示',
                    content: '视频未完整播放，无法获得红包，请重试！',
                    showCancel: true,
                    cancelText: '不要了',
                    confirmText: '看视频',
                    success: function (callBack) {
                        if (callBack.confirm) {
                            that.showVideo();
                        }
                        else if (callBack.cancel) {
                            that.closeBack();
                        }
                    }
                });
            }
        });
    };
    //分享获取翻倍
    bannerDialog.prototype.shareDouble = function () {
        var that = this;
        wx.updateShareMenu({
            withShareTicket: true,
            success: function () {
                wxUtils.aldSendEventFunc('红包翻倍拉起分享', { 'detail': game.userId + '-' + game.level });
                game.isShareDouble = true;
                SharedUtils.wxShareFunc(ShareState.DOUBLE, 'uid=' + game.userId + '&state=' + ShareState.DOUBLE);
            }
        });
    };
    //成功观看banner回调
    bannerDialog.prototype.onBannerClicked = function () {
        if (this.banner) {
            this.banner.hide();
            this.banner.destroy();
        }
        this.close();
        game.bannerClickTime = 0;
        wx.removeStorageSync('bannerClickInfo');
        if (game.moneyDialog) {
            game.moneyDialog.setData(3, 'banner');
        }
    };
    return bannerDialog;
}(ui.dialog_dir.dialogBannerUI));
//# sourceMappingURL=bannerDialog.js.map