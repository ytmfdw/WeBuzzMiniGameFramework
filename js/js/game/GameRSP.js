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
/*
* name;
*/
var GameRSP = /** @class */ (function (_super) {
    __extends(GameRSP, _super);
    function GameRSP() {
        var _this = _super.call(this) || this;
        _this.score = 0;
        _this.curPlayerRSP = 0;
        _this.curEnemyRSP = 0;
        _this.curTimeLeft = 0;
        _this.ifSetNew = false;
        _this.stepNum = 0;
        _this.SN = 10;
        _this.ifFirst = true;
        _this.btnRock.on(Laya.Event.CLICK, _this, _this.onRock);
        _this.btnScissors.on(Laya.Event.CLICK, _this, _this.onScissors);
        _this.btnPaper.on(Laya.Event.CLICK, _this, _this.onPaper);
        return _this;
    }
    GameRSP.prototype.startGameLoop = function () {
        this.stepNum = 0;
        this.ifSetNew = false;
        this.curEnemyRSP = 0;
        this.btnRSP.skin = "";
        this.timeLabel.text = "准备出拳..";
        this.score = 0;
        this.labelScore.text = "" + 0;
        this.curPlayerRSP = 0;
        this.ifFirst = true;
        Laya.timer.loop(200, this, this.loopFunc);
    };
    GameRSP.prototype.loopFunc = function () {
        this.stepNum += 1;
        if (this.stepNum == this.SN) {
            //判断是否得分
            if (this.ifSetNew) {
                this.judgeIfScore();
            }
            //设置新的enemy
            this.curEnemyRSP = Math.floor(3 * Math.random()) + 1;
            this.btnRSP.skin = "comp/rsp" + this.curEnemyRSP + '.png';
            this.ifSetNew = true;
            this.timeLabel.text = "2s";
            this.stepNum = 0;
            this.curPlayerRSP = 0;
            this.ifFirst = false;
        }
        else if (this.stepNum == 5) {
            if (this.ifFirst == false) {
                this.timeLabel.text = "1s";
            }
        }
    };
    GameRSP.prototype.onRock = function (e) {
        e.stopPropagation(e);
        this.curPlayerRSP = 1;
        this.judgeIfScore();
    };
    GameRSP.prototype.onScissors = function (e) {
        e.stopPropagation(e);
        this.curPlayerRSP = 2;
        this.judgeIfScore();
    };
    GameRSP.prototype.onPaper = function (e) {
        e.stopPropagation(e);
        this.curPlayerRSP = 3;
        this.judgeIfScore();
    };
    GameRSP.prototype.judgeIfScore = function () {
        if (this.ifSetNew) {
            if (this.curEnemyRSP == 1 && this.curPlayerRSP == 3) {
                this.score += 1;
            }
            else if (this.curEnemyRSP == 2 && this.curPlayerRSP == 1) {
                this.score += 1;
            }
            else if (this.curEnemyRSP == 3 && this.curPlayerRSP == 2) {
                this.score += 1;
            }
            else if (this.curEnemyRSP == this.curPlayerRSP && this.curPlayerRSP != 0) {
                this.score -= 1;
            }
            else {
                //game over
                this.gameOver();
            }
            this.labelScore.text = "" + this.score;
            this.btnRSP.skin = "";
            this.ifSetNew = false;
        }
    };
    GameRSP.prototype.gameOver = function () {
        //清除循环
        Laya.timer.clearAll(this);
        var that = this;
        //弹出窗口
        wx.showModal({
            title: '成绩单',
            content: '本局猜拳得分' + this.score + '\n下次手快点奥',
            confirmText: '再来一局',
            showCancel: true,
            cancelText: '返回首页',
            success: function (callBack) {
                if (callBack.confirm) {
                    that.startGameLoop();
                }
                if (callBack.cancel) {
                    game.goHome();
                }
            }
        });
    };
    return GameRSP;
}(ui.page_dir.GameRSPUI));
//# sourceMappingURL=GameRSP.js.map