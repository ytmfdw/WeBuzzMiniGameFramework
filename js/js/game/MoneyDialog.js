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
var MoneyDialog = /** @class */ (function (_super) {
    __extends(MoneyDialog, _super);
    function MoneyDialog() {
        var _this = _super.call(this) || this;
        _this.money = 0;
        _this.openedState = 0; //标记是否已经打开
        _this.openType = ''; //标记打开的方式：video,share
        _this.openRand = -1; //记录随机值
        _this.moneyType = 0; //标记是 普通红包0 还是 收藏后的红包1
        _this.ifClickConfirm = false; //标记是否点击过confirm,防止多次点击
        _this.watchRand = -1;
        _this.btnClose.on(Laya.Event.CLICK, _this, _this.closeClick);
        _this.btnClose2.on(Laya.Event.CLICK, _this, _this.closeClick2);
        _this.btnOpen.on(Laya.Event.CLICK, _this, _this.clickOpen);
        _this.btnConfirm.on(Laya.Event.CLICK, _this, _this.clickConfirm);
        _this.btnCoin.on(Laya.Event.CLICK, _this, _this.clickCoin);
        return _this;
    }
    MoneyDialog.prototype.closeClick = function (e) {
        e.stopPropagation();
        var that = this;
        //如果未领取时提示关闭后无法领取
        log('是否已经领取：' + !(this.btnOpen.visible));
        wxUtils.aldSendEventFunc('点击关闭红包', { 'user': game.userId + '-' + game.level + '-' + that.money, 'ifOpen': !(that.btnOpen.visible) });
        if (this.btnOpen.visible == true) {
            //尚未领取
            if (that.moneyType === 1 && game.todayMoneyGetTimes >= game.moneyDayGetN) {
                //收藏红包且今日已经不能再领了，直接关闭
                that.close();
            }
            else {
                wx.showModal({
                    title: '温馨提示',
                    content: '红包尚未拆开，关闭的话可能会错过几个亿哦！',
                    confirmText: '去开红包',
                    showCancel: true,
                    cancelText: '不要了',
                    success: function (callBack) {
                        if (callBack.confirm) {
                            wxUtils.aldSendEventFunc('关闭红包modal点击去开红包', { 'user': game.userId + '-' + game.level + '-' + that.money });
                        }
                        if (callBack.cancel) {
                            //继续关闭
                            that.close();
                            wxUtils.aldSendEventFunc('关闭红包modal点击不要了', { 'user': game.userId + '-' + game.level + '-' + that.money });
                        }
                    }
                });
            }
        }
        else {
            //已经领取了
            this.close();
        }
    };
    MoneyDialog.prototype.closeClick2 = function (e) {
        var that = this;
        wxUtils.aldSendEventFunc('点击关闭翻倍红包', { 'user': game.userId + '-' + game.level + '-' + that.money });
        wx.showModal({
            title: '温馨提示',
            content: '您有红包尚未领取，确定放弃吗？',
            confirmText: '去领红包',
            showCancel: true,
            cancelText: '不要了',
            success: function (callBack) {
                if (callBack.confirm) {
                    wxUtils.aldSendEventFunc('关闭翻倍红包modal点击去领红包', { 'user': game.userId + '-' + game.level + '-' + that.money });
                }
                if (callBack.cancel) {
                    //继续关闭
                    that.close();
                    wxUtils.aldSendEventFunc('关闭翻倍红包modal点击不要了', { 'user': game.userId + '-' + game.level + '-' + that.money });
                }
            }
        });
    };
    MoneyDialog.prototype.shareBonusClick = function () {
        var that = this;
        //新策略：分享到群领取
        wx.updateShareMenu({
            withShareTicket: true,
            success: function () {
                // wx.showModal({
                //     title: '提示',
                //     content: '请分享到微信群，才能领取哦！',
                //     confirmText: '分享到群',
                //     showCancel: true,
                //     cancelText: '我知道了',
                //     success: function (callBack) {
                //         if (callBack.confirm) {
                wxUtils.aldSendEventFunc('红包免费领取拉起分享', { 'detail': game.userId + '-' + game.level + '-' + that.money });
                game.isShareMoney = true;
                game.shareMoney = that.money;
                game.shareCode = Math.random().toString(36).substr(2);
                SharedUtils.wxShareFunc(ShareState.MONEY, 'uid=' + game.userId + '&state=' + ShareState.MONEY + '&code=' + game.shareCode);
                //         }
                //         if (callBack.cancel) {
                //         }
                //     }
                // });
            }
        });
    };
    MoneyDialog.prototype.videoBonusClick = function () {
        var that = this;
        wxUtils.aldSendEventFunc('红包领取拉起视频', { 'detail': game.userId + '-' + game.level + '-' + that.money });
        wxUtils.showMoneyVideoAd(function (ifShowAd) {
            log('看红包视频观看之后回来,ifShowAd=' + ifShowAd);
            if (ifShowAd) {
                //成功播放视频
                wxUtils.aldSendEventFunc('红包领取视频播放成功', { 'detail': game.userId + '-' + game.level + '-' + that.money });
                //获得红包,显示红包
                that.setData(1, 'video');
                //累加看视频次数
                if (game.bonusMode === 3 || game.bonusMode === 4) {
                    game.bonusVideoTimes += 1;
                }
            }
            else {
                //没有视频播放了
                wxUtils.aldSendEventFunc('红包领取视频播放失败', { 'detail': game.userId + '-' + game.level + '-' + that.money });
                if (game.bonusMode === 4) {
                    wx.showModal({
                        title: '提示',
                        content: '非常抱歉，目前暂时没有可观看的视频。请稍后再试，谢谢您的理解！',
                        confirmText: '好的',
                        showCancel: false,
                    });
                }
                else {
                    // 新策略：概率控制跳转到其它小游戏看视频 或 分享
                    game.goToWatchVideoAppid = game.getGotoWatchVideoApp();
                    if (that.watchRand < 0) {
                        that.watchRand = Math.random();
                    }
                    log('goToWatchVideoAppid=' + game.goToWatchVideoAppid + ',tmpRate=' + that.watchRand + ',goToWatchVideoRate=' + game.goToWatchVideoRate);
                    if (game.goToWatchVideoAppid == 'none' || that.watchRand > game.goToWatchVideoRate) {
                        //分享获得
                        wxUtils.aldSendEventFunc('红包领取视频播放失败-拉分享', { 'detail': game.userId + '-' + game.level + '-' + that.money });
                        that.shareBonusClick();
                    }
                    else {
                        //跳转到其它小游戏看视频
                        wx.aldSendEvent('红包领取视频播放失败-转跳转其他-弹出modal', {
                            'user': game.userId,
                            'appid': game.goToWatchVideoAppid
                        });
                        // 累积次数
                        SharedUtils.otherVideoShowTimes(1);
                        wx.removeStorageSync('goToWatchVideoInfo');
                        wx.showModal({
                            title: '温馨提示',
                            content: '当前红包已抢完。我们在另一款游戏中为您准备了一份红包，请点击“领红包”，打开新游戏领取吧！',
                            confirmText: '领红包',
                            cancelText: '取消',
                            success: function (res) {
                                if (res.cancel) {
                                    wx.aldSendEvent('红包领取视频播放失败-转跳转其他-选择取消', {
                                        'user': game.userId,
                                        'appid': game.goToWatchVideoAppid
                                    });
                                }
                                else if (res.confirm) {
                                    wx.aldSendEvent('红包领取视频播放失败-转跳转其他-选择跳转', {
                                        'user': game.userId,
                                        'appid': game.goToWatchVideoAppid
                                    });
                                    var videoCode = Math.random().toString(36).substr(2);
                                    var tmpInfo = { 'code': videoCode, 'appid': game.goToWatchVideoAppid, 'level': game.level, 'money': that.money, 'mType': that.moneyType };
                                    log('goToWatchVideoInfo:');
                                    log(tmpInfo);
                                    wx.setStorageSync('goToWatchVideoInfo', { 'code': videoCode, 'appid': game.goToWatchVideoAppid, 'level': game.level, 'money': that.money, 'mType': that.moneyType });
                                    wx.navigateToMiniProgram({
                                        appId: game.goToWatchVideoAppid,
                                        extraData: {
                                            "from": APP_ENAME,
                                            "appid": APPID,
                                            "name": APP_CNAME,
                                            "type": "money",
                                            "code": videoCode,
                                            "money": that.money
                                        },
                                        envVersion: 'release',
                                        success: function (res) {
                                            wx.aldSendEvent('红包领取视频播放失败-转跳转其他-成功跳转', {
                                                'user': game.userId,
                                                'appid': game.goToWatchVideoAppid
                                            });
                                            game.goToWatchVideoIndex += 1;
                                            wx.setStorageSync('goToWatchVideoIndex', game.goToWatchVideoIndex);
                                        },
                                        fail: function (err) {
                                            wx.removeStorageSync('goToWatchVideoInfo');
                                            wx.aldSendEvent('红包领取视频播放失败-转跳转其他-取消跳转', {
                                                'user': game.userId,
                                                'appid': game.goToWatchVideoAppid
                                            });
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            }
        });
    };
    //点击开
    MoneyDialog.prototype.clickOpen = function (e) {
        var that = this;
        e.stopPropagation();
        log('今日领取次数=' + game.todayMoneyGetTimes);
        if (game.todayMoneyGetTimes >= game.moneyDayGetN) {
            //领取次数已超额
            log('moneyType=' + that.moneyType);
            if (that.moneyType === 0) {
                //普通红包，可收藏
                wx.showModal({
                    title: '温馨提示',
                    content: '今日红包领取次数已超限额。请先收藏红包，明天再来领取吧！',
                    confirmText: '收藏红包',
                    showCancel: false,
                    cancelText: '不要了',
                    success: function (callBack) {
                        if (callBack.confirm) {
                            game.moneyCollectNum += 1;
                            wx.setStorageSync('moneyColN', game.moneyCollectNum);
                            wxUtils.aldSendEventFunc('成功收藏红包', { 'detail': game.userId + '-' + game.level + '-' + game.moneyCollectNum + '-' + game.todayMoneyGetTimes });
                            log('成功收藏一个红包：' + game.moneyCollectNum);
                            wx.showToast({
                                title: '收藏成功',
                                icon: 'success',
                                duration: 1500,
                                mask: true,
                            });
                            if (game.gameUi) {
                                game.gameUi.setMoneyCollect();
                            }
                            that.close();
                        }
                        if (callBack.cancel) {
                        }
                    }
                });
            }
            else {
                //已收藏红包不可以再收藏
                wx.showModal({
                    title: '温馨提示',
                    content: '今日红包领取次数已超限额。请明天再来领取吧！',
                    confirmText: '我知道了',
                    showCancel: false,
                    cancelText: '不要了',
                    success: function (callBack) {
                        if (callBack.confirm) {
                            that.close();
                        }
                        if (callBack.cancel) {
                        }
                    }
                });
            }
        }
        else {
            //设置当前关卡的分享视频参数
            if (game.level <= game.bonusLevel) {
                game.bonusMode = game.bonusMode1;
                game.bonusN = game.bonusN1;
            }
            else {
                game.bonusMode = game.bonusMode2;
                game.bonusN = game.bonusN2;
            }
            log('bonusMode=' + game.bonusMode + ',bonusN=' + game.bonusN + 'bonusShareTimes=' + game.bonusShareTimes + ',bonusVideoTimes=' + game.bonusVideoTimes);
            log('bonusArr:');
            log(game.bonusArr);
            wxUtils.aldSendEventFunc('红包点击免费领取', { 'user': game.userId + '-' + game.level + '-' + this.money });
            switch (game.bonusMode) {
                case 1:
                    //分享获取
                    that.shareBonusClick();
                    break;
                case 2:
                    //分享N次，然后看视频
                    if (game.bonusShareTimes < game.bonusN) {
                        //分享
                        that.shareBonusClick();
                    }
                    else {
                        //看视频
                        that.videoBonusClick();
                    }
                    break;
                case 3:
                    //看N次视频，然后分享
                    // if (game.bonusVideoTimes < game.bonusN) {
                    //     //看视频
                    //     that.videoBonusClick();
                    // }
                    // else {
                    //     //分享
                    //     that.shareBonusClick();
                    // }
                    //新策略，通过概率控制
                    var bonusAllTimes = game.bonusVideoTimes + game.bonusShareTimes;
                    var bonusArrLen = game.bonusArr.length;
                    var videoRate = 1;
                    if (bonusAllTimes < bonusArrLen) {
                        videoRate = game.bonusArr[bonusAllTimes];
                    }
                    else {
                        videoRate = game.bonusArr[bonusArrLen - 1];
                    }
                    //随机确定概率rand,如果已经随机过，将继续使用上次的随机数
                    if (that.openRand < 0) {
                        that.openRand = Math.random();
                    }
                    log('bonusAllTimes=' + bonusAllTimes + ',videoRate=' + videoRate + ',tmpRand=' + that.openRand);
                    if (that.openRand < videoRate) {
                        // 看视频
                        that.videoBonusClick();
                    }
                    else {
                        //分享
                        that.shareBonusClick();
                    }
                    break;
                case 4:
                    //看N次视频，然后不能看，也不能分享
                    if (game.bonusVideoTimes < game.bonusN) {
                        //看视频
                        that.videoBonusClick();
                    }
                    else {
                        //分享
                    }
                    break;
                case 5:
                //直接获取
                // game.getMoney(this.money, game.level, 'free');
                default:
                    break;
            }
        }
    };
    //点击领取或再来一包
    MoneyDialog.prototype.clickConfirm = function (e) {
        e.stopPropagation();
        if (this.ifClickConfirm) {
            log('已经点击了confirm，不能重复领取');
            return;
        }
        this.ifClickConfirm = true;
        log('点击确定领取红包:' + this.money + ',opentype=' + this.openType + ',moneyType=' + this.moneyType + ',openState=' + this.openedState);
        if (this.openedState === 1) {
            //领取红包
            wxUtils.aldSendEventFunc('点击领取现金', { 'detail': game.userId + '-' + game.moneyCollectNum + '-' + this.money + '-' + game.moneySum + '-' + this.openType });
            if (this.moneyType === 0) {
                //普通红包
                wxUtils.aldSendEventFunc('点击确定领取普通红包', { 'detail': game.userId + '-' + game.level + '-' + this.money + '-' + game.moneySum + '-' + this.openType });
                game.getMoney(this.money, game.level, this.openType, this.moneyType);
            }
            else if (this.moneyType === 1) {
                //收藏的红包
                wxUtils.aldSendEventFunc('点击确定领取收藏红包', { 'detail': game.userId + '-' + game.moneyCollectNum + '-' + this.money + '-' + game.moneySum + '-' + this.openType });
                game.getMoney(this.money, game.level, this.openType, this.moneyType);
            }
            // 额外赠送金币
            // LifeCardUtils.addCoin(game.BonusCoinNum, 0);
        }
        else if (this.openedState === 2) {
            // 点我翻倍
            if (game.bannerDialog === null) {
                game.bannerDialog = new bannerDialog();
            }
            game.bannerDialog.popup();
            game.bannerDialog.showBanner();
            wxUtils.aldSendEventFunc('点击点我翻倍', { 'detail': game.userId + '-' + game.level + '-' + this.money + '-' + game.moneySum });
        }
        else if (this.openedState === 3) {
            // 领取翻倍红包
            game.getDoubleMoney(this.money, game.level, this.moneyType);
        }
    };
    //点击改领金币
    MoneyDialog.prototype.clickCoin = function (e) {
        e.stopPropagation();
        var that = this;
        var firstClickCoin = wx.getStorageSync('clickCoin');
        log('点击改领金币：' + firstClickCoin);
        wxUtils.aldSendEventFunc('点击改领金币', { 'detail': game.userId + '-' + game.level + '-' + this.money + '-' + game.moneySum + '-' + this.openType });
        if (firstClickCoin === '' || firstClickCoin === undefined || firstClickCoin === null || firstClickCoin === false) {
            //首次点击改领金币
            wx.showModal({
                title: '温馨提示',
                content: '您确定放弃领取现金红包，改领' + game.BonusCoinNum + '枚金币吗？',
                confirmText: '改领金币',
                showCancel: true,
                cancelText: '去领现金',
                success: function (callBack) {
                    if (callBack.confirm) {
                        LifeCardUtils.addCoin(game.BonusCoinNum, ShareState.MONEY);
                        game.shareCode = '';
                        game.shareMoney = 0;
                        if (game.moneyDialog) {
                            game.moneyDialog.moneyNum.visible = false;
                            game.moneyDialog.btnConfirm.visible = false;
                            game.moneyDialog.moneySum.text = '余额：' + (Math.floor(game.moneySum * 100)) / 100 + '元';
                            game.moneyDialog.close();
                        }
                        if (that.moneyType === 1) {
                            //收藏红包
                            game.moneyCollectNum -= 1;
                            wx.setStorageSync('moneyColN', game.moneyCollectNum);
                            if (game.gameUi) {
                                game.gameUi.setMoneyCollect();
                            }
                        }
                        wx.setStorageSync('clickCoin', true);
                        wxUtils.aldSendEventFunc('成功改领金币', { 'detail': game.userId + '-' + game.level + '-' + this.money + '-' + game.moneySum + '-' + this.openType });
                    }
                    if (callBack.cancel) {
                        wxUtils.aldSendEventFunc('放弃改领金币', { 'detail': game.userId + '-' + game.level + '-' + this.money + '-' + game.moneySum + '-' + this.openType });
                        // game.getMoney(that.money, game.level, that.openType, that.moneyType);
                    }
                }
            });
        }
        else {
            //直接改领金币
            LifeCardUtils.addCoin(game.BonusCoinNum, ShareState.MONEY);
            game.shareCode = '';
            game.shareMoney = 0;
            if (game.moneyDialog) {
                game.moneyDialog.moneyNum.visible = false;
                game.moneyDialog.btnConfirm.visible = false;
                game.moneyDialog.moneySum.text = '余额：' + (Math.floor(game.moneySum * 100)) / 100 + '元';
                game.moneyDialog.close();
            }
            if (that.moneyType === 1) {
                //收藏红包
                game.moneyCollectNum -= 1;
                wx.setStorageSync('moneyColN', game.moneyCollectNum);
                if (game.gameUi) {
                    game.gameUi.setMoneyCollect();
                }
            }
            wx.setStorageSync('clickCoin', true);
            wxUtils.aldSendEventFunc('成功改领金币', { 'detail': game.userId + '-' + game.level + '-' + this.money + '-' + game.moneySum + '-' + this.openType });
        }
    };
    //设置红包对话框数据：
    //openState 0:打开前, 1:打开后, 2:点我翻倍， 3：领取翻倍
    //mType 0:普通红包，1：收藏后的红包
    //oType: 打开方式 video,share,banner
    MoneyDialog.prototype.setData = function (openState, oType, mType) {
        log('设置红包对话框数据：openState=' + openState + ',oType=' + oType + ',mType=' + mType);
        game.ifShowedMoney = true;
        game.ifMoneyDoubled = false;
        this.openedState = openState;
        this.openType = oType;
        this.openRand = -1;
        this.watchRand = -1;
        //根据是否打开红包显示不同的ui
        if (openState === 0) {
            this.ifClickConfirm = false;
            this.moneyType = mType;
            //先计算此次红包额
            if (game.moneyGetArr && game.moneyGetArr.length > 0) {
                //根据概率数组计算
                var min = 0;
                var max = 0;
                for (var index = 0; index < game.moneyGetArr.length; index++) {
                    var ele = game.moneyGetArr[index];
                    if (game.moneySum >= ele[0] && game.moneySum < ele[1]) {
                        min = ele[2];
                        max = ele[3];
                    }
                }
                var tmp = Math.random() * (max - min) + min;
                this.money = Math.max(0.01, (Math.floor(tmp * 100)) / 100); //精确到小数点后两位,最小不小于0.01
                log('本次红包金额：' + this.money + ',min=' + min + ',max=' + max + ',tmp=' + tmp);
            }
            else {
                this.money = 0.01;
            }
            log('本次红包moneyType=' + this.moneyType + ',金额：' + this.money);
            this.beforeOpenView.visible = true;
            this.btnOpen.visible = true;
            this.afterOpenView.visible = false;
            // 云控是否在打开前显示红包金额
            if (game.moneyShowMode === 0) {
                this.moneyIntroLabel.text = '随机现金 + 游戏金币'; // + game.BonusCoinNum + '游戏金币';
            }
            else if (game.moneyShowMode === 1) {
                this.moneyIntroLabel.text = this.money + '元 与 ' + game.BonusCoinNum + '枚游戏金币';
            }
            else {
                this.moneyIntroLabel.text = '';
            }
            //显示剩余次数
            var todayLeftTimes = Math.max(0, game.moneyDayGetN - game.todayMoneyGetTimes);
            this.moneyLeftTimesLabel.text = "今日还可以领取" + todayLeftTimes + "次红包";
            wxUtils.aldSendEventFunc('显示红包的剩余领取次数', { 'todayLeftTimes': todayLeftTimes });
            //play动画
            this.openAni.play(0, false);
        }
        else if (openState === 1) {
            log('余额：' + game.moneySum);
            //设置余额和提现
            this.moneySum.text = '余额：' + (Math.floor(game.moneySum * 100)) / 100 + '元';
            this.withdrawLabel.text = '满' + game.moneyWithdrawX + '元可提现';
            this.getCoinLabel.text = '领取' + game.BonusCoinNum + '枚金币';
            this.confirmLabel.text = '领取现金';
            this.moneyNum.text = '' + this.money;
            this.moneyNum.visible = true;
            this.btnConfirm.visible = true;
            this.btnClose2.visible = false;
            this.btnCoin.visible = true;
            this.beforeOpenView.visible = false;
            this.btnOpen.visible = false;
            this.afterOpenView.visible = true;
        }
        else if (openState === 2) {
            log('余额：' + game.moneySum);
            //设置余额和提现
            this.ifClickConfirm = false;
            this.moneySum.text = '余额：' + (Math.floor(game.moneySum * 100)) / 100 + '元';
            this.withdrawLabel.text = '满' + game.moneyWithdrawX + '元可提现';
            this.getCoinLabel.text = '';
            this.confirmLabel.text = '再来一包';
            this.moneyNum.text = '' + this.money;
            this.moneyNum.visible = true;
            this.btnConfirm.visible = true;
            this.btnClose2.visible = true;
            this.btnCoin.visible = false;
            this.beforeOpenView.visible = false;
            this.btnOpen.visible = false;
            this.afterOpenView.visible = true;
            wxUtils.aldSendEventFunc('显示点我翻倍', { 'detail': game.userId + '-' + game.level + '-' + this.money + '-' + game.moneySum });
        }
        else if (openState === 3) {
            log('余额：' + game.moneySum);
            //设置余额和提现
            this.ifClickConfirm = false;
            this.moneySum.text = '余额：' + (Math.floor(game.moneySum * 100)) / 100 + '元';
            this.withdrawLabel.text = '满' + game.moneyWithdrawX + '元可提现';
            this.getCoinLabel.text = '';
            this.confirmLabel.text = '领取';
            this.moneyNum.text = '' + this.money;
            this.moneyNum.visible = true;
            this.btnConfirm.visible = true;
            this.btnClose2.visible = true;
            this.btnCoin.visible = false;
            this.beforeOpenView.visible = false;
            this.btnOpen.visible = false;
            this.afterOpenView.visible = true;
            wxUtils.aldSendEventFunc('翻倍banner观看成功', { 'detail': game.userId + '-' + game.level + '-' + this.money + '-' + game.moneySum });
        }
    };
    return MoneyDialog;
}(ui.dialog_dir.dialogMoneyUI));
//# sourceMappingURL=MoneyDialog.js.map