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
var SmallCaiDai = /** @class */ (function (_super) {
    __extends(SmallCaiDai, _super);
    function SmallCaiDai() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.father = null;
        _this.speedInitX = 1; //x方向的初始速度
        _this.speedInitY = 20; //y方向的初始速度
        _this.aInitX = 0.05; //x方向的加速度，最大值，随机数
        _this.aInitY = 0.1; //y方向的加速度，恒定值
        return _this;
    }
    /**
     * @param star  被爆的星星
     * @param father  容器
     **/
    SmallCaiDai.prototype.init = function (father, x, y) {
        this.father = father;
        if (!this.skin) {
            var rnd = Math.floor(Math.random() * 19) + 1;
            this.skin = 'caidai/caidai' + rnd + '.png';
        }
        var scaleValue = Math.random() * 50;
        var w = scaleValue;
        var h = scaleValue;
        this.width = w;
        this.height = h;
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.rotation = Math.random() * 360;
        this.pos(x ? x : 0, y ? y : 0);
        this.zOrder = 9999;
        this.father.addChild(this);
        var thiz = this;
        this.on(Laya.Event.REMOVED, this, function () {
            Laya.Pool.recover("SmallCaiDai", thiz);
        });
        this.popup();
    };
    /**
     * 缓存到内存中，防止首次有闪屏
     */
    SmallCaiDai.prototype.recover = function () {
        var rnd = Math.floor(Math.random() * 19) + 1;
        this.skin = 'caidai/caidai' + rnd + '.png';
        var scaleValue = Math.random() * 50;
        var w = scaleValue;
        var h = scaleValue;
        this.width = w;
        this.height = h;
        //创建红色颜色滤镜
        // var redFilter: Laya.ColorFilter = new Laya.ColorFilter(colorMatrix);
        // this.filters = [redFilter];
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.rotation = Math.random() * 360;
        this.skewY = Math.random() * 360;
        this.zOrder = 9999;
        var thiz = this;
        Laya.Pool.recover("SmallCaiDai", thiz);
    };
    SmallCaiDai.prototype.popup = function () {
        var thiz = this;
        var index = 0;
        var starX = this.x;
        var starY = this.y;
        var speedX = Math.random() >= 0.5 ? Math.random() * this.speedInitX : -Math.random() * this.speedInitX;
        var aX = ((Math.random() > 0.5) ? -Math.random() : Math.random()) * this.aInitX;
        var aY = this.aInitY;
        var speedY = -Math.random() * this.speedInitY;
        var skew = Math.random() * 10;
        Laya.timer.frameLoop(1, thiz, function () {
            //结束条件,跑到外面去了就结束并移除
            if (thiz.x < 0 || thiz.x > thiz.father.width || thiz.y > thiz.father.height || thiz.y < 0) {
                // thiz.visible = false;
                Laya.timer.clearAll(thiz);
                thiz.removeSelf();
                return;
            }
            //翻转
            thiz.skewY += skew;
            //y方向也是匀减速
            var moveY = speedY * index + 0.5 * aY * index * index;
            thiz.y = starY + moveY;
            //x方向匀减速 a与speedX方向相反
            if (thiz.y > 0) {
                var moveX = speedX * index + 0.5 * aX * index * index;
                thiz.x = starX + moveX;
            }
            index++;
        });
    };
    return SmallCaiDai;
}(Laya.Image));
var CaiDai = /** @class */ (function () {
    function CaiDai(x, y, father) {
        this.father = null;
        this.baseCount = 800;
        this.rndMax = 200;
        this.father = father;
        // Laya.loader.load("res/atlas/caidai.atlas", Laya.Handler.create(this, this.loaded, [x, y, this.father]), null, Laya.Loader.ATLAS);
        this.loaded(x, y, this.father);
    }
    CaiDai.prototype.loaded = function (x, y, father) {
        // log('caidai father:'+father.width+','+father.height);
        //随机产生大量的小彩带
        var max = this.baseCount + Math.floor(Math.random() * this.rndMax);
        for (var i = 0; i < max; i++) {
            var caidai = Laya.Pool.getItemByClass('SmallCaiDai', SmallCaiDai);
            caidai.init(father, x, y);
        }
    };
    CaiDai.init = function () {
        /* for (let i = 0; i < 1000; i++) {
             let caidai: SmallCaiDai = Laya.Pool.getItemByClass('SmallCaiDai', SmallCaiDai);
             caidai.recover();
         }*/
    };
    /**
     * 展示动画效果
     *
     * @static
     * @param {number} x
     * @param {number} y
     * @param {Laya.Sprite} [father]
     * @memberof CaiDai
     */
    CaiDai.show = function (x, y, father) {
        // log('彩带：x=' + x);
        // log('彩带：y=' + y);
        soundUtils.playSound(SEND_SOUND);
        if (CaiDai.self) {
            CaiDai.self.loaded(x, y, father ? father : Laya.stage);
        }
        else {
            CaiDai.self = new CaiDai(x, y, father ? father : Laya.stage);
        }
    };
    CaiDai.self = null;
    return CaiDai;
}());
//# sourceMappingURL=CaiDai.js.map