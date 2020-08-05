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
 *  Map 键值对 工具类
 *
 */
var Map = /** @class */ (function () {
    function Map() {
        //键集合
        this.container = {};
    }
    /**
     * 存值
     * @param key
     * @param value
     */
    Map.prototype.put = function (key, value) {
        //先查询是否存在该键
        //如果不存在，就新创建一个
        try {
            if (key != null && key != "")
                this.container[key] = value;
        }
        catch (e) {
            return e;
        }
    };
    /**
     * 取值
     */
    Map.prototype.get = function (key) {
        try {
            return this.container[key];
        }
        catch (e) {
            return e;
        }
    };
    /**
     * 是否包含key
     * @param key
     */
    Map.prototype.containsKey = function (key) {
        try {
            for (var p in this.container) {
                if (p == key)
                    return true;
            }
            return false;
        }
        catch (e) {
            return e;
        }
    };
    /**
     * 判断是否包含指定value
     */
    Map.prototype.containsValue = function (value) {
        try {
            for (var p in this.container) {
                if (this.container[p] === value)
                    return true;
            }
            return false;
        }
        catch (e) {
            return e;
        }
    };
    ;
    /**
     *
     * @param key  删除map中指定的key
     */
    Map.prototype.remove = function (key) {
        try {
            delete this.container[key];
        }
        catch (e) {
            return e;
        }
    };
    ;
    /**
     *  清空map
     */
    Map.prototype.clear = function () {
        try {
            delete this.container;
            this.container = {};
        }
        catch (e) {
            return e;
        }
    };
    ;
    /**
     * 判断map是否为空
     */
    Map.prototype.isEmpty = function () {
        if (this.keyArray().length == 0)
            return true;
        else
            return false;
    };
    ;
    /**
     * 获取map的大小
     */
    Map.prototype.size = function () {
        return this.keyArray().length;
    };
    /**
     *  返回map中的key值数组
     */
    Map.prototype.keyArray = function () {
        var keys = new Array();
        for (var p in this.container) {
            keys.push(p);
        }
        return keys;
    };
    /**
     * 返回map中的value值数组
     */
    Map.prototype.valueArray = function () {
        var values = new Array();
        var keys = this.keyArray();
        for (var i = 0; i < keys.length; i++) {
            values.push(this.container[keys[i]]);
        }
        return values;
    };
    return Map;
}());
//# sourceMappingURL=Map.js.map