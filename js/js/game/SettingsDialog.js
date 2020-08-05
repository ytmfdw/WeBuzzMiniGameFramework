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
 *
 * 设置对话框
 *
 * 背景音乐设置
 *
 * 音效设置
 *
 * 震动设置
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
var SettingDialog = /** @class */ (function (_super) {
    __extends(SettingDialog, _super);
    function SettingDialog() {
        var _this = _super.call(this) || this;
        _this.btnClose.on(Laya.Event.CLICK, _this, _this.clickClose);
        _this.cbSound.on(Laya.Event.CLICK, _this, _this.clickSound);
        _this.cbMusic.on(Laya.Event.CLICK, _this, _this.clickMusic);
        _this.cbVirbrate.on(Laya.Event.CLICK, _this, _this.clickVirbate);
        return _this;
    }
    SettingDialog.prototype.clickClose = function (e) {
        e.stopPropagation();
        this.close();
    };
    SettingDialog.prototype.clickVirbate = function (e) {
        e.stopPropagation();
        isNoVirbate = !isNoVirbate;
        Laya.Browser.window.wx.setStorageSync(NOVIRBATE, isNoVirbate);
    };
    SettingDialog.prototype.clickMusic = function (e) {
        e.stopPropagation();
        isMuteMusic = !isMuteMusic;
        Laya.Browser.window.wx.setStorageSync(MUTE_MUSIC, isMuteMusic);
        soundUtils.playBgMusic();
    };
    SettingDialog.prototype.clickSound = function (e) {
        e.stopPropagation();
        isMute = !isMute;
        Laya.Browser.window.wx.setStorageSync(MUTE, isMute);
    };
    SettingDialog.getSelf = function () {
        if (SettingDialog.self == null) {
            SettingDialog.self = new SettingDialog();
        }
        return SettingDialog.self;
    };
    SettingDialog.prototype.init = function () {
        this.cbSound.selected = isMute;
        this.cbMusic.selected = isMuteMusic;
        this.cbVirbrate.selected = isNoVirbate;
    };
    SettingDialog.prototype.popup = function () {
        _super.prototype.popup.call(this);
        this.init();
    };
    SettingDialog.self = null;
    return SettingDialog;
}(ui.dialog_dir.DialogSettingUI));
//# sourceMappingURL=SettingsDialog.js.map