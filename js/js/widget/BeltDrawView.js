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
var BeltDrawView = /** @class */ (function (_super) {
    __extends(BeltDrawView, _super);
    function BeltDrawView() {
        var _this = _super.call(this) || this;
        // children for move belt
        _this.belts = [];
        _this.direction = DIRECTION.NONE;
        //move falg,for loop use
        _this.moveFlag = {
            x: 0, y: 0
        };
        _this.speed = 1;
        _this.childCount = 0;
        _this.on(Laya.Event.REMOVED, _this, _this.onRemoved);
        return _this;
    }
    BeltDrawView.prototype.onRemoved = function () {
        if (!this.destroyed) {
            Laya.timer.clearAll(this);
            Laya.Pool.recover("BeltDrawView", this);
        }
    };
    BeltDrawView.getSelf = function () {
        var view = Laya.Pool.getItemByClass("BeltDrawView", BeltDrawView);
        return view;
    };
    //init this view
    /**
     *
     *
     * @param {number} x position x
     * @param {number} y position y
     * @param {number} width  view width
     * @param {number} height   view height
     * @param {number} direction  belt move direction DIRECTION.LEFT---
     * @returns {BeltDrawView} mode of constructor,return self
     * @memberof BeltDrawView
     */
    BeltDrawView.prototype.init = function (x, y, width, height, direction) {
        this.direction = direction;
        //1.remove all children view
        this.destroyChildren();
        //2.set this size
        this.size(width, height);
        this.pos(x, y);
        //3.set children
        //4.set move flag
        switch (direction) {
            case DIRECTION.LEFT:
                {
                    this.moveFlag.x = -this.speed;
                    this.moveFlag.y = 0;
                    //calc children count
                    this.childCount = Math.ceil(width / BELT_SKIN.WIDTH) + 1;
                    for (var i = 0; i < this.childCount; i++) {
                        var img = new Laya.Image();
                        img.skin = BELT_SKIN.H;
                        img.size(BELT_SKIN.WIDTH, BELT_SKIN.HEIGHT);
                        img.pos(i * BELT_SKIN.WIDTH, 0);
                        this.addChild(img);
                    }
                }
                break;
            case DIRECTION.RIGHT:
                {
                    this.moveFlag.x = this.speed;
                    this.moveFlag.y = 0;
                    //calc children count
                    this.childCount = Math.ceil(width / BELT_SKIN.WIDTH) + 1;
                    for (var i = 0; i < this.childCount; i++) {
                        var img = new Laya.Image();
                        img.skin = BELT_SKIN.H;
                        img.size(BELT_SKIN.WIDTH, BELT_SKIN.HEIGHT);
                        img.pos(i * BELT_SKIN.WIDTH, 0);
                        this.addChild(img);
                    }
                }
                break;
            case DIRECTION.TOP:
                {
                    this.moveFlag.x = 0;
                    this.moveFlag.y = this.speed;
                    //calc children count
                    this.childCount = Math.ceil(height / BELT_SKIN.WIDTH) + 1;
                    for (var i = 0; i < this.childCount; i++) {
                        var img = new Laya.Image();
                        img.skin = BELT_SKIN.V;
                        img.size(BELT_SKIN.HEIGHT, BELT_SKIN.WIDTH);
                        img.pos(0, i * BELT_SKIN.WIDTH);
                        this.addChild(img);
                    }
                }
                break;
            case DIRECTION.DOWN:
                {
                    this.moveFlag.x = 0;
                    this.moveFlag.y = -this.speed;
                    //calc children count
                    this.childCount = Math.ceil(height / BELT_SKIN.WIDTH) + 1;
                    for (var i = 0; i < this.childCount; i++) {
                        var img = new Laya.Image();
                        img.skin = BELT_SKIN.V;
                        img.size(BELT_SKIN.HEIGHT, BELT_SKIN.WIDTH);
                        img.pos(0, i * BELT_SKIN.WIDTH);
                        this.addChild(img);
                    }
                }
                break;
        }
        Laya.timer.frameLoop(1, this, this.loop);
        return this;
    };
    //loop move children
    BeltDrawView.prototype.loop = function () {
        for (var i = 0; i < this.childCount; i++) {
            var img = this.getChildAt(i);
            img.x += this.moveFlag.x;
            img.y += this.moveFlag.y;
            if (img.x >= this.width + BELT_SKIN.WIDTH && this.moveFlag.x > 0) {
                //to right,
                img.x = -BELT_SKIN.WIDTH;
            }
            if (img.x <= -BELT_SKIN.WIDTH && this.moveFlag.x < 0) {
                //to left,
                img.x = this.width + BELT_SKIN.WIDTH;
            }
            if (img.y <= -BELT_SKIN.WIDTH && this.moveFlag.y < 0) {
                //to top,
                img.y = this.height + BELT_SKIN.WIDTH;
            }
            if (img.y >= this.height + BELT_SKIN.WIDTH && this.moveFlag.y > 0) {
                //to top,
                img.y = -BELT_SKIN.WIDTH;
            }
        }
    };
    return BeltDrawView;
}(Laya.Panel));
//# sourceMappingURL=BeltDrawView.js.map