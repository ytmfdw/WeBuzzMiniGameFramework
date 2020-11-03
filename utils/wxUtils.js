if (WX_MODE) {
    wx.showShareMenu({
        withShareTicket: false
    });
    wx.onShareAppMessage(function () {
        var tmp_query = 'uid=' + game.userId + '&state=' + ShareState.OTHER;
        tmp_query += ('&img=P0&' + game.SHARED_PARAM);
        log('wxShare query:' + tmp_query);
        game.shareType = ShareState.OTHER;
        game.shareQuery = tmp_query;
        return {
            query: tmp_query,
            title: game.SHARED_TITLE,
            imageUrl: game.SHARED_URL
        };
    });
}
var wxUtils = /** @class */ (function () {
    function wxUtils() {
    }
    //看视频获取提示 
    wxUtils.showTipVideoAd = function (callBack) {
        log('showTipVideoAd onLoading=' + wxUtils.onLoading);
        if (wxUtils.onLoading)
            return; //如果正在加载视频则直接返回
        //创建广告
        wxUtils.onLoading = true;
        if (wxUtils.tipVideoAd == null) {
            wxUtils.tipVideoAd = wx.createRewardedVideoAd({
                adUnitId: 'adId'
            });
        }
        if (wxUtils.tipVideoAd != null) {
            wxUtils.tipVideoAd.load()
                .then(function () {
                //显示广告
                wxUtils.tipVideoAd.show().then(function () {
                    log('视频显示');
                    wxUtils.onLoading = false;
                });
                //静音背景音乐
                //Laya.SoundManager.stopSound(BG_MUSIC);
            })
                .catch(function (err) {
                //广告加载错误
                callBack(false);
                wxUtils.onLoading = false;
            });
            //添加回调
            wxUtils.tipVideoAd.onClose(function (status) {
                log('视频广告close回调');
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
            });
            wxUtils.tipVideoAd.onError(function (res) {
                log('tipVideoAd error:');
                log(res);
            });
        }
    };
    //显示游戏页面banner
    wxUtils.showGameBanner = function () {
        if (!game.ifShowBanner)
            return;
        if (wxUtils.gameBannerAd) {
            wxUtils.gameBannerAd.hide();
            wxUtils.gameBannerAd.destroy();
        }
        var tH = game.gameUi.btnTipLayout.y + game.gameUi.btnTipLayout.height;
        // log('Game Banner tH=' + tH);
        wxUtils.gameBannerAd = wx.createBannerAd({
            adUnitId: 'adId',
            style: {
                left: 0,
                top: tH * game.scaleX,
                width: Math.floor(0.8 * game.screenWidth),
                height: (SCREENHEIGHT - tH) * game.scaleX
            }
        });
        wxUtils.gameBannerAd.onResize(function (size) {
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
        wxUtils.gameBannerAd.onError(function (res) {
            log(res);
            wxUtils.aldSendEventFunc('广告加载出错-banner', {
                'errCode': res.errCode,
                'errMsg': res.errMsg,
                'from': 'gameBanner'
            });
            //显示导量矩阵
            wxUtils.hideBanner();
            var ifShowNavi = (ifNaviCheckArea == false) || (ifNaviCheckArea && areaCon);
            if (gameUiSelf && ifShowNavi) {
                gameUiSelf.showBottomAppList();
            }
        });
    };
    //显示过关页面banner
    wxUtils.showNextBanner = function () {
        if (!game.ifShowBanner)
            return;
        if (wxUtils.nextBannerAd) {
            wxUtils.nextBannerAd.hide();
            wxUtils.nextBannerAd.destroy();
        }
        var tH = game.passPage.contentLayout.y + game.passPage.contentLayout.height;
        wxUtils.nextBannerAd = wx.createBannerAd({
            adUnitId: 'adId',
            style: {
                left: 0,
                top: tH * game.scaleX,
                width: game.screenWidth,
                height: (SCREENHEIGHT - tH) * game.scaleX
            }
        });
        wxUtils.nextBannerAd.onResize(function (size) {
            var tmpHt = Browser.window.systemInfo.screenHeight - size.height - (ifIphoneX ? 20 : 0);
            if (tmpHt > tH * game.scaleX) {
                //高度够用
                // wxUtils.nextBannerAd.style.top = tmpHt;
                wxUtils.nextBannerAd.show().then(function () {
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
                });
                ;
            }
        });
        wxUtils.nextBannerAd.onError(function (res) {
            log(res);
            wxUtils.aldSendEventFunc('广告加载出错-banner', {
                'errCode': res.errCode,
                'errMsg': res.errMsg,
                'from': 'nextBanner'
            });
        });
    };
    wxUtils.showPopBanner = function () {
        if (!game.ifShowBanner)
            return;
        if (wxUtils.popBannerAd) {
            wxUtils.popBannerAd.hide();
            wxUtils.popBannerAd.destroy();
        }
        var tH = 1760 + IPHONEX_TOP;
        wxUtils.popBannerAd = wx.createBannerAd({
            adUnitId: 'adId',
            style: {
                left: 0,
                top: tH * game.scaleX,
                width: 300
            }
        });
        wxUtils.popBannerAd.onResize(function (size) {
            var tmpHt = Browser.window.systemInfo.screenHeight - size.height - (ifIphoneX ? 20 : 0);
            var tmpWt = (game.screenWidth - size.width) / 2;
            if (tmpHt > tH * game.scaleX) {
                //高度够用
                // wxUtils.popBannerAd.style.top = tmpHt;
                wxUtils.popBannerAd.style.left = tmpWt;
                wxUtils.popBannerAd.show().then(function () {
                    wxUtils.aldSendEventFunc('广告加载成功-banner', {
                        'from': 'popBanner'
                    });
                    // ifLoadNextBanner = true;
                    if (game.passBannerDelay >= 0) {
                        //btn覆盖，60ms后上移btn
                        Laya.timer.once(game.passBannerDelay, game, function () {
                            var ty = 1680 + IPHONEX_TOP;
                            Laya.Tween.to(appListDialog1.getSelf().btnContinue, { y: ty }, 300, Laya.Ease.linearNone);
                        });
                    }
                });
            }
            else {
                console.error("banner too high, don't show.");
            }
        });
        wxUtils.popBannerAd.onError(function (res) {
            log(res);
            wxUtils.aldSendEventFunc('广告加载出错-banner', {
                'errCode': res.errCode,
                'errMsg': res.errMsg,
                'from': 'popBanner'
            });
        });
    };
    wxUtils.showInterAd = function () {
        if (game.ifShowInter == false)
            return;
        var curTime = (new Date()).getTime();
        // log('加载插屏广告：' + curTime);
        loadInterAdStatus = 1;
        wxUtils.aldSendEventFunc('加载插屏广告', {});
        if (wxUtils.interstitialAd == null) {
            // 创建插屏广告
            if (typeof Laya.Browser.window.wx.createInterstitialAd === 'function') {
                wxUtils.interstitialAd = Laya.Browser.window.wx.createInterstitialAd({
                    adUnitId: 'adId'
                });
            }
        }
        if (wxUtils.interstitialAd) {
            if (loadInterAdStatus == 1) {
                // log('准备显示插屏：' + ((new Date()).getTime() - curTime))
                wxUtils.interstitialAd.show().then(function () {
                    var dtime = ((new Date()).getTime() - curTime);
                    log('插屏广告显示: dtime=' + dtime + ',loadInterAdStatus=' + loadInterAdStatus);
                    wxUtils.aldSendEventFunc('插屏广告显示', { 'status': loadInterAdStatus, 'dtime': dtime });
                    loadInterAdStatus = 2;
                }).catch(function (err) {
                    var dtime = ((new Date()).getTime() - curTime);
                    log('插屏广告出错: dtime=' + dtime);
                    log(err);
                    loadInterAdStatus = 3;
                    wxUtils.aldSendEventFunc('插屏广告出错', { 'status': loadInterAdStatus, 'dtime': dtime });
                });
            }
            else {
                log('已经显示过关页面了');
            }
            //添加回调
            wxUtils.interstitialAd.onClose(function () {
                log('插屏广告close回调');
                wxUtils.interstitialAd.offClose();
                //关闭插屏后显示下一关
                var gameIndex = Laya.stage.getChildIndex(game.gameUi);
                if (gameIndex >= 0) {
                    //在游戏页面
                    game.showNext(game.level, 0, 3);
                }
            });
        }
    };
    wxUtils.showPassPageGridAd = function () {
        var ifShowGrid = (typeof Laya.Browser.window.wx.createCustomAd === 'function');
        if (ifShowGrid == false)
            return;
        var leftX = 90;
        var rateX = game.screenWidth / 1080;
        var topY = game.passPage.contentLayout.y + game.passPage.topApp.y + game.passPage.topApp.height + 10;
        if (wxUtils.gridAd1 == null) {
            if (ifShowGrid) {
                wxUtils.gridAd1 = Laya.Browser.window.wx.createCustomAd({
                    adUnitId: 'adId',
                    adIntervals: 30,
                    style: {
                        left: 0 * rateX,
                        top: topY * game.scaleX,
                        width: 240 * rateX,
                        fixed: false
                    }
                });
            }
        }
        if (wxUtils.gridAd2 == null) {
            if (ifShowGrid) {
                wxUtils.gridAd2 = Laya.Browser.window.wx.createCustomAd({
                    adUnitId: 'adId',
                    adIntervals: 30,
                    style: {
                        left: 840 * rateX,
                        top: topY * game.scaleX,
                        width: 240 * rateX,
                        fixed: false
                    }
                });
            }
        }
        if (wxUtils.gridAd1) {
            wxUtils.gridAd1.show().then(function () {
                log('格子广告1显示:');
                wxUtils.aldSendEventFunc('格子广告显示', { 'index': 1 });
            }).catch(function (err) {
                log('格子广告1出错:');
                log(err);
                wxUtils.aldSendEventFunc('格子广告出错', { 'index': 1 });
            });
        }
        if (wxUtils.gridAd2) {
            wxUtils.gridAd2.show().then(function () {
                log('格子广告2显示:');
                wxUtils.aldSendEventFunc('格子广告显示', { 'index': 2 });
            }).catch(function (err) {
                log('格子广告2出错:');
                log(err);
                wxUtils.aldSendEventFunc('格子广告出错', { 'index': 2 });
            });
        }
    };
    wxUtils.showGamePageGridAd = function () {
        var ifShowGrid = (typeof Laya.Browser.window.wx.createCustomAd === 'function');
        if (ifShowGrid == false)
            return;
        var rateX = game.screenWidth / 1080;
        // var topY = game.gameUi.topNavView.y + game.gameUi.topNavView.height + 10;
        var topY = game.gameUi.btnTipLayout.y - 30;
        if (wxUtils.gridAd3 == null) {
            if (ifShowGrid) {
                wxUtils.gridAd3 = Laya.Browser.window.wx.createCustomAd({
                    adUnitId: 'addId',
                    adIntervals: 30,
                    style: {
                        left: 0 * rateX,
                        top: topY * game.scaleX,
                        width: 240 * rateX,
                        fixed: false
                    }
                });
            }
        }
        if (wxUtils.gridAd3) {
            wxUtils.gridAd3.show().then(function () {
                log('格子广告3显示:');
                wxUtils.aldSendEventFunc('格子广告显示', { 'index': 3 });
            }).catch(function (err) {
                log('格子广告3出错:');
                log(err);
                wxUtils.aldSendEventFunc('格子广告出错', { 'index': 3 });
            });
        }
    };
    wxUtils.hideGrid = function () {
        if (wxUtils.gridAd1) {
            wxUtils.gridAd1.hide();
            // wxUtils.gridAd1.destroy();
        }
        if (wxUtils.gridAd2) {
            wxUtils.gridAd2.hide();
            // wxUtils.gridAd2.destroy();
        }
        if (wxUtils.gridAd3) {
            wxUtils.gridAd3.hide();
            // wxUtils.gridAd3.destroy();
        }
    };
    //隐藏banner
    wxUtils.hideBanner = function () {
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
    };
    //ald事件统计
    wxUtils.aldSendEventFunc = function (name, obj) {
        var spEventNames = [];
        if (ALD_ON && WX_MODE) {
            if (typeof Laya.Browser.window.wx.aldSendEvent === 'function') {
                if (spEventNames.indexOf(name) == -1) {
                    // Laya.Browser.window.wx.aldSendEvent(name);
                }
                else {
                    // 添加channel
                    obj['channel'] = userChannel;
                    Laya.Browser.window.wx.aldSendEvent(name, obj);
                    // 自定义事件
                    this.sendWebuzzEvent(name, obj);
                }
            }
        }
    };
    wxUtils.sendWebuzzEvent = function (name, param) {
        if (param === void 0) { param = {}; }
        switch (name) {
            case "登录后加载游戏页":
                var randomID = 0;
                var isChannel = 0;
                var otherAppid = "";
                if (!game.openId) {
                    game.openId = Math.random().toString(36).substr(2, 18);
                    randomID = 1;
                }
                var launchOptions = Laya.Browser.window.wx.getLaunchOptionsSync();
                if (launchOptions.query && launchOptions.query.channel) {
                    isChannel = 1;
                }
                if (launchOptions.referrerInfo && launchOptions.referrerInfo.appId) {
                    otherAppid = launchOptions.referrerInfo.appId;
                }
                Laya.Browser.window.wx.request({
                    url: 'https://fxxk.com/',
                    data: {
                        "appid": APPID,
                        "openid": game.openId,
                        "is_new": (newUser ? 1 : 0),
                        "channel": userChannel,
                        "scene": launchOptions.scene,
                        "is_channel": isChannel,
                        "channel_appid": otherAppid,
                        "is_random": randomID
                    },
                    method: 'POST',
                    success: function (obj) {
                    },
                    fail: function (error) {
                    }
                });
                break;
            case "下一关展示":
                if (!game.openId) {
                    game.openId = Math.random().toString(36).substr(2, 18);
                }
                Laya.Browser.window.wx.request({
                    url: 'https://fxxk.com/',
                    data: {
                        "appid": APPID,
                        "openid": game.openId,
                        "channel": userChannel,
                        "level": game.level
                    },
                    method: 'POST',
                    success: function (obj) {
                    },
                    fail: function (error) {
                    }
                });
                break;
            case "广告加载成功-banner":
                if (!game.openId) {
                    game.openId = Math.random().toString(36).substr(2, 18);
                }
                Laya.Browser.window.wx.request({
                    url: 'https://fxxk.com/',
                    data: {
                        "appid": APPID,
                        "openid": game.openId,
                        "channel": userChannel,
                        "type": "banner",
                        "from": ""
                    },
                    method: 'POST',
                    success: function (obj) {
                    },
                    fail: function (error) {
                    }
                });
                break;
            case "视频播放成功":
                if (!game.openId) {
                    game.openId = Math.random().toString(36).substr(2, 18);
                }
                Laya.Browser.window.wx.request({
                    url: 'https://fxxk.com/',
                    data: {
                        "appid": APPID,
                        "openid": game.openId,
                        "channel": userChannel,
                        "type": "video",
                        "from": ""
                    },
                    method: 'POST',
                    success: function (obj) {
                    },
                    fail: function (error) {
                    }
                });
                break;
            case "插屏广告显示":
                if (!game.openId) {
                    game.openId = Math.random().toString(36).substr(2, 18);
                }
                Laya.Browser.window.wx.request({
                    url: 'https://fxxk.com/',
                    data: {
                        "appid": APPID,
                        "openid": game.openId,
                        "channel": userChannel,
                        "type": "chapin",
                        "from": ""
                    },
                    method: 'POST',
                    success: function (obj) {
                    },
                    fail: function (error) {
                    }
                });
                break;
            case "格子广告显示":
                if (!game.openId) {
                    game.openId = Math.random().toString(36).substr(2, 18);
                }
                Laya.Browser.window.wx.request({
                    url: 'https://fxxk.com/',
                    data: {
                        "appid": APPID,
                        "openid": game.openId,
                        "channel": userChannel,
                        "type": "custom",
                        "from": ""
                    },
                    method: 'POST',
                    success: function (obj) {
                    },
                    fail: function (error) {
                    }
                });
                break;
            case "成功跳转其它游戏":
                if (!game.openId) {
                    game.openId = Math.random().toString(36).substr(2, 18);
                }
                Laya.Browser.window.wx.request({
                    url: 'https://fxxk.com/',
                    data: {
                        "appid": APPID,
                        "openid": game.openId,
                        "channel": userChannel,
                        "c_appid": param["appid"],
                        "showname": param["toApp"],
                        "type": 1,
                        "from": param["from"],
                        "skin": param["skin"],
                        "today": 0,
                        "history": 0
                    },
                    method: 'POST',
                    success: function (obj) {
                    },
                    fail: function (error) {
                    }
                });
                break;
            default:
                break;
        }
    };
    /**
     * 检查版本更新
     */
    wxUtils.checkForUpdate = function () {
        if (typeof Laya.Browser.window.wx.getUpdateManager === 'function') {
            var updateManager_1 = Laya.Browser.window.wx.getUpdateManager();
            updateManager_1.onCheckForUpdate(function (res) {
                // 请求完新版本信息的回调
                log("版本更新信息：");
                log(res.hasUpdate);
            });
            updateManager_1.onUpdateReady(function () {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                Laya.Browser.window.wx.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，是否重启以使用？',
                    cancelText: "知道了",
                    confirmText: "重启",
                    success: function (res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            updateManager_1.applyUpdate();
                        }
                        else {
                        }
                    }
                });
            });
        }
    };
    /**
         * 设置 gif 动图播放
         * @param obj 图片对象
         * @param total 总图片数
         * @param path 图片地址
         * @param delay 两帧之间的时间间隔
         * @param gap 一个循环结束后是否停顿
         */
    wxUtils.setGIF = function (obj, total, path, delay, gap) {
        if (gap === void 0) { gap = true; }
        Laya.timer.clearAll(obj);
        var indx = 0;
        Laya.timer.loop(delay, obj, loopImage);
        function loopImage() {
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
    };
    wxUtils.tipVideoAd = null;
    wxUtils.onLoading = false;
    wxUtils.gameBannerAd = null;
    wxUtils.nextBannerAd = null;
    wxUtils.popBannerAd = null;
    // 定义插屏广告
    wxUtils.interstitialAd = null;
    // 格子广告
    wxUtils.gridAd1 = null;
    wxUtils.gridAd2 = null;
    wxUtils.gridAd3 = null;
    return wxUtils;
}());
//# sourceMappingURL=wxUtils.js.map