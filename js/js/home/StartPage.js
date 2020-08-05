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
var StartPage = /** @class */ (function (_super) {
    __extends(StartPage, _super);
    function StartPage() {
        var _this = _super.call(this) || this;
        _this.ifOpenDrawer = false;
        _this.height = Laya.stage.height;
        _this.btnStart.on(Laya.Event.CLICK, _this, _this.onStart);
        _this.btnTip.on(Laya.Event.CLICK, _this, _this.onTipClick);
        // this.otherApp.on(Laya.Event.CLICK, this, game.onOtherApp);
        _this.btnRight.on(Laya.Event.CLICK, _this, _this.onDrawerClick);
        _this.guideAnimation.loadAnimation("ani/StartPageGuide.ani");
        _this.guideAnimation.play();
        _this.appList.vScrollBarSkin = "";
        wxUtils.aldSendEventFunc('打开小游戏后加载首页', {});
        return _this;
    }
    StartPage.prototype.onDrawerClick = function (e) {
        e.stopPropagation();
        var that = this;
        if (this.ifOpenDrawer == false) {
            //抽出抽屉窗口 
            log('抽出抽屉窗口');
            this.btnRight.skin = "comp/drawer_double_left.png";
            this.redDot.visible = false;
            Laya.Tween.to(this.drawerLayout, { x: -10 }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
                that.ifOpenDrawer = true;
                wxUtils.aldSendEventFunc('抽出抽屉窗口', {});
            }));
        }
        else {
            //关闭抽屉窗口
            log('关闭抽屉窗口');
            Laya.Tween.to(this.drawerLayout, { x: -440 }, 500, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
                that.ifOpenDrawer = false;
                that.btnRight.skin = "comp/drawer_double_right.png";
                that.redDot.visible = true;
                wxUtils.aldSendEventFunc('关闭抽屉窗口', {});
            }));
        }
    };
    //点击提示
    StartPage.prototype.onTipClick = function (e) {
        e.stopPropagation();
        wxUtils.aldSendEventFunc('首页点击金币充值', { 'level': '' + game.level });
        game.showHomeTipDialog();
    };
    //点击开始
    StartPage.prototype.onStart = function (e) {
        e.stopPropagation();
        wxUtils.aldSendEventFunc('点击开始游戏', { 'level': '' + game.level });
        //删除自己
        this.removeSelf();
        //获取游戏数据
        game.enterGameLevel();
        //获取当前金币数量
        coinUtils.getUserCoin(HELP_COIN_NUM);
    };
    //分享
    StartPage.prototype.share = function (e) {
        e.stopPropagation();
        //分享到朋友
        SharedUtils.wxShareFunc(ShareState.INVITE, 'uid=' + game.userId + '&state=' + ShareState.INVITE);
    };
    return StartPage;
}(ui.page_dir.StartPageUI));
//# sourceMappingURL=StartPage.js.map