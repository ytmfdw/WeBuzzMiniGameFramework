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
 *  微信小游戏 工具类
 *  主要功能：
 *      Banner展示
 *      插屏展示
 *      视频播放
 *      分享
 *  
 */




/**
 * 7. 微信分享设置
 */
wx.showShareMenu({
    withShareTicket: false
});

wx.onShareAppMessage(function () {
    var tmp_query = 'uid=' + game.userId + '&state=' + ShareState.MENU;
    tmp_query += ('&img=P0&' + game.SHARED_PARAM);
    log('wxShare query:' + tmp_query);
    game.shareType = ShareState.MENU;
    game.shareQuery = tmp_query;
    return {
        query: tmp_query,
        title: game.SHARED_TITLE,
        imageUrl: game.SHARED_URL
    }
});

class wxUtils {
    public static tipVideoAd: any = null;

    public static onLoading: boolean = false;

    //看视频获取提示 
    static showTipVideoAd(callBack) {
        log('showTipVideoAd onLoading=' + wxUtils.onLoading);
        if (wxUtils.onLoading) return; //如果正在加载视频则直接返回

        //创建广告
        wxUtils.onLoading = true;

        if (wxUtils.tipVideoAd == null) {
            wxUtils.tipVideoAd = wx.createRewardedVideoAd({
                adUnitId: 'adunit-e710f84840844d07'
            });
        }
        if (wxUtils.tipVideoAd != null) {
            wxUtils.tipVideoAd.load()
                .then(() => {
                    //显示广告
                    wxUtils.tipVideoAd.show().then(() => {
                        log('视频显示');
                        wxUtils.onLoading = false;

                    });
                    //静音背景音乐
                    //Laya.SoundManager.stopSound(BG_MUSIC);
                })
                .catch(err => {
                    //广告加载错误
                    callBack(false);
                    wxUtils.onLoading = false;
                });
            //添加回调
            wxUtils.tipVideoAd.onClose((status) => {
                log('视频广告close回调')
                wxUtils.tipVideoAd.offClose();
                //播放背景音乐
                soundUtils.playBgMusic();
                if ((status && status.isEnded) || status === undefined) {
                    //正常播放结束
                    callBack(true);

                }
                else {
                    //播放未完成
                    wx.showModal({
                        title: '提示',
                        content: '视频未完整播放，无法获取提示！',
                        confirmText: '好的',
                        showCancel: false,
                    });
                }
            })

            wxUtils.tipVideoAd.onError(res => {
                log('tipVideoAd error:');
                log(res);
            });
        }
    }

    public static gameBannerAd: any = null;
    public static nextBannerAd: any = null;
    public static popBannerAd: any = null;
    //显示游戏页面banner
    static showGameBanner() {
        if (!game.ifShowBanner) return;

        if (wxUtils.gameBannerAd) {
            wxUtils.gameBannerAd.hide();
            wxUtils.gameBannerAd.destroy();
        }
        var tH = game.gameUi.btnTipLayout.y + game.gameUi.btnTipLayout.height;
        // log('Game Banner tH=' + tH);
        wxUtils.gameBannerAd = wx.createBannerAd({
            adUnitId: 'adunit-45e1a93752f4357d',
            style: {
                left: 0,
                top: tH * game.scaleX,
                width: Math.floor(0.8 * game.screenWidth),
                height: (SCREENHEIGHT - tH) * game.scaleX
            }
        });
        wxUtils.gameBannerAd.onResize(size => {
            var tmpHt = Browser.window.systemInfo.screenHeight - size.height - (ifIphoneX ? 20 : 0);
            var tmpWt = (game.screenWidth - size.width) / 2;
            if (tmpHt > tH * game.scaleX) {
                //高度够用
                wxUtils.gameBannerAd.style.top = tmpHt;
                wxUtils.gameBannerAd.style.left = tmpWt;
                wxUtils.gameBannerAd.show();
                wxUtils.aldSendEventFunc('广告加载成功-banner', {
                    'from': 'gameBanner'
                });
            }
            else {
                //尝试显示导量
                wxUtils.hideBanner();
                if (gameUiSelf && areaCon) { //非特殊区域时显示导量
                    gameUiSelf.showBottomAppList();
                }
            }
        });

        wxUtils.gameBannerAd.onError(res => {
            log(res);
            wxUtils.aldSendEventFunc('广告加载出错-banner', {
                'errCode': res.errCode,
                'errMsg': res.errMsg,
                'from': 'gameBanner'
            });
            //显示导量矩阵
            wxUtils.hideBanner();
            var ifShowNavi = (ifNaviCheckArea == false) || (ifNaviCheckArea && areaCon);

        });

    }

    //显示过关页面banner
    static showNextBanner() {
        if (!game.ifShowBanner) return;

        if (wxUtils.nextBannerAd) {
            wxUtils.nextBannerAd.hide();
            wxUtils.nextBannerAd.destroy();
        }
        var tH = game.passPage.contentLayout.y + game.passPage.contentLayout.height;
        wxUtils.nextBannerAd = wx.createBannerAd({
            adUnitId: 'adunit-45e1a93752f4357d',
            style: {
                left: 0,
                top: tH * game.scaleX,
                width: game.screenWidth,
                height: (SCREENHEIGHT - tH) * game.scaleX
            }
        });
        wxUtils.nextBannerAd.onResize(size => {
            var tmpHt = Browser.window.systemInfo.screenHeight - size.height - (ifIphoneX ? 20 : 0);

            if (tmpHt > tH * game.scaleX) {
                //高度够用
                // wxUtils.nextBannerAd.style.top = tmpHt;
                wxUtils.nextBannerAd.show().then(() => {
                    wxUtils.aldSendEventFunc('广告加载成功-banner', {
                        'from': 'nextBanner'
                    });
                    ifLoadNextBanner = true;

                    if (game.passBannerDelay >= 0) {
                        //btn覆盖，60ms后上移btn
                        Laya.timer.once(game.passBannerDelay, game, function () {
                            var ty = game.passPage.btnNext.y - 300;
                            Laya.Tween.to(game.passPage.btnNext, { y: ty }, 300, Laya.Ease.linearNone);
                        });
                    }
                });;
            }
        });

        wxUtils.nextBannerAd.onError(res => {
            log(res);
            wxUtils.aldSendEventFunc('广告加载出错-banner', {
                'errCode': res.errCode,
                'errMsg': res.errMsg,
                'from': 'nextBanner'
            });
        });

    }

    static showPopBanner() {
        if (!game.ifShowBanner) return;

        if (wxUtils.popBannerAd) {
            wxUtils.popBannerAd.hide();
            wxUtils.popBannerAd.destroy();
        }
        var tH = 1760 + IPHONEX_TOP;
        wxUtils.popBannerAd = wx.createBannerAd({
            adUnitId: 'adunit-45e1a93752f4357d',
            style: {
                left: 0,
                top: tH * game.scaleX,
                width: 300
            }
        });
        wxUtils.popBannerAd.onResize(size => {
            var tmpHt = Browser.window.systemInfo.screenHeight - size.height - (ifIphoneX ? 20 : 0);
            var tmpWt = (game.screenWidth - size.width) / 2;
            if (tmpHt > tH * game.scaleX) {
                //高度够用
                // wxUtils.popBannerAd.style.top = tmpHt;
                wxUtils.popBannerAd.style.left = tmpWt;
                wxUtils.popBannerAd.show().then(() => {
                    wxUtils.aldSendEventFunc('广告加载成功-banner', {
                        'from': 'popBanner'
                    });
                    // ifLoadNextBanner = true;
                });
            }
            else {
                console.error("banner too high, don't show.");
            }
        });

        wxUtils.popBannerAd.onError(res => {
            log(res);
            wxUtils.aldSendEventFunc('广告加载出错-banner', {
                'errCode': res.errCode,
                'errMsg': res.errMsg,
                'from': 'popBanner'
            });
        });

    }

    // 定义插屏广告
    public static interstitialAd: any = null

    static showInterAd() {
        if (game.ifShowInter == false) return;
        var curTime = (new Date()).getTime();
        // log('加载插屏广告：' + curTime);
        loadInterAdStatus = 1;
        wxUtils.aldSendEventFunc('加载插屏广告', {});

        if (wxUtils.interstitialAd == null) {
            // 创建插屏广告
            if (typeof Laya.Browser.window.wx.createInterstitialAd === 'function') {
                wxUtils.interstitialAd = Laya.Browser.window.wx.createInterstitialAd({
                    adUnitId: 'adunit-8f5d7dbc5705e720'
                })
            }
        }

        if (wxUtils.interstitialAd) {
            if (loadInterAdStatus == 1) {
                // log('准备显示插屏：' + ((new Date()).getTime() - curTime))
                wxUtils.interstitialAd.show().then(() => {
                    var dtime = ((new Date()).getTime() - curTime);
                    log('插屏广告显示: dtime=' + dtime + ',loadInterAdStatus=' + loadInterAdStatus);
                    wxUtils.aldSendEventFunc('插屏广告显示', { 'status': loadInterAdStatus, 'dtime': dtime });
                    loadInterAdStatus = 2;
                }).catch((err) => {
                    var dtime = ((new Date()).getTime() - curTime);
                    log('插屏广告出错: dtime=' + dtime);
                    log(err);
                    loadInterAdStatus = 3;
                    wxUtils.aldSendEventFunc('插屏广告出错', { 'status': loadInterAdStatus, 'dtime': dtime });
                })
            }
            else {
                log('已经显示过关页面了')
            }

            //添加回调
            wxUtils.interstitialAd.onClose(() => {
                log('插屏广告close回调')
                wxUtils.interstitialAd.offClose();
                //关闭插屏后显示下一关
                var gameIndex = Laya.stage.getChildIndex(game.gameUi);
                if (gameIndex >= 0) {
                    //在游戏页面
                    game.showBonus(game.level, 0, 3);
                }
            })
        }
    }

    //隐藏banner
    static hideBanner() {
        if (wxUtils.gameBannerAd) {
            wxUtils.gameBannerAd.hide();
            wxUtils.gameBannerAd.destroy();
        }
        if (wxUtils.nextBannerAd) {
            wxUtils.nextBannerAd.hide();
            wxUtils.nextBannerAd.destroy();
        }
        if (wxUtils.popBannerAd) {
            wxUtils.popBannerAd.hide();
            wxUtils.popBannerAd.destroy();
        }
    }

    //ald事件统计
    static aldSendEventFunc(name: string, obj: Object) {
        var spEventNames = [];

        if (ALD_ON) {
            if (typeof Laya.Browser.window.wx.aldSendEvent === 'function') {
                if (spEventNames.indexOf(name) == -1) {
                    // Laya.Browser.window.wx.aldSendEvent(name);
                }
                else {
                    // 添加channel
                    obj['channel'] = userChannel;
                    Laya.Browser.window.wx.aldSendEvent(name, obj);
                }
            }

        }
    }

    /**
     * 检查版本更新
     */
    static checkForUpdate() {
        if (typeof Laya.Browser.window.wx.getUpdateManager === 'function') {
            const updateManager = Laya.Browser.window.wx.getUpdateManager();

            updateManager.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                log("版本更新信息：");
                log(res.hasUpdate);
            });

            updateManager.onUpdateReady(function () {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                Laya.Browser.window.wx.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启以使用？',
                    cancelText: "知道了",
                    confirmText: "重启",
                    success: function (res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager.applyUpdate();
                        }
                        else {

                        }
                    }
                })
            });

        }
    }

    /**
         * 设置 gif 动图播放
         * @param obj 图片对象
         * @param total 总图片数
         * @param path 图片地址
         * @param delay 两帧之间的时间间隔
         * @param gap 一个循环结束后是否停顿
         */
    static setGIF(obj: Laya.Image, total: number, path: string, delay: number, gap: boolean = true): void {
        Laya.timer.clearAll(obj);
        var indx = 0;
        Laya.timer.loop(delay, obj, loopImage);

        function loopImage(): void {
            var idx = indx;
            if (gap == true) {
                if (indx >= 2 * total) {
                    indx = 0;
                    idx = 0;
                }
                else if (indx >= total) {
                    idx = total - 1;
                }
            }
            else {
                if (indx >= total) {
                    indx = 0;
                    idx = 0;
                }
            }
            obj.skin = path + idx + ".jpg";
            indx += 1;
        }
    }

}    
