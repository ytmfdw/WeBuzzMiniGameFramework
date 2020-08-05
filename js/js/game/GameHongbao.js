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
var GameHongbao = /** @class */ (function (_super) {
    __extends(GameHongbao, _super);
    function GameHongbao() {
        var _this = _super.call(this) || this;
        _this.state = 0;
        _this.awardSteps = 0;
        _this.btnOpen.on(Laya.Event.CLICK, _this, _this.onOpen);
        _this.btnBack.on(Laya.Event.CLICK, _this, _this.onBack);
        _this.btnHome.on(Laya.Event.CLICK, _this, _this.onHome);
        return _this;
    }
    GameHongbao.prototype.setData = function (state, steps) {
        log('hongbao state:' + state + ',steps:' + steps);
        if (state === 0) {
            // 红包未打开
            this.state = state;
            this.awardSteps = steps;
            this.openView.visible = true;
            this.backView.visible = false;
        }
        else if (state === 1) {
            // 红包拆开
            this.state = state;
            this.stepsText.text = '' + this.awardSteps;
            this.openView.visible = false;
            this.backView.visible = true;
        }
    };
    GameHongbao.prototype.onOpen = function () {
        log('点击开红包');
        var that = this;
        wxUtils.showRunHongbaoVideoAd(function (ifShowAd) {
            log('看红包视频观看之后回来,ifShowAd=' + ifShowAd);
            if (ifShowAd) {
                //成功播放视频，拆开红包
                that.setData(1);
            }
            else {
                //没有视频播放了
                wx.showModal({
                    title: '温馨提示',
                    content: '非常抱歉，目前暂时没有可观看的视频。请稍后再试，谢谢您的理解！',
                    confirmText: '好的',
                    showCancel: false,
                });
            }
        });
    };
    GameHongbao.prototype.onBack = function () {
        log('打开红包，点击返回领取');
        wx.navigateToMiniProgram({
            appId: runPkAppid,
            extraData: {
                from: 'pipe',
                type: 'video',
                steps: this.awardSteps
            },
            envVersion: 'release',
            success: function (res) {
                console.log('返回一起拼步数跳转成功');
                // 关闭当前页面,并返回首页
                game.goHome();
            },
            fail: function (err) {
                console.log('用户取消跳转看视频');
            }
        });
    };
    GameHongbao.prototype.onHome = function () {
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
    return GameHongbao;
}(ui.page_dir.GameHongbaoUI));
//# sourceMappingURL=GameHongbao.js.map