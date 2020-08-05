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
var NoticePage = /** @class */ (function (_super) {
    __extends(NoticePage, _super);
    function NoticePage() {
        var _this = _super.call(this) || this;
        _this.titleIndex = 0;
        _this.btnClose.on(Laya.Event.CLICK, _this, _this.closeClick);
        return _this;
    }
    NoticePage.prototype.closeClick = function (e) {
        e.stopPropagation();
        //主动关闭自己
        Laya.stage.removeChild(game.noticePage);
        game.ifShowNotice = false; //本次冷启动不再显示
    };
    //设置广播标题
    NoticePage.prototype.setData = function () {
        // log('titleIndex='+this.titleIndex+',noticeTitleArr len='+game.noticeTitleArr.length);
        if (game.noticeTitleArr.length > 0) {
            this.titleIndex = Math.floor(Math.random() * (game.noticeTitleArr.length));
            var noticeStr = game.noticeTitleArr[this.titleIndex];
            this.noticeText.text = noticeStr;
            // log('显示通知：'+noticeStr);
            //默认3秒后关闭
            Laya.timer.once(3000, this, function () {
                Laya.stage.removeChild(game.noticePage);
            });
        }
    };
    return NoticePage;
}(ui.page_dir.noticePageUI));
//# sourceMappingURL=NoticePage.js.map