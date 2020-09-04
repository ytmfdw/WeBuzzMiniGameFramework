/*
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * 导量对话框２
 *
 */
    
    
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NaviTopItem1 = /** @class */ (function (_super) {
    __extends(NaviTopItem1, _super);
    function NaviTopItem1() {
        var _this = _super.call(this) || this;
        _this.appid = '';
        _this.appname = '';
        _this.apppath = '';
        _this.appskin = '';
        _this.other = 0;
        _this.source = 0;
        _this.appqr = '';
        _this.from = 'top1';
        _this.gif = null;
        _this.on(Laya.Event.CLICK, _this, _this.clickItem);
        return _this;
    }
    NaviTopItem1.prototype.clickItem = function (e) {
        // e.stopPropagation();
        var that = this;
        var tappid = this.appid;
        var tname = this.appname;
        var tpath = this.apppath;
        var tskin = this.appskin;
        var tfrom = this.from;
        wx.navigateToMiniProgram({
            appId: tappid,
            path: tpath,
            extraData: {
            },
            envVersion: 'release',
            success: function (res) {
                // 跳转成功
                log('跳转成功');
            },
            fail: function (err) {
                // appListDialog.getSelf().setData("dialog-cancel");
            }
        });
    };
    NaviTopItem1.prototype.setData = function (data) {
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
    return NaviTopItem1;
}(ui.item_dir.NavTopItemUI));
var NaviPopItem1 = /** @class */ (function (_super) {
    __extends(NaviPopItem1, _super);
    function NaviPopItem1() {
        var _this = _super.call(this) || this;
        _this.appid = '';
        _this.appname = '';
        _this.apppath = '';
        _this.appskin = '';
        _this.other = 0;
        _this.source = 0;
        _this.appqr = '';
        _this.from = 'pop1';
        _this.gif = null;
        _this.on(Laya.Event.CLICK, _this, _this.clickItem);
        return _this;
    }
    NaviPopItem1.prototype.clickItem = function (e) {
        e.stopPropagation();
        var that = this;
        wx.navigateToMiniProgram({
            appId: this.appid,
            path: this.apppath,
            extraData: {
            },
            envVersion: 'release',
            success: function (res) {
                // 跳转成功
                log('跳转成功');
            },
            fail: function (err) {
                log('取消跳转');
            }
        });
    };
    NaviPopItem1.prototype.setData = function (data) {
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
    return NaviPopItem1;
}(ui.item_dir.NavPopItem1UI));
/**
 * 弹框导流视图7
 */
var NavigationBottomView7 = /** @class */ (function (_super) {
    __extends(NavigationBottomView7, _super);
    function NavigationBottomView7(gameArray) {
        var _this = _super.call(this) || this;
        _this.gameArray = gameArray;
        _this.size(1000, 1240);
        _this.repeatX = 3;
        // this.repeatY = (gameArray.length > 15) ? 6 : 5;
        _this.spaceX = 20;
        _this.spaceY = 20;
        _this.itemRender = NaviPopItem1;
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
    NavigationBottomView7.prototype.renderListHandler = function (cell, index) {
        cell.setData(cell.dataSource);
    };
    return NavigationBottomView7;
}(Laya.List));
var appListDialog1 = /** @class */ (function (_super) {
    __extends(appListDialog1, _super);
    function appListDialog1() {
        var _this = _super.call(this) || this;
        _this.bottomView6 = null;
        _this.from = "none";
        _this.source = "none";
        _this.height = SCREENHEIGHT;
        _this.maskView.height = Laya.stage.height;
        _this.maskView.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#adadad");
        if (SCREENHEIGHT > LARGE_PHONE_H) {
            _this.appList.y += IPHONEX_TOP;
            _this.titleLabel.y += IPHONEX_TOP;
            _this.topNavView.y += IPHONEX_TOP;
            _this.btnContinue.y += IPHONEX_TOP;
        }
        // this.btnContinue.y = this.height - 150;
        // appListHeight = this.btnContinue.y - this.titleLabel.y - 120;
        _this.btnContinue.on(Laya.Event.CLICK, _this, _this.closeClick);
        return _this;
    }
    appListDialog1.prototype.closeClick = function (e) {
        e.stopPropagation();
        wxUtils.hideBanner();
        this.close();
        // log('ifNextAppList=' + ifNextAppList);
        if (ifNextAppList) {
            // 关闭后进入下一关
            game.level++;
            game.initGame(game.level);
            ifNextAppList = false;
            if (game.level > game.autoNaviLevel) {
                this.setAutoNav();
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
    //展示顶部导量 
    appListDialog1.prototype.showTopAppList = function () {
        game.updateWaitingNavAppList();
        if (game.WAITING_APP_ARRAY != null && game.WAITING_APP_ARRAY.length > 0) {
            log('展示顶部导量');
            // this.topList.removeChildren();
            this.topList.itemRender = NaviTopItem1;
            this.topList.hScrollBarSkin = "";
            this.topList.renderHandler = new Laya.Handler(this, this.renderListHandler);
            var bottomItemArray = [];
            for (var i = 0; i < game.WAITING_APP_ARRAY.length; i++) {
                var gameInfo = game.WAITING_APP_ARRAY[i];
                var gameInfo1 = JSON.parse(JSON.stringify(gameInfo));
                gameInfo1["bottom"] = "top1";
                bottomItemArray.push(gameInfo1);
            }
            this.topList.array = bottomItemArray;
            Laya.timer.clear(this, this.navViewAni);
            Laya.timer.loop(2000, this, this.navViewAni);
        }
        else {
            this.topNavView.visible = false;
        }
    };
    appListDialog1.prototype.navViewAni = function () {
        var currentIndex = this.topList.startIndex;
        if (currentIndex < this.topList.array.length - 4) {
            this.topList.tweenTo(currentIndex + 1, 320);
        }
        else {
            this.topList.tweenTo(0, 320);
        }
    };
    /**
     * 列表刷新 Handler
     * @param cell
     * @param index
     */
    appListDialog1.prototype.renderListHandler = function (cell, index) {
        cell.setData(cell.dataSource);
    };
    appListDialog1.prototype.setData = function (from, source) {
        this.showTopAppList();
        this.source = "none";
        if (source) {
            this.source = source;
        }
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
                gameInfo1["bottom"] = "pop1";
                bottomItemArray.push(gameInfo1);
            }
            // bottomItemArray= bottomItemArray.concat(bottomItemArray).concat(bottomItemArray);
            var bottomView = new NavigationBottomView7(bottomItemArray);
            bottomView.pos(40, 0);
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
            //延迟出现
            Laya.timer.once(game.cancelBtnDelay, this, function () {
                    Laya.Tween.to(that.btnContinue, { scaleX: 1, scaleY: 1 }, 400, Laya.Ease.linearNone);
                });
            }
        else {
        }
    };
    appListDialog1.prototype.setAutoNav = function () {
        game.updateWaitingNavAppList();
        if (game.WAITING_APP_ARRAY != null && game.WAITING_APP_ARRAY.length > 0) {
            var aid = Math.floor(game.WAITING_APP_ARRAY.length * Math.random());
            var app = game.WAITING_APP_ARRAY[aid];
            wx.navigateToMiniProgram({
                appId: app.appid,
                path: app.path,
                extraData: {
                },
                envVersion: 'release',
                success: function (res) {
                    // 跳转成功
                },
                fail: function (err) {
                }
            });
        }
    };
    appListDialog1.getSelf = function () {
        if (!appListDialog1.self) {
            appListDialog1.self = new appListDialog1();
        }
        return appListDialog1.self;
    };
    appListDialog1.self = null;
    return appListDialog1;
}(ui.dialog_dir.dialogAppList1UI));
//# sourceMappingURL=appListDialog1.js.map