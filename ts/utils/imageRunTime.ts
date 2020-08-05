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
 *  点击特效脚本
 *  
 */


/*
ImageRunTime逻辑类 
*/
class ImageRunTime extends Laya.Image {
    public scaleTime: number = 100;
    constructor() {
        super();
        //设置组件的中心点
        this.anchorX = this.anchorY = 0.5;
        //添加鼠标按下事件侦听。按时时缩小按钮。
        this.on(Laya.Event.MOUSE_DOWN, this, this.scaleSmal);
        //添加鼠标抬起事件侦听。抬起时还原按钮。
        this.on(Laya.Event.MOUSE_UP, this, this.scaleBig);
        //添加鼠标离开事件侦听。离开时还原按钮。
        this.on(Laya.Event.MOUSE_OUT, this, this.scaleBig);
    }
    public scaleBig(): void {
        //变大还原的缓动效果
        Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, this.scaleTime);
    }
    public scaleSmal(): void {
        //缩小至0.8的缓动效果
        Laya.Tween.to(this, { scaleX: 0.8, scaleY: 0.8 }, this.scaleTime);
    }
}
