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
var GuideView = /** @class */ (function (_super) {
    __extends(GuideView, _super);
    function GuideView() {
        var _this = _super.call(this) || this;
        _this.guideMsg = "１、点击方块，累积3个相同方块即可消除\n２、所有方块都消除即可过关\n３、累积7个时不能再点击，可使用消除道具清掉";
        _this.height = Laya.stage.height;
        _this.maskLayout.height = _this.height;
        _this.maskLayout.graphics.drawRect(0, 0, _this.maskLayout.width, _this.maskLayout.height, "#000");
        _this.msgLabel.text = _this.guideMsg;
        _this.on(Laya.Event.CLICK, _this, _this.onClick);
        _this.contentLayout.y = (_this.height - _this.contentLayout.height) / 2;
        return _this;
    }
    GuideView.prototype.onClick = function (e) {
        e.stopPropagation();
        GuideView.self = null;
        this.destroy();
    };
    GuideView.getSelf = function () {
        if (GuideView.self == null) {
            GuideView.self = new GuideView();
        }
        GuideView.self.showMsg(GuideView.self.guideMsg);
        return GuideView.self;
    };
    GuideView.prototype.showMsg = function (msg) {
        this.msgLabel.text = msg;
        this.msgLayout.scale(0, 0);
        Laya.Tween.to(this.msgLayout, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.bounceOut);
    };
    GuideView.self = null;
    return GuideView;
}(ui.view.GuideViewUI));
//# sourceMappingURL=GuideView.js.map