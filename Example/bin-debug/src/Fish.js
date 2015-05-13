/**
 * Created by L on 2015-05-13.
 */
var Fish = (function (_super) {
    __extends(Fish, _super);
    function Fish() {
        _super.call(this);
        this.timer = new egret.Timer(1000 / 10);
        this.list = [];
        this.currentframe = 0;
        for (var i = 1; i < 5; i++) {
            var bitmap = new egret.Bitmap();
            bitmap.texture = RES.getRes("fish" + i.toString());
            this.list.push(bitmap);
            this.addChild(bitmap);
            bitmap.visible = false;
        }
        this.list[0].visible = true;
        this.currentframe = 0;
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onFishTimer, this);
        this.timer.start();
    }
    var __egretProto__ = Fish.prototype;
    __egretProto__.onFishTimer = function (e) {
        this.list[this.currentframe].visible = false;
        this.currentframe < this.list.length - 1 ? this.currentframe += 1 : this.currentframe = 0;
        this.list[this.currentframe].visible = true;
    };
    return Fish;
})(egret.Sprite);
Fish.prototype.__class__ = "Fish";
