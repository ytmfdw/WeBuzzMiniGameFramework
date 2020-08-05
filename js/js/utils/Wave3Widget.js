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
var Wave3Widget = /** @class */ (function (_super) {
    __extends(Wave3Widget, _super);
    function Wave3Widget() {
        var _this = _super.call(this) || this;
        _this.ctx = void 0;
        _this.color = "#fff";
        _this.set = new Set();
        _this.speed = 10;
        _this.lineSize = 1;
        _this.fromX = 0;
        _this.fromY = 0;
        _this.toX = 0;
        _this.toY = 0;
        _this.on(Laya.Event.REMOVED, _this, _this.stop);
        _this.ctx = _this.graphics;
        return _this;
    }
    //停止所有
    Wave3Widget.prototype.stop = function () {
        Laya.timer.clearAll(this);
        // log("线条移出 舞台=================>");
        //回收到对象池
        Laya.Pool.recover("Wave3Widget", this);
    };
    Wave3Widget.prototype.init = function (father, x, y, opt, callBack, toX, toY) {
        this.ctx.clear();
        //控件基础属性
        this.fromX = x;
        this.fromY = y;
        this.toX = toX;
        this.toY = toY;
        this.set = opt ? opt : new Set();
        this.width = this.set.width || 320;
        this.height = this.set.height || 100;
        this.color = this.set.color || "#fff";
        this.pivot(0, 0);
        var glowFilter = new Laya.GlowFilter(this.color, 10, 0, 0); //发光宽度 this.width / 10
        //设置滤镜集合为发光滤镜
        this.filters = [glowFilter];
        this.pos(x, y);
        this.scale(0, 1);
        this.rotation = this.set.roation || 0;
        father.addChild(this);
        Laya.Tween.to(this, { scaleX: 1 }, this.width / 2, Laya.Ease.linearNone, Laya.Handler.create(this, function () {
            // log('line init callBack')
            if (callBack) {
                // log('line init callBack')
                callBack();
            }
        }));
        // log('line init')
        this.speed = this.set.speed == void 0 ? 10 : this.set.speed;
        this.lineSize = this.set.lineSize == void 0 ? 10 : this.set.lineSize;
        //波相关属性
        // Laya.timer.loop(1000, this, this.createDot);
        this.ctx.drawLine(0, 0, this.width, 0, this.color, this.lineSize);
    };
    Wave3Widget.prototype.createDot = function () {
        var img = Laya.Pool.getItemByClass("ImageAniView", ImageAniView);
        var size = Math.random() * this.height + this.height / 2;
        // let speed = Math.random() * this.speed + 0.01;
        var speed = this.speed;
        img.init(0, 0, size, size, this, speed);
    };
    return Wave3Widget;
}(Laya.Sprite));
var Set = /** @class */ (function () {
    function Set() {
        this.width = 640;
        this.height = 400;
        //线条颜色，默认白色
        this.color = '#fff';
        //旋转角度
        this.roation = 0;
        //固定属性
        //线条运动速度，默认1.4
        this.lineSize = 2;
        //线条数
        this.particleCount = 200;
        //变幻值,越小越趋向直线
        this.spawnRadius = 10;
        //步长
        this.noiseSteps = 6;
        this.speed = 1;
    }
    return Set;
}());
//# sourceMappingURL=Wave3Widget.js.map