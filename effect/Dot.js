var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Dot = /** @class */ (function (_super) {
    __extends(Dot, _super);
    //圆点特效
    function Dot() {
        var _this = _super.call(this) || this;
        _this.frameIndex = 0;
        _this.on(Laya.Event.COMPONENT_REMOVED, _this, _this.onRemoved);
        return _this;
    }
    Dot.prototype.onRemoved = function () {
        if (!this.destroyed) {
            Laya.Pool.recover("Dot", this);
        }
    };
    Dot.getSelf = function () {
        var dot = Laya.Pool.getItemByClass("Dot", Dot);
        return dot;
    };
    Dot.prototype.pop = function (father, color, size, x, y) {
        this.removeChildren();
        var realSize = size == void 0 ? father.width : size;
        this.size(realSize, realSize);
        this.pivot(realSize / 2, realSize / 2);
        this.pos(x == void 0 ? father.width / 2 : x, y == void 0 ? father.height / 2 : y);
        father.addChild(this);
        var count = Math.random() * Dot.DOT_COUNT + Dot.DOT_COUNT;
        for (var i = 0; i < count; i++) {
            var dot = SmallDot.getSelf();
            dot.init(this.width / 4, color);
            dot.pos(Math.random() * this.width, Math.random() * this.height);
            this.addChild(dot);
        }
        this.frameIndex = 0;
        Laya.timer.frameLoop(1, this, this.loop);
    };
    Dot.prototype.loop = function () {
        this.frameIndex++;
        var num = this.numChildren;
        for (var i = 0; i < num; i++) {
            var dot = this.getChildAt(i);
            dot.pos(dot.x, dot.y - 1);
            dot.alpha = dot.alpha - Dot.DOT_DALPHA;
        }
        if (this.frameIndex * Dot.DOT_DALPHA >= 1) {
            Laya.timer.clearAll(this);
            this.removeChildren();
            this.removeSelf();
        }
    };
    Dot.DOT_COUNT = 5;
    Dot.DOT_DALPHA = 0.05;
    return Dot;
}(Laya.Sprite));
var SmallDot = /** @class */ (function (_super) {
    __extends(SmallDot, _super);
    function SmallDot() {
        var _this = _super.call(this) || this;
        _this.color = null;
        _this.frameIndex = 0;
        _this.on(Laya.Event.COMPONENT_REMOVED, _this, _this.onRemoved);
        _this.skin = "comp/Soft.png";
        _this.anchorX = 0.5;
        _this.anchorY = 0.5;
        return _this;
    }
    SmallDot.prototype.onRemoved = function () {
        if (!this.destroyed) {
            Laya.Pool.recover("SmallDot", this);
        }
    };
    SmallDot.getSelf = function () {
        var dot = Laya.Pool.getItemByClass("SmallDot", SmallDot);
        return dot;
    };
    SmallDot.prototype.init = function (maxSize, color) {
        var size = Math.random() * maxSize;
        this.size(size, size);
        this.alpha = 1;
        if (this.color && this.color == color)
            return;
        var r = parseInt(color.substring(1, 3), 16) / 200;
        var g = parseInt(color.substring(3, 5), 16) / 200;
        var b = parseInt(color.substring(5, 7), 16) / 200;
        var l = 0;
        var colorMatrix = [
            r, 0, 0, 0, l,
            g, 0, 0, 0, l,
            b, 0, 0, 0, l,
            0, 0, 0, 1, l,
        ];
        // 创建红色颜色滤镜
        var redFilter = new Laya.ColorFilter(colorMatrix);
        this.filters = [redFilter];
        this.color = color;
    };
    SmallDot.prototype.startAni = function () {
        this.frameIndex = 0;
        Laya.timer.frameLoop(1, this, this.loop);
    };
    SmallDot.prototype.loop = function () {
        this.frameIndex++;
        this.pos(this.x, this.y - 1);
        this.alpha = this.alpha - Dot.DOT_DALPHA;
        if (this.frameIndex * Dot.DOT_DALPHA >= 1) {
            Laya.timer.clearAll(this);
            this.removeSelf();
        }
    };
    return SmallDot;
}(Laya.Image));
//# sourceMappingURL=Dot.js.map