/**
 * Created by L on 2015-05-13.
 */
class FishGameEntry extends egret.DisplayObjectContainer
{
    /**
     * 修改egret_loader.js 的宽长
     */
    private fish:Fish;
    private GameFrame:egret.Timer=new egret.Timer(1000/60);
    private downPoint:any={};
    //鱼的运动速度
    private speed:number=4;
    //角速度
    private angleSpeed:number;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event:egret.Event) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/fish.json", "resource/");
    }
    //资源加载结束
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "fish") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.fish=new Fish();
            this.stage.addChild(this.fish);
            this.fish.anchorX=this.fish.anchorY=.5;
            this.fish.x=this.fish.y=100;
            this.GameFrame.addEventListener(egret.TimerEvent.TIMER,this.onGameFrame,this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);

        }
    }
    private onGameFrame(e:egret.TimerEvent){
        //判断距离
        if(Math.sqrt(
                (this.downPoint.x-this.fish.x)*(this.downPoint.x-this.fish.x)
                +
                (this.downPoint.y-this.fish.y)*(this.downPoint.y-this.fish.y)
            )<10){
            this.GameFrame.stop();
            return;
        }
        //计算出 x 、 y速度
        var vx:number=Math.cos(this.angleSpeed)*this.speed;
        var vy:number=Math.sin(this.angleSpeed)*this.speed;

        this.fish.x+=vx;
        this.fish.y+=vy;


    }
    private onTouch(e:egret.TouchEvent){
        //获取到用户点击的点
        this.downPoint={x:e.stageX,y:e.stageY};
        //计算角速度
        this.angleSpeed=Math.atan2(this.downPoint.y-this.fish.y,this.downPoint.x-this.fish.x);
        this.fish.rotation=this.angleSpeed*180/Math.PI;
        this.GameFrame.start();
    }

    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("fish");
    }
}