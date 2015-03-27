/**
 * Created by lucius on 2015/3/13.
 */
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(sX, sY, eX, eY, lineSize) {
        if (lineSize === void 0) { lineSize = 8; }
        _super.call(this);
        Line.sets.push(this);
        this.sX = sX;
        this.sY = sY;
        this.eX = eX;
        this.eY = eY;
        this.lineSize = lineSize;
        this.draw();
    }
    var __egretProto__ = Line.prototype;
    __egretProto__.draw = function () {
        this.graphics.clear();
        this.graphics.lineStyle(this.lineSize, 0xFFFFFF);
        this.graphics.moveTo(this.sX, this.sY);
        this.graphics.lineTo(this.eX, this.eY);
    };
    __egretProto__.update = function () {
        this.draw();
        this.lineSize -= 1;
        if (this.lineSize < 1) {
            this.clear();
        }
    };
    __egretProto__.clear = function () {
        this.graphics.clear();
        for (var i = 0; i < Line.sets.length; i++) {
            var l = Line.sets[i];
            if (l == this) {
                Line.sets.splice(i, 1);
                this.parent.removeChild(this);
            }
        }
    };
    Line.sets = [];
    return Line;
})(egret.Sprite);
Line.prototype.__class__ = "Line";
