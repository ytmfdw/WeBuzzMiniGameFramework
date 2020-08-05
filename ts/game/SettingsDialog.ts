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

class SettingDialog extends ui.dialog_dir.DialogSettingUI {

    private constructor() {
        super();
        this.btnClose.on(Laya.Event.CLICK, this, this.clickClose);
        this.cbSound.on(Laya.Event.CLICK, this, this.clickSound);
        this.cbMusic.on(Laya.Event.CLICK, this, this.clickMusic);
        this.cbVirbrate.on(Laya.Event.CLICK, this, this.clickVirbate);
    }

    private clickClose(e: Laya.Event) {
        e.stopPropagation();
        this.close();
    }

    private clickVirbate(e: Laya.Event) {
        e.stopPropagation();
        isNoVirbate = !isNoVirbate;
        Laya.Browser.window.wx.setStorageSync(NOVIRBATE, isNoVirbate);
    }

    private clickMusic(e: Laya.Event) {
        e.stopPropagation();
        isMuteMusic = !isMuteMusic;
        Laya.Browser.window.wx.setStorageSync(MUTE_MUSIC, isMuteMusic);
        soundUtils.playBgMusic();
    }
    private clickSound(e: Laya.Event) {
        e.stopPropagation();
        isMute = !isMute;
        Laya.Browser.window.wx.setStorageSync(MUTE, isMute);
    }

    private static self: SettingDialog = null;
    public static getSelf(): SettingDialog {
        if (SettingDialog.self == null) {
            SettingDialog.self = new SettingDialog();
        }
        return SettingDialog.self;
    }

    private init() {
        this.cbSound.selected = isMute;
        this.cbMusic.selected = isMuteMusic;
        this.cbVirbrate.selected = isNoVirbate;
    }

    public popup() {
        super.popup();
        this.init();
    }

}