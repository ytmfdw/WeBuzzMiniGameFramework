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
 *  分享工具类
 * 
 *  
 */

class SharedUtils {
    //获取分享图片
    static getShareImg() {
        if (game.SHARED_IMG_ARR != null && game.SHARED_IMG_ARR.length > 0 && game.ifShowBonus === true && game.shareType === ShareState.MONEY) {
            var tr = Math.random();
            log('getShareImg random=' + tr);
            for (var i = 0; i < game.SHARED_IMG_ARR.length; i++) {
                var ele = game.SHARED_IMG_ARR[i];
                if (tr >= ele.min && tr < ele.max) {
                    if (ele.e) {
                        //需要绘制
                        return [ele.id, ele.url, ele.t, ele.p, ele.e];
                    }
                    else {
                        //无需绘制，直接返回
                        return [ele.id, ele.url, ele.t, ele.p];
                    }
                }
            }
            return ['P0', game.SHARED_URL, game.SHARED_TITLE, game.SHARED_PARAM];
        }
        else {
            return ['P0', game.SHARED_URL, game.SHARED_TITLE, game.SHARED_PARAM];
        }
    }

    //绘制分享图
    static drawShareImg(view: Laya.Image, obj) {
        //绘制自定义图片
        var nickName = wx.getStorageSync('nickName');
        var avatarUrl = wx.getStorageSync('avatarUrl');
        //1.绘制头像
        if (obj.headpos) {
            var img: Laya.Image = new Laya.Image();
            // downLoadFile(path, function (path) {
            img.skin = avatarUrl;
            // });
            if (obj.headpos.size) {
                img.width = obj.headpos.size;
                img.height = obj.headpos.size;
            }
            img.x = isNaN(obj.headpos.x) ? 0 : obj.headpos.x;
            img.y = isNaN(obj.headpos.y) ? 0 : obj.headpos.y;
            var maskImg: Laya.Image = new Laya.Image();
            maskImg.width = img.width;
            maskImg.height = img.height;
            maskImg.skin = 'comp/mask.png';
            img.mask = maskImg;
            view.addChild(img);
        }
        //2,绘制昵称
        if (obj.namepos) {
            var name: Laya.Text = new Laya.Text();
            name.text = nickName;
            name.fontSize = obj.namepos.fontSize ? obj.namepos.fontSize : 18;
            //字体颜色，默认为黑色
            name.color = obj.namepos.color ? obj.namepos.color : '#000000';
            name.width = obj.namepos.width ? obj.namepos.width : 500;
            name.height = obj.namepos.height ? obj.namepos.height : 20;
            name.overflow = 'hidden'
            name.x = obj.namepos.x ? obj.namepos.x : 0;
            name.y = obj.namepos.y ? obj.namepos.y : 0;
            name.align = obj.namepos.align ? obj.namepos.align : 'center';
            name.valign = obj.namepos.valign ? obj.namepos.valign : 'middle';
            name.bold = obj.namepos.bold ? obj.namepos.bold : false;
            view.addChild(name);
        }
        //3,绘制文字
        if (obj.texts && obj.texts.length > 0) {
            var len = obj.texts.length;
            for (var i = 0; i < len; i++) {
                var textObj = obj.texts[i];
                var textView: Laya.Text = new Laya.Text();
                textView.text = textObj.text.replace(/{name}/g, nickName);
                textView.fontSize = textObj.fontSize ? textObj.fontSize : 18;
                //字体颜色，默认为黑色
                textView.color = textObj.color ? textObj.color : '#000000';
                textView.width = textObj.width ? textObj.width : 500;
                textView.height = textObj.height ? textObj.height : 20;
                textView.overflow = 'hidden'
                textView.x = textObj.x ? textObj.x : 0;
                textView.y = textObj.y ? textObj.y : 0;
                textView.align = textObj.align ? textObj.align : 'center';
                textView.valign = textObj.valign ? textObj.valign : 'middle';
                textView.bold = textObj.bold ? textObj.bold : false;
                textView.wordWrap = true;
                if (textObj.filter) {
                    //创建一个发光滤镜
                    var blur = isNaN(textObj.filter.blur) ? 8 : textObj.filter.blur;
                    var offX = isNaN(textObj.filter.offX) ? 8 : textObj.filter.offX;
                    var offY = isNaN(textObj.filter.offY) ? 8 : textObj.filter.offY;
                    var shadowFilter: Laya.GlowFilter = new Laya.GlowFilter(textObj.filter.color, blur, offX, offY);
                    //设置滤镜为阴影滤镜
                    textView.filters = [shadowFilter];
                }
                view.addChild(textView);
            }
        }
    }

    //分享
    static wxShareFunc(type: number, query?: string) {
        if (typeof wx === 'undefined') return;
        wxUtils.aldSendEventFunc('拉起分享', { 'detail': '' + type + '-' + game.userId });
        var tmpQuery = query ? query : ('uid=' + game.userId + '&state=' + ShareState.OTHER);
        game.shareType = type;
        game.shareQuery = tmpQuery;
        //确定分享图片
        var shareImgInfo = SharedUtils.getShareImg();
        log('shareImgInfo:'); log(shareImgInfo);
        tmpQuery += ('&img=' + shareImgInfo[0] + '&' + shareImgInfo[3]);
        log('wxShare query:' + tmpQuery);

        //判断是否需要绘制分享图
        if (shareImgInfo.length === 4) {
            //无需绘制直接分享
            wxUtils.aldSendEventFunc('拉起分享图', { 'detail': shareImgInfo[0] });
            //记录拉起分享时间
            game.shareStartTime = (new Date()).getTime();
            if (ALD_SHARE_ON && typeof Laya.Browser.window.wx.aldShareAppMessage === 'function') {
                // 使用ald分享统计
                Laya.Browser.window.wx.aldShareAppMessage({
                    query: tmpQuery,
                    imageUrl: shareImgInfo[1],
                    title: shareImgInfo[2],
                    // success: function (res) {
                    // },
                    cancel: function (res) {
                        // log('取消分享:' + res);
                        wxUtils.aldSendEventFunc('取消分享', { 'detail': '' + type + '-' + game.userId });
                        game.shareCancel = true;
                    }
                });
            }
            else {
                wx.shareAppMessage({
                    query: tmpQuery,
                    imageUrl: shareImgInfo[1],
                    title: shareImgInfo[2],
                    cancel: function (res) {
                        log('取消分享:' + res);
                        wxUtils.aldSendEventFunc('取消分享', { 'detail': '' + type + '-' + game.userId });
                        game.shareCancel = true;
                    }
                });
            }
        }
        else {
            log('绘制分享图');
            var nickName = wx.getStorageSync('nickName');
            var tmpTitle = shareImgInfo[2].replace(/{name}/g, nickName); //替换name
            log('title:' + tmpTitle);
            var img: Laya.Image = new Laya.Image();
            img.width = 500;
            img.height = 400;
            var sprite: Laya.Sprite = new Laya.Sprite();
            sprite.width = 500;
            sprite.height = 400;
            sprite.visible = true;
            //调整到底层
            sprite.zOrder = -1;
            sprite.addChild(img);
            var spriteMask: Laya.Sprite = new Laya.Sprite();
            spriteMask.width = 500;
            spriteMask.height = 400;
            spriteMask.graphics.drawRect(0, 0, sprite.width, sprite.height, '#232B3B');
            spriteMask.visible = true;
            sprite.addChild(spriteMask);
            Laya.stage.addChild(sprite);
            SharedUtils.drawShareImg(img, shareImgInfo[4]);
            Laya.timer.once(200, game, function () {
                img.loadImage(shareImgInfo[1], 0, 0, 500, 400, Laya.Handler.create(game, function () {
                    var htmlC = img.drawToCanvas(500, 400, 0, 0);
                    var canvas = htmlC.getCanvas();
                    canvas.toTempFilePath({
                        x: 0,
                        y: 0,
                        width: 500,
                        height: 400,
                        destWidth: 500,
                        destHeight: 400,
                        success: function (res) {
                            log('截图成功：'); log(res);
                            // 分享
                            wxUtils.aldSendEventFunc('拉起分享图', { 'detail': shareImgInfo[0] });
                            //记录拉起分享时间
                            game.shareStartTime = (new Date()).getTime();
                            if (ALD_SHARE_ON) {
                                // 使用ald分享统计
                                wx.aldShareAppMessage({
                                    query: tmpQuery,
                                    imageUrl: res.tempFilePath,
                                    title: tmpTitle,
                                    cancel: function (res) {
                                        log('取消分享:' + res);
                                        wxUtils.aldSendEventFunc('取消分享', { 'detail': '' + type + '-' + game.userId });
                                        game.shareCancel = true;
                                    }
                                });
                            }
                            else {
                                wx.shareAppMessage({
                                    query: tmpQuery,
                                    imageUrl: res.tempFilePath,
                                    title: tmpTitle,
                                    cancel: function (res) {
                                        log('取消分享:' + res);
                                        wxUtils.aldSendEventFunc('取消分享', { 'detail': '' + type + '-' + game.userId });
                                        game.shareCancel = true;
                                    }
                                });
                            }
                        },
                        complete: function () {
                            log('保存完成,销毁图片');
                            var father = img.parent;
                            father.destroy();
                        }
                    });
                }));
            });

        }
    }

    static fetchGroupId(shT: string, tp?: number, callBack?: Function) {
        log('shareTicket:' + shT);
        if (!shT) {
            if (callBack) {
                callBack(null);
            }
        }
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        wx.login({
            success: res => {
                var code = encodeURIComponent(res.code);
                wx.getShareInfo({
                    shareTicket: shT,
                    success: res => {
                        var enData = encodeURIComponent(res.encryptedData);
                        var iv = encodeURIComponent(res.iv);
                        var deUrl = WXINFOPATH + "?appName=" + APPNAME + "&code=" + code + '&encryptedData=' + enData + '&iv=' + iv;
                        log('deUrl=' + deUrl);
                        wx.request({
                            url: deUrl,
                            dataType: 'json',
                            header: {
                                'content-type': 'application/json'
                            },
                            success: d => {
                                log('群信息：');
                                log(d);
                                wx.hideLoading();
                                if (callBack) {
                                    callBack(d.data.openGId, tp);
                                }
                            },
                            fail: e => {
                                wx.hideLoading();
                                if (callBack) {
                                    callBack(null);
                                }
                            }
                        });
                    },
                    fail: err => {
                        wx.hideLoading();
                        if (callBack) {
                            callBack(null);
                        }
                    }
                });
            },
            fail: error => {
                wx.hideLoading();
                if (callBack) {
                    callBack(null);
                }

            }
        })
    }

}