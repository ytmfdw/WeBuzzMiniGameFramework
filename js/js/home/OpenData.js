//监听开放域
function listenOpenData(isNeed) {
    if (!game.isWX)
        return;
    //先移除主页
    game.clearStage();
    if (isNeed) {
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        if (!game.openDataContext) {
            game.openDataContext = wx.getOpenDataContext();
        }
        if (!game.sharedCanvas) {
            game.sharedCanvas = game.openDataContext.canvas;
        }
        Laya.timer.once(1000, this, onDrawOpenData);
    }
    else {
        Laya.timer.clear(this, onDrawOpenData);
        wx.hideLoading();
    }
}
//绘制离屏界面
function onDrawOpenData() {
    //log('onDrawOpenData ============');
    //如果没授权，又绘制了授权按钮，则隐藏
    if (game.userButton) {
        game.userButton.hide();
    }
    if (!game.openDataContext) {
        game.openDataContext = wx.getOpenDataContext();
    }
    if (!game.sharedCanvas) {
        game.sharedCanvas = game.openDataContext.canvas;
    }
    wx.hideLoading();
}
/**
 * 绘制开放域数据
 * @param {*} layout    用来显示开放域数据的Sprite
 */
function drawOpeData(layout) {
    if (!game.openDataContext) {
        game.openDataContext = wx.getOpenDataContext();
    }
    if (!game.sharedCanvas) {
        game.sharedCanvas = game.openDataContext.canvas;
    }
    //先清空绘制
    layout.graphics.clear(false);
    //设置大小
    var canvas = new Laya.Texture(game.sharedCanvas);
    canvas.bitmap.alwaysChange = true; //小游戏使用，非常费，每帧刷新
    layout.graphics.drawTexture(canvas);
}
function changePage(page) {
    if (!game.openDataContext) {
        game.openDataContext = wx.getOpenDataContext();
    }
    game.openDataContext.postMessage({
        messageType: -2,
        page: page
    });
}
function clearOpenData() {
    if (!game.openDataContext) {
        game.openDataContext = wx.getOpenDataContext();
    }
    game.openDataContext.postMessage({
        messageType: -1,
    });
}
//# sourceMappingURL=OpenData.js.map