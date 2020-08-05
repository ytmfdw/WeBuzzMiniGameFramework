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
var DrawerItem = /** @class */ (function (_super) {
    __extends(DrawerItem, _super);
    function DrawerItem() {
        var _this = _super.call(this) || this;
        _this.appid = '';
        _this.appname = '';
        _this.apppath = '';
        _this.appskin = '';
        _this.other = 0;
        _this.source = 0; //1:抽屉，2：底部
        _this.appqr = '';
        _this.from = 'none';
        _this.gif = null;
        _this.drawerItemSprite.on(Laya.Event.CLICK, _this, _this.clickItem);
        return _this;
    }
    DrawerItem.prototype.clickItem = function (e) {
        e.stopPropagation();
        var that = this;
        log('appid=' + this.appid + ',path=' + this.apppath + ',other=' + this.other);
        if (this.other == 0) {
            wxUtils.aldSendEventFunc('点击跳转其它游戏', { 'toApp': that.appname, 'appid': that.appid, 'from': that.from, 'skin': getSkinStr(that.appskin) });
            wx.navigateToMiniProgram({
                appId: this.appid,
                path: this.apppath,
                extraData: {
                    from: 'marbe',
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
                    wxUtils.aldSendEventFunc('取消跳转-弹出导量框', { 'toApp': that.appname, 'appid': that.appid, 'from': that.from });
                    appListDialog.getSelf().setData("dialog-cancel");
                    ifNextAppList = false;
                }
            });
        }
        else if (this.other == 1) {
            //跳至一起拼步数
            wxUtils.aldSendEventFunc('点击双跳', { 'toApp': that.appid + '-' + that.appname, 'from': that.from });
            wx.navigateToMiniProgram({
                appId: "wx0df340653291122c",
                path: "pages/navigate/navigate",
                extraData: {
                    from: 'pipe',
                    appid: that.appid,
                    name: that.appname,
                    skin: that.appskin,
                    path: that.apppath
                },
                envVersion: 'release',
                success: function (res) {
                    // 跳转成功
                    log('跳转成功');
                    wxUtils.aldSendEventFunc('双跳成功跳至一起拼步数', { 'toApp': that.appid + '-' + that.appname, 'from': that.from });
                }
            });
        }
        else if (this.other == 2) {
            wxUtils.aldSendEventFunc('点击跳转二维码', { 'toApp': that.appid + '-' + that.appname, 'from': that.from });
            wx.previewImage({
                urls: [this.appqr],
                success: function () {
                    log('成功弹出二维码');
                    wxUtils.aldSendEventFunc('跳转弹出二维码', { 'toApp': that.appid + '-' + that.appname, 'from': that.from });
                },
                complete: function () {
                }
            });
        }
    };
    DrawerItem.prototype.setData = function (data, scaleAni, scaleN) {
        if (data) {
            this.appid = data.appid;
            this.appname = data.name;
            this.apppath = data.path;
            this.other = data.other;
            this.appskin = ICON_PATH + data.skin;
            if (data.bottom) {
                this.from = data.bottom;
            }
            if (data.other == 2) {
                this.appqr = data.qr;
            }
            this.itemText.text = data.name;
            if (data.gif) {
                this.gif = data.gif;
                wxUtils.setGIF(this.itemIcon, data.gif.total, ICON_PATH + data.gif.path, data.gif.delay, data.gif.gap);
            }
            else {
                Laya.timer.clearAll(this.itemIcon);
                this.itemIcon.skin = ICON_PATH + data.skin;
            }
        }
        if (scaleAni == true && data.ani && data.ani == 1) {
            this.scaleAni.play(0, true);
        }
        else {
            if (scaleN && scaleN > 0) {
                this.drawerItemSprite.scaleX = scaleN;
                this.drawerItemSprite.scaleY = scaleN;
            }
            else {
                this.drawerItemSprite.scaleX = 1;
                this.drawerItemSprite.scaleY = 1;
            }
        }
        if (data.hot == 1) {
            this.hotDot.visible = true;
        }
        else {
            this.hotDot.visible = false;
        }
    };
    return DrawerItem;
}(ui.item_dir.drawerItemUI));
var DrawerItemBig = /** @class */ (function (_super) {
    __extends(DrawerItemBig, _super);
    function DrawerItemBig() {
        var _this = _super.call(this) || this;
        _this.appid = '';
        _this.appname = '';
        _this.apppath = '';
        _this.appskin = '';
        _this.other = 0;
        _this.source = 0;
        _this.appqr = '';
        _this.from = 'none';
        _this.gif = null;
        _this.drawerItemSprite.on(Laya.Event.CLICK, _this, _this.clickItem);
        return _this;
    }
    DrawerItemBig.prototype.clickItem = function (e) {
        e.stopPropagation();
        var that = this;
        log('appid=' + this.appid + ',path=' + this.apppath + ',other=' + this.other);
        if (this.other == 0) {
            wxUtils.aldSendEventFunc('点击跳转其它游戏', { 'toApp': that.appname, 'appid': that.appid, 'from': that.from, 'skin': getSkinStr(that.appskin) });
            wx.navigateToMiniProgram({
                appId: this.appid,
                path: this.apppath,
                extraData: {
                    from: 'marbe',
                    type: 'navi',
                    list: JSON.stringify(allNavigateList)
                },
                envVersion: 'release',
                success: function (res) {
                    // 跳转成功
                    log('跳转成功');
                    //记录跳转列表
                    game.updateHistoryNavAppList(that.appid);
                    wxUtils.aldSendEventFunc('成功跳转其它游戏', { 'n-history': allNavigateList.length, 'n-today': dailyNavigateList.length, 'toApp': that.appname, 'appid': that.appid, 'from': that.from, 'waitN': game.WAITING_APP_ARRAY.length, 'skin': getSkinStr(that.appskin) });
                    wxUtils.aldSendEventFunc('成功跳转其它游戏-' + that.appname, { 'toApp': that.appname, 'appid': that.appid, 'from': that.from, 'skin': getSkinStr(that.appskin) });
                },
                fail: function (err) {
                    log('取消跳转');
                    wxUtils.aldSendEventFunc('取消跳转-弹出导量框', { 'toApp': that.appname, 'appid': that.appid, 'from': that.from, 'waitN': game.WAITING_APP_ARRAY.length });
                    appListDialog.getSelf().setData("dialog-cancel");
                    ifNextAppList = false;
                }
            });
        }
        else if (this.other == 1) {
            //跳至一起拼步数
            wxUtils.aldSendEventFunc('点击双跳', { 'toApp': that.appid + '-' + that.appname, 'from': that.from });
            wx.navigateToMiniProgram({
                appId: APPID,
                path: "pages/navigate/navigate",
                extraData: {
                    from: 'pipe',
                    appid: that.appid,
                    name: that.appname,
                    skin: that.appskin,
                    path: that.apppath
                },
                envVersion: 'release',
                success: function (res) {
                    // 跳转成功
                    log('跳转成功');
                    wxUtils.aldSendEventFunc('双跳成功跳至一起拼步数', { 'toApp': that.appid + '-' + that.appname, 'from': that.from });
                }
            });
        }
        else if (this.other == 2) {
            wxUtils.aldSendEventFunc('点击跳转二维码', { 'toApp': that.appid + '-' + that.appname, 'from': that.from });
            wx.previewImage({
                urls: [this.appqr],
                success: function () {
                    log('成功弹出二维码');
                    wxUtils.aldSendEventFunc('跳转弹出二维码', { 'toApp': that.appid + '-' + that.appname, 'from': that.from });
                },
                complete: function () {
                }
            });
        }
    };
    DrawerItemBig.prototype.setData = function (data, scaleAni) {
        if (data) {
            this.appid = data.appid;
            this.appname = data.name;
            this.apppath = data.path;
            this.other = data.other;
            var tmpSkin = ICON_PATH + data.skin;
            this.appskin = tmpSkin;
            if (data.bottom) {
                this.from = data.bottom;
            }
            if (data.other == 2) {
                this.appqr = data.qr;
            }
            this.itemText.text = data.name;
            if (data.gif) {
                this.gif = data.gif;
                wxUtils.setGIF(this.itemIcon, data.gif.total, ICON_PATH + data.gif.path, data.gif.delay, data.gif.gap);
            }
            else {
                Laya.timer.clearAll(this.itemIcon);
                this.itemIcon.skin = ICON_PATH + data.skin;
            }
        }
        if (scaleAni == true && data.ani && data.ani == 1) {
            this.scaleAni.play(0, true);
        }
        else {
            this.drawerItemSprite.scaleX = 1;
            this.drawerItemSprite.scaleY = 1;
        }
        if (data.hot == 1) {
            this.hotDot.visible = true;
        }
        else {
            this.hotDot.visible = false;
        }
    };
    return DrawerItemBig;
}(ui.item_dir.drawerItemBigUI));
var DrawerItemBig2 = /** @class */ (function (_super) {
    __extends(DrawerItemBig2, _super);
    function DrawerItemBig2() {
        var _this = _super.call(this) || this;
        _this.appid = '';
        _this.appname = '';
        _this.apppath = '';
        _this.appskin = '';
        _this.other = 0;
        _this.source = 0; //1:抽屉，2：底部
        _this.appqr = '';
        _this.from = 'none';
        _this.gif = null;
        _this.drawerItemSprite.on(Laya.Event.CLICK, _this, _this.clickItem);
        return _this;
    }
    DrawerItemBig2.prototype.clickItem = function (e) {
        e.stopPropagation();
        var that = this;
        log('appid=' + this.appid + ',path=' + this.apppath + ',other=' + this.other);
        if (this.other == 0) {
            wxUtils.aldSendEventFunc('点击跳转其它游戏', { 'toApp': that.appname, 'appid': that.appid, 'from': that.from, 'skin': getSkinStr(that.appskin) });
            wx.navigateToMiniProgram({
                appId: this.appid,
                path: this.apppath,
                extraData: {
                    from: 'marbe',
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
                    wxUtils.aldSendEventFunc('取消跳转-弹出导量框', { 'toApp': that.appname, 'appid': that.appid, 'from': that.from });
                    appListDialog.getSelf().setData("dialog-cancel");
                    ifNextAppList = false;
                }
            });
        }
        else if (this.other == 1) {
            //跳至一起拼步数
            wxUtils.aldSendEventFunc('点击双跳', { 'toApp': that.appid + '-' + that.appname, 'from': that.from });
            wx.navigateToMiniProgram({
                appId: "wx0df340653291122c",
                path: "pages/navigate/navigate",
                extraData: {
                    from: 'pipe',
                    appid: that.appid,
                    name: that.appname,
                    skin: getSkinStr(that.appskin),
                    path: that.apppath
                },
                envVersion: 'release',
                success: function (res) {
                    // 跳转成功
                    log('跳转成功');
                    wxUtils.aldSendEventFunc('双跳成功跳至一起拼步数', { 'toApp': that.appid + '-' + that.appname, 'from': that.from });
                }
            });
        }
        else if (this.other == 2) {
            wxUtils.aldSendEventFunc('点击跳转二维码', { 'toApp': that.appid + '-' + that.appname, 'from': that.from });
            wx.previewImage({
                urls: [this.appqr],
                success: function () {
                    log('成功弹出二维码');
                    wxUtils.aldSendEventFunc('跳转弹出二维码', { 'toApp': that.appid + '-' + that.appname, 'from': that.from });
                },
                complete: function () {
                }
            });
        }
    };
    DrawerItemBig2.prototype.setData = function (data, scaleAni, scaleN) {
        if (data) {
            this.appid = data.appid;
            this.appname = data.name;
            this.apppath = data.path;
            this.other = data.other;
            this.appskin = ICON_PATH + data.skin;
            if (data.bottom) {
                this.from = data.bottom;
            }
            if (data.other == 2) {
                this.appqr = data.qr;
            }
            this.itemText.text = data.name;
            if (data.gif) {
                this.gif = data.gif;
                wxUtils.setGIF(this.itemIcon, data.gif.total, ICON_PATH + data.gif.path, data.gif.delay, data.gif.gap);
            }
            else {
                Laya.timer.clearAll(this.itemIcon);
                this.itemIcon.skin = ICON_PATH + data.skin;
            }
        }
        if (scaleAni == true && data.ani && data.ani == 1) {
            this.scaleAni.play(0, true);
        }
        else {
            if (scaleN && scaleN > 0) {
                this.drawerItemSprite.scaleX = scaleN;
                this.drawerItemSprite.scaleY = scaleN;
            }
            else {
                this.drawerItemSprite.scaleX = 1;
                this.drawerItemSprite.scaleY = 1;
            }
        }
        if (data.hot == 1) {
            this.hotDot.visible = true;
        }
        else {
            this.hotDot.visible = false;
        }
    };
    return DrawerItemBig2;
}(ui.item_dir.drawerItemBig2UI));
var NaviTopItem = /** @class */ (function (_super) {
    __extends(NaviTopItem, _super);
    function NaviTopItem() {
        var _this = _super.call(this) || this;
        _this.appid = '';
        _this.appname = '';
        _this.apppath = '';
        _this.appskin = '';
        _this.other = 0;
        _this.source = 0;
        _this.appqr = '';
        _this.from = 'none';
        _this.gif = null;
        _this.on(Laya.Event.CLICK, _this, _this.clickItem);
        return _this;
    }
    NaviTopItem.prototype.clickItem = function (e) {
        // e.stopPropagation();
        var that = this;
        var tappid = this.appid;
        var tname = this.appname;
        var tpath = this.apppath;
        var tskin = this.appskin;
        var tfrom = this.from;
        log('appid=' + this.appid + ',path=' + this.apppath + ',other=' + this.other);
        wxUtils.aldSendEventFunc('点击跳转其它游戏', { 'toApp': that.appname, 'appid': that.appid, 'from': that.from, 'skin': getSkinStr(that.appskin) });
        wx.navigateToMiniProgram({
            appId: tappid,
            path: tpath,
            extraData: {
                from: 'marbe',
                type: 'navi',
                list: JSON.stringify(allNavigateList)
            },
            envVersion: 'release',
            success: function (res) {
                // 跳转成功
                log('跳转成功');
                //记录跳转列表
                game.updateHistoryNavAppList(tappid);
                wxUtils.aldSendEventFunc('成功跳转其它游戏', { 'n-history': allNavigateList.length, 'n-today': dailyNavigateList.length, 'toApp': tname, 'appid': tappid, 'from': tfrom, 'skin': getSkinStr(tskin) });
            },
            fail: function (err) {
                ifNextAppList = false;
                appListDialog.getSelf().setData("dialog-cancel");
            }
        });
    };
    NaviTopItem.prototype.setData = function (data) {
        if (data) {
            this.appid = data.appid;
            this.appname = data.name;
            this.apppath = data.path;
            this.other = data.other;
            this.appskin = ICON_PATH + data.skin;
            if (data.bottom) {
                this.from = data.bottom;
            }
            if (data.gif) {
                this.gif = data.gif;
                wxUtils.setGIF(this.itemIcon, data.gif.total, ICON_PATH + data.gif.path, data.gif.delay, data.gif.gap);
            }
            else {
                Laya.timer.clearAll(this.itemIcon);
                this.itemIcon.skin = ICON_PATH + data.skin;
            }
        }
        if (data.hot == 1) {
            this.hotDot.visible = true;
        }
        else {
            this.hotDot.visible = false;
        }
    };
    return NaviTopItem;
}(ui.item_dir.NavTopItemUI));
var NaviPopItem = /** @class */ (function (_super) {
    __extends(NaviPopItem, _super);
    function NaviPopItem() {
        var _this = _super.call(this) || this;
        _this.appid = '';
        _this.appname = '';
        _this.apppath = '';
        _this.appskin = '';
        _this.other = 0;
        _this.source = 0;
        _this.appqr = '';
        _this.from = 'none';
        _this.gif = null;
        _this.on(Laya.Event.CLICK, _this, _this.clickItem);
        return _this;
    }
    NaviPopItem.prototype.clickItem = function (e) {
        e.stopPropagation();
        var that = this;
        log('appid=' + this.appid + ',path=' + this.apppath + ',other=' + this.other);
        wxUtils.aldSendEventFunc('点击跳转其它游戏', { 'toApp': that.appname, 'appid': that.appid, 'from': that.from, 'skin': getSkinStr(that.appskin) });
        wx.navigateToMiniProgram({
            appId: this.appid,
            path: this.apppath,
            extraData: {
                from: 'marbe',
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
                // ifNextAppList = false;
            }
        });
    };
    NaviPopItem.prototype.setData = function (data) {
        if (data) {
            this.appid = data.appid;
            this.appname = data.name;
            this.apppath = data.path;
            this.other = data.other;
            this.appskin = ICON_PATH + data.skin;
            if (data.bottom) {
                this.from = data.bottom;
            }
            this.itemText.text = data.name;
            if (data.gif) {
                this.gif = data.gif;
                wxUtils.setGIF(this.itemIcon, data.gif.total, ICON_PATH + data.gif.path, data.gif.delay, data.gif.gap);
            }
            else {
                Laya.timer.clearAll(this.itemIcon);
                this.itemIcon.skin = ICON_PATH + data.skin;
            }
        }
        if (data.hot == 1) {
            this.hotDot.visible = true;
        }
        else {
            this.hotDot.visible = false;
        }
    };
    return NaviPopItem;
}(ui.item_dir.NavPopItemUI));
/**
 * 底部导流视图1
 */
var NavigationBottomView1 = /** @class */ (function (_super) {
    __extends(NavigationBottomView1, _super);
    function NavigationBottomView1(gameArray) {
        var _this = _super.call(this) || this;
        _this.gameArray = gameArray;
        _this.size(450, 180);
        _this.repeatX = 5;
        _this.repeatY = 1;
        _this.spaceX = 25;
        _this.spaceY = 0;
        _this.itemRender = DrawerItem;
        // this.vScrollBarSkin = "";
        _this.renderHandler = new Laya.Handler(_this, _this.renderListHandler);
        _this.array = gameArray;
        return _this;
    }
    /**
     * 列表刷新 Handler
     * @param cell
     * @param index
     */
    NavigationBottomView1.prototype.renderListHandler = function (cell, index) {
        cell.setData(cell.dataSource, true);
    };
    return NavigationBottomView1;
}(Laya.List));
/**
 * 底部导流视图2
 */
var NavigationBottomView2 = /** @class */ (function (_super) {
    __extends(NavigationBottomView2, _super);
    function NavigationBottomView2(gameArray) {
        var _this = _super.call(this) || this;
        /**
         * 上次的下标
         */
        _this.preIndex = 0;
        _this.moveDirection = 0;
        _this.preMoveDir = 0;
        _this.gameArray = gameArray;
        _this.size(450, 100);
        _this.repeatX = _this.gameArray.length;
        _this.repeatY = 1;
        _this.spaceX = 25;
        _this.spaceY = 0;
        _this.itemRender = DrawerItem;
        _this.hScrollBarSkin = "";
        _this.renderHandler = new Laya.Handler(_this, _this.renderListHandler);
        _this.array = gameArray;
        _this.selectedIndex = 0;
        _this.mouseThrough = false;
        if (gameArray.length > 5) {
            _this.scrollToLast();
            _this.preIndex = 0;
            _this.preMoveDir = 1;
            Laya.timer.loop(5000, _this, _this.checkScroll);
        }
        return _this;
    }
    NavigationBottomView2.prototype.checkScroll = function () {
        if (this.startIndex == this.preIndex && this.preMoveDir == this.moveDirection) {
            this.scrollTo(0);
            this.scrollToLast();
            this.preIndex = 0;
            this.preMoveDir = 1;
        }
        else {
            this.preIndex = this.startIndex;
            this.preMoveDir = this.moveDirection;
        }
    };
    /**
     * 循环滚动效果
     */
    NavigationBottomView2.prototype.scrollToLast = function () {
        var self = this;
        this.moveDirection = 1;
        this.tweenTo(this.gameArray.length - 5, 4000 * (this.gameArray.length - 5), new Laya.Handler(self, function () {
            self.moveDirection = 0;
            Laya.timer.once(1000, self, self.scrollToFirst);
        }));
    };
    NavigationBottomView2.prototype.scrollToFirst = function () {
        var self = this;
        this.moveDirection = -1;
        this.tweenTo(0, 4000 * (this.gameArray.length - 5), new Laya.Handler(self, function () {
            self.moveDirection = 0;
            Laya.timer.once(1000, self, self.scrollToLast);
        }));
    };
    /**
     * 列表刷新 Handler
     * @param cell
     * @param index
     */
    NavigationBottomView2.prototype.renderListHandler = function (cell, index) {
        cell.setData(cell.dataSource, false);
    };
    return NavigationBottomView2;
}(Laya.List));
/**
 * 底部导流视图3
 */
var NavigationBottomView3 = /** @class */ (function (_super) {
    __extends(NavigationBottomView3, _super);
    function NavigationBottomView3(gameArray) {
        var _this = _super.call(this) || this;
        _this.gameArray = gameArray;
        _this.size(450, 100);
        _this.repeatX = _this.gameArray.length;
        _this.repeatY = 1;
        _this.spaceX = 25;
        _this.spaceY = 0;
        _this.itemRender = DrawerItem;
        _this.hScrollBarSkin = "";
        _this.renderHandler = new Laya.Handler(_this, _this.renderListHandler);
        // this.array = gameArray;
        _this.updateListData();
        if (gameArray.length > 5) {
            Laya.timer.loop(8000, _this, _this.updateListData);
        }
        return _this;
    }
    NavigationBottomView3.prototype.updateListData = function () {
        // 随机选择5款游戏导流
        var indexArray = [];
        while (true) {
            var gameIndex = Math.floor(Math.random() * this.gameArray.length);
            if (indexArray.indexOf(gameIndex) == -1 && gameIndex < this.gameArray.length) {
                indexArray.push(gameIndex);
            }
            if (indexArray.length == 5) {
                break;
            }
        }
        var bottomItemArray = [];
        for (var i = 0; i < indexArray.length; i++) {
            var gameInfo = this.gameArray[indexArray[i]];
            bottomItemArray.push(gameInfo);
        }
        this.array = bottomItemArray;
    };
    /**
     * 列表刷新 Handler
     * @param cell
     * @param index
     */
    NavigationBottomView3.prototype.renderListHandler = function (cell, index) {
        cell.setData(cell.dataSource, true);
    };
    return NavigationBottomView3;
}(Laya.List));
/**
 * 底部导流视图4
 */
var NavigationBottomView4 = /** @class */ (function (_super) {
    __extends(NavigationBottomView4, _super);
    function NavigationBottomView4(gameArray) {
        var _this = _super.call(this) || this;
        /**
         * 上次的下标
         */
        _this.preIndex = 0;
        _this.moveDirection = 0;
        _this.preMoveDir = 0;
        _this.gameArray = gameArray;
        for (var i = 0; i < 6; i++) {
            _this.gameArray = _this.gameArray.concat(gameArray);
        }
        _this.size(1080, 220);
        _this.repeatX = _this.gameArray.length;
        _this.repeatY = 1;
        _this.spaceX = 40;
        _this.spaceY = 0;
        _this.itemRender = DrawerItem;
        _this.hScrollBarSkin = "";
        _this.renderHandler = new Laya.Handler(_this, _this.renderListHandler);
        _this.array = _this.gameArray;
        _this.selectedIndex = 0;
        _this.mouseThrough = false;
        _this.scrollToLast();
        _this.preIndex = 0;
        _this.preMoveDir = 1;
        Laya.timer.loop(5000, _this, _this.checkScroll);
        return _this;
    }
    NavigationBottomView4.prototype.checkScroll = function () {
        if (this.startIndex == this.preIndex && this.preMoveDir == this.moveDirection) {
            this.scrollTo(0);
            this.scrollToLast();
            this.preIndex = 0;
            this.preMoveDir = 1;
        }
        else {
            this.preIndex = this.startIndex;
            this.preMoveDir = this.moveDirection;
        }
    };
    /**
     * 循环滚动效果
     */
    NavigationBottomView4.prototype.scrollToLast = function () {
        var self = this;
        this.moveDirection = 1;
        this.tweenTo(this.gameArray.length - 5, 2000 * (this.gameArray.length - 5), new Laya.Handler(self, function () {
            self.moveDirection = 0;
            Laya.timer.once(1000, self, self.scrollToFirst);
        }));
    };
    NavigationBottomView4.prototype.scrollToFirst = function () {
        var self = this;
        this.moveDirection = -1;
        this.tweenTo(0, 2000 * (this.gameArray.length - 5), new Laya.Handler(self, function () {
            self.moveDirection = 0;
            Laya.timer.once(1000, self, self.scrollToLast);
        }));
    };
    /**
     * 列表刷新 Handler
     * @param cell
     * @param index
     */
    NavigationBottomView4.prototype.renderListHandler = function (cell, index) {
        cell.setData(cell.dataSource, false, 1.1);
    };
    return NavigationBottomView4;
}(Laya.List));
/**
 * 底部导流视图5
 */
var NavigationBottomView5 = /** @class */ (function (_super) {
    __extends(NavigationBottomView5, _super);
    function NavigationBottomView5(gameArray) {
        var _this = _super.call(this) || this;
        _this.gameArray = gameArray;
        _this.size(450, 190);
        _this.repeatX = 5;
        _this.repeatY = 2;
        _this.spaceX = 25;
        _this.spaceY = 5;
        _this.itemRender = DrawerItem;
        // this.hScrollBarSkin = "";
        _this.renderHandler = new Laya.Handler(_this, _this.renderListHandler);
        _this.array = gameArray;
        return _this;
    }
    /**
     * 列表刷新 Handler
     * @param cell
     * @param index
     */
    NavigationBottomView5.prototype.renderListHandler = function (cell, index) {
        cell.setData(cell.dataSource, true);
    };
    return NavigationBottomView5;
}(Laya.List));
/**
 * 弹框导流视图6
 */
var NavigationBottomView6 = /** @class */ (function (_super) {
    __extends(NavigationBottomView6, _super);
    function NavigationBottomView6(gameArray) {
        var _this = _super.call(this) || this;
        _this.gameArray = gameArray;
        _this.size(860, appListHeight);
        _this.repeatX = 2;
        // this.repeatY = (gameArray.length > 15) ? 6 : 5;
        _this.spaceX = 60;
        _this.spaceY = 20;
        _this.itemRender = NaviPopItem;
        _this.vScrollBarSkin = "";
        _this.renderHandler = new Laya.Handler(_this, _this.renderListHandler);
        _this.array = gameArray;
        return _this;
    }
    /**
     * 列表刷新 Handler
     * @param cell
     * @param index
     */
    NavigationBottomView6.prototype.renderListHandler = function (cell, index) {
        cell.setData(cell.dataSource);
    };
    return NavigationBottomView6;
}(Laya.List));
//# sourceMappingURL=DrawerItem.js.map