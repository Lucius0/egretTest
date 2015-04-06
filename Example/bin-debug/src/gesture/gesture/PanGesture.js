/**
 * Created by shaorui on 15-1-26.
 */
var gesture;
(function (gesture) {
    /**拖动*/
    var PanGesture = (function (_super) {
        __extends(PanGesture, _super);
        /**构造方法*/
        function PanGesture(host) {
            if (host === void 0) { host = null; }
            _super.call(this, host);
            this._useMultiPoints = false;
        }
        var __egretProto__ = PanGesture.prototype;
        /**收到事件*/
        __egretProto__.onTouch = function (eventCollection) {
            if (eventCollection.length > 1 || gesture.GestureManager.simulateMultitouch)
                return;
            var evt = eventCollection[0];
            if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
                this.gestureBegan();
                this._startPoint = new egret.Point(evt.stageX, evt.stageY);
            }
            else if (evt.type == egret.TouchEvent.TOUCH_MOVE) {
                this._endPoint = new egret.Point(evt.stageX, evt.stageY);
                this.gestureUpdate();
            }
            else if (evt.type == egret.TouchEvent.TOUCH_END) {
                this.gestureEnded();
            }
        };
        /**触点更新*/
        __egretProto__.gestureUpdate = function () {
            this._stats = 2;
            var evt = new gesture.GestureEvent(gesture.GestureEvent.UPDATE);
            evt.host = this.target;
            evt.offsetX = this._endPoint.x - this._startPoint.x;
            evt.offsetY = this._endPoint.y - this._startPoint.y;
            this.dispatchEvent(evt);
        };
        return PanGesture;
    })(gesture.AbstractGesture);
    gesture.PanGesture = PanGesture;
    PanGesture.prototype.__class__ = "gesture.PanGesture";
})(gesture || (gesture = {}));
