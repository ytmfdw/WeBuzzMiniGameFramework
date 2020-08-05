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
var LevelItem = /** @class */ (function (_super) {
    __extends(LevelItem, _super);
    function LevelItem() {
        var _this = _super.call(this) || this;
        _this.levelIndex = 1;
        _this.level = 1;
        _this.total = 1;
        _this.lockState = false;
        _this.levelArr = null;
        _this.levelStarsSum = 0;
        _this.levelStarsGot = 0;
        _this.levelIndex = 1;
        _this.level = 1;
        _this.total = 1;
        _this.lockState = false; //当前锁定状态，默认为没锁
        //点击事件
        _this.levelItemBg.on(Laya.Event.CLICK, _this, _this.onClick);
        //当前 等级的题目,包括答案
        _this.levelArr = null;
        return _this;
    }
    //设置值
    LevelItem.prototype.setData = function (data) {
        this.level = data.level;
        this.total = data.total;
        this.levelText.text = data.level + "";
        this.levelName.text = (data.level <= LEVEL_NAME_ARR.length) ? LEVEL_NAME_ARR[data.level - 1] : "";
        this.indexText.text = "0 / " + data.total;
        if (data.level > 0) {
            var tl = (data.level - 1) % 6 + 1;
            this.levelItemBg.skin = "comp/kuang_" + tl + ".png";
            this.starBg.skin = "comp/kuang_star_" + tl + ".png";
        }
        //星星数量和得分
        this.levelStarsSum = 0;
        this.levelStarsGot = 0;
        var startLevel = LEVEL_COUNT * (data.level - 1) + 1;
        var endLevel = LEVEL_COUNT * data.level;
        var tmp_str = wx.getStorageSync(LEVEL_SCORE_STR);
        if (tmp_str && tmp_str.length > 0) {
            levelScoreObj = JSON.parse(tmp_str);
        }
        for (var i = startLevel; i <= endLevel; i++) {
            if (i <= LEVEL_STARS_ARR.length) {
                this.levelStarsSum += LEVEL_STARS_ARR[i - 1];
            }
            var ti = i.toString();
            if (levelScoreObj.hasOwnProperty(ti)) {
                this.levelStarsGot += levelScoreObj[ti];
            }
        }
        log('level stars sum=' + this.levelStarsSum + ', got=' + this.levelStarsGot);
        this.starLabel.text = "" + this.levelStarsGot + " / " + this.levelStarsSum;
        if (this.level > 1) {
            //默认为锁定状态
            this.lockState = true;
            this.statusIcon.visible = false;
            this.lockIcon.visible = true;
        }
    };
    //设置解锁状态
    LevelItem.prototype.setUnLock = function (data) {
        this.lockState = false;
        this.lockIcon.visible = false;
        this.levelIndex = data;
        this.indexText.text = data + " / " + this.total;
        if (this.levelStarsGot == this.levelStarsSum) {
            this.statusIcon.skin = "comp/medal_3.png";
        }
        else if (this.levelStarsGot > this.levelStarsSum / 2) {
            this.statusIcon.skin = "comp/medal_2.png";
        }
        else {
            this.statusIcon.skin = "comp/medal_1.png";
        }
        this.statusIcon.visible = true;
    };
    //设置解锁状态
    LevelItem.prototype.setLock = function () {
        this.lockState = true;
        this.statusIcon.visible = false;
        this.lockIcon.visible = true;
        this.indexText.text = "0 / " + this.total;
    };
    //点击进入子界面
    LevelItem.prototype.onClick = function (e) {
        e.stopPropagation();
        soundUtils.playSound(CHOOSE);
        //显示子界面
        if (this.lockState) {
            if (game.isWX) {
                if (game.isWX) {
                    wx.showToast({
                        title: '需完成' + (this.level - 1) + "级",
                        icon: 'success',
                        duration: 1500,
                        mask: true,
                    });
                }
            }
        }
        else {
            game.showLevelDetail(this.level, this.levelName.text, this.indexText.text, this.starLabel.text);
        }
    };
    return LevelItem;
}(ui.item_dir.levelItemUI));
//# sourceMappingURL=LevelItem.js.map