/**
 * Created by L on 2015-04-06.
 */
var TransformTest = (function (_super) {
    __extends(TransformTest, _super);
    function TransformTest() {
        _super.call(this);
        this.isMultiMode = false;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = TransformTest.prototype;
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
        this.addChild(icon);
        icon.x = stageW / 2 - icon.width / 2;
        icon.y = stageH / 2 - 180;
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
        //Pan (拖移，慢速移动)
        var tap6 = new gesture.PanGesture(this.icon);
        tap6.addEventListener(gesture.GestureEvent.BEGAN, this.onPanBegan, this);
        tap6.addEventListener(gesture.GestureEvent.UPDATE, this.onPanUpdate, this);
        tap6.addEventListener(gesture.GestureEvent.ENDED, this.onPanEnd, this);
        //Transform(变换)
        var tap8 = new gesture.TransformGesture(this.icon);
        tap8.addEventListener(gesture.GestureEvent.BEGAN, this.onTransformBegan, this);
        tap8.addEventListener(gesture.GestureEvent.UPDATE, this.onTransformUpdate, this);
        tap8.addEventListener(gesture.GestureEvent.ENDED, this.onTransformEnd, this);
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
    /**Transform*/
    __egretProto__.onTransformBegan = function (event) {
        //console.log("transform began on "+event.host.name);
        this.startAnchorOffsetX = this.icon.anchorOffsetX;
        this.startAnchorOffsetY = this.icon.anchorOffsetY;
        this.onTransformUpdate(event);
    };
    /**Transform*/
    __egretProto__.onTransformUpdate = function (event) {
        //console.log("transform update ",event.value);
        // Panning
        if (event.scale != 1 || event.rotation != 0) {
            // Scale and rotation.
            var loc = event.currentTarget.location;
            var par = this.icon.parent;
            var p1 = this.icon.localToGlobal(0, 0);
            var transformPoint = this.icon.globalToLocal(loc.x, loc.y);
            this.icon.anchorOffsetX = transformPoint.x;
            this.icon.anchorOffsetY = transformPoint.y;
            var p2 = this.icon.localToGlobal(0, 0);
            var offsetX = (p2.x - p1.x);
            var offsetY = (p2.y - p1.y);
            this.icon.x -= offsetX;
            this.icon.y -= offsetY;
            this.icon.rotation += event.rotation * 180 / Math.PI;
            this.icon.scaleX = event.scale;
            this.icon.scaleY = this.icon.scaleX;
        }
    };
    /**Transform*/
    __egretProto__.onTransformEnd = function (event) {
        this.showMsg("transform end on " + event.host.name);
        var p1 = this.icon.localToGlobal(0, 0);
        this.icon.anchorOffsetX = this.startAnchorOffsetX;
        this.icon.anchorOffsetY = this.startAnchorOffsetY;
        var p2 = this.icon.localToGlobal(0, 0);
        var offsetX = (p2.x - p1.x);
        var offsetY = (p2.y - p1.y);
        this.icon.x -= offsetX;
        this.icon.y -= offsetY;
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
    return TransformTest;
})(egret.DisplayObjectContainer);
TransformTest.prototype.__class__ = "TransformTest";
