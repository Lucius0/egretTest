/**
 * Created by L on 2015-04-06.
 */
var GestureTest = (function (_super) {
    __extends(GestureTest, _super);
    function GestureTest() {
        _super.call(this);
        this.isMultiMode = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = GestureTest.prototype;
    __egretProto__.onAddToStage = function (event) {
        var sky = this.createBitmapByName("bgImage");
        sky.name = "sky";
        sky.touchEnabled = true;
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        this.sky = sky;
        //icon
        var icon = this.createBitmapByName("egretIcon");
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
        if (egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
            var btn = new MyToggleButton();
            btn.addEventListener(egret.TouchEvent.TOUCH_END, this.toggleButtonHandler, this);
            this.addChild(btn);
            this.btn = btn;
        }
        this.txtLabel = new egret.TextField();
        this.txtLabel.y = 40;
        this.addChild(this.txtLabel);
        //test
        this.testGesture();
    };
    /**test for egret native touch*/
    __egretProto__.toggleButtonHandler = function (evt) {
        this.isMultiMode = !this.isMultiMode;
        this.btn.setLabel(this.isMultiMode ? "多点模式" : "单点模式");
        gesture.GestureManager.simulateMultitouch = this.isMultiMode; //PC端测试多点操作用，手机测试请设置false
    };
    /**测试手势*/
    __egretProto__.testGesture = function () {
        //设置
        if (egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
            gesture.GestureManager.showTouchPoint = true; //PC端测试多点操作用，手机测试请设置false
        }
        //Tap(点一下)
        var tap = new gesture.TapGesture(this.sky);
        tap.addEventListener(gesture.GestureEvent.ENDED, this.onTap, this);
        //Double Tap (双击)
        var tap2 = new gesture.DoubleTapGesture(this.sky);
        tap2.addEventListener(gesture.GestureEvent.ENDED, this.onDoubleTap, this);
        //Pinch(二指往內或往外拨动，平时经常用到的缩放)
        var tap3 = new gesture.PinchGesture(this.icon);
        tap3.addEventListener(gesture.GestureEvent.BEGAN, this.onPinchBegan, this);
        tap3.addEventListener(gesture.GestureEvent.UPDATE, this.onPinchUpdate, this);
        tap3.addEventListener(gesture.GestureEvent.ENDED, this.onPinchEnd, this);
        //Rotation(旋转)
        var tap4 = new gesture.RotationGesture(this.icon);
        tap4.addEventListener(gesture.GestureEvent.BEGAN, this.onRotationBegan, this);
        tap4.addEventListener(gesture.GestureEvent.UPDATE, this.onRotationUpdate, this);
        tap4.addEventListener(gesture.GestureEvent.ENDED, this.onRotationEnd, this);
        //Swipe(滑动，快速移动)
        var tap5 = new gesture.SwipeGesture(this.sky);
        tap5.addEventListener(gesture.GestureEvent.ENDED, this.onSwipeEnd, this);
        //Pan (拖移，慢速移动)
        var tap6 = new gesture.PanGesture(this.icon);
        tap6.addEventListener(gesture.GestureEvent.BEGAN, this.onPanBegan, this);
        tap6.addEventListener(gesture.GestureEvent.UPDATE, this.onPanUpdate, this);
        tap6.addEventListener(gesture.GestureEvent.ENDED, this.onPanEnd, this);
        //LongPress(长按)
        var tap7 = new gesture.LongPressGesture(this.sky);
        tap7.addEventListener(gesture.GestureEvent.ENDED, this.onLongPressEnd, this);
    };
    /**on tap*/
    __egretProto__.onTap = function (event) {
        this.showMsg("tap on " + event.host.name);
    };
    /**on double tap*/
    __egretProto__.onDoubleTap = function (event) {
        this.showMsg("double tap on " + event.host.name);
    };
    /**swipe*/
    __egretProto__.onSwipeEnd = function (event) {
        this.showMsg("swipe " + event.offsetX + "," + event.offsetY);
    };
    /**long press*/
    __egretProto__.onLongPressEnd = function (event) {
        this.showMsg("long press on " + event.host.name);
    };
    /**pinch*/
    __egretProto__.onPinchBegan = function (event) {
        //console.log("pinch began on "+event.host.name);
        this.startScaleValue = this.icon.scaleX;
    };
    /**pinch*/
    __egretProto__.onPinchUpdate = function (event) {
        //console.log("pinch update "+event.value);
        this.icon.scaleX = this.startScaleValue * event.value;
        this.icon.scaleY = this.icon.scaleX;
    };
    /**pinch*/
    __egretProto__.onPinchEnd = function (event) {
        this.showMsg("pinch end on " + event.host.name);
    };
    /**rotation*/
    __egretProto__.onRotationBegan = function (event) {
        //console.log("rotation began on "+event.host.name);
        this.startRotationValue = this.icon.rotation;
    };
    /**rotation*/
    __egretProto__.onRotationUpdate = function (event) {
        //console.log("rotation update ",event.value);
        this.icon.rotation = this.startRotationValue + event.value;
    };
    /**rotation*/
    __egretProto__.onRotationEnd = function (event) {
        this.showMsg("rotation end on " + event.host.name);
    };
    /**pan*/
    __egretProto__.onPanBegan = function (event) {
        //console.log("pan began on "+event.host.name);
        this.startPoint = new egret.Point(event.host.x, event.host.y);
    };
    /**pan*/
    __egretProto__.onPanUpdate = function (event) {
        //console.log("rotation update ",event.value);
        event.host.x = this.startPoint.x + event.offsetX;
        event.host.y = this.startPoint.y + event.offsetY;
    };
    /**pan*/
    __egretProto__.onPanEnd = function (event) {
        this.showMsg("pan end on " + event.host.name);
    };
    /**不需要手势的时候，可以清理手势*/
    __egretProto__.clearGesture = function (gestureInstance) {
        gestureInstance.dispose();
    };
    /**显示信息*/
    __egretProto__.showMsg = function (value) {
        console.log(value);
        this.txtLabel.text = value;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    __egretProto__.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return GestureTest;
})(egret.DisplayObjectContainer);
GestureTest.prototype.__class__ = "GestureTest";
var MyToggleButton = (function (_super) {
    __extends(MyToggleButton, _super);
    function MyToggleButton() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.touchChildren = false;
        this.touchEnabled = true;
    }
    var __egretProto__ = MyToggleButton.prototype;
    __egretProto__.setLabel = function (value) {
        this.txt.text = value;
    };
    __egretProto__.onAddToStage = function (event) {
        var g = this.graphics;
        g.beginFill(0xFF0000, 1);
        g.drawRoundRect(0, 0, 150, 40, 8, 8);
        g.endFill();
        this.txt = new egret.TextField();
        this.txt.text = "单点模式";
        this.txt.x = 14;
        this.txt.y = 4;
        this.addChild(this.txt);
    };
    return MyToggleButton;
})(egret.Sprite);
MyToggleButton.prototype.__class__ = "MyToggleButton";
