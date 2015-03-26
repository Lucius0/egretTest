/**
 * Created by lucius on 2015/3/17.
 */
class ParticleDemo extends egret.DisplayObjectContainer
{
    private system:particle.ParticleSystem;
    private scoreText:egret.TextField;
    private score:number = 0;
    private time:number = 30;
    private timeText:egret.TextField;
    private showTimer:egret.Timer;
    private timer:egret.Timer;
    private overText:egret.TextField;

    public constructor()
    {
        super();

        this.init();
    }

    private init():void
    {
        var w:number = egret.MainContext.instance.stage.stageWidth;
        var h:number = egret.MainContext.instance.stage.stageHeight;
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
    }

    private showStar(e:egret.TimerEvent):void
    {
        var x:number = Math.floor(Math.random() * egret.MainContext.instance.stage.stageWidth);
        var y:number = Math.floor(Math.random() * egret.MainContext.instance.stage.stageHeight);
        var star:egret.Bitmap = this.createBitmapByName("particle_png");
        star.x = x;
        star.y = y;
        star.scaleX = 0.2;
        star.scaleY = 0.2;
        star.touchEnabled = true;
        star.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStar, this);
        var tw:egret.Tween = egret.Tween.get(star);
        tw.to({scaleX:1.4, scaleY: 1.4}, 1000);
        tw.wait(1000);
        tw.call(this.deleteStar, this, [{star:star}]);
        this.addChild(star);
    }

    private clickStar(e:egret.TouchEvent):void
    {
        if(e.target.parent)
        {
            egret.Tween.removeTweens(e.target);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStar, this);
            e.target.parent.removeChild(e.target);
            this.score += 1;
            this.scoreText.text = "Star: " + this.score;
        }
    }

    private deleteStar(data:any):void
    {
        if(data.star.parent)
        {
            egret.Tween.removeTweens(data.star);
            data.star.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStar, this);
            data.star.parent.removeChild(data.star);
        }
    }

    private showText(e:egret.TimerEvent):void
    {
        this.time--;
        this.timeText.text = "Time:  " + this.time;
        if(this.time <= 0)
        {
            this.showTimer.removeEventListener(egret.TimerEvent.TIMER,this.showStar,this);
            this.timer.removeEventListener(egret.TimerEvent.TIMER,this.showText,this);

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
    }

    private stratGame(e:egret.TouchEvent):void
    {
        this.removeChild(this.overText);
        this.score = 0;
        this.time = 30;
        this.scoreText.text = "Star: " + this.score;
        this.timeText.text = "Time: " + this.time;
        this.showTimer.addEventListener(egret.TimerEvent.TIMER, this.showStar, this);
        this.showTimer.start();
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.showText, this);
        this.timer.start();
    }

    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}