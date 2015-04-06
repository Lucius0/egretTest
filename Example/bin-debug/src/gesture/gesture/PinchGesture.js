/**
 * Created by shaorui on 15-1-26.
 */
var gesture;
(function (gesture) {
    /**缩放手势*/
    var PinchGesture = (function (_super) {
        __extends(PinchGesture, _super);
        /**构造方法*/
        function PinchGesture(host) {
            if (host === void 0) { host = null; }
            _super.call(this, host);
            this.startLen = 0;
            this.currentLen = 0;
            this._useMultiPoints = true;
        }
        var __egretProto__ = PinchGesture.prototype;
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
            if (evt2.type == egret.TouchEvent.TOUCH_BEGIN) {
                this.gestureBegan();
                this.startLen = egret.Point.distance(new egret.Point(evt1.stageX, evt1.stageY), new egret.Point(evt2.stageX, evt2.stageY));
            }
            else if (evt1.type == egret.TouchEvent.TOUCH_MOVE || evt2.type == egret.TouchEvent.TOUCH_MOVE) {
                this.currentLen = egret.Point.distance(new egret.Point(evt1.stageX, evt1.stageY), new egret.Point(evt2.stageX, evt2.stageY));
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
            evt.value = this.currentLen / this.startLen;
            evt.host = this.target;
            this.dispatchEvent(evt);
        };
        /**获取一个事件的映像副本(for test)*/
        __egretProto__.reverseEvent = function (evt1) {
            var evt2 = new egret.TouchEvent(evt1.type);
            var globalX = evt1.stageX;
            var globalY = evt1.stageY;
            var t = this.target;
            var op = t.localToGlobal(t.anchorX * t.width, t.anchorY * t.height);
            var dix = globalX - op.x;
            var diy = globalY - op.y;
            var tp = new egret.Point(op.x - dix, op.y - diy);
            evt2._stageX = tp.x;
            evt2._stageY = tp.y;
            return evt2;
        };
        return PinchGesture;
    })(gesture.AbstractGesture);
    gesture.PinchGesture = PinchGesture;
    PinchGesture.prototype.__class__ = "gesture.PinchGesture";
})(gesture || (gesture = {}));
