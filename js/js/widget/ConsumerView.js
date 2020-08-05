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
var ConsumerView = /** @class */ (function (_super) {
    __extends(ConsumerView, _super);
    function ConsumerView() {
        var _this = _super.call(this) || this;
        _this.position = new Point();
        _this.Amount = 1;
        _this.on(Laya.Event.COMPONENT_REMOVED, _this, _this.onRemoved);
        _this.img.skin = "comp/img_hole.png";
        _this.anchorX = 0.5;
        _this.anchorY = 0.5;
        return _this;
        // this.size();
    }
    ConsumerView.prototype.onRemoved = function () {
        if (!this.destroyed) {
            Laya.Pool.recover("ConsumerView", this);
        }
    };
    ConsumerView.getSelf = function () {
        var pusher = Laya.Pool.getItemByClass("ConsumerView", ConsumerView);
        return pusher;
    };
    ConsumerView.prototype.pushBox = function (num) {
        this.Amount -= (num == void 0 ? 1 : num);
        //展示特效　待实现
        this.showAni();
        soundUtils.playSound(HOLE_SOUND);
        if (this.Amount == 0) {
            //已经满了
            this.img.skin = HOLE_IMG.FULL;
        }
        else {
            this.img.skin = HOLE_IMG.HALF;
        }
    };
    //显示进洞效果
    ConsumerView.prototype.showAni = function () {
        //animation
        var img = new Laya.Image();
        img.skin = HOLE_IMG.RIPPLE;
        img.anchorX = 0.5;
        img.anchorY = 0.5;
        img.size(this.width, this.height);
        var pos = new Laya.Point();
        this.localToGlobal(pos, false);
        img.pos(pos.x + this.pivotX, pos.y + this.pivotY);
        img.scale(0.8, 0.8);
        img.alpha = 0.5;
        Laya.stage.addChild(img);
        Laya.Tween.to(img, { alpha: 0.8, scaleX: 1, scaleY: 1 }, 100, null, Laya.Handler.create(img, function () {
            Laya.Tween.to(img, { scaleX: 1.5, scaleY: 1.5 }, 300, Laya.Ease.quadOut, Laya.Handler.create(img, function () {
                Laya.Tween.to(img, { alpha: 0.3, scaleX: 1.4, scaleY: 1.4 }, 100, null, Laya.Handler.create(img, function () {
                    img.destroy();
                }));
            }));
        }));
    };
    /**
 *
 *
 * @param {number} x 横坐标        ｜
 * @param {number} z 纵坐标        ｜
 *                                 －－－－
 * @param {Array<number>} direction　方向
 * @memberof PusherView
 */
    ConsumerView.prototype.init = function (x, z, Amount, rows, cols) {
        this.visible = true;
        this.Amount = Amount;
        var baseXY = calcBaseXY(rows, cols);
        this.position.x = x;
        this.position.z = z;
        var y = ROWS - z;
        this.pos(this.position.x * BOX_SIZE + this.pivotX + baseXY.x, y * BOX_SIZE + this.pivotY + baseXY.y);
        this.img.skin = Amount > 1 ? HOLE_IMG.NONE2 : HOLE_IMG.NONE;
        this.zOrder = -1;
        return this;
    };
    return ConsumerView;
}(ui.view.BoxViewUI));
//# sourceMappingURL=ConsumerView.js.map