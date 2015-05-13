/**
 * Created by L on 2015-05-13.
 */
class Fish extends egret.Sprite {
    private timer:egret.Timer = new egret.Timer(1000 / 10);
    private list:egret.Bitmap[] = [];
    private currentframe:number = 0;

    public constructor() {
        super();
        for (var i:number = 1; i < 5; i++) {
            var bitmap:egret.Bitmap = new egret.Bitmap();
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

    private onFishTimer(e:egret.TimerEvent) {
        this.list[this.currentframe].visible = false;
        this.currentframe < this.list.length - 1 ? this.currentframe += 1 : this.currentframe = 0;
        this.list[this.currentframe].visible = true;
    }
}