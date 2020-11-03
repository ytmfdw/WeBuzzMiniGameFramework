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
var AllRankItem = /** @class */ (function (_super) {
    __extends(AllRankItem, _super);
    function AllRankItem() {
        return _super.call(this) || this;
    }
    //设置数据
    AllRankItem.prototype.setData = function (data) {
        //{index:1,nickName:xxx,avatarUrl:xxx,level:xxx}
        this.indexLabel.text = data.index + "";
        this.headImg.skin = data.avatarUrl;
        this.nickNameLabel.text = data.nickName;
        this.levelLabel.text = data.level + "";
    };
    return AllRankItem;
}(ui.item_dir.rank_itemUI));
//# sourceMappingURL=allRankItem.js.map