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
ImageRunTime逻辑类
*/
var ImageRunTime = /** @class */ (function (_super) {
    __extends(ImageRunTime, _super);
    function ImageRunTime() {
        var _this = _super.call(this) || this;
        _this.scaleTime = 100;
        //设置组件的中心点
        _this.anchorX = _this.anchorY = 0.5;
        //添加鼠标按下事件侦听。按时时缩小按钮。
        _this.on(Laya.Event.MOUSE_DOWN, _this, _this.scaleSmal);
        //添加鼠标抬起事件侦听。抬起时还原按钮。
        _this.on(Laya.Event.MOUSE_UP, _this, _this.scaleBig);
        //添加鼠标离开事件侦听。离开时还原按钮。
        _this.on(Laya.Event.MOUSE_OUT, _this, _this.scaleBig);
        return _this;
    }
    ImageRunTime.prototype.scaleBig = function () {
        //变大还原的缓动效果
        Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, this.scaleTime);
    };
    ImageRunTime.prototype.scaleSmal = function () {
        //缩小至0.8的缓动效果
        Laya.Tween.to(this, { scaleX: 0.8, scaleY: 0.8 }, this.scaleTime);
    };
    return ImageRunTime;
}(Laya.Image));
//# sourceMappingURL=imageRunTime.js.map