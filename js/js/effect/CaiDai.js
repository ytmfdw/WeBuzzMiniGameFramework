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
/*
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * 小彩带特效
 */
var SmallCaiDai = /** @class */ (function (_super) {
    __extends(SmallCaiDai, _super);
    function SmallCaiDai() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.father = null;
        _this.speedInitX = 10; //x方向的初始速度
        _this.speedInitY = 50; //y方向的初始速度
        _this.aInitX = 2; //x方向的加速度，最大值，随机数
        _this.aInitY = 1; //y方向的加速度，恒定值
        return _this;
    }
    /**
     * @param star  被爆的星星
     * @param father  容器
     **/
    SmallCaiDai.prototype.init = function (father, x, y) {
        this.father = father;
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
        this.pos(x ? x : 0, y ? y : 0);
        this.father.addChild(this);
        this.popup();
    };
    SmallCaiDai.prototype.popup = function () {
        var thiz = this;
        var index = 0;
        var starX = this.x;
        var starY = this.y;
        var speedX = Math.random() >= 0.5 ? Math.random() * this.speedInitX : -Math.random() * this.speedInitX;
        var aX = (speedX > 0 ? -Math.random() : Math.random()) * this.aInitX;
        var aY = this.aInitY;
        var speedY = -Math.random() * this.speedInitY;
        Laya.timer.frameLoop(1, thiz, function () {
            //结束条件,跑到外面去了就结束并移除
            if (thiz.x < 0 || thiz.x > thiz.father.width || thiz.y > thiz.father.height || thiz.y < 0) {
                // thiz.visible = false;
                Laya.timer.clearAll(thiz);
                thiz.destroy();
                return;
            }
            //x方向匀减速 a与speedX方向相反
            var moveX = speedX * index + 0.5 * aX * index * index;
            thiz.x = starX + moveX;
            //y方向也是匀减速
            var moveY = speedY * index + 0.5 * aY * index * index;
            thiz.y = starY + moveY;
            index++;
        });
    };
    return SmallCaiDai;
}(Laya.Image));
var CaiDai = /** @class */ (function () {
    function CaiDai(x, y, father) {
        this.father = null;
        this.baseCount = 30;
        this.rndMax = 30;
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
        if (CaiDai.self) {
            CaiDai.self.loaded(x, y, father ? father : Laya.stage);
        }
        else {
            CaiDai.self = new CaiDai(x, y, father ? father : Laya.stage);
        }
    };
    /**
     * 得到单例实例，有可能 为null
     */
    CaiDai.getSelf = function () {
        return CaiDai.self;
    };
    CaiDai.self = null;
    return CaiDai;
}());
//# sourceMappingURL=CaiDai.js.map