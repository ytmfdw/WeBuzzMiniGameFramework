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
class SmallCaiDai extends Laya.Image {
    private father: Laya.Sprite = null;
    private speedInitX = 10;//x方向的初始速度
    private speedInitY = 50;//y方向的初始速度
    private aInitX = 2;//x方向的加速度，最大值，随机数
    private aInitY = 1;//y方向的加速度，恒定值

    /**
     * @param star  被爆的星星
     * @param father  容器
     **/
    public init(father: Laya.Sprite, x?: number, y?: number): void {
        this.father = father;
        let rnd = Math.floor(Math.random() * 19) + 1;
        this.skin = 'caidai/caidai' + rnd + '.png'
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
    }

    private popup() {
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
    }
}

class CaiDai {
    private static self: CaiDai = null;
    private father: Laya.Sprite = null;
    private baseCount = 30;
    private rndMax = 30;
    private constructor(x: number, y: number, father: Laya.Sprite) {
        this.father = father;
        // Laya.loader.load("res/atlas/caidai.atlas", Laya.Handler.create(this, this.loaded, [x, y, this.father]), null, Laya.Loader.ATLAS);
        this.loaded(x, y, this.father);
    }
    private loaded(x: number, y: number, father: Laya.Sprite): void {
        // log('caidai father:'+father.width+','+father.height);
        //随机产生大量的小彩带
        let max = this.baseCount + Math.floor(Math.random() * this.rndMax);
        for (let i = 0; i < max; i++) {
            let caidai: SmallCaiDai = Laya.Pool.getItemByClass('SmallCaiDai', SmallCaiDai);
            caidai.init(father, x, y);
        }


    }
    /**
     * 展示动画效果
     * 
     * @static
     * @param {number} x 
     * @param {number} y 
     * @param {Laya.Sprite} [father] 
     * @memberof CaiDai
     */
    public static show(x: number, y: number, father?: Laya.Sprite): void {
        // log('彩带：x=' + x);
        // log('彩带：y=' + y);
        if (CaiDai.self) {
            CaiDai.self.loaded(x, y, father ? father : Laya.stage);
        } else {
            CaiDai.self = new CaiDai(x, y, father ? father : Laya.stage);
        }
    }
    /**
     * 得到单例实例，有可能 为null
     */
    public static getSelf(): CaiDai {
        return CaiDai.self;
    }
}