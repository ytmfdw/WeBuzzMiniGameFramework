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
 *  题目定义
 *  
 *  calcGrade()     计算等级，从1开始
 *  calcLevel()     计算关卡，也是从１开始
 *  loadSubLevel()  分级加载，针对图片较多的，可将图片放在多个分包中，然后依次加载分包
 * 
 *  几个用到的微信小游戏：一笔补全(id:wxe993b507c0d39266)，动物拼图(id:wx8602c3baf95e614a)，帮我画一笔(id:wx7eead4e128492cf8)　等　
 * 
 *
 */
var LEVEL_1=[];
var LEVEL_2=[];
var LEVEL_3=[];
var LEVEL_4=[];
var LEVEL_5=[];
 
//新手引导
var GUIDE_DATA = [];
//所有等级题目
var LEVELS = [
    LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5
];
var LEVELS_COUNT = [
    LEVEL_1.length, LEVEL_2.length, LEVEL_3.length, LEVEL_4.length, LEVEL_5.length
];
//总题目个数
var allQuestionLen = LEVEL_1.length + LEVEL_2.length + LEVEL_3.length + LEVEL_4.length + LEVEL_5.length;
/**
 * 计算等级，level是从1开始的
 *
 * @param {number} level
 * @returns
 */
function calcGrade(level) {
    var levelSum = 0;
    for (var i = 1; i <= LEVELS_COUNT.length; i++) {
        levelSum += LEVELS_COUNT[i - 1];
        if (level <= levelSum) {
            return i;
        }
    }
    return LEVELS.length;
}
/**
 * 计算關卡，level是从1开始的
 *
 * @param {number} level
 * @returns
 */
function calcLevel(level) {
    var grade = 1;
    var levelSum = 0;
    for (var i = 1; i <= LEVELS_COUNT.length; i++) {
        levelSum += LEVELS_COUNT[i - 1];
        if (level <= levelSum) {
            grade = i;
            break;
        }
    }
    var levelCount = LEVELS_COUNT[grade - 1];
    levelSum = (levelSum - LEVELS_COUNT[grade - 1]);
    return (level - 1 - levelSum) % levelCount;
}
function loadSubLevel(grade, callBack) {
    if (loadedLevels.indexOf(grade) >= 0) {
        if (callBack) {
            callBack(grade);
        }
    }
    var loadTask = wx.loadSubpackage({
        name: "level" + grade,
        success: function (res) {
            // 分包加载成功后通过 success 回调
            Log.d(res);
            Log.d("分包 level" + grade + "加载完成");
            loadedLevels.push(grade);
            if (callBack) {
                callBack(grade);
            }
        },
        fail: function (res) {
            // 分包加载失败通过 fail 回调
            loadSubLevel(grade, callBack);
        }
    });
}
//# sourceMappingURL=question.js.map