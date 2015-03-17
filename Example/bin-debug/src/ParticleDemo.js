var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by lucius on 2015/3/17.
 */
var ParticleDemo = (function (_super) {
    __extends(ParticleDemo, _super);
    function ParticleDemo() {
        _super.call(this);
        this.score = 0;
        this.time = 30;
        this.init();
    }
    ParticleDemo.prototype.init = function () {
        var w = egret.MainContext.instance.stage.stageWidth;
        var h = egret.MainContext.instance.stage.stageHeight;
        var texture = RES.getRes("particle_png");
        var data = RES.getRes("particle_json");
        this.system = new particle.GravityParticleSystem(texture, data);
        this.addChild(this.system);
        this.system.start();
        this.system.width = w;
        this.system.height = h;
        this.system.emitterX = w / 2;
        this.system.emitterY = h / 2;
        this.scoreText = new egret.TextField();
        this.scoreText.text = "Star: " + this.score;
        this.addChild(this.scoreText);
        this.scoreText.x = 0;
        this.scoreText.y = h / 2 - 50;
        this.scoreText.width = 250;
        this.scoreText.height = 50;
        this.timeText = new egret.TextField();
        this.timeText.text = "Time: " + this.time;
        this.addChild(this.timeText);
        this.timeText.x = w - 250;
        this.timeText.y = 0;
        this.timeText.width = 250;
        this.timeText.height = 50;
        this.showTimer = new egret.Timer(1000, 0);
        this.showTimer.addEventListener(egret.TimerEvent.TIMER, this.showStar, this);
        this.showTimer.start();
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.showText, this);
        this.timer.start();
        egret.Profiler.getInstance().run();
    };
    ParticleDemo.prototype.showStar = function (e) {
        var x = Math.floor(Math.random() * egret.MainContext.instance.stage.stageWidth);
        var y = Math.floor(Math.random() * egret.MainContext.instance.stage.stageHeight);
        var star = this.createBitmapByName("particle_png");
        star.x = x;
        star.y = y;
        star.scaleX = 0.2;
        star.scaleY = 0.2;
        star.touchEnabled = true;
        star.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStar, this);
        var tw = egret.Tween.get(star);
        tw.to({ scaleX: 1.4, scaleY: 1.4 }, 1000);
        tw.wait(1000);
        tw.call(this.deleteStar, this, [{ star: star }]);
        this.addChild(star);
    };
    ParticleDemo.prototype.clickStar = function (e) {
        if (e.target.parent) {
            egret.Tween.removeTweens(e.target);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStar, this);
            e.target.parent.removeChild(e.target);
            this.score += 1;
            this.scoreText.text = "Star: " + this.score;
        }
    };
    ParticleDemo.prototype.deleteStar = function (data) {
        if (data.star.parent) {
            egret.Tween.removeTweens(data.star);
            data.star.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStar, this);
            data.star.parent.removeChild(data.star);
        }
    };
    ParticleDemo.prototype.showText = function (e) {
        this.time--;
        this.timeText.text = "Time:  " + this.time;
        if (this.time <= 0) {
            this.showTimer.removeEventListener(egret.TimerEvent.TIMER, this.showStar, this);
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.showText, this);
            this.overText = new egret.TextField();
            this.overText.text = "Again";
            this.addChild(this.overText);
            this.overText.x = egret.MainContext.instance.stage.stageWidth / 2 - 100;
            this.overText.y = egret.MainContext.instance.stage.stageHeight / 2 - 50;
            this.overText.width = 200;
            this.overText.height = 100;
            this.overText.touchEnabled = true;
            this.overText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stratGame, this);
        }
    };
    ParticleDemo.prototype.stratGame = function (e) {
        this.removeChild(this.overText);
        this.score = 0;
        this.time = 30;
        this.scoreText.text = "Star: " + this.score;
        this.timeText.text = "Time: " + this.time;
        this.showTimer.addEventListener(egret.TimerEvent.TIMER, this.showStar, this);
        this.showTimer.start();
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.showText, this);
        this.timer.start();
    };
    ParticleDemo.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return ParticleDemo;
})(egret.DisplayObjectContainer);
ParticleDemo.prototype.__class__ = "ParticleDemo";
