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
var appListDialog = /** @class */ (function (_super) {
    __extends(appListDialog, _super);
    function appListDialog() {
        var _this = _super.call(this) || this;
        _this.bottomView6 = null;
        _this.from = "none";
        _this.source = "none";
        _this.height = SCREENHEIGHT;
        _this.bgImg.height = _this.height;
        _this.bgImg.x = 0;
        _this.bgImg.y = 0;
        _this.maskView.height = Laya.stage.height;
        _this.maskView.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#9c988d");
        if (SCREENHEIGHT > LARGE_PHONE_H) {
            _this.appList.y += IPHONEX_TOP;
            _this.titleLabel.y += IPHONEX_TOP;
        }
        _this.btnContinue.y = _this.height - 150;
        appListHeight = _this.btnContinue.y - _this.titleLabel.y - 120;
        _this.btnClose.on(Laya.Event.CLICK, _this, _this.closeClick);
        _this.btnContinue.on(Laya.Event.CLICK, _this, _this.closeClick);
        return _this;
    }
    appListDialog.prototype.closeClick = function (e) {
        e.stopPropagation();
        this.close();
        wxUtils.aldSendEventFunc('关闭导量框', { 'from': this.from });
        // log('ifNextAppList=' + ifNextAppList);
        if (ifNextAppList) {
            if (game.nextNaviOrderMode == 1) {
                // 特殊渠道，多一个弹出框
                var ifShowNavi = (ifNaviCheckArea == false) || (ifNaviCheckArea && areaCon);
                game.updateWaitingNavAppList();
                if (ifShowNavi && game.WAITING_APP_ARRAY != null && game.WAITING_APP_ARRAY.length > 3 && game.navi3Visible == true) {
                    wxUtils.aldSendEventFunc('取消跳转-弹出导量框', { 'from': 'passpage' });
                    appListDialog1.getSelf().setData("pop1");
                    ifNextAppList = true;
                }
                else {
                    // 关闭后进入下一关
                    game.level++;
                    game.initGame(game.level);
                    ifNextAppList = false;
                    if (game.level > game.autoNaviLevel) {
                        this.setAutoNav();
                    }
                }
            }
            else {
                game.passPage.setBannerNaviView();
                Laya.stage.addChild(game.passPage);
            }
        }
        else {
            // 仅关闭导量框
            var passIndex = Laya.stage.getChildIndex(game.passPage);
            if (passIndex >= 0) {
                //在过关页面
                if (wxUtils.nextBannerAd) {
                    wxUtils.nextBannerAd.show();
                }
            }
            var gameIndex = Laya.stage.getChildIndex(game.gameUi);
            if (gameIndex >= 0) {
                //在过关页面
                if (wxUtils.gameBannerAd) {
                    wxUtils.gameBannerAd.show();
                }
            }
        }
    };
    appListDialog.prototype.setData = function (from, source) {
        var ifShowNavi = (ifNaviCheckArea == false) || (ifNaviCheckArea && areaCon);
        if (ifShowNavi == false) {
            //特殊区域内不弹出
            return;
        }
        this.source = "none";
        if (source) {
            this.source = source;
        }
        game.updateWaitingNavAppList();
        this.from = from;
        var that = this;
        if (game.WAITING_APP_ARRAY != null && game.WAITING_APP_ARRAY.length > 0) {
            this.appList.removeChildren();
            var bottomItemArray = [];
            //随机选12款
            var appNum = Math.max(1, game.WAITING_APP_ARRAY.length - 1); // 2 * rowNum;
            var drawerArr = [];
            for (var index = 0; index < game.WAITING_APP_ARRAY.length; index++) {
                drawerArr.push(index);
            }
            var tmpArr = [];
            if (drawerArr.length <= appNum) {
                tmpArr = drawerArr;
            }
            else {
                while (tmpArr.length < appNum) {
                    var ta = Math.floor(Math.random() * drawerArr.length);
                    tmpArr.push(drawerArr[ta]);
                    drawerArr.splice(ta, 1);
                }
            }
            for (var index = 0; index < tmpArr.length; index++) {
                var gameInfo = game.WAITING_APP_ARRAY[tmpArr[index]];
                var gameInfo1 = JSON.parse(JSON.stringify(gameInfo));
                gameInfo1["bottom"] = from;
                bottomItemArray.push(gameInfo1);
            }
            // bottomItemArray= bottomItemArray.concat(bottomItemArray).concat(bottomItemArray);
            var bottomView = new NavigationBottomView6(bottomItemArray);
            bottomView.pos(0, 0);
            this.bottomView6 = bottomView;
            Laya.timer.once(1500, Laya.stage, function (list, length) {
                list.tweenTo(length - 1, 2500 * length);
            }, [this.bottomView6, bottomItemArray.length]);
            this.appList.addChild(this.bottomView6);
            if (!this.isPopup) {
                this.popup();
            }
            var passIndex = Laya.stage.getChildIndex(game.passPage);
            if (passIndex >= 0) {
                //在过关页面
                if (wxUtils.nextBannerAd) {
                    wxUtils.nextBannerAd.hide();
                }
            }
            var gameIndex = Laya.stage.getChildIndex(game.gameUi);
            if (gameIndex >= 0) {
                //在过关页面
                if (wxUtils.gameBannerAd) {
                    wxUtils.gameBannerAd.hide();
                }
            }
            this.btnContinue.visible = true;
            this.btnContinue.scaleX = 0;
            this.btnContinue.scaleY = 0;
        }
        else {
        }
    };
    appListDialog.prototype.setAutoNav = function () {
        game.updateWaitingNavAppList();
        if (game.WAITING_APP_ARRAY != null && game.WAITING_APP_ARRAY.length > 0) {
            var aid = Math.floor(game.WAITING_APP_ARRAY.length * Math.random());
            var app = game.WAITING_APP_ARRAY[aid];
            wxUtils.aldSendEventFunc('点击跳转其它游戏', { 'toApp': app.name, 'appid': app.appid, 'from': 'next-auto', 'skin': getSkinStr(app.skin) });
            wx.navigateToMiniProgram({
                appId: app.appid,
                path: app.path,
                extraData: {
                    from: 'marbe',
                    type: 'navi',
                    list: JSON.stringify(allNavigateList)
                },
                envVersion: 'release',
                success: function (res) {
                    // 跳转成功
                    game.updateHistoryNavAppList(app.appid);
                    wxUtils.aldSendEventFunc('成功跳转其它游戏', { 'n-history': allNavigateList.length, 'n-today': dailyNavigateList.length, 'toApp': app.name, 'appid': app.appid, 'from': 'next-auto', 'skin': getSkinStr(app.skin) });
                },
                fail: function (err) {
                }
            });
        }
    };
    appListDialog.getSelf = function () {
        if (!appListDialog.self) {
            appListDialog.self = new appListDialog();
        }
        return appListDialog.self;
    };
    appListDialog.self = null;
    return appListDialog;
}(ui.dialog_dir.dialogAppListUI));
//# sourceMappingURL=appListDialog.js.map