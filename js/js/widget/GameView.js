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
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.question = null;
        _this.gameStateCallBack = null;
        _this.callObj = null;
        _this.gameState = GAME_STATE.NONE;
        _this.ifShowTip = false;
        _this.tipIndex = 0;
        _this.blockSize = 0;
        _this.smallBlockSize = 0;
        _this.baseX = 0;
        _this.baseY = 0;
        //点
        _this.blocks = [];
        _this.smallBlocks = [];
        //绘制过的线条
        _this.drawLineMap = new Map();
        //画线颜色
        _this.color = "#ff0000";
        //题目重新整理
        _this.data = [];
        //按下时的坐标值，判断手指移动方向
        _this.mouseDown = null;
        var thiz = _this;
        return _this;
    }
    GameView.getSelf = function () {
        if (GameView.self == null) {
            GameView.self = new GameView();
        }
        return GameView.self;
    };
    GameView.prototype.setData = function (q, callBack, obj) {
        this.gameStateCallBack = callBack;
        this.callObj = obj;
        this.question = q;
        this.gameState = GAME_STATE.NONE;
        this.ifShowTip = false;
        this.rows = q.rows;
        this.cols = q.cols;
        this.penIndex = q.pPos;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.blockSize = calcBoxSize(this.boxLayout, this.rows, this.cols);
        this.smallBlockSize = calcBoxSize(this.tipLayout, this.rows, this.cols);
        Laya.MouseManager.multiTouchEnabled = false;
        this.initUI();
        //题目整理
        this.data.splice(0, this.data.length);
        var dataLen = q.data.length;
        for (var i = 0; i < dataLen; i++) {
            var tmpArr = q.data[i].split("_");
            var index1 = parseInt(tmpArr[0]);
            var index2 = parseInt(tmpArr[1]);
            var key = Math.min(index1, index2) + "_" + Math.max(index1, index2);
            var keyIndex = this.data.indexOf(key);
            if (keyIndex >= 0) {
                //说明已经有一条线
                this.data.splice(keyIndex, 1);
            }
            else {
                this.data.push(key);
            }
        }
        log(this.data);
        this.reset();
    };
    GameView.prototype.reset = function () {
        this.removeGif();
        this.tipIndex = 0;
        this.x = 0;
        this.y = 0;
        this.drawLineMap.clear();
        this.blocks.splice(0, this.blocks.length);
        this.smallBlocks.splice(0, this.smallBlocks.length);
        // this.gameStateCallBack(this.callObj, this.gameState);
        //1.计算大格子大小
        var baseXY = calcBaseXY(this.boxLayout, this.rows, this.cols);
        var smallBaseXY = calcBaseXY(this.tipLayout, this.rows, this.cols);
        this.baseX = baseXY.x;
        this.baseY = baseXY.y;
        //2.创建格子,摆放格子
        this.penIndex = this.question.pPos;
        //
        for (var r = 0; r < this.rows; r++) {
            var tmpArr = [];
            var smallTmpArr = [];
            for (var c = 0; c < this.cols; c++) {
                var index = r * this.cols + c;
                var dot = createDot(this.blockSize);
                dot.pos(this.baseX + c * this.blockSize + dot.pivotX, this.baseY + r * this.blockSize + dot.pivotY);
                this.boxLayout.addChild(dot);
                tmpArr.push(dot);
                if (index == this.penIndex) {
                    this.pen.pos(dot.x, dot.y);
                }
                //绘制小点
                var smallDot = createDot(this.smallBlockSize);
                smallDot.pos(smallBaseXY.x + c * this.smallBlockSize + smallDot.pivotX, smallBaseXY.y + r * this.smallBlockSize + smallDot.pivotY);
                this.tipLayout.addChild(smallDot);
                smallDot.visible = false;
                smallTmpArr.push(smallDot);
            }
            this.blocks.push(tmpArr);
            this.smallBlocks.push(smallTmpArr);
        }
        //绘制提示
        var len = this.data.length;
        for (var i = 0; i < len; i++) {
            var tmpArr = this.data[i].split("_");
            var index1 = parseInt(tmpArr[0]);
            var index2 = parseInt(tmpArr[1]);
            this.drawTipLine(index1, index2);
        }
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        this.gameState = GAME_STATE.PLAYING;
        //绘制线条，判断是否有相同的key的线条，如果有，就说明该线条需要回退，不用画出来,第36关
    };
    GameView.prototype.refresh = function () {
        if (this.tipIndex > 0)
            return;
        this.x = 0;
        this.y = 0;
        this.drawLineMap.clear();
        this.lineLayout.destroyChildren();
        this.penIndex = this.question.pPos;
        for (var r = 0; r < this.rows; r++) {
            for (var c = 0; c < this.cols; c++) {
                var index = r * this.cols + c;
                var dot = this.blocks[r][c];
                if (index == this.penIndex) {
                    this.pen.pos(dot.x, dot.y);
                }
            }
        }
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
        this.gameState = GAME_STATE.PLAYING;
        //绘制线条，判断是否有相同的key的线条，如果有，就说明该线条需要回退，不用画出来,第36关
    };
    //绘制一条直线
    GameView.prototype.drawTipLine = function (index1, index2) {
        //绘制一条线段
        var p1 = getPoint(index1, this.cols);
        var p2 = getPoint(index2, this.cols);
        var block1 = this.smallBlocks[p1.y][p1.x];
        var block2 = this.smallBlocks[p2.y][p2.x];
        var angle = getPointAngle(p1, p2);
        var line = new Laya.Sprite();
        this.tipLineLayout.addChild(line);
        //计算线条大小
        var lineW = this.smallBlockSize * LINE_WIDTH;
        //2.计算长度
        var ds = getDistance(block1, block2);
        //3.计算个数
        var count = Math.ceil(ds / lineW * 2);
        line.size(ds, lineW);
        line.pivot(ds / 2, lineW / 2);
        line.rotation = angle;
        line.pos((block1.x + block2.x) / 2, (block1.y + block2.y) / 2);
        for (var i = 0; i <= count; i++) {
            var img = new Laya.Image();
            img.size(lineW, lineW);
            img.skin = penPath;
            img.anchorX = 0.5;
            img.anchorY = 0.5;
            img.pos(i * (ds / count), lineW / 2);
            var scaleXY = (i == 0 || i == count) ? 1 : 0.8;
            img.scale(scaleXY, scaleXY);
            line.addChild(img);
        }
        //添加颜色
        //1.获取颜色
        var color = this.color;
        //2.设置滤镜
        var r = parseInt(color.substring(1, 3), 16) / 255;
        var g = parseInt(color.substring(3, 5), 16) / 255;
        var b = parseInt(color.substring(5, 7), 16) / 255;
        var l = 1;
        var colorMatrix = [
            r, 0, 0, 0, l,
            g, 0, 0, 0, l,
            b, 0, 0, 0, l,
            0, 0, 0, 1, l,
        ];
        //创建红色颜色滤镜
        var redFilter = new Laya.ColorFilter(colorMatrix);
        line.filters = [redFilter];
    };
    //白球坐标
    GameView.prototype.onMouseDown = function (e) {
        if (this.gameState !== GAME_STATE.PLAYING)
            return;
        this.mouseDown = new Point();
        this.mouseDown.x = e.stageX;
        this.mouseDown.y = e.stageY;
    };
    GameView.prototype.onMouseUp = function (e) {
        if (this.gameState !== GAME_STATE.PLAYING || !this.mouseDown)
            return;
        var dx = e.stageX - this.mouseDown.x;
        var dy = e.stageY - this.mouseDown.y;
        var startX = this.mouseDown.x;
        var startY = this.mouseDown.y;
        this.mouseDown = null;
        var ds = Math.abs(dx) - Math.abs(dy);
        if (Math.abs(dx) < 10 && Math.abs(dy) < 10)
            return;
        //判断是否是斜角
        var moveDirection = getTurnAngle({ x: startX, y: startY }, { x: e.stageX, y: e.stageY });
        if (this.ifShowTip) {
            var tipArr = this.question.data[this.tipIndex - 1].split("_");
            var t1 = parseInt(tipArr[0]);
            var t2 = parseInt(tipArr[1]);
            var p1 = getPoint(t1, this.cols);
            var p2 = getPoint(t2, this.cols);
            var turnAngle = getTurnAngle(p1, p2);
            if (moveDirection != turnAngle) {
                wx.showToast({
                    title: "请按提示划动手指",
                    icon: "none",
                    duration: 800
                });
                return;
            }
        }
        var thiz = this;
        //移动画笔
        thiz.gameState = GAME_STATE.ANI;
        thiz.movePen(moveDirection, function () {
            thiz.gameState = GAME_STATE.PLAYING;
            if (thiz.ifShowTip) {
                thiz.showTip();
            }
            thiz.judgeOver();
        });
    };
    GameView.prototype.movePen = function (moveDirection, callBack) {
        var curPos = getPoint(this.penIndex, this.cols);
        var start = this.penIndex;
        switch (moveDirection) {
            case MOVE_ARROW.LEFT:
                {
                    if (curPos.x - 1 < 0) {
                        log("不能向左移动");
                        callBack();
                        return;
                    }
                    var tmpPos = {
                        x: curPos.x - 1,
                        y: curPos.y
                    };
                    this.penIndex = getIndex(tmpPos.y, tmpPos.x, this.cols);
                    var moveToBlock = this.blocks[tmpPos.y][tmpPos.x];
                    Laya.Tween.to(this.pen, { x: moveToBlock.x, y: moveToBlock.y }, PEN_MOVE_TIME, Laya.Ease.elasticOut, Laya.Handler.create(this, callBack));
                }
                break;
            case MOVE_ARROW.UP:
                {
                    if (curPos.y - 1 < 0) {
                        log("不能向上移动");
                        callBack();
                        return;
                    }
                    var tmpPos = {
                        x: curPos.x,
                        y: curPos.y - 1
                    };
                    this.penIndex = getIndex(tmpPos.y, tmpPos.x, this.cols);
                    var moveToBlock = this.blocks[tmpPos.y][tmpPos.x];
                    Laya.Tween.to(this.pen, { x: moveToBlock.x, y: moveToBlock.y }, PEN_MOVE_TIME, Laya.Ease.elasticOut, Laya.Handler.create(this, callBack));
                }
                break;
            case MOVE_ARROW.RIGHT:
                {
                    if (curPos.x + 1 >= this.cols) {
                        log("不能向右移动");
                        callBack();
                        return;
                    }
                    var tmpPos = {
                        x: curPos.x + 1,
                        y: curPos.y
                    };
                    this.penIndex = getIndex(tmpPos.y, tmpPos.x, this.cols);
                    var moveToBlock = this.blocks[tmpPos.y][tmpPos.x];
                    Laya.Tween.to(this.pen, { x: moveToBlock.x, y: moveToBlock.y }, PEN_MOVE_TIME, Laya.Ease.elasticOut, Laya.Handler.create(this, callBack));
                }
                break;
            case MOVE_ARROW.DOWN:
                {
                    if (curPos.y + 1 >= this.rows) {
                        log("不能向下移动");
                        callBack();
                        return;
                    }
                    var tmpPos = {
                        x: curPos.x,
                        y: curPos.y + 1
                    };
                    this.penIndex = getIndex(tmpPos.y, tmpPos.x, this.cols);
                    var moveToBlock = this.blocks[tmpPos.y][tmpPos.x];
                    Laya.Tween.to(this.pen, { x: moveToBlock.x, y: moveToBlock.y }, PEN_MOVE_TIME, Laya.Ease.elasticOut, Laya.Handler.create(this, callBack));
                }
                break;
            case MOVE_ARROW.RIGHT_DOWN:
                {
                    if (curPos.y + 1 >= this.rows || curPos.x + 1 >= this.cols) {
                        log("不能向右下移动");
                        callBack();
                        return;
                    }
                    var tmpPos = {
                        x: curPos.x + 1,
                        y: curPos.y + 1
                    };
                    this.penIndex = getIndex(tmpPos.y, tmpPos.x, this.cols);
                    var moveToBlock = this.blocks[tmpPos.y][tmpPos.x];
                    Laya.Tween.to(this.pen, { x: moveToBlock.x, y: moveToBlock.y }, PEN_MOVE_TIME, Laya.Ease.elasticOut, Laya.Handler.create(this, callBack));
                }
                break;
            case MOVE_ARROW.RIGHT_UP:
                {
                    if (curPos.y - 1 < 0 || curPos.x + 1 >= this.cols) {
                        log("不能向右上移动");
                        callBack();
                        return;
                    }
                    var tmpPos = {
                        x: curPos.x + 1,
                        y: curPos.y - 1
                    };
                    this.penIndex = getIndex(tmpPos.y, tmpPos.x, this.cols);
                    var moveToBlock = this.blocks[tmpPos.y][tmpPos.x];
                    Laya.Tween.to(this.pen, { x: moveToBlock.x, y: moveToBlock.y }, PEN_MOVE_TIME, Laya.Ease.elasticOut, Laya.Handler.create(this, callBack));
                }
                break;
            case MOVE_ARROW.LEFT_UP:
                {
                    if (curPos.y - 1 < 0 || curPos.x - 1 < 0) {
                        log("不能向左上移动");
                        callBack();
                        return;
                    }
                    var tmpPos = {
                        x: curPos.x - 1,
                        y: curPos.y - 1
                    };
                    this.penIndex = getIndex(tmpPos.y, tmpPos.x, this.cols);
                    var moveToBlock = this.blocks[tmpPos.y][tmpPos.x];
                    Laya.Tween.to(this.pen, { x: moveToBlock.x, y: moveToBlock.y }, PEN_MOVE_TIME, Laya.Ease.elasticOut, Laya.Handler.create(this, callBack));
                }
                break;
            case MOVE_ARROW.LEFT_DOWN:
                {
                    if (curPos.y + 1 >= this.rows || curPos.x - 1 < 0) {
                        log("不能向左上移动");
                        callBack();
                        return;
                    }
                    var tmpPos = {
                        x: curPos.x - 1,
                        y: curPos.y + 1
                    };
                    this.penIndex = getIndex(tmpPos.y, tmpPos.x, this.cols);
                    var moveToBlock = this.blocks[tmpPos.y][tmpPos.x];
                    Laya.Tween.to(this.pen, { x: moveToBlock.x, y: moveToBlock.y }, PEN_MOVE_TIME, Laya.Ease.elasticOut, Laya.Handler.create(this, callBack));
                }
                break;
        }
        var end = this.penIndex;
        if (start == end)
            return;
        this.drawLine(start, end);
    };
    //绘制一条直线
    GameView.prototype.drawLine = function (index1, index2) {
        if (index1 == index2)
            return;
        soundUtils.playSound(MOVE_SOUND);
        var key = Math.min(index1, index2) + "_" + Math.max(index1, index2);
        //题目制作不能回退
        if (this.drawLineMap.containsKey(key)) {
            //已经绘制过了，属于回退，应该请掉该线条
            var line_1 = this.drawLineMap.get(key);
            if (line_1) {
                line_1.destroy();
                this.drawLineMap.remove(key);
            }
            return;
        }
        //绘制一条线段
        var p1 = getPoint(index1, this.cols);
        var p2 = getPoint(index2, this.cols);
        var block1 = this.blocks[p1.y][p1.x];
        var block2 = this.blocks[p2.y][p2.x];
        var angle = getPointAngle(p1, p2);
        var line = new Laya.Sprite();
        this.lineLayout.addChild(line);
        //计算线条大小
        var lineW = this.blockSize * LINE_WIDTH;
        //2.计算长度
        var ds = getDistance(block1, block2);
        //3.计算个数
        var count = Math.ceil(ds / lineW * 2);
        line.size(ds, lineW);
        line.pivot(ds / 2, lineW / 2);
        line.rotation = angle;
        line.pos((block1.x + block2.x) / 2, (block1.y + block2.y) / 2);
        for (var i = 0; i <= count; i++) {
            var img = new Laya.Image();
            img.size(lineW, lineW);
            img.skin = penPath;
            img.anchorX = 0.5;
            img.anchorY = 0.5;
            img.pos(i * (ds / count), lineW / 2);
            var scaleXY = (i == 0 || i == count) ? 1 : 0.8;
            img.scale(scaleXY, scaleXY);
            line.addChild(img);
        }
        this.drawLineMap.put(key, line);
        //添加颜色
        //1.获取颜色
        var color = this.color;
        //2.设置滤镜
        var r = parseInt(color.substring(1, 3), 16) / 255;
        var g = parseInt(color.substring(3, 5), 16) / 255;
        var b = parseInt(color.substring(5, 7), 16) / 255;
        var l = 1;
        var colorMatrix = [
            r, 0, 0, 0, l,
            g, 0, 0, 0, l,
            b, 0, 0, 0, l,
            0, 0, 0, 1, l,
        ];
        //创建红色颜色滤镜
        var redFilter = new Laya.ColorFilter(colorMatrix);
        line.filters = [redFilter];
        var maskLayout = new Laya.Sprite();
        maskLayout.size(line.width + lineW, line.height);
        maskLayout.graphics.drawRect(0, 0, maskLayout.width, maskLayout.height, "#000000");
        maskLayout.x = -maskLayout.width;
        line.mask = maskLayout;
        Laya.Tween.to(maskLayout, { x: -lineW / 2 }, PEN_MOVE_TIME, Laya.Ease.elasticOut);
    };
    GameView.prototype.judgeOver = function () {
        var tmpArr = this.drawLineMap.keyArray();
        var len = this.data.length;
        if (tmpArr.length == len) {
            for (var _i = 0, tmpArr_1 = tmpArr; _i < tmpArr_1.length; _i++) {
                var key = tmpArr_1[_i];
                if (this.data.indexOf(key) < 0) {
                    //只要答案中没有这条线，说明没结束
                    return;
                }
            }
        }
        else {
            //与答案长度都不一样，直接返回
            return;
        }
        this.gameState = GAME_STATE.GAMEOVER;
        this.pen.visible = false;
        this.gameStateCallBack(this.callObj, this.gameState);
    };
    GameView.prototype.initUI = function () {
        this.gameState = GAME_STATE.NONE;
        this.boxLayout.destroyChildren();
        this.lineLayout.destroyChildren();
        this.tipLineLayout.destroyChildren();
        this.tipLayout.destroyChildren();
        this.pen.visible = true;
    };
    GameView.prototype.removeGif = function () {
        this.hand.visible = false;
        Laya.Tween.clearAll(this.hand);
        Laya.timer.clear(this, this.handMove);
        Laya.timer.clear(this, this.showHandMove);
    };
    GameView.prototype.showTip = function () {
        this.ifShowTip = true;
        if (this.tipIndex == 0) {
            this.refresh();
        }
        if (this.tipIndex >= this.question.data.length) {
            this.removeGif();
            wx.showToast({
                title: "已经提示完了",
                icon: "none",
                duration: 800
            });
            return;
        }
        var tipArr = this.question.data[this.tipIndex].split("_");
        var t1 = parseInt(tipArr[0]);
        var t2 = parseInt(tipArr[1]);
        var p1 = getPoint(t1, this.cols);
        var p2 = getPoint(t2, this.cols);
        var turnAngle = getTurnAngle(p1, p2);
        //得到移动方向
        var start = new Point();
        var end = new Point();
        switch (turnAngle) {
            case MOVE_ARROW.LEFT:
                {
                    start.x = this.handLayout.width;
                    start.y = this.handLayout.height / 2;
                    end.x = 0;
                    end.y = start.y;
                }
                break;
            case MOVE_ARROW.UP:
                {
                    start.x = this.handLayout.width / 2;
                    start.y = this.handLayout.height;
                    end.x = start.x;
                    end.y = 0;
                }
                break;
            case MOVE_ARROW.RIGHT:
                {
                    start.x = 0;
                    start.y = this.handLayout.height / 2;
                    end.x = this.handLayout.width;
                    end.y = start.y;
                }
                break;
            case MOVE_ARROW.DOWN:
                {
                    start.x = this.handLayout.width / 2;
                    start.y = 0;
                    end.x = start.x;
                    end.y = this.handLayout.height;
                }
                break;
            case MOVE_ARROW.RIGHT_DOWN:
                {
                    start.x = 0;
                    start.y = 0;
                    end.x = this.handLayout.width;
                    end.y = this.handLayout.height;
                }
                break;
            case MOVE_ARROW.RIGHT_UP:
                {
                    start.x = 0;
                    start.y = this.handLayout.height;
                    end.x = this.handLayout.width;
                    end.y = 0;
                }
                break;
            case MOVE_ARROW.LEFT_UP:
                {
                    start.x = this.handLayout.width;
                    start.y = this.handLayout.height;
                    end.x = 0;
                    end.y = 0;
                }
                break;
            case MOVE_ARROW.LEFT_DOWN:
                {
                    start.x = this.handLayout.width;
                    start.y = 0;
                    end.x = 0;
                    end.y = this.handLayout.height;
                }
                break;
        }
        this.handMove([start, end]);
        this.tipIndex++;
    };
    GameView.prototype.showGuide = function () {
        this.showTip();
    };
    //手指按指定点移动
    GameView.prototype.handMove = function (points) {
        Laya.Tween.clearAll(this.hand);
        Laya.timer.clear(this, this.handMove);
        Laya.timer.clear(this, this.showHandMove);
        this.hand.visible = false;
        if (points && points.length > 0) {
            this.hand.visible = true;
            this.hand.pos(points[0].x, points[0].y);
            this.showHandMove(points, 1);
        }
    };
    GameView.prototype.showHandMove = function (points, index) {
        if (index >= points.length) {
            //这次循环结束了
            Laya.timer.once(1000, this, this.handMove, [points]);
            return;
        }
        var to = points[index];
        var thiz = this;
        Laya.Tween.to(this.hand, { x: to.x, y: to.y }, 1000, null, Laya.Handler.create(this, function () {
            thiz.showHandMove(points, index + 1);
        }, null));
    };
    GameView.self = null;
    return GameView;
}(ui.view.GameViewUI));
//# sourceMappingURL=GameView.js.map