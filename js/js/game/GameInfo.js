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
 * 游戏主页，在该界面提供画板，由此画板实现游戏逻辑功能
 * 主要成员：
 *  layout:Laya.Sprite  ：游戏画板，游戏逻辑在该画板上呈现
 * 主要函数：
 *  initGameUi()  游戏加载
 *
 *  onSettings()    点击设置
 *  onReplay()      点击重新开始
 *  gameStateChange()   游戏体状态回调
 */
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
//单例，自己的实例
var gameUiSelf = null;
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    //================end=================
    function GameUI() {
        var _this = _super.call(this) || this;
        _this.hasOver = 0;
        _this.adCount = 0;
        _this.clickTip = false;
        //是新手引导吗？
        _this.isGuide = false;
        _this.ifShowUserTip = false;
        _this.showUserTipIndex = 0;
        _this.gameState = GAME_STATE.NONE;
        _this.level = 0;
        gameUiSelf = _this;
        _this.btnTip.on(Laya.Event.CLICK, _this, _this.onFreeTip);
        _this.btnRefresh.on(Laya.Event.CLICK, _this, _this.onRefresh);
        _this.btnSettings.on(Laya.Event.CLICK, _this, _this.onSettings);
        //调整位置
        _this.setViews();
        _this.hasOver = 0;
        _this.adCount = 0;
        return _this;
    }
    GameUI.prototype.onRefresh = function (e) {
        e.stopPropagation();
    };
    //设置
    GameUI.prototype.onSettings = function (e) {
        e.stopPropagation();
        soundUtils.playSound(CHOOSE);
        SettingDialog.getSelf().popup();
    };
    //恢复初始情况
    GameUI.prototype.onReplay = function (e) {
        e.stopPropagation();
        soundUtils.playSound(CHOOSE);
        if (this.gameState == GAME_STATE.GAMEOVER)
            return;
        game.replayGame(game.level);
    };
    GameUI.prototype.setViews = function () {
        // log('width=' + Laya.stage.width + ',height=' + SCREENHEIGHT);
        if (SCREENHEIGHT > LARGE_PHONE_H) {
            this.layoutLabel.y += IPHONEX_TOP - 30;
            this.topNavView.y += IPHONEX_TOP;
            this.layout.y += IPHONEX_TOP;
            this.btnTipLayout.y += IPHONEX_TOP;
        }
        this.height = SCREENHEIGHT;
        this.bgImg.height = this.height;
        this.bgImg.x = 0;
        this.bgImg.y = 0;
    };
    GameUI.prototype.homeClick = function (e) {
        e.stopPropagation();
        //清空过关数据
        game.videoTip = 0;
        game.shareTip = 0;
        game.coinTip = 0;
        game.startTime = 0;
        game.costTime = 0;
        //隐藏banner
        wxUtils.hideBanner();
        //先清空gameUI中的对象
        //去掉动画
        this.removeGif();
        //删除自己
        this.removeSelf();
        //返回到等级界面
    };
    //设置等级
    GameUI.prototype.setLevel = function (levelIndex) {
        // this.labelGrade.text = levelIndex + ' 级';
        this.labelLevel.text = '第 ' + game.level + ' 关';
    };
    //初始化游戏界面： arr:题目数组
    GameUI.prototype.initGameUi = function (index, tip) {
        log('initGameUi');
        //判断是否显示悬浮按钮
        //前三关新手引导
        this.level = index;
        this.isGuide = (index <= 3);
        this.clickTip = false;
        this.showUserTipIndex = 0;
        this.ifShowUserTip = false;
        //设置金币数量
        this.removeGif();
        this.hasOver = 0;
        //设置关卡
        this.setLevel(index);
        var thiz = this;
        thiz.btnTip.visible = true;
        thiz.btnRefresh.visible = true;
        //底部显示
        game.setGameUiNavi();
        //计算提示金币数
        if (game.CoinNumMode === 1) {
            game.useTipCoinNum = Math.floor(Math.ceil(1.0 * game.level / game.CoinNumCount) * game.CoinNumCount * game.TipCoinRate);
            game.BonusCoinNum = Math.floor((Math.ceil(1.0 * game.level / game.CoinNumCount) + 1) * game.CoinNumCount * game.BonusCoinRate);
            game.chargeCoinNum = game.useTipCoinNum;
        }
        //进入游戏===========
    };
    GameUI.prototype.showTipAni = function (flag) {
        // this.imgHintGlow.alpha = flag ? 0 : 1;
        // this.imgHintGlow.visible = true;
        // Laya.Tween.to(this.imgHintGlow, { alpha: flag ? 1 : 0 }, 500, null, Laya.Handler.create(this, this.showTipAni, [!flag]), 500);
    };
    /**
     * 游戏状态改变
     *
     * @private
     * @param {number} state
     * @param {*} obj
     * @memberof GameUI
     */
    GameUI.prototype.gameStateChange = function (self, gameState) {
        if (gameState == GAME_STATE.GAMEOVER) {
            if (self.hasOver == 1)
                return;
            //清除定时器
            Laya.timer.clear(self, self.showTipAni);
            // Laya.Tween.clearAll(self.imgHintGlow);
            // self.imgHintGlow.visible = false;
            self.hasOver = 1;
            self.gameOver();
        }
    };
    //底部导量不同类型 
    GameUI.prototype.showBottomAppList = function () {
        //更新待跳转列表
        if (game.WAITING_APP_ARRAY != null && game.WAITING_APP_ARRAY.length > 0) {
            // this.showGameViewAppList();
            if (game.gameBottomAppType == 5) {
                this.bottomApp.height = 440;
                this.bottomAppList.height = 420;
            }
            else {
                this.bottomApp.height = 220;
                this.bottomAppList.height = 210;
            }
            // log('showBottomAppList: '+ (this.btnTipLayout.y + this.btnTipLayout.height)+','+(game.SCREENHEIGHT - this.bottomApp.height) );
            if ((this.btnTipLayout.y + this.btnTipLayout.height) < (SCREENHEIGHT - this.bottomApp.height - (ifIphoneX ? 50 : 0))) {
                //底部空间放得下
                this.bottomApp.y = SCREENHEIGHT - this.bottomApp.height - (ifIphoneX ? 50 : 0);
                this.bottomAppList.removeChildren();
                //背景矩形
                this.bottomAppBg.height = this.bottomApp.height;
                this.bottomApp.visible = true;
                var bottomType = game.gameBottomAppType;
                if (bottomType == 1) {
                    // 随机选择5款游戏导流
                    var drawerArr = [];
                    for (var index = 0; index < game.WAITING_APP_ARRAY.length; index++) {
                        drawerArr.push(index);
                    }
                    var indexArray = [];
                    if (drawerArr.length <= 5) {
                        indexArray = drawerArr;
                    }
                    else {
                        while (indexArray.length < 5) {
                            var ta = Math.floor(Math.random() * drawerArr.length);
                            indexArray.push(drawerArr[ta]);
                            drawerArr.splice(ta, 1);
                        }
                    }
                    var bottomItemArray = [];
                    for (var i = 0; i < indexArray.length; i++) {
                        var gameInfo = game.WAITING_APP_ARRAY[indexArray[i]];
                        var gameInfo1 = JSON.parse(JSON.stringify(gameInfo));
                        gameInfo1["bottom"] = "game-" + bottomType;
                        bottomItemArray.push(gameInfo1);
                    }
                }
                else if (bottomType == 2) {
                    //10款来回往返
                    // if (!this.bottomView2) {
                    var bottomItemArray = [];
                    for (var i = 0; i < game.WAITING_APP_ARRAY.length; i++) {
                        var gameInfo = game.WAITING_APP_ARRAY[i];
                        var gameInfo1 = JSON.parse(JSON.stringify(gameInfo));
                        gameInfo1["bottom"] = "game-" + bottomType;
                        bottomItemArray.push(gameInfo1);
                    }
                }
                else if (bottomType == 3) {
                    // 5款跳动，每6s更换一批
                }
                else if (bottomType == 4) {
                    // 循环移动
                    // if (!this.bottomView4) {
                }
                else if (bottomType == 5) {
                    // 10款同时出现跳动，两行显示
                }
                wxUtils.aldSendEventFunc('出现底部导量', { 'from': 'game' });
            }
        }
        else {
            this.bottomApp.visible = false;
        }
    };
    //展示顶部导量 
    GameUI.prototype.showTopAppList = function () {
    };
    GameUI.prototype.navViewAni = function () {
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
    GameUI.prototype.renderListHandler = function (cell, index) {
        cell.setData(cell.dataSource);
    };
    //看视频获取提示
    GameUI.prototype.showVideoTip = function () {
        //e.stopPropagation();
        var that = this;
        wxUtils.aldSendEventFunc('免费提示拉起视频', { 'level': '' + game.level });
        wxUtils.showTipVideoAd(function (ifShowAd) {
            log('看提示视频观看之后回来,ifShowAd=' + ifShowAd);
            if (ifShowAd) {
                //成功播放视频
                wxUtils.aldSendEventFunc('免费提示视频播放成功', { 'level': '' + game.level });
                wxUtils.aldSendEventFunc('视频播放成功', { 'level': '' + game.level });
                //获得提示
                game.videoTip += 1;
                wx.showToast({
                    title: '获得提示',
                    icon: 'success',
                    duration: 500,
                    mask: true,
                });
                that.showTipFunc();
                //累加看视频次数
                if (game.tipMode === 3 || game.tipMode === 4) {
                    game.tipVideoTimes += 1;
                }
            }
            else {
                //没有视频播放了
                wxUtils.aldSendEventFunc('免费提示视频播放失败', { 'level': '' + game.level });
                if (game.tipMode === 4) {
                    wx.showModal({
                        title: '提示',
                        content: '非常抱歉，目前暂时没有可观看的视频。请稍后再试，谢谢您的理解！',
                        confirmText: '好的',
                        showCancel: false,
                    });
                }
            }
        });
    };
    //点击免费提示
    GameUI.prototype.onFreeTip = function (e) {
        e.stopPropagation();
        soundUtils.playSound(CHOOSE);
        // 设置当前关卡的分享视频参数
        if (this.clickTip) {
            //已经点击了提示
            return;
        }
        if (DEBUG) {
            this.showTipFunc();
            return;
        }
        if (game.level <= game.tipLevel) {
            game.tipMode = game.tipMode1;
            game.tipN = game.tipN1;
        }
        else {
            game.tipMode = game.tipMode2;
            game.tipN = game.tipN2;
        }
        var that = this;
        // log('tipMode=' + game.tipMode + ',tipN=' + game.tipN + 'tipShareTimes=' + game.tipShareTimes + ',tipVideoTimes=' + game.tipVideoTimes);
        // log('tipArr='); log(game.tipArr);
        wxUtils.aldSendEventFunc('点击免费提示', { 'level': '' + game.level });
        that.showVideoTip();
    };
    //去掉引导动画
    GameUI.prototype.removeGif = function () {
    };
    //显示提示
    GameUI.prototype.showTipFunc = function () {
    };
    GameUI.prototype.gameOver = function () {
        // if (this.hasOver == 1) return;
        var that = this;
        //判断游戏是否结束
        if (this.hasOver == 1) { //过关
            this.gameState = GAME_STATE.GAMEOVER;
            this.removeGif();
            Laya.stage.offAll();
            soundUtils.playSound(LEVELCOMPLETED);
            // vibrate(45);
            wxUtils.aldSendEventFunc('用户过关', { 'level': game.level });
            if (game.level == allQuestionLen) {
                wxUtils.aldSendEventFunc('用户通关', { 'level': game.level });
            }
            //隐藏banner
            if (wxUtils.gameBannerAd) {
                wxUtils.gameBannerAd.hide();
            }
            //过关动效
            playPart(this);
            Laya.timer.once(1000, this, function () {
                //插屏广告判断
                loadInterAdStatus = 0;
                game.passLevelsN += 1;
                if ((game.passLevelsN > game.showInterN) && (game.passLevelsN % game.showInterCount == 0)) {
                    wxUtils.showInterAd();
                }
                Laya.timer.once(2500, gameUiSelf, function () {
                    //根据插屏显示情况来决定是否直接过关
                    // log('loadInterAdStatus=' + loadInterAdStatus);
                    if (loadInterAdStatus !== 2) {
                        //没有弹出插屏
                        loadInterAdStatus = 0;
                        game.showBonus(game.level, 0, 3);
                    }
                });
            });
            // return true;
        }
        // return false;
    };
    return GameUI;
}(ui.page_dir.GameInfoUI));
;
//# sourceMappingURL=GameInfo.js.map