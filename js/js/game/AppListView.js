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
var AppListView = /** @class */ (function (_super) {
    __extends(AppListView, _super);
    function AppListView() {
        var _this = _super.call(this) || this;
        _this.height = Laya.stage.height;
        _this.bgImg.height = _this.height;
        /* if (Laya.stage.height > 2000) {
             this.topLayout.y = 100;
         }*/
        _this.contentLayout.y = _this.topLayout.y + _this.topLayout.height;
        _this.contentLayout.height = _this.height - _this.topLayout.height - _this.topLayout.y;
        _this.contentBgImg.height = _this.contentLayout.height;
        _this.dataList.height = _this.contentBgImg.height - 120;
        _this.dataList.vScrollBarSkin = null;
        var thiz = _this;
        _this.dataList.renderHandler = Laya.Handler.create(_this, _this.updateItem, null, false);
        _this.dataList.itemRender = AppListItem;
        _this.dataList.array = [];
        _this.btnBack.on(Laya.Event.CLICK, _this, _this.back);
        return _this;
    }
    AppListView.prototype.back = function (e) {
        e.stopPropagation();
        Laya.Tween.to(this, { x: -this.width }, 200, Laya.Ease.linearOut, Laya.Handler.create(this, this.removeSelf));
        game.setGameUiNavi();
        wxUtils.aldSendEventFunc('关闭我的小程序', {});
    };
    AppListView.getSelf = function () {
        if (!AppListView.self) {
            AppListView.self = new AppListView();
        }
        return AppListView.self;
    };
    AppListView.prototype.updateItem = function (cell, index) {
        cell.setData(cell.dataSource);
    };
    AppListView.prototype.show = function () {
        wxUtils.hideBanner();
        this.pos(-this.width, 0);
        Laya.stage.addChild(this);
        this.zOrder = 200;
        Laya.Tween.to(this, { x: 0 }, 230, Laya.Ease.linearIn);
        //更新待跳转列表
        game.updateWaitingNavAppList();
        var bottomItemArray = game.WAITING_APP_ARRAY;
        this.dataList.array = bottomItemArray;
        wxUtils.aldSendEventFunc('弹出我的小程序', {});
    };
    AppListView.self = null;
    return AppListView;
}(ui.page_dir.AppsViewUI));
//# sourceMappingURL=AppListView.js.map