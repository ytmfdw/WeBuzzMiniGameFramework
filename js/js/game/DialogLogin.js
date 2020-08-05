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
/**
 * 游戏页顶部跳转视图单元格
 */
var NaviLoginItem = /** @class */ (function (_super) {
    __extends(NaviLoginItem, _super);
    function NaviLoginItem() {
        var _this = _super.call(this) || this;
        _this.appid = '';
        _this.appname = '';
        _this.apppath = '';
        _this.appskin = '';
        _this.other = 0;
        _this.source = 0;
        _this.appqr = '';
        _this.from = 'login';
        _this.gif = null;
        _this.on(Laya.Event.CLICK, _this, _this.onClick);
        _this.hotImage.visible = false;
        return _this;
    }
    /**
     * 点击事件
     */
    NaviLoginItem.prototype.onClick = function () {
        var that = this;
        wxUtils.aldSendEventFunc('点击跳转其它游戏', { 'toApp': that.appname, 'appid': that.appid, 'from': that.from, 'skin': getSkinStr(that.appskin) });
        wx.navigateToMiniProgram({
            appId: this.appid,
            path: this.apppath,
            extraData: {
                from: 'Animal',
                type: 'navi',
                list: JSON.stringify(allNavigateList)
            },
            envVersion: 'release',
            success: function (res) {
                // 跳转成功
                log('跳转成功');
                //记录跳转列表
                game.updateHistoryNavAppList(that.appid);
                wxUtils.aldSendEventFunc('成功跳转其它游戏', { 'n-history': allNavigateList.length, 'n-today': dailyNavigateList.length, 'toApp': that.appname, 'appid': that.appid, 'from': that.from, 'skin': getSkinStr(that.appskin) });
                wxUtils.aldSendEventFunc('成功跳转其它游戏-' + that.appname, { 'toApp': that.appname, 'appid': that.appid, 'from': that.from, 'skin': getSkinStr(that.appskin) });
            },
            fail: function (err) {
                log('取消跳转');
                // wxUtils.aldSendEventFunc('取消跳转-弹出导量框', { 'toApp': that.appname, 'appid': that.appid, 'from': that.from });
                // appListDialog.getSelf().setData("dialog-cancel");
            }
        });
    };
    /**
     * 设置信息
     * @param gameInfo 跳转游戏信息
     */
    NaviLoginItem.prototype.setData = function (data) {
        if (data) {
            this.appid = data.appid;
            this.appname = data.name;
            this.apppath = data.path;
            this.other = data.other;
            this.appskin = ICON_PATH + data.skin;
            if (data.bottom) {
                this.from = data.bottom;
            }
            this.gameNameLabel.text = data.name;
            if (data.gif) {
                this.gif = data.gif;
                wxUtils.setGIF(this.gameIconImage, data.gif.total, ICON_PATH + data.gif.path, data.gif.delay, data.gif.gap);
            }
            else {
                Laya.timer.clearAll(this.gameIconImage);
                this.gameIconImage.skin = ICON_PATH + data.skin;
            }
        }
        if (data.hot == 1) {
            this.hotImage.visible = true;
        }
        else {
            this.hotImage.visible = false;
        }
    };
    return NaviLoginItem;
}(ui.item_dir.NavLoginItemUI));
/**
* 登录对话框
*/
var LoginDialog = /** @class */ (function (_super) {
    __extends(LoginDialog, _super);
    function LoginDialog() {
        var _this = _super.call(this) || this;
        _this.btnNext.on(Laya.Event.CLICK, _this, _this.onNext);
        _this.btnNext.scale(0.01, 0.01);
        Laya.Tween.to(_this.btnNext, {
            scaleX: 1.0,
            scaleY: 1.0
        }, 250, null, null, 1000);
        _this.showNavigationView();
        return _this;
    }
    /**
     * 点击下一关
     */
    LoginDialog.prototype.onNext = function () {
        this.close();
    };
    /**
     * 显示导流视图
     */
    LoginDialog.prototype.showNavigationView = function () {
        this.navList.visible = true;
        this.navList.itemRender = NaviLoginItem;
        this.navList.renderHandler = new Laya.Handler(this, this.updateNaviView);
        //更新待跳转列表
        game.updateWaitingNavAppList();
        var bottomItemArray = [];
        for (var i = 0; i < game.loginIconList.length; i++) {
            var gameIcon = game.loginIconList[i];
            for (var i_1 = 0; i_1 < game.WAITING_APP_ARRAY.length; i_1++) {
                if (game.WAITING_APP_ARRAY[i_1].skin == gameIcon) {
                    var gameInfo = game.WAITING_APP_ARRAY[i_1];
                    var gameInfo1 = JSON.parse(JSON.stringify(gameInfo));
                    bottomItemArray.push(gameInfo1);
                    break;
                }
            }
        }
        this.navList.array = bottomItemArray;
    };
    LoginDialog.prototype.updateNaviView = function (cell, index) {
        cell.setData(cell.dataSource);
    };
    return LoginDialog;
}(ui.dialog_dir.DialogLoginUI));
//# sourceMappingURL=DialogLogin.js.map