var LifeCardUtils = /** @class */ (function () {
    function LifeCardUtils() {
    }
    /*
    获取用户复活卡数量
    */
    LifeCardUtils.getUserCoin = function (createType) {
        log('getUserCoin: type=' + createType);
        log('金币数量：' + game.coinNum);
        //展示复活卡数量
        switch (createType) {
            case CHARGE_DIALOG_GAME:
            case CHARGE_DIALOG_HOME:
                {
                    if (game.chargeDialog == null) {
                        game.chargeDialog = new ChargeDialog();
                    }
                    game.chargeDialog.setTipCount(game.coinNum);
                    game.chargeDialog.popup();
                    //update gameUI
                    if (game.gameUi) {
                        game.gameUi.setCoinCount(game.coinNum);
                    }
                }
                break;
        }
    };
    //保存游戏数据到leancloud
    LifeCardUtils.saveToAV = function (level) {
        if (typeof AV === 'undefined') {
            return;
        }
        //判断是否需要升级
        if (level <= game.all_level) {
            return;
        }
        if (level % LEVEL_COUNT == 0) {
            //更新云端数据
            syncUtils.syncUserData();
        }
        //更新最高等级
        game.all_level = level;
        wx.setStorageSync('all_level', game.all_level);
        //保存最高记录
        game.hasNewRecord = true;
        var data = { key: openDataKey, value: game.all_level + "" };
        //微信游戏中心
        var utimestamp = Math.round((new Date()).getTime() / 1000);
        var wxValue = {
            "wxgame": {
                "score": game.all_level,
                "update_time": utimestamp
            }
        };
        var jsonWxValue = JSON.stringify(wxValue);
        log('jsonWxValue:' + jsonWxValue);
        var wxgameData = { key: 'wxLevel', value: jsonWxValue };
        wx.setUserCloudStorage({
            KVDataList: [data, wxgameData],
            success: function (res) {
                log(res);
            },
            fail: function (res) {
                log(res);
            }
        });
    };
    //领取n枚金币
    LifeCardUtils.addCoin = function (n, type) {
        // wx.showLoading({
        //   title: '领取中...',
        //   mask: true
        // });
        log('当前金币数量=' + game.coinNum);
        game.coinNum += n;
        wx.setStorageSync('CoinNum', game.coinNum);
        // wx.hideLoading();
        log('领取成功：当前数量=' + game.coinNum);
        if (type !== 0) {
            wx.showToast({
                title: '成功领到' + n + '枚金币',
                icon: 'none',
                duration: 1500,
                mask: false,
            });
        }
        switch (type) {
            case ShareState.BONUS:
                if (game.bonusDialog) {
                    // if (game.bonusDialog.bonusType === 0) {
                    //   game.bonusGetTimes += 1; //只有过关大礼包时才累计领取次数
                    // }
                    game.bonusDialog.close();
                }
                break;
            case ShareState.CHARGE:
                if (game.chargeDialog) {
                    game.chargeDialog.close();
                }
                break;
            default:
                break;
        }
        if (game.gameUi) {
            game.gameUi.setCoinCount(game.coinNum);
        }
    };
    /*
    字符串截断函数，每个中文字符长度为2，英文字符长度为1
    */
    LifeCardUtils.sub = function (str, n) {
        var r = /[^\x00-\xff]/g;
        if (str.replace(r, "mm").length <= n) {
            return str;
        }
        var m = Math.floor(n / 2);
        for (var i = m; i < str.length; i++) {
            if (str.substr(0, i).replace(r, "mm").length >= n) {
                return str.substr(0, i) + "..";
            }
        }
        return str;
    };
    return LifeCardUtils;
}());
//# sourceMappingURL=lifeCard.js.map