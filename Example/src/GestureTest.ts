/**
 * Created by L on 2015-04-06.
 */
class GestureTest extends egret.DisplayObjectContainer
{
    /**测试用图*/
    private sky:egret.Bitmap;
    /**测试用图*/
    private icon:egret.Bitmap;
    /**测试按钮*/
    private btn:MyToggleButton;

    private startScaleValue:number;
    private startRotationValue:number;
    private startPoint:egret.Point;
    private isMultiMode:boolean = false;
    private txtLabel:egret.TextField;

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event)
    {
        var sky:egret.Bitmap = this.createBitmapByName("bgImage");
        sky.name = "sky";
        sky.touchEnabled = true;
        this.addChild(sky);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        this.sky = sky;
        //icon
        var icon:egret.Bitmap = this.createBitmapByName("egretIcon");
        icon.touchEnabled = true;
        icon.name = "icon";
        icon.anchorX = icon.anchorY = 0.5;
        this.addChild(icon);
        icon.x = stageW / 2;
        icon.y = stageH / 2 - 180;
        icon.scaleX = 0.8;
        icon.scaleY = 0.8;
        this.icon = icon;
        //ui
        if (egret.MainContext.deviceType == egret.MainContext.DEVICE_PC)
        {
            var btn:MyToggleButton = new MyToggleButton();
            btn.addEventListener(egret.TouchEvent.TOUCH_END, this.toggleButtonHandler, this);
            this.addChild(btn);
            this.btn = btn;
        }
        this.txtLabel = new egret.TextField();
        this.txtLabel.y = 40;
        this.addChild(this.txtLabel);
        //test
        this.testGesture();
    }

    /**test for egret native touch*/
    private toggleButtonHandler(evt:egret.TouchEvent):void
    {
        this.isMultiMode = !this.isMultiMode;
        this.btn.setLabel(this.isMultiMode ? "多点模式" : "单点模式");
        gesture.GestureManager.simulateMultitouch = this.isMultiMode;//PC端测试多点操作用，手机测试请设置false
    }

    /**测试手势*/
    private testGesture():void
    {
        //设置
        if (egret.MainContext.deviceType == egret.MainContext.DEVICE_PC)
        {
            gesture.GestureManager.showTouchPoint = true;//PC端测试多点操作用，手机测试请设置false
        }
        //Tap(点一下)
        var tap:gesture.TapGesture = new gesture.TapGesture(this.sky);
        tap.addEventListener(gesture.GestureEvent.ENDED, this.onTap, this);
        //Double Tap (双击)
        var tap2:gesture.DoubleTapGesture = new gesture.DoubleTapGesture(this.sky);
        tap2.addEventListener(gesture.GestureEvent.ENDED, this.onDoubleTap, this);
        //Pinch(二指往內或往外拨动，平时经常用到的缩放)
        var tap3:gesture.PinchGesture = new gesture.PinchGesture(this.icon);
        tap3.addEventListener(gesture.GestureEvent.BEGAN, this.onPinchBegan, this);
        tap3.addEventListener(gesture.GestureEvent.UPDATE, this.onPinchUpdate, this);
        tap3.addEventListener(gesture.GestureEvent.ENDED, this.onPinchEnd, this);
        //Rotation(旋转)
        var tap4:gesture.RotationGesture = new gesture.RotationGesture(this.icon);
        tap4.addEventListener(gesture.GestureEvent.BEGAN, this.onRotationBegan, this);
        tap4.addEventListener(gesture.GestureEvent.UPDATE, this.onRotationUpdate, this);
        tap4.addEventListener(gesture.GestureEvent.ENDED, this.onRotationEnd, this);
        //Swipe(滑动，快速移动)
        var tap5:gesture.SwipeGesture = new gesture.SwipeGesture(this.sky);
        tap5.addEventListener(gesture.GestureEvent.ENDED, this.onSwipeEnd, this);
        //Pan (拖移，慢速移动)
        var tap6:gesture.PanGesture = new gesture.PanGesture(this.icon);
        tap6.addEventListener(gesture.GestureEvent.BEGAN, this.onPanBegan, this);
        tap6.addEventListener(gesture.GestureEvent.UPDATE, this.onPanUpdate, this);
        tap6.addEventListener(gesture.GestureEvent.ENDED, this.onPanEnd, this);
        //LongPress(长按)
        var tap7:gesture.LongPressGesture = new gesture.LongPressGesture(this.sky);
        tap7.addEventListener(gesture.GestureEvent.ENDED, this.onLongPressEnd, this);
    }

    /**on tap*/
    private onTap(event:gesture.GestureEvent):void {
        this.showMsg("tap on "+event.host.name);
    }
    /**on double tap*/
    private onDoubleTap(event:gesture.GestureEvent):void {
        this.showMsg("double tap on "+event.host.name);
    }
    /**swipe*/
    private onSwipeEnd(event:gesture.GestureEvent):void {
        this.showMsg("swipe "+event.offsetX+","+event.offsetY);
    }
    /**long press*/
    private onLongPressEnd(event:gesture.GestureEvent):void {
        this.showMsg("long press on "+event.host.name);
    }

    /**pinch*/
    private onPinchBegan(event:gesture.GestureEvent):void {
        //console.log("pinch began on "+event.host.name);
        this.startScaleValue = this.icon.scaleX;
    }
    /**pinch*/
    private onPinchUpdate(event:gesture.GestureEvent):void {
        //console.log("pinch update "+event.value);
        this.icon.scaleX = this.startScaleValue*event.value;
        this.icon.scaleY = this.icon.scaleX;
    }
    /**pinch*/
    private onPinchEnd(event:gesture.GestureEvent):void {
        this.showMsg("pinch end on "+event.host.name);
    }
    /**rotation*/
    private onRotationBegan(event:gesture.GestureEvent):void {
        //console.log("rotation began on "+event.host.name);
        this.startRotationValue = this.icon.rotation;
    }
    /**rotation*/
    private onRotationUpdate(event:gesture.GestureEvent):void {
        //console.log("rotation update ",event.value);
        this.icon.rotation = this.startRotationValue+event.value;
    }
    /**rotation*/
    private onRotationEnd(event:gesture.GestureEvent):void {
        this.showMsg("rotation end on "+event.host.name);
    }
    /**pan*/
    private onPanBegan(event:gesture.GestureEvent):void {
        //console.log("pan began on "+event.host.name);
        this.startPoint = new egret.Point(event.host.x,event.host.y);
    }
    /**pan*/
    private onPanUpdate(event:gesture.GestureEvent):void {
        //console.log("rotation update ",event.value);
        event.host.x = this.startPoint.x+event.offsetX;
        event.host.y = this.startPoint.y+event.offsetY;
    }
    /**pan*/
    private onPanEnd(event:gesture.GestureEvent):void {
        this.showMsg("pan end on "+event.host.name);
    }
    /**不需要手势的时候，可以清理手势*/
    private clearGesture(gestureInstance:gesture.IGesture):void {
        gestureInstance.dispose();
    }
    /**显示信息*/
    private showMsg(value:string):void {
        console.log(value);
        this.txtLabel.text = value;
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    private createBitmapByName(name:string):egret.Bitmap
    {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}

class MyToggleButton extends egret.Sprite
{
    private txt:egret.TextField;
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.touchChildren = false;
        this.touchEnabled = true;
    }
    public setLabel(value:string):void {
        this.txt.text = value;
    }
    private onAddToStage(event: egret.Event) {
        var g:egret.Graphics = this.graphics;
        g.beginFill(0xFF0000,1);
        g.drawRoundRect(0,0,150,40,8,8);
        g.endFill();
        this.txt = new egret.TextField();
        this.txt.text = "单点模式";
        this.txt.x = 14;
        this.txt.y = 4;
        this.addChild(this.txt);
    }
}