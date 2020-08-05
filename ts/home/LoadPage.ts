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

class LoadPage extends ui.page_dir.LoadPageUI {
    private static self: LoadPage = null;
    private progressBar: ProgressBar = null;
    public progress: number = 0;
    private subpackage = [
        'subassets'
    ];
    private stateFlag = [];
    private subLen = 0;
    //加载索引值
    private loadIndex = 0;
    public min: number = 0;
    public max: number = 100;
    private totalProgress: Array<number> = [0, 0, 0];

    private callBack: Function = null;
    private msg: string = "抵制不良游戏，拒绝盗版游戏，注意自我保护，谨防受骗上当。\n适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活。";



    private constructor() {
        super();
        this.progressBar = new ProgressBar();
        this.progressLayout.addChild(this.progressBar);
        this.subLen = this.subpackage.length;
        this.on(Laya.Event.COMPONENT_REMOVED, this, this.onRemove);
        this.msgLabel.text = this.msg;
    }

    public setCallBack(callBack: Function) {
        this.callBack = callBack;
    }

    public static getSelf(callBack?: Function): LoadPage {
        if (LoadPage.self == null) {
            LoadPage.self = new LoadPage();
        }
        if (callBack) {
            LoadPage.self.setCallBack(callBack);
            LoadPage.self.loadRes(callBack);
        }
        return LoadPage.self;
    }


    public loadRes(callBack: Function): void {
        this.callBack = callBack;
        this.setProgress(0);
        let thiz = this;

        let loadTask = wx.loadSubpackage({
            name: thiz.subpackage[0], // name 可以填 name 或者 root
            success: (res) => {
                // 分包加载成功后通过 success 回调
                Log.d(res);
                thiz.stateFlag[0] = true;
                //将题目数组赋值给question
            },
            fail: (res) => {
                // 分包加载失败通过 fail 回调

                thiz.stateFlag[0] = false;
            },
            complete() {
                thiz.loadIndex++;
                log("分包加载完成:::" + thiz.subpackage[0]);

                log("分包加载完成");
                thiz.onCompelete(true);

            }
        });
        loadTask.onProgressUpdate(res => {
            log('下载进度  i=>' + 0 + res.progress)
            log('已经下载的数据长度' + res.totalBytesWritten)
            log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite)

            thiz.totalProgress[0] = res.totalBytesWritten / res.totalBytesExpectedToWrite * 100;
            let per = (thiz.totalProgress[0]) / 100;
            thiz.setProgress(per * 100);
        });

    }

    public setProgress(progress: number, min?: number, max?: number) {
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
    }

    /**
 * 加载结束
 * 
 * @private
 * @memberof LoadPage
 */
    private onCompelete(flag: boolean): void {
        if (this.callBack) {
            this.callBack(flag);
        }
        this.removeSelf();
    }

    public onRemove() {
        log("移出舞台");
        LoadPage.self = null;
        this.destroy();
    }
}