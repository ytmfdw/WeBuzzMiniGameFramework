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
var LevelUI = /** @class */ (function (_super) {
    __extends(LevelUI, _super);
    function LevelUI() {
        var _this = _super.call(this) || this;
        _this.itemMargin = 0;
        _this.levels = null;
        //每个item之间的间隔
        _this.itemMargin = 20;
        _this.panelItem.vScrollBarSkin = "";
        _this.levels = null;
        _this.adapterHeight();
        _this.btnHome.on(Laya.Event.CLICK, _this, _this.homeClick);
        return _this;
    }
    LevelUI.prototype.adapterHeight = function () {
        //根据屏幕的高度来设置当前区域的高度
        this.height = Laya.stage.height;
        this.bgImg.height = this.height;
        if (Laya.stage.height > LARGE_PHONE_H) {
            this.btnHome.y += IPHONEX_TOP;
            this.panelItem.y += IPHONEX_TOP;
        }
        var pH = Laya.stage.height - this.panelItem.y - 180;
        this.panelItem.height = pH;
    };
    //初始化
    LevelUI.prototype.initData = function () {
        this.setUserLevelData(game.all_level);
    };
    LevelUI.prototype.setLevelData = function () {
        var questionSum = ALL_QUESTION_ARRAY.length;
        if (this.levels == null) {
            //datas是个三维数组，得到长度，
            var levels = [];
            var tmpLevel = 0;
            for (var i = 0; i < questionSum; i++) {
                //每一百个为一关
                if (i % LEVEL_COUNT === 0) {
                    //添加一关
                    tmpLevel++;
                    levels.push({ level: tmpLevel, total: LEVEL_COUNT });
                }
            }
            this.levels = levels;
        }
        //先清掉所有子控件
        this.panelItem.destroyChildren();
        var len = this.levels.length;
        for (var i = 0; i < len; i++) {
            //每个数组创建一个Box
            var item = Laya.Pool.getItemByClass("LevelItem", LevelItem);
            //调整位置
            item.pos((this.width - item.width) / 2, i * (item.height + this.itemMargin));
            item.setData(this.levels[i]);
            this.panelItem.addChild(item);
        }
    };
    //设置每级玩过的最高关卡
    LevelUI.prototype.setUserLevelData = function (allLevel) {
        //上一级解锁
        var lastUnLockItem = 0;
        if (this.levels) {
            var len = this.levels.length;
            var hasAddNew = false;
            for (var i = 0; i < len; i++) {
                var item = this.panelItem.getChildAt(i);
                //解锁状态
                if (allLevel >= (i + 1) * LEVEL_COUNT) {
                    //本关全解锁
                    item.setUnLock(LEVEL_COUNT);
                }
                else if (allLevel < i * LEVEL_COUNT) {
                    //本关未解锁
                    item.setLock();
                }
                else {
                    //本关部分解锁
                    item.setUnLock(allLevel - i * LEVEL_COUNT);
                }
            }
        }
    };
    LevelUI.prototype.homeClick = function (e) {
        e.stopPropagation();
        soundUtils.playSound(CHOOSE);
        this.removeSelf();
    };
    return LevelUI;
}(ui.page_dir.levelPageUI));
//# sourceMappingURL=LevelUI.js.map