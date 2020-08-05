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
 *  公共动效
 *  
 */
 
 /**
 * 震动一个控件
 * @param view 
 * @param time 
 */
function vibrateView(view: Laya.Sprite, time: number): void {

    let initPos = { x: view.x, y: view.y };
    //定义参数  
    var count = time ? (time / 10) : 50;
    var loop = 0;//震动次数  
    var offX;
    var offY;
    var dir = 1;//震动方向。1正，-1反  
    var rotation;
    Laya.timer.loop(10, view, function () {
        loop++;
        //随机获取震动方向  
        dir = Math.random() > .5 ? 1 : -1;
        //随机获取X轴移动量  
        offX = Math.random() * 5 * dir + initPos.x;
        //随机获取Y轴移动量  
        offY = Math.random() * 5 * dir * -1 + initPos.y;
        // rotation = Math.random() * 5 * dir + vibrateObj.rotation;
        Laya.Tween.to(view, { x: offX, y: offY }, 10, Laya.Ease.linearNone, Laya.Handler.create(view, function () {
            if (loop > count) {
                Laya.timer.clearAll(view);
                view.x = initPos.x;
                view.y = initPos.y;
                return;
            }
        }));
    });
}

/**
 * 控件像波浪形抖动
 * 按顺序波动
 * 
 * @param {Array<Laya.Sprite>} views 
 */
function rippleViews(views: Array<Laya.Sprite>, stime?: number, scale?: number): void {
    let len = views.length;
    let scalTime = stime ? stime : 100;
    let scaleN = scale ? scale : 1.1;
    for (let i = 0; i < len; i++) {
        //先清掉该控件上的所有动效
        let aniView = views[i];
        Laya.Tween.clearTween(aniView);
        //再按顺序进行波动
        Laya.timer.once(i * scalTime, aniView, function () {
            Laya.Tween.to(aniView, { scaleX: scaleN, scaleY: scaleN }, scalTime, Laya.Ease.linearIn, Laya.Handler.create(aniView, function () {
                Laya.Tween.to(aniView, { scaleX: 1, scaleY: 1 }, scalTime, Laya.Ease.linearOut);
            }));
        });
    }
}


/**膨胀动画时间  */
const SCALE_DURATION = 100;
/**闪烁动画时间  */
const TWINKLE_DURATION = 100;

/**膨胀动画  x方向拉伸，y方向压缩
 * 
 * @param caller 执行域
 * @param view  动画对象
 * @param scaleXY 膨胀系数，默认0.2
 */
function scaleAni(caller: any, view: Laya.Sprite, scaleXY?: number) {
    var obj = { scale: 0 };
    var thiz = caller;
    var scaleTmp = scaleXY ? scaleXY : 0.2;
    Laya.Tween.to(obj, {
        scale: scaleTmp,
        update: new Laya.Handler(thiz, () => {
            view.scaleX = 1 + obj.scale;
            view.scaleY = 1 - obj.scale;
        })
    }, SCALE_DURATION, Laya.Ease.bounceInOut, Laya.Handler.create(thiz, function () {
        obj = { scale: 0 };
        Laya.Tween.to(obj, {
            scale: scaleTmp,
            update: new Laya.Handler(thiz, () => {
                view.scaleX = 1 + scaleTmp - obj.scale;
                view.scaleY = 1 - scaleTmp + obj.scale;
            })
        }, SCALE_DURATION, Laya.Ease.bounceInOut);
    }));
}

/**
* 抖动动画效果    旋转抖动（动画对象描点设置为中心点)
* @param caller 
* @param view 
* @param count     不用传入
*/
function sharkAni(caller: any, view: Laya.Sprite, count?: number, times?: number, callBack?: Function) {
    var index = count ? count : 0;
    var r = index % 4 === 0 ? 15 : (index % 4 === 1 ? 0 : (index % 4 === 2 ? -15 : 0));
    Laya.Tween.to(view, {
        rotation: r
    }, 60, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        if (index <= (4 * (times ? times : 5))) {
            sharkAni(caller, view, index + 1, times, callBack);
        } else {
            //播放完成回调
            if (callBack) {
                callBack();
            }
        }
    }));
}
/**
 * 抖动动画效果  左右抖动
 * @param caller 执行域
 * @param view 动画对象
 * @param count 抖动动画索引，不用传或传入0
 * @param times 抖动次数，默认5次
 * @param callBack 动画完成后回调
 */
function sharkAniLeftRight(caller: any, view: Laya.Sprite, count?: number, times?: number, callBack?: Function) {
    var index = count ? count : 0;
    var r = index % 4 === 0 ? 0 : (index % 4 === 1 ? 20 : (index % 4 === 2 ? 0 : -20));
    var t = view.x + r;
    Laya.Tween.to(view, {
        x: t
    }, 10, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        if (index <= (3 * (times ? times : 5))) {
            sharkAniLeftRight(caller, view, ++index, times, callBack);
        } else {
            //播放完成回调
            if (callBack) {
                callBack();
            }
        }
    }));
}

/**
 * 闪烁动画
 * @param caller 执行域
 * @param view 动画对象
 * @param count 动画次数索引，请传入null或0
 * @param times 闪烁次数
 * @param callBack 动画完成后回调
 */
function twinkle(caller: any, view: Laya.Sprite, count?: number, times?: number, callBack?: Function): void {
    var index = count ? count : 0;
    var r = index % 2 === 0 ? 0.5 : 1;
    Laya.Tween.to(view, {
        alpha: r
    }, TWINKLE_DURATION, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        if (index <= (2 * (times ? times : 1))) {
            twinkle(caller, view, index + 1, times, callBack);
        } else {
            //播放完成回调
            log('播放完成回调');
            if (callBack) {
                log('播放完成回调 callBack');
                callBack();
            }
        }
    }));
}


/**跳动动画
 * 
 * @param caller 执行域
 * @param view  动画对象,必需要设置描点为中心
 * @param skipHeight 跳跃高度，默认为控件高度一半
 * @param skipNum 跳跃次数，默认为3次
 * @param callBack 完成回调
 * @param skipIndex 跳跃索引，不用传入，或传0
 */
function skipAni(caller: any, view: Laya.Sprite, skipHeight?: number, skipNum?: number, callBack?: Function, skipIndex?: number) {
    var obj = { scale: 0 };
    var thiz = caller;
    var h = view.height;
    var baseY = view.y;
    var height = skipHeight ? skipHeight : (h * 3 / 4);
    var skipCount = skipNum ? skipNum : 3;
    var skips = skipIndex ? skipIndex : 0;
    //计算本次高度
    height = height / (skips + 1);
    Laya.Tween.to(obj, {
        scale: height,
        update: new Laya.Handler(thiz, () => {
            view.y = baseY - obj.scale;
        })
    }, 100, Laya.Ease.bounceInOut, Laya.Handler.create(thiz, function () {
        obj = { scale: 0 };
        Laya.Tween.to(obj, {
            scale: height,
            update: new Laya.Handler(thiz, () => {
                view.y = baseY - height + obj.scale;
            })
        }, 100, Laya.Ease.bounceInOut, Laya.Handler.create(thiz, function () {
            // scaleAni(thiz, view);
            if (skips >= skipCount) {

                if (callBack) {
                    callBack();
                }
            } else {
                skipAni(caller, view, skipHeight, skipNum, callBack, skips + 1);
            }
        }));
    }));
}

function scaleInAni(caller: any, view: Laya.Sprite) {
    // log('scaleInAni')
    Laya.Tween.to(view, {
        scaleX: 0.8,
        scaleY: 0.8
    }, 550, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        Laya.Tween.to(view, {
            scaleX: 1.0,
            scaleY: 1.0
        }, 550, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        }));
    }));
}

function scaleOutAni(caller: any, view: Laya.Sprite) {
    // log('scaleInAni')
    Laya.Tween.to(view, {
        scaleX: 1.2,
        scaleY: 1.2
    }, 550, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        Laya.Tween.to(view, {
            scaleX: 1.0,
            scaleY: 1.0
        }, 550, Laya.Ease.linearInOut, Laya.Handler.create(caller, function () {
        }));
    }));
}

/**
 * 白屏闪烁特效
 * 
 * @param {Laya.Sprite} content 
 */
function twinkleView(content: Laya.Sprite, callBack?: Function) {
    let w = content.width;
    let h = content.height;
    let img: Laya.Image = new Laya.Image();
    img.skin = "comp/blurredCircle.png";
    img.size(w * 2, h * 2);
    img.alpha = 0;
    img.anchorX = 0.5;
    img.anchorY = 0.5;
    img.pos(w / 2, h / 2);
    content.addChild(img);
    Laya.Tween.to(img, {
        scaleX: 4,
        scaleY: 4,
        alpha: 0.5
    }, 500, Laya.Ease.linearOut, Laya.Handler.create(img, function () {
        Laya.Tween.to(img, {
            scaleX: 1,
            scaleY: 1,
            alpha: 0
        }, 500, Laya.Ease.linearIn, Laya.Handler.create(img, function () {
            img.destroy();
            if (callBack) {
                callBack();
            }
        }));
    }));


}


/**震屏效果临时变量 */
var vibrateObj = {
    x: 0, y: 0, rotation: 0, view: null
};
/**
 * 调用该方法前，请将view的描点设置为中心点
 * 震屏效果
 * 三个变量：x水平方向  5,y垂直方向  5,rotation旋转角度  10
 * @param view 
 * @param time  持续时间 以毫秒为单位
 */
function vibrateScreen(view: Laya.Sprite, callBack?: Function, time?: number): void {
    if (vibrateObj.view) {
        Laya.timer.clearAll(vibrateObj);
        //说明上一次的动画还没完成
        vibrateObj.view.x = vibrateObj.x;
        vibrateObj.view.y = vibrateObj.y;
        vibrateObj.view.rotation = vibrateObj.rotation;
    }
    //先清除该对象上的缓和时间
    vibrateObj.x = view.x;
    vibrateObj.y = view.y;
    vibrateObj.rotation = view.rotation;
    vibrateObj.view = view;
    //定义参数  
    var count = time ? (time / 10) : 50;
    var loop = 0;//震动次数  
    var offX;
    var offY;
    var dir = 1;//震动方向。1正，-1反  
    var rotation;

    Laya.timer.loop(10, vibrateObj, function () {
        loop++;
        //随机获取震动方向  
        dir = Math.random() > .5 ? 1 : -1;
        //随机获取X轴移动量  
        offX = Math.random() * 7 * dir + vibrateObj.x;
        //随机获取Y轴移动量  
        offY = Math.random() * 7 * dir * (-1) + vibrateObj.y;
        // rotation = Math.random() * 5 * dir + vibrateObj.rotation;
        if (loop > count) {
            view.x = vibrateObj.x;
            view.y = vibrateObj.y;
            view.rotation = vibrateObj.rotation;
            vibrateObj.view = null;
            if (callBack) {
                callBack();
            }
            Laya.timer.clearAll(vibrateObj);
            return;
        }
        Laya.Tween.to(view, { x: offX, y: offY, rotation: rotation }, 10, Laya.Ease.linearNone);
    });
}
