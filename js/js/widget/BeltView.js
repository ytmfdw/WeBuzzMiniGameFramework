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
var BeltView = /** @class */ (function (_super) {
    __extends(BeltView, _super);
    function BeltView() {
        var _this = _super.call(this) || this;
        _this.position = new Point();
        _this.d = DIRECTION.NONE;
        _this.hasFind = false; //递归标记
        _this.on(Laya.Event.COMPONENT_REMOVED, _this, _this.onRemoved);
        _this.anchorX = 0.5;
        _this.anchorY = 0.5;
        return _this;
        // this.size();
    }
    BeltView.prototype.onRemoved = function () {
        if (!this.destroyed) {
            Laya.Pool.recover("BeltView", this);
        }
    };
    BeltView.getSelf = function () {
        var pusher = Laya.Pool.getItemByClass("BeltView", BeltView);
        return pusher;
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
    BeltView.prototype.init = function (x, z, Direction, rows, cols) {
        this.d = Direction;
        this.hasFind = false;
        switch (Direction) {
            case DIRECTION.RIGHT:
            case DIRECTION.LEFT:
                {
                    this.img.skin = "comp/img_blet_h.png";
                }
                break;
            case DIRECTION.TOP:
            case DIRECTION.DOWN:
                {
                    this.img.skin = "comp/img_blet_v.png";
                }
                break;
        }
        var baseXY = calcBaseXY(rows, cols);
        this.position.x = x;
        this.position.z = z;
        var y = ROWS - z;
        this.pos(this.position.x * BOX_SIZE + this.pivotX + baseXY.x, y * BOX_SIZE + this.pivotY + baseXY.y);
        this.zOrder = -1;
        return this;
    };
    return BeltView;
}(ui.view.BletViewUI));
//# sourceMappingURL=BeltView.js.map