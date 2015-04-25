/**
 * Created by L on 2015-04-25.
 */
var hitCheck;
(function (hitCheck) {
    var Rect = (function (_super) {
        __extends(Rect, _super);
        function Rect(x, y, width, height) {
            _super.call(this, x, y, width, height);
            /** 上下左右象限 另外还有个什么都不是 刚好处于中心点*/
            this.topQuadrant = false;
            this.bottomQuadrant = false;
            this.leftQuadrant = false;
            this.rightQuadrant = false;
            this.centerQuadrant = false;
            this.lastIndex = 0;
            this.nowIndex = 0;
        }
        var __egretProto__ = Rect.prototype;
        return Rect;
    })(egret.Rectangle);
    hitCheck.Rect = Rect;
    Rect.prototype.__class__ = "hitCheck.Rect";
})(hitCheck || (hitCheck = {}));
