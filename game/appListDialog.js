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
 * 导量对话框
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
        if (ifNextAppList) {
            if (game.nextNaviOrderMode == 1) {
                    // 关闭后进入下一关
                    game.level++;
                    game.initGame(game.level);
                    ifNextAppList = false;
                    if (game.level > game.autoNaviLevel) {
                        this.setAutoNav();
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
                Laya.Tween.to(that.btnContinue, { scaleX: 1, scaleY: 1 }, 400, Laya.Ease.linearNone);
        }
        else {
        }
    };
    appListDialog.prototype.setAutoNav = function () {
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