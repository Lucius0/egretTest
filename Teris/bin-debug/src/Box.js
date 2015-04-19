/**
 * Created by L on 2015-04-18.
 */
var Box = (function () {
    function Box() {
        this.box1 = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ];
        this.box2 = [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ];
        this.box3 = [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ];
        this.box4 = [
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ];
        this.box5 = [
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ];
        this.box6 = [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0]
        ];
        this.box7 = [
            [0, 0, 0, 0],
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0]
        ];
        this.box = [this.box1, this.box2, this.box3, this.box4, this.box5, this.box6, this.box7];
    }
    var __egretProto__ = Box.prototype;
    __egretProto__.getBox = function () {
        var num = 7 * Math.random();
        var index = parseInt(num + "");
        var result = [];
        var colorIndex = 1 + Math.floor(Math.random() * 4);
        var i, j;
        for (i = 0; i < 4; i++) {
            var child = [];
            for (j = 0; j < 4; j++) {
                child[j] = this.box[index][i][j] * colorIndex;
            }
            result[i] = child;
        }
        return result;
    };
    return Box;
})();
Box.prototype.__class__ = "Box";
