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
var GameBox = /** @class */ (function (_super) {
    __extends(GameBox, _super);
    function GameBox() {
        var _this = _super.call(this) || this;
        _this.value = 0;
        _this.isMouseOn = false;
        _this.point = { x: 0, y: 0 };
        _this.fatherBox = null;
        _this.margin = 0;
        _this.initBoxSize = 0;
        _this.BoxSize = 0;
        _this.isShowTip = false;
        _this.endPointX = 0;
        _this.endPointY = 0;
        _this.direct = 0;
        _this.startPointX = 0;
        _this.startPointY = 0;
        _this.skinValue = 0;
        _this.type = 0; //0:普通, 1:可点击
        //初始化
        _this.value = 0;
        //鼠标移动状态:1:移进来,0,移出去
        _this.isMouseOn = false;
        _this.point = { x: 0, y: 0 };
        _this.fatherBox = null;
        //每个间隔大小
        _this.margin = INIT_BOX_MARGIN;
        //放大后大小
        _this.BoxSize = INIT_BOX_SIZE;
        //设置宽高 
        _this.size(_this.BoxSize, _this.BoxSize);
        //设置中心点
        _this.pivot(_this.BoxSize / 2, _this.BoxSize / 2);
        return _this;
    }
    //初始化  value, color颜色，row行，col列,顺序
    GameBox.prototype.init = function (value, row, col, rowNum, colNum, fatherBox, type) {
        this.destroyChildren();
        this.fatherBox = fatherBox;
        this.type = (value > 1) ? 1 : 0;
        //初始大小
        var baseY = this.fatherBox.layoutLabel.y + this.fatherBox.layoutLabel.height + GAME_PAN_MARGIN;
        var boxSize1 = Math.floor(760.0 / colNum) - INIT_BOX_MARGIN;
        var boxSize2 = Math.floor(1000.0 / rowNum) - INIT_BOX_MARGIN;
        this.BoxSize = Math.min(200, Math.min(boxSize1, boxSize2));
        //计算X基础位置
        var baseX = (Laya.stage.width - (this.BoxSize + this.margin) * colNum + this.margin) / 2;
        //设置宽高 
        this.size(this.BoxSize, this.BoxSize);
        //设置中心点
        this.pivot(this.BoxSize / 2, this.BoxSize / 2);
        //设置坐标
        this.point.x = col;
        this.point.y = row;
        this.isShowTip = false;
        this.value = value;
        if (this.value >= 0) {
            this.skin = "box/" + this.value + ".png";
        }
        //位置
        this.x = (this.BoxSize + this.margin) * col + baseX + this.BoxSize / 2;
        this.y = (this.BoxSize + this.margin) * row + baseY + this.BoxSize / 2;
        //先缩小
        // this.scale(0.1, 0.1);
        //开始缩放动画
        // this.startAni(1);
        //设置监听 
        this.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
    };
    //手指按下监听
    GameBox.prototype.onMouseDown = function () {
        var tmpTipCon = (this.fatherBox.ifShowUserTip && this.point.x == this.fatherBox.curMoveBoxX && this.point.y == this.fatherBox.curMoveBoxY) || (!this.fatherBox.ifShowUserTip);
        if (!this.fatherBox.hasOver && tmpTipCon && this.type == 1 && this.fatherBox.ifColoringBox == false) {
            soundUtils.playSound(CHOOSE);
            this.type = 0;
            this.fatherBox.setGreenLeft(this.point.x, this.point.y);
            //开始染色
            this.fatherBox.colorAllBox(this.value, this.point.x, this.point.y);
        }
    };
    //缩放动画,state=1:放大，0:缩小
    GameBox.prototype.startAni = function () {
        var scaleTime = 50;
        Laya.Tween.to(this, { scaleX: 1.2, scaleY: 1.2 }, scaleTime, Laya.Ease.linearInOut, Laya.Handler.create(this, function () {
            Laya.Tween.to(this, { scaleX: 1, scaleY: 1 }, scaleTime, Laya.Ease.linearInOut);
        }));
    };
    /**
     * 水流特效
     */
    GameBox.prototype.showOverAni = function () {
        var initY = this.y;
        var initX = this.x;
        Laya.Tween.to(this, {
            y: initY - 10,
            x: initX + 10
        }, 1000, Laya.Ease.linearNone);
    };
    return GameBox;
}(Laya.Image));
//# sourceMappingURL=GameBox.js.map