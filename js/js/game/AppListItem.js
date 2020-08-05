var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AppListItem = /** @class */ (function (_super) {
    __extends(AppListItem, _super);
    function AppListItem() {
        var _this = _super.call(this) || this;
        _this.gameInfo = null;
        _this.on(Laya.Event.CLICK, _this, _this.click);
        return _this;
    }
    AppListItem.prototype.click = function (e) {
        e.stopPropagation();
        var that = this;
        log('appid=' + that.gameInfo.appid + ',path=' + that.gameInfo.path + ',toApp=' + that.gameInfo.name);
        if (that.gameInfo.other == 0) {
            wxUtils.aldSendEventFunc('点击跳转其它游戏', { 'toApp': that.gameInfo.name, 'appid': that.gameInfo.appid, 'from': 'exitApplist', 'skin': getSkinStr(ICON_PATH + that.gameInfo.skin) });
            wx.navigateToMiniProgram({
                appId: that.gameInfo.appid,
                path: that.gameInfo.path,
                extraData: {
                    from: 'Clash',
                    type: 'navi',
                    list: JSON.stringify(allNavigateList)
                },
                envVersion: 'release',
                success: function (res) {
                    // 跳转成功
                    log('跳转成功');
                    game.updateHistoryNavAppList(that.gameInfo.appid);
                    wxUtils.aldSendEventFunc('成功跳转其它游戏', { 'n-history': allNavigateList.length, 'n-today': dailyNavigateList.length, 'toApp': that.gameInfo.name, 'appid': that.gameInfo.appid, 'from': 'exitApplist', 'waitN': game.WAITING_APP_ARRAY.length, 'skin': getSkinStr(ICON_PATH + that.gameInfo.skin) });
                    wxUtils.aldSendEventFunc('成功跳转其它游戏-' + that.gameInfo.name, { 'toApp': that.gameInfo.name, 'appid': that.gameInfo.appid, 'from': 'exitApplist', 'waitN': game.WAITING_APP_ARRAY.length, 'skin': getSkinStr(ICON_PATH + that.gameInfo.skin) });
                },
                fail: function (err) {
                    log('取消跳转');
                    wxUtils.aldSendEventFunc('取消跳转-弹出导量框', { 'from': 'exitApplist' });
                    appListDialog.getSelf().setData("dialog-cancel");
                }
            });
        }
        else if (that.gameInfo.other == 1) {
            //跳至一起拼步数
            wxUtils.aldSendEventFunc('点击双跳', { 'toApp': that.gameInfo.appid + '-' + that.gameInfo.name, 'from': that.gameInfo.from });
            wx.navigateToMiniProgram({
                appId: "wx0df340653291122c",
                path: "pages/navigate/navigate",
                extraData: {
                    from: 'pipe',
                    appid: that.gameInfo.appid,
                    name: that.gameInfo.name,
                    skin: that.gameInfo.skin,
                    path: that.gameInfo.path
                },
                envVersion: 'release',
                success: function (res) {
                    // 跳转成功
                    log('跳转成功');
                    wxUtils.aldSendEventFunc('双跳成功跳至一起拼步数', { 'toApp': that.gameInfo.appid + '-' + that.gameInfo.name, 'from': that.gameInfo.from });
                }
            });
        }
        else if (that.gameInfo.other == 2) {
            wxUtils.aldSendEventFunc('点击跳转二维码', { 'toApp': that.gameInfo.appid + '-' + that.gameInfo.name, 'from': that.gameInfo.from });
            wx.previewImage({
                urls: [that.gameInfo.appqr],
                success: function () {
                    log('成功弹出二维码');
                    wxUtils.aldSendEventFunc('跳转弹出二维码', { 'toApp': that.gameInfo.appid + '-' + that.gameInfo.name, 'from': that.gameInfo.from });
                },
                complete: function () {
                }
            });
        }
    };
    AppListItem.prototype.setData = function (gameInfo) {
        this.gameInfo = gameInfo;
        /*     {
             "path": "",
             "min": 0.4,
             "ani": 1,
             "other": 0,
             "name": "水管大师",
             "hot": 0,
             "appid": "wx037309b92888e0bf",
             "max": 0.6,
             "skin": "sgds1.jpg"
         }*/
        // this.gameIconImage.skin = gameInfo.skin;
        if (gameInfo.gif) {
            // utils.setGIF(this.gameIconImage, gameInfo.gif.total, gameInfo.gif.path, gameInfo.gif.delay, gameInfo.gif.gap);
            //path + idx + ".jpg";
            this.gameIconImage.skin = ICON_PATH + gameInfo.gif.path + "0" + ".jpg";
        }
        else {
            this.gameIconImage.skin = ICON_PATH + gameInfo.skin;
        }
        this.gameNameLabel.text = gameInfo.name;
        this.hotImage.visible = gameInfo.hot;
    };
    return AppListItem;
}(ui.item_dir.AppListItemUI));
//# sourceMappingURL=AppListItem.js.map