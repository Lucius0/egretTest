/**
 * Created by shaorui on 15-1-26.
 */
var gesture;
(function (gesture) {
    /**旋转手势
     * TODO:目前实现的很简陋，并非真正的两点判断，算法还需要继续优化
     **/
    var RotationGesture = (function (_super) {
        __extends(RotationGesture, _super);
        /**构造方法*/
        function RotationGesture(host) {
            if (host === void 0) { host = null; }
            _super.call(this, host);
            this._rotationStart = 0;
            this._rotation = 0;
            this._useMultiPoints = true;
        }
        var __egretProto__ = RotationGesture.prototype;
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
            var dy;
            var dx;
            if (evt2.type == egret.TouchEvent.TOUCH_BEGIN) {
                this.gestureBegan();
                this._transformVector = this.getCenterPoint(p1, p2);
                dy = p2.x - this._transformVector.x;
                dx = p2.y - this._transformVector.y;
                this._rotationStart = Math.atan2(dy, dx) * 180 / Math.PI;
            }
            else if (evt1.type == egret.TouchEvent.TOUCH_MOVE || evt2.type == egret.TouchEvent.TOUCH_MOVE) {
                dy = p2.x - this._transformVector.x;
                dx = p2.y - this._transformVector.y;
                this._rotation = this._rotationStart - Math.atan2(dy, dx) * 180 / Math.PI;
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
            evt.value = this._rotation;
            evt.host = this.target;
            this.dispatchEvent(evt);
        };
        /**实现Flash中Point的subtract方法*/
        __egretProto__.getCenterPoint = function (p1, p2) {
            var p = new egret.Point();
            p.x = p1.x + (p2.x - p1.x) / 2;
            p.y = p1.y + (p2.y - p1.y) / 2;
            return p;
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
        return RotationGesture;
    })(gesture.AbstractGesture);
    gesture.RotationGesture = RotationGesture;
    RotationGesture.prototype.__class__ = "gesture.RotationGesture";
})(gesture || (gesture = {}));
