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
var FriendRank = /** @class */ (function (_super) {
    __extends(FriendRank, _super);
    function FriendRank() {
        var _this = _super.call(this) || this;
        _this.from = null;
        _this.btnClose.on(Laya.Event.CLICK, _this, _this.onCloseClick);
        _this.from = null;
        return _this;
    }
    FriendRank.prototype.onCloseClick = function (e) {
        e.stopPropagation();
        this.removeSelf();
        //移除监听
        listenOpenData(false);
        // goHome();
        if (this.from) {
            switch (this.from) {
                case 'PassPage':
                    {
                        if (game.passPage) {
                            //清空画板
                            changePage(PAGE_PASS);
                            Laya.stage.addChild(game.passPage);
                        }
                        else {
                            game.goHome();
                        }
                    }
                    break;
                default:
                    {
                        changePage(0);
                        game.goHome();
                    }
                    break;
            }
        }
        else {
            game.goHome();
        }
    };
    //设置图标
    /**
     * type :0 好友 排行  ,1:群排行
     *
     */
    FriendRank.prototype.setBg = function (type) {
        switch (type) {
            case 0:
                {
                    this.imgTitle.skin = 'comp/friend_rank_title.png';
                    this.imgIcon.skin = 'comp/icon_friend_rank.png';
                }
                break;
            case 1:
                {
                    this.imgTitle.skin = 'comp/group_rank_title.png';
                    this.imgIcon.skin = 'comp/icon_group_rank.png';
                }
                break;
        }
    };
    //滚动监听
    FriendRank.prototype.onMouseMove = function (e) {
        //滑动监听
    };
    //上一页
    FriendRank.prototype.onPre = function (e) {
        e.stopPropagation();
        game.openDataContext.postMessage({
            messageType: 2,
            mainKey: openDataKey,
            pageFlag: -1,
            scale: game.scaleX,
            pixelRatio: game.pixelRatio,
        });
    };
    //下一页
    FriendRank.prototype.onNext = function (e) {
        e.stopPropagation();
        game.openDataContext.postMessage({
            messageType: 2,
            mainKey: openDataKey,
            pageFlag: 1,
            scale: game.scaleX,
            pixelRatio: game.pixelRatio,
        });
    };
    return FriendRank;
}(ui.page_dir.friend_rankUI));
//# sourceMappingURL=friendRank.js.map