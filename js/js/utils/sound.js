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
 *  声音工具类
 *
 */
var GAME_BG_MUSIC = null;
var CHOOSE = "subassets/sound/choose.mp3";
var LEVELCOMPLETED = "subassets/sound/Win.mp3";
var MOVE_SOUND = "subassets/sound/move.mp3";
var soundUtils = /** @class */ (function () {
    function soundUtils() {
    }
    soundUtils.playSound = function (music, vol) {
        if (isLoadSubpackages == false)
            return;
        if (isMute && isMute == true) {
            //静音模式
        }
        else {
            //播放音效
            // Laya.SoundManager.playSound(music);
            var audio = wx.createInnerAudioContext();
            audio.src = music;
            audio.loop = false;
            audio.play();
        }
    };
    //播放背景音乐
    soundUtils.playBgMusic = function () {
        if (isLoadSubpackages == false)
            return;
        if (GAME_BG_MUSIC == null)
            return;
        if (isMuteMusic && isMuteMusic == true) {
            Laya.SoundManager.stopMusic();
        }
        else {
            Laya.SoundManager.playMusic(GAME_BG_MUSIC);
        }
    };
    return soundUtils;
}());
//# sourceMappingURL=sound.js.map