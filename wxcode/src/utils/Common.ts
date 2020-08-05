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
const UNDEFINED = 'undefined';

const COLORNONE = -1;
/**结束时动画时间 */
const BOX_ANI_TIME = 300;

/**首页demo动画时长（每个格子) */
const BLOCK_ANI_DURATION = 300;

const STAR_DURATION = 500;
//游戏状态
const GAME_STATE = {
    NONE: -1,
    PLAYING: 0,//玩家可操作状态
    PAUSE: 1,//暂停
    ANI: 2,//是否正在动画
    GAMEOVER: 3,//游戏过关
    DEATH: 4,//游戏死掉了
};
//坐标点
class Point {
    public x: number;
    public y: number;
    constructor(x?: number, y?: number) {
        this.x = x;
        this.y = y;
    }
}

// game config=====================
/**
 * 游戏相关的设置，请在此处设置
 */
//game config  end =================


/**判断两点是否相邻 */
function isNear(p1, p2): boolean {
    return (((p1.y === p2.y) && Math.abs(p1.x - p2.x) === 1) || (p1.x === p2.x && Math.abs(p1.y - p2.y) === 1));
}

//从point1移动到point2,转过的角度    
function getPointAngle(point1, point2): number {
    if (point2.x == point1.x && point2.y == point1.y) {
        return 0;
    }
    if (point2.x > point1.x && point2.y > point1.y) {//第一象限
        return Math.atan((point2.y - point1.y) / (point2.x - point1.x)) / Math.PI * 180
    } else if (point2.x < point1.x && point2.y > point1.y) {
        return Math.atan((point1.x - point2.x) / (point2.y - point1.y)) / Math.PI * 180 + 90
    } else if (point2.x < point1.x && point2.y < point1.y) {
        return Math.atan((point1.y - point2.y) / (point1.x - point2.x)) / Math.PI * 180 + 180
    } else if (point2.x > point1.x && point2.y < point1.y) {
        return Math.atan((point2.x - point1.x) / (point1.y - point2.y)) / Math.PI * 180 + 270
    }
    if (point2.x == point1.x && point2.y > point1.y) {
        return 90;//下
    } else if (point2.x == point1.x && point2.y < point1.y) {
        return 270;//上
    } else if (point2.x > point1.x && point2.y == point1.y) {
        return 360;//右
    } else {
        return 180;//左
    }
}

/**计算两点间距离 */
function getDistance(p1: any, p2: any): number {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}



/**
 * 震动时间
 * @param time  毫秒数
 */
function vibrate(time: number) {
    // if (isNoVirbate) return;
    // Log.d('virbrate  time:' + time);
    let count = time / 15;
    let index = 0;
    let obj = { count: count, index: index };
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

function playPart(obj: any) {
    log("playPart =======");
    Laya.loader.load('ani/PiaoLuo.part', Laya.Handler.create(this, function (settings) {
        log("playPart =======left ");
        const Particle2D = Laya.Particle2D;
        // 创建 Particle2D 实例
        let partIns = new Particle2D(settings);
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

class Log {

    public static d(msg: any = ""): void {
        if (DEBUG) {
            console.log(msg);
        }
    }

    public static e(msg: any = ""): void {
        console.error(msg);
    }
}

//============设置模块==============

//是否静音
const MUTE: string = "MUTE_KEY";
const MUTE_MUSIC: string = "MUTE_MUSIC_KEY";
const NOVIRBATE: string = "NOVIRBATE_KEY";
var isMute: boolean = false;
var isMuteMusic: boolean = false;
//是否震动
var isNoVirbate: boolean = false;
//=======================end====================