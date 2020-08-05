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
 *  该文件是公共设置
 *
 */
//没有定义的
var UNDEFINED = 'undefined';
var COLORNONE = -1;
/**结束时动画时间 */
var BOX_ANI_TIME = 300;
/**首页demo动画时长（每个格子) */
var BLOCK_ANI_DURATION = 300;
var STAR_DURATION = 500;
//游戏状态
var GAME_STATE = {
    NONE: -1,
    PLAYING: 0,
    PAUSE: 1,
    ANI: 2,
    GAMEOVER: 3,
    DEATH: 4,
};
//坐标点
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
// game config=====================
/**
 * 游戏相关的设置，请在此处设置
 */
//game config  end =================
/**判断两点是否相邻 */
function isNear(p1, p2) {
    return (((p1.y === p2.y) && Math.abs(p1.x - p2.x) === 1) || (p1.x === p2.x && Math.abs(p1.y - p2.y) === 1));
}
//从point1移动到point2,转过的角度    
function getPointAngle(point1, point2) {
    if (point2.x == point1.x && point2.y == point1.y) {
        return 0;
    }
    if (point2.x > point1.x && point2.y > point1.y) { //第一象限
        return Math.atan((point2.y - point1.y) / (point2.x - point1.x)) / Math.PI * 180;
    }
    else if (point2.x < point1.x && point2.y > point1.y) {
        return Math.atan((point1.x - point2.x) / (point2.y - point1.y)) / Math.PI * 180 + 90;
    }
    else if (point2.x < point1.x && point2.y < point1.y) {
        return Math.atan((point1.y - point2.y) / (point1.x - point2.x)) / Math.PI * 180 + 180;
    }
    else if (point2.x > point1.x && point2.y < point1.y) {
        return Math.atan((point2.x - point1.x) / (point1.y - point2.y)) / Math.PI * 180 + 270;
    }
    if (point2.x == point1.x && point2.y > point1.y) {
        return 90; //下
    }
    else if (point2.x == point1.x && point2.y < point1.y) {
        return 270; //上
    }
    else if (point2.x > point1.x && point2.y == point1.y) {
        return 360; //右
    }
    else {
        return 180; //左
    }
}
/**计算两点间距离 */
function getDistance(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}
/**
 * 震动时间
 * @param time  毫秒数
 */
function vibrate(time) {
    // if (isNoVirbate) return;
    // Log.d('virbrate  time:' + time);
    var count = time / 15;
    var index = 0;
    var obj = { count: count, index: index };
    Laya.timer.loop(15, obj, function () {
        // Log.d('virbrate  loop   index:' + index);
        Laya.Browser.window.wx.vibrateShort();
        index++;
        if (index > count) {
            Laya.timer.clearAll(obj);
            obj = null;
        }
    });
}
function vibrateLong() {
    // if (isNoVirbate) return;
    Laya.Browser.window.wx.vibrateLong();
}
function playPart(obj) {
    log("playPart =======");
    Laya.loader.load('ani/PiaoLuo.part', Laya.Handler.create(this, function (settings) {
        log("playPart =======left ");
        var Particle2D = Laya.Particle2D;
        // 创建 Particle2D 实例
        var partIns = new Particle2D(settings);
        Laya.stage.addChild(partIns);
        partIns.pos(0, 100);
        // 开始发射粒子
        partIns.emitter.start();
        // 播放
        partIns.play();
        //一秒后销毁对像
        Laya.timer.once(5000, obj, function () {
            log("playPart =======left destory ");
            partIns.emitter.clear();
            partIns.stop();
            partIns.removeSelf();
        });
    }), null, Laya.Loader.JSON);
}
var Log = /** @class */ (function () {
    function Log() {
    }
    Log.d = function (msg) {
        if (msg === void 0) { msg = ""; }
        if (DEBUG) {
            console.log(msg);
        }
    };
    Log.e = function (msg) {
        if (msg === void 0) { msg = ""; }
        console.error(msg);
    };
    return Log;
}());
//============设置模块==============
//是否静音
var MUTE = "MUTE_KEY";
var MUTE_MUSIC = "MUTE_MUSIC_KEY";
var NOVIRBATE = "NOVIRBATE_KEY";
var isMute = false;
var isMuteMusic = false;
//是否震动
var isNoVirbate = false;
//=======================end====================
//# sourceMappingURL=Common.js.map