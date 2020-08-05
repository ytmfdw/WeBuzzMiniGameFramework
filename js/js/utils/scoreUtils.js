var scoreUtils = /** @class */ (function () {
    function scoreUtils() {
    }
    //计算分数
    scoreUtils.getLevelOfAll = function () {
        if (!game.isWX || !game.levelcount) {
            return;
        }
        //计算总关数  game.levelcount
        //得到每一关的玩过的总关数
        var totalGrade = Math.ceil(game.levelcount / LEVEL_COUNT);
        //log('totalGrade' + totalGrade);
        var totalLevel = 0;
        for (var i = 1; i <= totalGrade; i++) {
            var level = wx.getStorageSync('grade' + i);
            if (level) {
                totalLevel += parseInt(level) - LEVEL_COUNT * (i - 1);
            }
        }
        return totalLevel;
    };
    scoreUtils.getLevelLine = function (tmpArr) {
        //log('tmpArr:');
        //log(tmpArr)
        if (!tmpArr)
            return;
        var content = tmpArr.content;
        var colNum = tmpArr.colNum;
        var rowNum = tmpArr.rowNum;
        var result = tmpArr.result;
        var tip = tmpArr.tip;
        if (!content) {
            content = tmpArr.attributes.content;
            colNum = tmpArr.attributes.colNum;
            rowNum = tmpArr.attributes.rowNum;
            result = tmpArr.attributes.result;
            tip = tmpArr.attributes.tip;
        }
        return { question: content, result: result, tip: tip };
    };
    //判断是否需要更新
    scoreUtils.isNeededUpdate = function () {
        if (game.userId) {
            //有用户id,查询该用户数据，跟本地比较
            var localAllLevel = wx.getStorageSync('all_level');
            var query = new AV.Query('_User');
            query.get(game.userId).then(function (user) {
                // 成功获得用户数据
                if (localAllLevel && localAllLevel > user.attributes.level) {
                    //本地有更新的
                    game.all_level = localAllLevel;
                    //更新
                    user.set('level', localAllLevel);
                    user.save();
                }
                else {
                    //本地缓存 
                    wx.setStorage({ key: 'all_level', data: user.attributes.level });
                }
            }, function (error) {
                // 异常处理
                //log(error);
            });
        }
    };
    return scoreUtils;
}());
//# sourceMappingURL=scoreUtils.js.map