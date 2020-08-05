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
var ImageAniView = /** @class */ (function (_super) {
    __extends(ImageAniView, _super);
    function ImageAniView() {
        var _this = _super.call(this) || this;
        _this.IMGS = [
            // "comp/ray_1.png",
            // "comp/ray_2.png",
            // "comp/ray_3.png",
            // "comp/ray_4.png",
            // "comp/ray_5.png",
            // "comp/ray_6.png",
            // "comp/ray_7.png",
            // "comp/ray_8.png"
            // "comp/small_light.png",
            // // "comp/small_light.png",
            //备选1
            "comp/light2.png"
            // "light/white_line_1.png"
        ];
        _this.index = 0;
        _this.speed = 1;
        //A 为波幅（纵轴）， ω 为角频率， t 为时间（横轴）， θ 为相偏移（横轴左右）
        _this.A = 10; //振幅
        _this.offX = 0; //相偏移
        _this.w = 1; //角速度
        _this.propLoopTime = 1000;
        _this.on(Laya.Event.REMOVED, _this, _this.stop);
        return _this;
    }
    //停止所有
    ImageAniView.prototype.stop = function () {
        Laya.timer.clearAll(this);
        // log("子控件移出 舞台=================>");
        Laya.Pool.recover("ImageAniView", this);
    };
    ImageAniView.prototype.init = function (x, y, w, h, father, speed, set) {
        this.height = h;
        this.width = w;
        this.anchorX = 0;
        this.anchorY = 0.5;
        this.pos(x, y);
        this.father = father;
        this.father.addChild(this);
        this.skin = this.IMGS[this.index];
        this.speed = speed != void 0 ? speed : 1;
        Laya.timer.frameLoop(1, this, this.change);
        Laya.timer.loop(this.propLoopTime, this, this.changeProp);
    };
    ImageAniView.prototype.changeProp = function () {
        var thiz = this;
        Laya.Tween.to(this, {
            alpha: 0.5,
            scaleX: 0.8,
            scaleY: 0.8
        }, this.propLoopTime / 2, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(thiz, {
                alpha: 1,
                scaleX: 1,
                scaleY: 1
            }, thiz.propLoopTime / 3);
        }));
    };
    ImageAniView.prototype.change = function () {
        this.skin = this.IMGS[++this.index % this.IMGS.length];
        this.x = this.x + this.speed;
        //宽度也增加
        if (this.width < 200) {
            this.width += 1;
        }
        // this.y = this.A * Math.sin(this.x);
        if (this.x + this.width >= this.father.width + 20) {
            Laya.timer.clearAll(this);
            this.removeSelf();
        }
    };
    return ImageAniView;
}(Laya.Image));
//# sourceMappingURL=ImageAniView.js.map