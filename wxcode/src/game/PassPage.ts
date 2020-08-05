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
 * 游戏结算页
 * 该页面在游戏结束后调用
 * 实现了过关提示，及游戏奖励
 * 主要函数：
 *  Restart()       重新玩本关
 *  nextClick()     点击下一关
 *  setData()       设置过关提示
 *  setBannerNaviView()     设置底部banner
 *  setBottomAppList()      设置导量
 *  
 *  
 */

class PassPage extends ui.page_dir.PassPageUI {
    private data: any = null;
    constructor() {
        super();
        this.height = SCREENHEIGHT;
        this.bgImg.height = this.height;
        this.btnNext.on(Laya.Event.CLICK, this, this.nextClick);

        this.data = null;
        if (SCREENHEIGHT >= LARGE_PHONE_H) {
            //Iphone X往下移
            this.contentLayout.y += IPHONEX_TOP;
        }
    }

    public Restart(e) {
        e.stopPropagation();
        soundUtils.playSound(CHOOSE);
        game.initGame(game.level);
    }

    public nextClick(e) {
        e.stopPropagation();
        //隐藏banner
        wxUtils.hideBanner();
        soundUtils.playSound(CHOOSE);
        Laya.timer.clear(this, this.setTopAppList);
        wxUtils.aldSendEventFunc('点击下一关', { 'level': '' + game.level, 'ifLoadBanner': ifLoadNextBanner });

        //升级
        game.level++;
        game.initGame(game.level);
    }

    //设置显示文本
    public setData(data) {
        wxUtils.aldSendEventFunc('下一关展示', { 'level': game.level });
        this.data = data;
        var that = this;
        that.levelLabel.text = '闯过第' + game.level + '关';
        ifLoadNextBanner = false;

        wxUtils.hideBanner();
        this.bottomApp.visible = false;
        this.topApp.visible = false;

        this.btnNext.visible = true;
        this.btnNext.scaleX = 0;
        this.btnNext.scaleY = 0;
    }

    public setBannerNaviView(): void {

        wxUtils.showNextBanner();
    }

    //设置底部导量矩阵
    public setBottomAppList() {
        //更新待跳转列表

    }

    //设置顶部导量矩阵
    public setTopAppList() {

    }

    public scaleAniLoop() {
        // log('scaleAniLoop')
        for (let i = 0; i < 5; i++) {
            let item: Laya.Sprite = this.bottomAppList.getChildAt(i) as Laya.Sprite;
            scaleInAni(this, item);
        }
    }
};