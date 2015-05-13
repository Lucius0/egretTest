/**
 * Created by L on 2015-05-13.
 */
var FishGameEntry = (function (_super) {
    __extends(FishGameEntry, _super);
    function FishGameEntry() {
        _super.call(this);
        this.GameFrame = new egret.Timer(1000 / 60);
        this.downPoint = {};
        //鱼的运动速度
        this.speed = 4;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = FishGameEntry.prototype;
    __egretProto__.onAddToStage = function (event) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/fish.json", "resource/");
    };
    //资源加载结束
    __egretProto__.onResourceLoadComplete = function (event) {
        if (event.groupName == "fish") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.fish = new Fish();
            this.stage.addChild(this.fish);
            this.fish.anchorX = this.fish.anchorY = .5;
            this.fish.x = this.fish.y = 100;
            this.GameFrame.addEventListener(egret.TimerEvent.TIMER, this.onGameFrame, this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        }
    };
    __egretProto__.onGameFrame = function (e) {
        //判断距离
        if (Math.sqrt((this.downPoint.x - this.fish.x) * (this.downPoint.x - this.fish.x) + (this.downPoint.y - this.fish.y) * (this.downPoint.y - this.fish.y)) < 10) {
            this.GameFrame.stop();
            return;
        }
        //计算出 x 、 y速度
        var vx = Math.cos(this.angleSpeed) * this.speed;
        var vy = Math.sin(this.angleSpeed) * this.speed;
        this.fish.x += vx;
        this.fish.y += vy;
    };
    __egretProto__.onTouch = function (e) {
        //获取到用户点击的点
        this.downPoint = { x: e.stageX, y: e.stageY };
        //计算角速度
        this.angleSpeed = Math.atan2(this.downPoint.y - this.fish.y, this.downPoint.x - this.fish.x);
        this.fish.rotation = this.angleSpeed * 180 / Math.PI;
        this.GameFrame.start();
    };
    __egretProto__.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("fish");
    };
    return FishGameEntry;
})(egret.DisplayObjectContainer);
FishGameEntry.prototype.__class__ = "FishGameEntry";
