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
 *  同步工具类
 *
 */
var syncUtils = /** @class */ (function () {
    function syncUtils() {
    }
    //保存游戏数据
    syncUtils.saveUserData = function (level, score) {
        if (level <= game.all_level) {
            return;
        }
        //更新最高等级
        game.all_level = level;
        wx.setStorageSync(ALL_LEVEL_KEY, game.all_level);
        // 保存微信开放域数据
        var data = { key: openDataKey, value: game.all_level + "" };
        //微信游戏中心
        var utimestamp = Math.round((new Date()).getTime() / 1000);
        var wxValue = {
            "wxgame": {
                "score": game.all_level,
                "update_time": utimestamp
            }
        };
        var jsonWxValue = JSON.stringify(wxValue);
        log('jsonWxValue:' + jsonWxValue);
        var wxgameData = { key: 'wxLevel', value: jsonWxValue };
        wx.setUserCloudStorage({
            KVDataList: [data, wxgameData],
            success: function (res) {
                log(res);
            },
            fail: function (res) {
                log(res);
            }
        });
    };
    return syncUtils;
}());
//# sourceMappingURL=syncUtil.js.map