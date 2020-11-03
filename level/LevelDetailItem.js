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
var LevelDetailItem = /** @class */ (function (_super) {
    __extends(LevelDetailItem, _super);
    //public size:number = 0;
    function LevelDetailItem() {
        var _this = _super.call(this) || this;
        _this.levelIndex = 1;
        _this.index = 1;
        _this.lockState = false;
        _this.score = 0;
        _this.levelIndex = 1;
        _this.index = 1; //都从1开始
        _this.lockState = false; //当前锁定状态，默认为没锁
        return _this;
        //this.size = 80;
    }
    //设置值
    LevelDetailItem.prototype.setData = function (level, index, state) {
        this.levelIndex = level;
        this.index = index;
        this.itemText.text = index + "";
        switch (state) {
            case STATE_BONUS:
                {
                    this.setLock();
                }
                break;
            case STATE_NORMAL:
                {
                    this.setUnLock();
                }
                break;
            case STATE_SELECTED:
                {
                    this.setUnLock();
                    // this.itemBg.skin = "comp/item_normal.png";
                }
                break;
            case STATE_LOCKED:
                {
                    this.setLock();
                }
                break;
        }
    };
    //设置解锁状态
    LevelDetailItem.prototype.setUnLock = function () {
        this.lockState = false;
        this.itemBg.skin = "comp/item_normal.png";
        //确定星星得分
        var tmp_str = wx.getStorageSync(LEVEL_SCORE_STR);
        if (tmp_str && tmp_str.length > 0) {
            levelScoreObj = JSON.parse(tmp_str);
        }
        var level = (this.levelIndex - 1) * LEVEL_COUNT + this.index;
        var tl = level.toString();
        if (levelScoreObj.hasOwnProperty(tl)) {
            this.score = levelScoreObj[tl];
        }
        // log('levelScoreObj:');log(levelScoreObj);
        // log('score:'+this.score);
        if (this.score == 1) {
            this.itemStars.skin = "comp/levels_star_1.png";
        }
        else if (this.score == 2) {
            this.itemStars.skin = "comp/levels_star_2.png";
        }
        else if (this.score == 3) {
            this.itemStars.skin = "comp/levels_star_3.png";
        }
        else {
            this.itemStars.skin = "";
        }
        this.itemStars.visible = true;
        //添加鼠标按下事件侦听。按时时缩小按钮。
        this.itemBg.on(Laya.Event.MOUSE_DOWN, this.itemBg, this.itemBg.scaleSmal);
        //添加鼠标抬起事件侦听。抬起时还原按钮。
        this.itemBg.on(Laya.Event.MOUSE_UP, this.itemBg, this.itemBg.scaleBig);
        //添加鼠标离开事件侦听。离开时还原按钮。
        this.itemBg.on(Laya.Event.MOUSE_OUT, this.itemBg, this.itemBg.scaleBig);
        //设置点击事件
        this.itemBg.on(Laya.Event.CLICK, this, this.onClick);
    };
    //设置解锁状态
    LevelDetailItem.prototype.setLock = function () {
        this.itemBg.skin = "comp/item_locked.png";
        this.lockState = true;
        this.itemText.text = "";
        this.itemStars.visible = false;
        // this.itemBg.offAll();
        this.itemBg.on(Laya.Event.CLICK, this, this.onClick);
    };
    LevelDetailItem.prototype.onClick = function (e) {
        //点击事件
        e.stopPropagation();
        soundUtils.playSound(CHOOSE);
        if (this.lockState) {
            //锁定了
            if (game.isWX) {
                wx.showToast({
                    title: '需完成' + (this.index - 1) + "关",
                    icon: 'success',
                    duration: 1500,
                    mask: true,
                });
            }
        }
        else {
            //初始化界面
            var level = (this.levelIndex - 1) * LEVEL_COUNT + this.index;
            game.initGame(level);
        }
    };
    return LevelDetailItem;
}(ui.item_dir.levelDetailItemUI));
//# sourceMappingURL=LevelDetailItem.js.map