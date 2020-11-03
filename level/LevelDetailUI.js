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
var LevelDetailUI = /** @class */ (function (_super) {
    __extends(LevelDetailUI, _super);
    function LevelDetailUI() {
        var _this = _super.call(this) || this;
        _this.itemMargin = 0;
        _this.itemSize = 0;
        _this.level = 1;
        _this.datas = new Array();
        //每个item之间的间隔
        _this.itemMargin = 20;
        //每个item的大小 
        _this.itemSize = 160;
        _this.itemPanel.vScrollBarSkin = "";
        _this.adapterHeight();
        _this.btnHome.on(Laya.Event.CLICK, _this, _this.homeClick);
        _this.level = 1; //当前等级
        return _this;
    }
    LevelDetailUI.prototype.adapterHeight = function () {
        //根据屏幕的高度来设置当前区域的高度
        this.height = SCREENHEIGHT;
        this.bgImg.height = this.height;
        if (SCREENHEIGHT > LARGE_PHONE_H) {
            // this.btnHome.y += IPHONEX_TOP;
            // this.itemPanel.y += IPHONEX_TOP;
            // this.levelTitle.y += IPHONEX_TOP;
        }
        var pH = Laya.stage.height - this.itemPanel.y - 180;
        this.itemPanel.height = pH;
    };
    LevelDetailUI.prototype.setData = function (level, levelName, indexText, starText) {
        this.level = level;
        this.levelLabel.text = level + "";
        this.levelName.text = levelName;
        this.indexText.text = indexText;
        this.starLabel.text = starText;
        if (level > 0) {
            var tl = (level - 1) % 6 + 1;
            this.levelTitle.skin = "comp/title_" + tl + ".png";
            this.starBg.skin = "comp/kuang_star_" + tl + ".png";
        }
        //计算当前关卡的题目数量levelQueNum 和 最高可玩关levelIndex
        var quesNum = ALL_QUESTION_ARRAY.length;
        var levelQueNum = 0;
        if (quesNum >= level * LEVEL_COUNT) {
            levelQueNum = LEVEL_COUNT;
        }
        else {
            levelQueNum = quesNum - (level - 1) * LEVEL_COUNT;
        }
        var levelIndex = 1;
        if (game.all_level >= level * LEVEL_COUNT) {
            levelIndex = LEVEL_COUNT;
        }
        else {
            levelIndex = game.all_level - (level - 1) * LEVEL_COUNT;
        }
        log('levelQueNum=' + levelQueNum + ',levelIndex=' + levelIndex);
        //先清掉所有子控件
        this.itemPanel.destroyChildren();
        for (var i = 0; i < levelQueNum; i++) {
            //每个数组创建一个Box
            var item = Laya.Pool.getItemByClass("LevelDetailItem", LevelDetailItem);
            //调整位置
            var x = i % 5;
            var y = Math.floor(i / 5);
            item.pos(x * (item.width + this.itemMargin) + 100, y * (item.height + this.itemMargin) + this.itemMargin);
            if (i > 0 && i > levelIndex && i % game.BonusCount === (game.BonusCount - 1)) {
                item.setData(this.level, i + 1, STATE_BONUS);
            }
            else if (i > levelIndex) {
                item.setData(this.level, i + 1, STATE_LOCKED);
            }
            else if (i === levelIndex) {
                item.setData(this.level, i + 1, STATE_SELECTED);
            }
            else {
                item.setData(this.level, i + 1, STATE_NORMAL);
            }
            this.itemPanel.addChild(item);
        }
    };
    LevelDetailUI.prototype.homeClick = function (e) {
        e.stopPropagation();
        soundUtils.playSound(CHOOSE);
        //隐藏banner
        wxUtils.hideBanner();
        //删除自己
        this.removeSelf();
        if (!game.levelUi) {
            game.levelUi = new LevelUI();
            game.levelUi.setLevelData();
        }
        Laya.stage.addChild(game.levelUi);
        game.levelUi.initData();
    };
    return LevelDetailUI;
}(ui.page_dir.levelDetailPageUI));
//# sourceMappingURL=LevelDetailUI.js.map