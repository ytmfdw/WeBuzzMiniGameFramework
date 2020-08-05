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
var LuckPage = /** @class */ (function (_super) {
    __extends(LuckPage, _super);
    function LuckPage() {
        var _this = _super.call(this) || this;
        _this.isPlaying = false;
        _this.posObj = { y: 0 };
        //完成后回调
        _this.callBack = null;
        /**翻的倍数 */
        _this.perArr = [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
        ];
        _this.per = 9;
        _this.subNum = 10;
        _this.moveFlag = {
            r: -1, l: 1
        };
        _this.height = game.screenHeight;
        _this.bg.height = _this.height;
        _this.bg.y = 0;
        _this.bg.x = 0;
        _this.bg.graphics.drawRect(0, 0, _this.width, _this.height, "#323232");
        _this.contentLayout.y = _this.height / 2;
        _this.bg.on(Laya.Event.CLICK, _this, function (e) {
            e.stopPropagation();
        });
        _this.btnVideo.on(Laya.Event.CLICK, _this, _this.clickVideo);
        _this.btnCloise.on(Laya.Event.CLICK, _this, _this.clickClose);
        _this.on(Laya.Event.REMOVED, _this, _this.removeOver);
        return _this;
    }
    LuckPage.prototype.removeOver = function () {
        Laya.timer.clearAll(this);
    };
    LuckPage.prototype.clickClose = function (e) {
        e.stopPropagation();
        var that = this;
        wx.showModal({
            title: '温馨提示',
            content: '您有幸运翻倍黄金奖赏尚未开奖，黄金可以用来买房养宠哦',
            confirmText: '去开奖',
            showCancel: true,
            cancelText: '不要了',
            success: function (callBack) {
                if (callBack.confirm) {
                }
                if (callBack.cancel) {
                    Laya.Tween.clearAll(that.posObj);
                    that.removeSelf();
                }
            }
        });
    };
    /**
     * 结束后消失动画
     *
     * @memberof LuckPage
     */
    LuckPage.prototype.endLuck = function () {
        var thiz = this;
        // this.contentLayout.scale(1, 1);
        Laya.Tween.to(this.contentLayout, {
            scaleX: 0.1,
            scaleY: 0.1
        }, 500, Laya.Ease.linearInOut, Laya.Handler.create(thiz, function () {
            thiz.removeSelf();
        }));
    };
    LuckPage.prototype.clickVideo = function (e) {
        e.stopPropagation();
        this.startLuck(this.per);
    };
    LuckPage.prototype.showTitleAni = function () {
        //标题动画
        Laya.timer.frameLoop(1, this, this.moveIcon);
    };
    LuckPage.prototype.moveIcon = function () {
        //right   390-->350
        this.iconRight.x += this.moveFlag.r;
        if (this.iconRight.x >= 390) {
            this.moveFlag.r = -1;
        }
        if (this.iconRight.x <= 340) {
            this.moveFlag.r = 1;
        }
        //left    90--> 40
        this.iconLeft.x += this.moveFlag.l;
        if (this.iconLeft.x >= 90) {
            this.moveFlag.l = -1;
        }
        if (this.iconLeft.x <= 40) {
            this.moveFlag.l = 1;
        }
    };
    LuckPage.prototype.init = function () {
        //重置
        Laya.Tween.clearAll(this.posObj);
        this.posObj = { y: 0 };
        //杠还原
        // this.imgBang.pivot(11, 157);
        // this.imgBang.pos(450, 173);
        // this.imgBang.size(56, 167);
        // this.imgBang.rotation = 0;
        this.btnVideo.skin = 'luck/btnLuck.png';
        this.iconRight.x = 390;
        this.iconLeft.x = 40;
        this.moveFlag = {
            r: -1, l: 1
        };
        this.textPer.text = this.perArr[this.perArr.length - 1];
        this.isPlaying = false;
        var text = this.textPer.getChildAt(0);
        Laya.timer.clearAll(text);
        text.destroyChildren();
        this.contentLayout.scale(0.4, 0.4);
        Laya.stage.addChild(this);
        Laya.Tween.to(this.contentLayout, {
            scaleX: 1,
            scaleY: 1
        }, 300, Laya.Ease.linearIn);
        this.showTitleAni();
    };
    LuckPage.getSelf = function (per, callBack) {
        if (!LuckPage.self) {
            LuckPage.self = new LuckPage();
        }
        LuckPage.self.callBack = callBack;
        LuckPage.self.per = per ? per : LuckPage.self.perArr.length - 1;
        LuckPage.self.init();
        return LuckPage.self;
    };
    /**
     * 开始旋转，num:指定停止时的倍数
     *
     * @param {number} num   0-10
     * @memberof LuckPage
     */
    LuckPage.prototype.startLuck = function (num) {
        if (this.isPlaying)
            return;
        this.btnVideo.skin = 'luck/btnLuckDisable.png';
        //播放音效
        soundUtils.playSound(LUCK);
        //先是杠的动画效果
        // this.imgBang.rotation = 157;
        // Laya.timer.clearAll(this.textPer);
        var text = this.textPer.getChildAt(0);
        // numberTextAni(text, 10);
        this.isPlaying = true;
        this.showAni(text, num);
    };
    LuckPage.prototype.showAni = function (text, num) {
        var thiz = this;
        var per = num >= 0 && num <= 9 ? num : 9;
        //4.2秒=4200ms
        Laya.timer.clearAll(text);
        text.destroyChildren();
        var totalTime = 4500;
        //旋转次数
        var totalCount = (thiz.perArr.length * 2 + per);
        //初始速度  平均速度-
        // let dt = 4200 / totalCount;
        var dt = 100;
        var t = 0;
        for (var x = 1; x < totalCount; x++) {
            t += (totalCount - x) * x;
        }
        // Log.d('t sum=>' + t);
        t = t / (totalTime - dt * (totalCount));
        // Log.d('t=>' + t);
        var panel = new Laya.Panel();
        panel.width = text.width;
        panel.height = text.height;
        text.addChild(panel);
        var nextText = new Laya.Text();
        nextText.width = text.width;
        nextText.height = text.height;
        nextText.font = text.font;
        nextText.fontSize = text.fontSize;
        nextText.color = text.color;
        nextText.bold = text.bold;
        nextText.align = text.align;
        nextText.valign = text.valign;
        nextText.stroke = text.stroke;
        nextText.strokeColor = text.strokeColor;
        nextText.pos(0, 0);
        panel.addChild(nextText);
        //最下面一个
        var perText = new Laya.Text();
        perText.width = text.width;
        perText.height = text.height;
        perText.font = text.font;
        perText.bold = text.bold;
        perText.fontSize = text.fontSize;
        perText.align = text.align;
        perText.valign = text.valign;
        perText.color = text.color;
        perText.stroke = text.stroke;
        perText.strokeColor = text.strokeColor;
        perText.pos(0, text.height);
        panel.addChild(perText);
        var lastNum = 0;
        // text.text = '';
        var obj = { value: lastNum };
        // let count = totalTime / dt;
        var count = totalCount;
        var first = nextText;
        var last = perText;
        var index = 0;
        first.text = thiz.perArr[(index) % thiz.perArr.length];
        last.text = thiz.perArr[(index + 1) % thiz.perArr.length];
        text.text = '';
        this.moveText(t, text, first, last, dt, index, count, function () {
            Laya.timer.clearAll(text);
            text.text = thiz.perArr[per];
            text.destroyChildren();
            // thiz.isPlaying = false;
            // thiz.imgBang.rotation = 0;
            if (thiz.callBack) {
                thiz.callBack(per + 1);
            }
            Laya.timer.once(2000, thiz, function () {
                thiz.endLuck();
            });
        });
    };
    LuckPage.prototype.moveText = function (t, text, first, last, dt, index, count, callBack) {
        // Log.d('moveText   index:' + index);
        // Log.d('moveText   count:' + count);
        // Log.d('moveText   dt:' + dt);
        // first.text = text.text;
        // text.text = '';
        // first.visible = true;
        var thiz = this;
        thiz.posObj = { y: 0 };
        Laya.Tween.to(thiz.posObj, {
            y: -text.height,
            update: Laya.Handler.create(text, function () {
                if (!first || !last) {
                    return;
                }
                // Log.d('index=>' + index + ',y=>' + pos.y);
                //哪个是第一个
                first.y = thiz.posObj.y;
                last.y = text.height + thiz.posObj.y;
            }, null, false)
        }, dt, Laya.Ease.linearNone, Laya.Handler.create(text, function () {
            if (index >= count) {
                callBack();
                return;
            }
            //本次结束后，有一个文本框变到下面来
            first.y = text.height;
            first.text = thiz.perArr[(index + 1) % thiz.perArr.length];
            // text.text = last.text;
            var nextIndex = index + 1;
            var nextDt = index > thiz.subNum ? (dt + index / t) : dt;
            thiz.moveText(t, text, last, first, nextDt, nextIndex, count, callBack);
        }));
    };
    LuckPage.self = null;
    return LuckPage;
}(ui.dialog_dir.luckPageUI));
//# sourceMappingURL=LuckPage.js.map