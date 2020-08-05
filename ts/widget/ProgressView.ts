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
 *  自定义控件：进度条
 *  主要函数：
 *      setProgress(progress: number, max?: number, min?: number, callBack?: Function): void 设置进度
 *  
 */

class ProgressBar extends ui.view.ProgressViewUI {
    private maxValue: number = 100;//最大值
    private minValue: number = 0;//最小值
    private progress: number = 0;//当前进度值
    constructor() {
        super();
    }

    public getProgress(): number {
        return this.progress;
    }
    /**
     * 设置进度
     * @param progress  进度值
     * @param max   最大值
     * @param min   最小时
     * @param callBack  进度完成时的回调
     */
    public setProgress(progress: number, max?: number, min?: number, callBack?: Function): void {
        if (!isNaN(min)) {
            this.minValue = min;
        }
        if (!isNaN(max)) {
            this.maxValue = max;
        }
        //判断是否为回退
        let isBack: boolean = progress < this.progress;
        this.progress = progress;
        //根据百分比，计算应该移动的距离 
        //该移动的距离 
        var per = this.progress / (this.maxValue - this.minValue) * this.progressBar.width;

        var moveX = -this.progressBar.width / 2 + per;
        //计算mask的位置
        // 如果是回退，就从0开始
        if (isBack) {
            this.progressMask.x = -this.progressBar.width / 2;
            Laya.Tween.to(this.progressMask, { x: moveX }, 500, null, Laya.Handler.create(this, function () {
                if (callBack) {
                    callBack();
                }
            }));
        } else {
            Laya.Tween.to(this.progressMask, { x: moveX }, 500, null, Laya.Handler.create(this, function () {
                if (callBack) {
                    callBack();
                }
            }));
        }
    }
}