/**
 * Created by L on 2015-04-06.
 */
class TransformTest extends egret.DisplayObjectContainer
{
    /**测试用图*/
    private sky:egret.Bitmap;
    /**测试用图*/
    private icon:egret.Bitmap;
    /**测试按钮*/
    private btn:MyToggleButton;

    private startAnchorOffsetX:number;
    private startAnchorOffsetY:number;
    private startPoint:egret.Point;
    private isMultiMode:boolean = false;
    private txtLabel:egret.TextField;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        var sky: egret.Bitmap = this.createBitmapByName("bgImage");
        sky.name = "sky";
        sky.touchEnabled = true;
        this.addChild(sky);
        var stageW: number = this.stage.stageWidth;
        var stageH: number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        this.sky = sky;
        //icon
        var icon: egret.Bitmap = this.createBitmapByName("egretIcon");
        icon.touchEnabled = true;
        icon.name = "icon";
        this.addChild(icon);
        icon.x = stageW / 2-icon.width/2;
        icon.y = stageH / 2 - 180;
        this.icon = icon;
        //ui
        if(egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
            var btn:MyToggleButton = new MyToggleButton();
            btn.addEventListener(egret.TouchEvent.TOUCH_END,this.toggleButtonHandler,this);
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
    private toggleButtonHandler(evt:egret.TouchEvent):void {
        this.isMultiMode = !this.isMultiMode;
        this.btn.setLabel(this.isMultiMode?"多点模式":"单点模式");
        gesture.GestureManager.simulateMultitouch = this.isMultiMode;//PC端测试多点操作用，手机测试请设置false
    }
    /**测试手势*/
    private testGesture():void {
        //设置
        if(egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
            gesture.GestureManager.showTouchPoint = true;//PC端测试多点操作用，手机测试请设置false
        }
        //Pan (拖移，慢速移动)
        var tap6:gesture.PanGesture = new gesture.PanGesture(this.icon);
        tap6.addEventListener(gesture.GestureEvent.BEGAN,this.onPanBegan,this);
        tap6.addEventListener(gesture.GestureEvent.UPDATE,this.onPanUpdate,this);
        tap6.addEventListener(gesture.GestureEvent.ENDED,this.onPanEnd,this);
        //Transform(变换)
        var tap8:gesture.TransformGesture = new gesture.TransformGesture(this.icon);
        tap8.addEventListener(gesture.GestureEvent.BEGAN,this.onTransformBegan,this);
        tap8.addEventListener(gesture.GestureEvent.UPDATE,this.onTransformUpdate,this);
        tap8.addEventListener(gesture.GestureEvent.ENDED,this.onTransformEnd,this);
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
    /**Transform*/
    private onTransformBegan(event:gesture.GestureEvent):void {
        //console.log("transform began on "+event.host.name);
        this.startAnchorOffsetX = this.icon.anchorOffsetX;
        this.startAnchorOffsetY = this.icon.anchorOffsetY;
        this.onTransformUpdate(event);
    }
    /**Transform*/
    private onTransformUpdate(event:gesture.GestureEvent):void {
        //console.log("transform update ",event.value);
        // Panning
        if (event.scale != 1 || event.rotation != 0)
        {
            // Scale and rotation.
            var loc:egret.Point = event.currentTarget.location;
            var par:egret.DisplayObjectContainer = this.icon.parent;
            var p1:egret.Point = this.icon.localToGlobal(0,0);
            var transformPoint:egret.Point = this.icon.globalToLocal(loc.x,loc.y);
            this.icon.anchorOffsetX = transformPoint.x;
            this.icon.anchorOffsetY = transformPoint.y;
            var p2:egret.Point = this.icon.localToGlobal(0,0);
            var offsetX:number = (p2.x-p1.x);
            var offsetY:number = (p2.y-p1.y);
            this.icon.x -= offsetX;
            this.icon.y -= offsetY;
            this.icon.rotation += event.rotation*180/Math.PI;
            this.icon.scaleX = event.scale;
            this.icon.scaleY = this.icon.scaleX;
        }
    }
    /**Transform*/
    private onTransformEnd(event:gesture.GestureEvent):void {
        this.showMsg("transform end on "+event.host.name);
        var p1:egret.Point = this.icon.localToGlobal(0,0);
        this.icon.anchorOffsetX = this.startAnchorOffsetX;
        this.icon.anchorOffsetY = this.startAnchorOffsetY;
        var p2:egret.Point = this.icon.localToGlobal(0,0);
        var offsetX:number = (p2.x-p1.x);
        var offsetY:number = (p2.y-p1.y);
        this.icon.x -= offsetX;
        this.icon.y -= offsetY;
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