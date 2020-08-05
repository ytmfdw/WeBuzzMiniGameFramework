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
var PassPage = /** @class */ (function (_super) {
    __extends(PassPage, _super);
    function PassPage() {
        var _this = _super.call(this) || this;
        _this.data = null;
        _this.height = SCREENHEIGHT;
        _this.bgImg.height = _this.height;
        _this.btnNext.on(Laya.Event.CLICK, _this, _this.nextClick);
        _this.data = null;
        if (SCREENHEIGHT >= LARGE_PHONE_H) {
            //Iphone X往下移
            _this.contentLayout.y += IPHONEX_TOP;
        }
        return _this;
    }
    PassPage.prototype.Restart = function (e) {
        e.stopPropagation();
        soundUtils.playSound(CHOOSE);
        game.initGame(game.level);
    };
    PassPage.prototype.nextClick = function (e) {
        e.stopPropagation();
        //隐藏banner
        wxUtils.hideBanner();
        soundUtils.playSound(CHOOSE);
        Laya.timer.clear(this, this.setTopAppList);
        wxUtils.aldSendEventFunc('点击下一关', { 'level': '' + game.level, 'ifLoadBanner': ifLoadNextBanner });
        //升级
        game.level++;
        game.initGame(game.level);
    };
    //设置显示文本
    PassPage.prototype.setData = function (data) {
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
    };
    PassPage.prototype.setBannerNaviView = function () {
        wxUtils.showNextBanner();
    };
    //设置底部导量矩阵
    PassPage.prototype.setBottomAppList = function () {
        //更新待跳转列表
    };
    //设置顶部导量矩阵
    PassPage.prototype.setTopAppList = function () {
    };
    PassPage.prototype.scaleAniLoop = function () {
        // log('scaleAniLoop')
        for (var i = 0; i < 5; i++) {
            var item = this.bottomAppList.getChildAt(i);
            scaleInAni(this, item);
        }
    };
    return PassPage;
}(ui.page_dir.PassPageUI));
;
//# sourceMappingURL=PassPage.js.map