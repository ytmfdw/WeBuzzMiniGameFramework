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
var WaveWidget = /** @class */ (function (_super) {
    __extends(WaveWidget, _super);
    function WaveWidget() {
        var _this = _super.call(this) || this;
        _this.opt = null;
        _this.points = [];
        _this.vision = [];
        _this.visionMax = 0;
        _this.visionAlpha = 0;
        _this.lineSize = 10;
        _this.visionInterval = 10;
        _this._now = null;
        _this._preDate = null;
        _this.ctx = null;
        _this.color = "#fff";
        return _this;
    }
    WaveWidget.prototype.init = function (father, x, y, opt) {
        this.opt = opt || new Opt();
        this.K = opt.K !== void 0 ? opt.K : 2;
        this.F = opt.F !== void 0 ? opt.F : 6;
        this.speed = this.opt.speed || 0.1;
        this.noise = this.opt.noise || 0;
        this.phase = this.opt.phase || 0;
        this.width = this.opt.width || 320;
        this.height = this.opt.height || 100;
        this.color = this.opt.color || "#fff";
        this.lineSize = this.opt.lineSize || 10;
        this.list = [];
        this._preDate = Date.now();
        this.pivot(0, 0);
        this.visionInterval = opt.visionInterval || 10;
        this.visionMax = opt.visionMax !== void 0 ? opt.visionMax : 1;
        this.ctx = this.graphics;
        this.ctx.clear();
        var glowFilter = new Laya.GlowFilter(this.color, this.width / 2, 0, 0);
        //设置滤镜集合为发光滤镜
        this.filters = [glowFilter];
        this._now = Date.now();
        this.tick();
        Laya.timer.frameLoop(1, this, this.tick$1);
        this.pos(x, y);
        this.scale(0, 1);
        this.rotation = this.opt.roation || 0;
        father.addChild(this);
        Laya.Tween.to(this, { scaleX: 1 }, this.width);
    };
    WaveWidget.prototype.update = function (notClear) {
        var _this2 = this;
        if (!notClear) {
            this.ctx.clear();
        }
        this.draw();
    };
    WaveWidget.prototype._globalAttenuationFn = function (x) {
        //http://www.wolframalpha.com/input/?i=pow(2*4%2F(2*4%2Bpow(x,4)),2*2)
        return Math.pow(this.K * 4 / (this.K * 4 + Math.pow(x, 4)), this.K * 2);
    };
    WaveWidget.prototype._drawLine = function (attenuation) {
        var x, y;
        this.list.length = 0;
        // let rnd = Math.random() * 2;//使用随机值
        var rnd = 1;
        for (var i = -this.K; i <= this.K; i += 0.005) {
            x = this.width * ((i + this.K) / (this.K * 2));
            y = this.noise * this._globalAttenuationFn(i) * (1 / attenuation) * Math.sin(this.F * i - this.phase) * rnd;
            this.list.push(x, y);
        }
    };
    WaveWidget.prototype.tick = function () {
        this.phase = (this.phase + this.speed) % (Math.PI * 64);
        this._drawLine(1);
    };
    WaveWidget.prototype.tick$1 = function () {
        this.tick();
        this.points = this.list.slice(0);
        this.update();
    };
    WaveWidget.prototype.tickSelf = function () {
        this._now = Date.now();
        if (this._now - this._preDate > this.visionInterval) {
            this.vision.push(this.points.slice(0));
            if (this.vision.length > this.visionMax) {
                this.vision.splice(0, 1);
            }
            this._preDate = this._now;
        }
    };
    WaveWidget.prototype.draw = function () {
        this.tickSelf();
        // this.beforeDraw.call(this, ctx);
        // this.ctx.save();
        // this.ctx.translate(this.x, this.y);
        // this.ctx.lineWidth = this.size;
        // ctx.globalAlpha = 1;
        // ctx.strokeStyle = this.color;
        var points = this.points;
        // this.ctx.stroke();
        var ctx = this.ctx;
        ctx.clear();
        ctx.drawLine(0, 0, this.width, 0, this.color, this.lineSize + Math.random() * 5);
        var vision = this.vision;
        /*    if (vision.length > 0) {
                var vp = vision[0];
                ctx.drawCurves(0, 0, vp, this.color, this.lineSize / 2);
            }*/
        for (var _i2 = 0, _len2 = vision.length; _i2 < _len2; _i2++) {
            var vp = vision[_i2];
            ctx.drawCurves(0, 0, vp, this.color, 3);
        }
        // ctx.restore();
        // this.afterDraw.call(this, ctx);
    };
    return WaveWidget;
}(Laya.Sprite));
var Opt = /** @class */ (function () {
    function Opt() {
        this.width = 640;
        this.height = 400;
        this.K = 1; //波的起始点
        this.F = 10; //波长调节，越大，波长越小
        this.speed = .5; //速率 正
        this.noise = 10; //调节振幅  正
        this.phase = 0;
        this.lineSize = 10; //线宽
        this.color = "#FFF"; //颜色
        this.visionInterval = 10;
        this.visionMax = 1; //最多线条数
        this.roation = 0; //角度
    }
    return Opt;
}());
//# sourceMappingURL=WaveWidget.js.map