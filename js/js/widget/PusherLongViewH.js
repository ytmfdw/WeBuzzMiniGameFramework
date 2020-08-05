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
/**
 * 水平方向的两个的推推棒
 *
 * @class PusherLongViewH
 * @extends {ui.view.PusherViewLongHUI}
 */
var PusherLongViewH = /** @class */ (function (_super) {
    __extends(PusherLongViewH, _super);
    function PusherLongViewH() {
        var _this = _super.call(this) || this;
        _this.position = new Point();
        _this.pushers = [_this.leftPusher, _this.topPusher, _this.rightPusher, _this.downPusher];
        _this.scaleXY = PUSH_SCALE;
        _this.isAni = false;
        _this.direction = [];
        _this.on(Laya.Event.COMPONENT_REMOVED, _this, _this.onRemoved);
        return _this;
    }
    //显示推动动画效果
    PusherLongViewH.prototype.showPushAni = function () {
        var _this = this;
        if (this.isAni) {
            return;
        }
        soundUtils.playSound(PUSH_SOUND);
        this.isAni = true;
        var thiz = this;
        var _loop_1 = function (i) {
            if (this_1.pushers[i].visible) {
                Laya.Tween.to(this_1.pushers[i], { width: this_1.pushers[i].width * (i % 2 == 0 ? thiz.scaleXY : 1), height: this_1.pushers[i].height * (i % 2 == 0 ? 1 : thiz.scaleXY) }, PUSH_DURATION, null, Laya.Handler.create(this_1.pushers[i], function () {
                    Laya.Tween.to(_this.pushers[i], {
                        width: _this.pushers[i].width * (i % 2 == 0 ? (1 / thiz.scaleXY) : 1), height: _this.pushers[i].height * (i % 2 == 0 ? 1 : (1 / thiz.scaleXY))
                    }, PUSH_DURATION * PUSH_BACK_PER, Laya.Ease.expoIn, Laya.Handler.create(thiz, function () {
                        thiz.isAni = false;
                    }));
                }));
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.pushers.length; i++) {
            _loop_1(i);
        }
    };
    PusherLongViewH.prototype.onRemoved = function () {
        if (!this.destroyed) {
            this.reset();
            Laya.Pool.recover("PusherLongViewH", this);
        }
    };
    PusherLongViewH.getSelf = function () {
        var pusher = Laya.Pool.getItemByClass("PusherLongViewH", PusherLongViewH);
        pusher.reset();
        return pusher;
    };
    PusherLongViewH.prototype.reset = function () {
        //先将四个推推棒隐藏
        this.leftPusher.visible = false;
        this.topPusher.visible = false;
        this.rightPusher.visible = false;
        this.downPusher.visible = false;
    };
    //确定位置 7 x 7　的格子
    /**
     *
     *
     * @param {number} x 横坐标        ｜
     * @param {number} z 纵坐标        ｜
     *                                 －－－－
     * @param {Array<number>} direction　方向
     * @memberof PusherView
     */
    PusherLongViewH.prototype.init = function (x, z, direction, rows, cols) {
        this.reset();
        this.direction = direction;
        var baseXY = calcBaseXY(rows, cols);
        this.position.x = x;
        this.position.z = z;
        var y = ROWS - z;
        this.pos(this.position.x * BOX_SIZE + this.pivotX + baseXY.x, y * BOX_SIZE + this.pivotY + baseXY.y);
        var len = direction.length;
        for (var i = 0; i < len; i++) {
            switch (direction[i].d) {
                case DIRECTION.LEFT:
                    {
                        this.leftPusher.visible = true;
                    }
                    break;
                case DIRECTION.TOP:
                    {
                        this.topPusher.visible = true;
                    }
                    break;
                case DIRECTION.RIGHT:
                    {
                        this.rightPusher.visible = true;
                    }
                    break;
                case DIRECTION.DOWN:
                    {
                        this.downPusher.visible = true;
                    }
                    break;
            }
        }
        return this;
    };
    return PusherLongViewH;
}(ui.view.PusherViewLongHUI));
//# sourceMappingURL=PusherLongViewH.js.map