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
var PushableView = /** @class */ (function (_super) {
    __extends(PushableView, _super);
    function PushableView() {
        var _this = _super.call(this) || this;
        _this.position = new Point();
        _this.isAni = false; //动画状态不可推动
        _this.hasBeFind = false;
        _this.hasPushToHole = false; //是否已经进洞
        _this.on(Laya.Event.COMPONENT_REMOVED, _this, _this.onRemoved);
        _this.img.skin = "skins/red/img_push_box.png";
        _this.anchorX = 0.5;
        _this.anchorY = 0.5;
        return _this;
        // this.size();
    }
    PushableView.prototype.onRemoved = function () {
        if (!this.destroyed) {
            Laya.Pool.recover("PushableView", this);
        }
    };
    PushableView.getSelf = function () {
        var pusher = Laya.Pool.getItemByClass("PushableView", PushableView);
        return pusher;
    };
    //移动动画
    /**
     *
     *
     * @param {number} direction 移动方向
     * @param {number} moveDs 移动单位距离 以一个格子为单位
     * @param {Function} callBack 移动完成后回调
     * @memberof PushableView
     */
    PushableView.prototype.showMoveAni = function (direction, moveDs, callBack) {
        if (this.isAni) {
            //正在动画时，不能再动画
            if (callBack) {
                callBack(false);
            }
            return;
        }
        ;
        var thiz = this;
        var moveValue = {
            x: thiz.x, y: thiz.y
        };
        switch (direction) {
            case DIRECTION.DOWN:
                {
                    moveValue.y += moveDs * BOX_SIZE;
                }
                break;
            case DIRECTION.TOP:
                {
                    moveValue.y -= moveDs * BOX_SIZE;
                }
                break;
            case DIRECTION.RIGHT:
                {
                    moveValue.x += moveDs * BOX_SIZE;
                }
                break;
            case DIRECTION.LEFT:
                {
                    moveValue.x -= moveDs * BOX_SIZE;
                }
                break;
        }
        Laya.Tween.to(thiz, { x: moveValue.x, y: moveValue.y }, moveDs * PUSH_DURATION, null, Laya.Handler.create(thiz, function () {
            //动画结束了，需要把自己的位置改成对应的位置
            thiz.isAni = false;
            thiz.hasBeFind = false;
            if (callBack) {
                callBack(true);
            }
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
    PushableView.prototype.init = function (x, z, rows, cols) {
        this.hasBeFind = false;
        this.isAni = false;
        this.visible = true;
        this.hasPushToHole = false;
        var baseXY = calcBaseXY(rows, cols);
        this.position.x = x;
        this.position.z = z;
        var y = ROWS - z;
        this.pos(this.position.x * BOX_SIZE + this.pivotX + baseXY.x, y * BOX_SIZE + this.pivotY + baseXY.y);
        return this;
    };
    return PushableView;
}(ui.view.BoxViewUI));
//# sourceMappingURL=PushableView.js.map