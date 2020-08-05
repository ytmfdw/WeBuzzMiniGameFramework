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
var AllRank = /** @class */ (function (_super) {
    __extends(AllRank, _super);
    function AllRank() {
        var _this = _super.call(this) || this;
        _this.initList();
        _this.btnClose.on(Laya.Event.CLICK, _this, _this.noCloseClick);
        return _this;
    }
    //初始化列表
    AllRank.prototype.initList = function () {
        // 使用但隐藏滚动条
        this.listAll.vScrollBarSkin = "";
        this.listAll.itemRender = AllRankItem;
        this.listAll.renderHandler = new Laya.Handler(this, this.updateItem);
    };
    //初始化时，获取所有人数据
    AllRank.prototype.init = function () {
        if (!game.isWX) {
            return;
        }
        this.listAll.array = [];
        var query = new AV.Query('_User');
        //升序
        var obj = this;
        query.descending('level');
        //跳过
        query.limit(100); // 最多返回 10 条结果
        query.find().then(function (results) {
            obj.onAllRank(obj, results);
            wx.hideLoading();
        }, function (error) {
            //出错了，弹出提示
            wx.showModal({
                title: '提示',
                content: '服务器出小差了！',
                confirmText: '好的',
                showCancel: false,
            });
            wx.hideLoading();
            //返回主页 
            game.goHome();
        });
    };
    AllRank.prototype.noCloseClick = function (e) {
        e.stopPropagation();
        //点击了关闭，先移除自己，再加载首页
        this.removeSelf();
        //加载首页
        game.goHome();
    };
    AllRank.prototype.onAllRank = function (obj, data) {
        //log(data);
        var len = data.length;
        // 设置数据项为对应图片的路径
        var itemDatas = [];
        for (var i = 0; i < len; i++) {
            var tmp = {
                index: i + 1,
                avatarUrl: data[i].attributes.avatarUrl,
                nickName: data[i].attributes.nickName,
                level: data[i].attributes.level
            };
            itemDatas.push(tmp);
        }
        obj.listAll.array = itemDatas;
    };
    //更新item
    AllRank.prototype.updateItem = function (cell, index) {
        cell.setData(cell.dataSource);
    };
    return AllRank;
}(ui.page_dir.all_rankUI));
//# sourceMappingURL=allRank.js.map