/**
 * Created by shaorui on 15-1-26.
 */
var gesture;
(function (gesture) {
    /**长按*/
    var LongPressGesture = (function (_super) {
        __extends(LongPressGesture, _super);
        /**构造方法*/
        function LongPressGesture(host) {
            if (host === void 0) { host = null; }
            _super.call(this, host);
            this.isBegan = false;
            this._useMultiPoints = false;
        }
        var __egretProto__ = LongPressGesture.prototype;
        /**收到事件*/
        __egretProto__.onTouch = function (eventCollection) {
            if (eventCollection.length > 1)
                return;
            var evt = eventCollection[0];
            if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
                this.isBegan = true;
                this.gestureBegan();
                egret.clearTimeout(this.callID);
                this.callID = egret.setTimeout(this.checkTimeHandler, this, 2000);
            }
            else if (evt.type == egret.TouchEvent.TOUCH_END && this.isBegan) {
                egret.clearTimeout(this.callID);
                this.isBegan = false;
                this.gestureFailed();
            }
        };
        /**手势结束*/
        __egretProto__.gestureEnded = function () {
            egret.clearTimeout(this.callID);
            this.isBegan = false;
            _super.prototype.gestureEnded.call(this);
        };
        /**检测超时*/
        __egretProto__.checkTimeHandler = function () {
            this.gestureEnded();
        };
        return LongPressGesture;
    })(gesture.AbstractGesture);
    gesture.LongPressGesture = LongPressGesture;
    LongPressGesture.prototype.__class__ = "gesture.LongPressGesture";
})(gesture || (gesture = {}));
