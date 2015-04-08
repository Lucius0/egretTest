/**
 * Created by shaorui on 15-1-26.
 */
var gesture;
(function (gesture) {
    /**变换(缩放+旋转)手势
     **/
    var TransformGesture = (function (_super) {
        __extends(TransformGesture, _super);
        /**构造方法*/
        function TransformGesture(host) {
            if (host === void 0) { host = null; }
            _super.call(this, host);
            this.slop = Math.round(20 / 252 * 240);
            this._offsetX = 0;
            this._offsetY = 0;
            this._rotation = 0;
            this._scale = 1;
            this.distance = 0;
            this.startScale = 1;
            this._useMultiPoints = true;
        }
        var __egretProto__ = TransformGesture.prototype;
        /**收到事件*/
        __egretProto__.onTouch = function (eventCollection) {
            var ec = eventCollection;
            var evt1;
            var evt2;
            if (gesture.GestureManager.simulateMultitouch) {
                evt1 = eventCollection[0];
                evt2 = this.reverseEvent(evt1);
                gesture.GestureManager.simulatePoints = [evt2];
                ec = [evt1, evt2];
            }
            if (ec.length < 2)
                return;
            evt1 = ec[0];
            evt2 = ec[1];
            var p1 = new egret.Point(evt1.stageX, evt1.stageY);
            var p2 = new egret.Point(evt2.stageX, evt2.stageY);
            var pR;
            var dy;
            var dx;
            if (evt2.type == egret.TouchEvent.TOUCH_BEGIN) {
                this.gestureBegan();
                this._transformVector = this.subtract(p2, p1);
                this.updateLocation(p1, p2);
                this.distance = egret.Point.distance(p2, p1);
                this.startScale = this.target.scaleX;
            }
            else if (evt1.type == egret.TouchEvent.TOUCH_MOVE || evt2.type == egret.TouchEvent.TOUCH_MOVE) {
                var prevLocation = this._location.clone();
                this.updateLocation(p1, p2);
                var currTransformVector;
                currTransformVector = this.subtract(p2, p1);
                this._offsetX = this._location.x - prevLocation.x;
                this._offsetY = this._location.y - prevLocation.y;
                this._rotation = Math.atan2(currTransformVector.y, currTransformVector.x) - Math.atan2(this._transformVector.y, this._transformVector.x);
                //this._scale = this.getPointLength(currTransformVector) / this.getPointLength(this._transformVector);
                var currentDistance = egret.Point.distance(p2, p1);
                this._scale = this.startScale * (currentDistance / this.distance);
                this._transformVector = this.subtract(p2, p1);
                this.gestureUpdate();
            }
            else if (evt1.type == egret.TouchEvent.TOUCH_END || evt2.type == egret.TouchEvent.TOUCH_END) {
                gesture.GestureManager.simulatePoints = [];
                this.gestureEnded();
            }
        };
        /**触点更新*/
        __egretProto__.gestureUpdate = function () {
            this._stats = 2;
            var evt = new gesture.GestureEvent(gesture.GestureEvent.UPDATE);
            evt.rotation = this._rotation;
            evt.scale = this._scale;
            evt.offsetX = this._offsetX;
            evt.offsetY = this._offsetY;
            evt.host = this.target;
            this.dispatchEvent(evt);
        };
        /**计算中心点*/
        __egretProto__.updateLocation = function (p1, p2) {
            var p = new egret.Point();
            p.x = (p1.x + p2.x) / 2;
            p.y = (p1.y + p2.y) / 2;
            this._location = p;
        };
        /**获取一个事件的映像副本(for test)*/
        __egretProto__.reverseEvent = function (evt1) {
            var evt2 = new egret.TouchEvent(evt1.type);
            var globalX = evt1.stageX;
            var globalY = evt1.stageY;
            var t = this.target;
            var op = t.localToGlobal(0.5 * t.width, 0.5 * t.height);
            var dix = globalX - op.x;
            var diy = globalY - op.y;
            var tp = new egret.Point(op.x - dix, op.y - diy);
            //var tp:egret.Point = new egret.Point(op.x+dix/2,op.y+diy/2);
            evt2._stageX = tp.x;
            evt2._stageY = tp.y;
            return evt2;
        };
        return TransformGesture;
    })(gesture.AbstractGesture);
    gesture.TransformGesture = TransformGesture;
    TransformGesture.prototype.__class__ = "gesture.TransformGesture";
})(gesture || (gesture = {}));
