var coinUtils = /** @class */ (function () {
    function coinUtils() {
    }
    /*
    获取用户复活卡数量
    */
    coinUtils.getUserCoin = function (createType) {
        // log('getUserCoin: type=' + createType);
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
                    /*  if (game.gameUi) {
                        game.gameUi.setCoinCount(game.coinNum);
                      }*/
                }
                break;
        }
    };
    //领取n枚金币
    coinUtils.addCoin = function (n, type) {
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
        /* if (game.gameUi) {
           game.gameUi.setCoinCount(game.coinNum);
         }*/
    };
    /*
    字符串截断函数，每个中文字符长度为2，英文字符长度为1
    */
    coinUtils.sub = function (str, n) {
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
    return coinUtils;
}());
//# sourceMappingURL=coinUtils.js.map