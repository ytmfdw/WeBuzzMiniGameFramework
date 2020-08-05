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
var DispenserView = /** @class */ (function (_super) {
    __extends(DispenserView, _super);
    function DispenserView() {
        var _this = _super.call(this) || this;
        _this.position = new Point();
        _this.pushers = [_this.leftPusher, _this.topPusher, _this.rightPusher, _this.downPusher];
        _this.scaleXY = PUSH_SCALE;
        _this.isAni = false;
        _this.charges = 0;
        _this.direction = null;
        _this.on(Laya.Event.COMPONENT_REMOVED, _this, _this.onRemoved);
        return _this;
    }
    DispenserView.prototype.showPushAni = function () { };
    DispenserView.prototype.showDispenseAni = function (callBack) {
        if (this.isAni) {
            return;
        }
        if (this.charges <= 0) {
            this.isAni = false;
            if (callBack) {
                callBack(false);
            }
            return;
        }
        soundUtils.playSound(PUSH_SOUND);
        this.charges--;
        var thiz = this;
        //设置文本
        thiz.textLabel.text = thiz.charges > 0 ? thiz.charges + '' : '';
        thiz.isAni = true;
        var aniCount = 0;
        var finishCount = 0;
        var _loop_1 = function (i) {
            if (thiz.pushers[i].visible) {
                aniCount++;
                Laya.Tween.to(thiz.pushers[i], { width: thiz.pushers[i].width * (i % 2 == 0 ? thiz.scaleXY : 1), height: thiz.pushers[i].height * (i % 2 == 0 ? 1 : thiz.scaleXY) }, PUSH_DURATION, null, Laya.Handler.create(thiz.pushers[i], function () {
                    var width = thiz.pushers[i].width * (i % 2 == 0 ? (1 / thiz.scaleXY) : 1);
                    var height = thiz.pushers[i].height * (i % 2 == 0 ? 1 : (1 / thiz.scaleXY));
                    thiz.pushers[i].width = width;
                    thiz.pushers[i].height = height;
                    finishCount++;
                    if (finishCount >= aniCount) {
                        thiz.isAni = false;
                        if (thiz.charges == 0) {
                            thiz.btn.skin = "comp/press_btn_gray.png";
                            for (var _i = 0, _a = thiz.pushers; _i < _a.length; _i++) {
                                var push = _a[_i];
                                push.visible = false;
                            }
                        }
                        if (callBack) {
                            callBack(true);
                        }
                    }
                }));
            }
        };
        for (var i = 0; i < thiz.pushers.length; i++) {
            _loop_1(i);
        }
    };
    DispenserView.prototype.onRemoved = function () {
        if (!this.destroyed) {
            this.reset();
            Laya.Pool.recover("DispenserView", this);
        }
    };
    DispenserView.getSelf = function () {
        var pusher = Laya.Pool.getItemByClass("DispenserView", DispenserView);
        pusher.reset();
        return pusher;
    };
    DispenserView.prototype.reset = function () {
        //先将四个推推棒隐藏
        this.leftPusher.visible = false;
        this.topPusher.visible = false;
        this.rightPusher.visible = false;
        this.downPusher.visible = false;
        this.textLabel.text = "";
        this.btn.skin = "skins/red/img_top_btn.png";
        this.isAni = false;
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
    DispenserView.prototype.init = function (x, z, charges, direction, rows, cols) {
        this.reset();
        this.direction = direction;
        this.charges = charges;
        this.textLabel.text = charges + '';
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
        this.zOrder = 999;
        return this;
    };
    return DispenserView;
}(ui.view.DispenserViewUI));
//# sourceMappingURL=DispenserView.js.map