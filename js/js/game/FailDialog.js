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
var failDialog = /** @class */ (function (_super) {
    __extends(failDialog, _super);
    function failDialog() {
        var _this = _super.call(this) || this;
        _this.btnRestart.on(Laya.Event.CLICK, _this, _this.restartClick);
        return _this;
    }
    failDialog.prototype.restartClick = function (e) {
        e.stopPropagation();
        soundUtils.playSound(CHOOSE);
        //删除自己
        this.close();
        game.replayGame(game.level);
    };
    failDialog.getSelf = function () {
        if (!failDialog.self) {
            failDialog.self = new failDialog();
        }
        return failDialog.self;
    };
    failDialog.self = null;
    return failDialog;
}(ui.dialog_dir.dialogFailUI));
//# sourceMappingURL=FailDialog.js.map