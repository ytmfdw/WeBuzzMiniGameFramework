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
 *  资源加载
 *
 *
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
var LoadPage = /** @class */ (function (_super) {
    __extends(LoadPage, _super);
    function LoadPage() {
        var _this = _super.call(this) || this;
        _this.progressBar = null;
        _this.progress = 0;
        _this.subpackage = [
            'subassets'
        ];
        _this.stateFlag = [];
        _this.subLen = 0;
        //加载索引值
        _this.loadIndex = 0;
        _this.min = 0;
        _this.max = 100;
        _this.totalProgress = [0, 0, 0];
        _this.callBack = null;
        _this.msg = "抵制不良游戏，拒绝盗版游戏，注意自我保护，谨防受骗上当。\n适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活。";
        _this.progressBar = new ProgressBar();
        _this.progressLayout.addChild(_this.progressBar);
        _this.subLen = _this.subpackage.length;
        _this.on(Laya.Event.COMPONENT_REMOVED, _this, _this.onRemove);
        _this.msgLabel.text = _this.msg;
        return _this;
    }
    LoadPage.prototype.setCallBack = function (callBack) {
        this.callBack = callBack;
    };
    LoadPage.getSelf = function (callBack) {
        if (LoadPage.self == null) {
            LoadPage.self = new LoadPage();
        }
        if (callBack) {
            LoadPage.self.setCallBack(callBack);
            LoadPage.self.loadRes(callBack);
        }
        return LoadPage.self;
    };
    LoadPage.prototype.loadRes = function (callBack) {
        this.callBack = callBack;
        this.setProgress(0);
        var thiz = this;
        var loadTask = wx.loadSubpackage({
            name: thiz.subpackage[0],
            success: function (res) {
                // 分包加载成功后通过 success 回调
                Log.d(res);
                thiz.stateFlag[0] = true;
                //将题目数组赋值给question
            },
            fail: function (res) {
                // 分包加载失败通过 fail 回调
                thiz.stateFlag[0] = false;
            },
            complete: function () {
                thiz.loadIndex++;
                log("分包加载完成:::" + thiz.subpackage[0]);
                log("分包加载完成");
                thiz.onCompelete(true);
            }
        });
        loadTask.onProgressUpdate(function (res) {
            log('下载进度  i=>' + 0 + res.progress);
            log('已经下载的数据长度' + res.totalBytesWritten);
            log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
            thiz.totalProgress[0] = res.totalBytesWritten / res.totalBytesExpectedToWrite * 100;
            var per = (thiz.totalProgress[0]) / 100;
            thiz.setProgress(per * 100);
        });
    };
    LoadPage.prototype.setProgress = function (progress, min, max) {
        if (!isNaN(min)) {
            this.min = min;
        }
        if (!isNaN(max)) {
            this.max = max;
        }
        this.progress = progress;
        //根据百分比，计算应该移动的距离 
        //该移动的距离 
        this.progressBar.setProgress(this.progress);
        // this.progressBar.x = moveX;
        this.loadText.text = '正在玩命加载...' + Math.round(progress) + '%';
    };
    /**
 * 加载结束
 *
 * @private
 * @memberof LoadPage
 */
    LoadPage.prototype.onCompelete = function (flag) {
        if (this.callBack) {
            this.callBack(flag);
        }
        this.removeSelf();
    };
    LoadPage.prototype.onRemove = function () {
        log("移出舞台");
        LoadPage.self = null;
        this.destroy();
    };
    LoadPage.self = null;
    return LoadPage;
}(ui.page_dir.LoadPageUI));
//# sourceMappingURL=LoadPage.js.map