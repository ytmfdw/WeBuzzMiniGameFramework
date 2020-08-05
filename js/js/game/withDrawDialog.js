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
var withDrawDialog = /** @class */ (function (_super) {
    __extends(withDrawDialog, _super);
    function withDrawDialog() {
        var _this = _super.call(this) || this;
        _this.money = 0;
        _this.btnClose.on(Laya.Event.CLICK, _this, _this.closeClick);
        _this.btnWithdraw.on(Laya.Event.CLICK, _this, _this.withdraw);
        return _this;
    }
    withDrawDialog.prototype.closeClick = function (e) {
        e.stopPropagation();
        //销毁userButton
        if (userButton) {
            userButton.hide();
            userButton.destroy();
        }
        //删除自己
        this.close();
    };
    //提现
    withDrawDialog.prototype.withdraw = function (e) {
        e.stopPropagation();
        game.withDrawMoney();
    };
    //设置红包数据
    withDrawDialog.prototype.setData = function () {
        log('余额：' + game.moneySum);
        //设置当前余额
        this.moneySum.text = '' + (Math.floor(game.moneySum * 100)) / 100;
        this.labelWithdrawX.text = '' + game.moneyWithdrawX;
        // 判断是否授权
        var user = AV.User.current();
        wxUtils.fetchWxSetting(user);
    };
    return withDrawDialog;
}(ui.dialog_dir.dialogWithdrawUI));
//# sourceMappingURL=withDrawDialog.js.map