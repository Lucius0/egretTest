/**
 * Created by shaorui on 15-1-26.
 */
var gesture;
(function (gesture) {
    /**横扫*/
    var SwipeGesture = (function (_super) {
        __extends(SwipeGesture, _super);
        /**构造方法*/
        function SwipeGesture(host) {
            if (host === void 0) { host = null; }
            _super.call(this, host);
            this.isBegan = false;
            this._useMultiPoints = false;
        }
        var __egretProto__ = SwipeGesture.prototype;
        /**收到事件*/
        __egretProto__.onTouch = function (eventCollection) {
            if (eventCollection.length > 1)
                return;
            var evt = eventCollection[0];
            if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
                this.isBegan = true;
                this.gestureBegan();
                this._startPoint = new egret.Point(evt.stageX, evt.stageY);
                egret.clearTimeout(this.callID);
                this.callID = egret.setTimeout(this.checkSwipeHandler, this, 500);
            }
            else if (evt.type == egret.TouchEvent.TOUCH_END && this.isBegan) {
                //判断一下释放点和起始点的距离
                this._endPoint = new egret.Point(evt.stageX, evt.stageY);
                this.disX = Math.abs(this._endPoint.x - this._startPoint.x);
                this.disY = Math.abs(this._endPoint.y - this._startPoint.y);
                if ((this.disX > gesture.SwipeGesture.SWIPE_DISTANCE || this.disY > gesture.SwipeGesture.SWIPE_DISTANCE) && this._stats == 1)
                    this.gestureEnded();
                else
                    this.gestureFailed();
            }
        };
        /**触点更新*/
        __egretProto__.gestureEnded = function () {
            this._stats = 3;
            var evt = new gesture.GestureEvent(gesture.GestureEvent.ENDED);
            var directX = 0;
            var directY = 0;
            if (this.disX > gesture.SwipeGesture.SWIPE_DISTANCE) {
                directX = this._endPoint.x > this._startPoint.x ? 1 : -1;
            }
            if (this.disY > gesture.SwipeGesture.SWIPE_DISTANCE) {
                directY = this._endPoint.y > this._startPoint.y ? 1 : -1;
            }
            evt.offsetX = directX;
            evt.offsetY = directY;
            evt.host = this.target;
            this.dispatchEvent(evt);
            this._stats = -1;
        };
        /**检测超时*/
        __egretProto__.checkSwipeHandler = function () {
            this.isBegan = false;
            this.gestureFailed();
        };
        SwipeGesture.SWIPE_DISTANCE = 200;
        return SwipeGesture;
    })(gesture.AbstractGesture);
    gesture.SwipeGesture = SwipeGesture;
    SwipeGesture.prototype.__class__ = "gesture.SwipeGesture";
})(gesture || (gesture = {}));
