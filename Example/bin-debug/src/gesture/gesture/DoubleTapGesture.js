/**
 * Created by shaorui on 15-1-26.
 */
var gesture;
(function (gesture) {
    /**双击*/
    var DoubleTapGesture = (function (_super) {
        __extends(DoubleTapGesture, _super);
        /**构造方法*/
        function DoubleTapGesture(host) {
            if (host === void 0) { host = null; }
            _super.call(this, host);
            this.touchCount = 0;
            this.isBegan = false;
            this._useMultiPoints = false;
        }
        var __egretProto__ = DoubleTapGesture.prototype;
        /**收到事件*/
        __egretProto__.onTouch = function (eventCollection) {
            if (eventCollection.length > 1)
                return;
            var evt = eventCollection[0];
            if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
                if (!this.isBegan) {
                    this.touchCount = 0;
                    this.isBegan = true;
                    this.gestureBegan();
                    egret.clearTimeout(this.callID);
                    this.callID = egret.setTimeout(this.checkDoubleTapHandler, this, 500);
                }
            }
            else if (evt.type == egret.TouchEvent.TOUCH_END && this.isBegan) {
                this.touchCount++;
                if (this.touchCount >= 2) {
                    this.gestureEnded();
                }
            }
        };
        /**手势结束*/
        __egretProto__.gestureEnded = function () {
            egret.clearTimeout(this.callID);
            this.touchCount = 0;
            this.isBegan = false;
            _super.prototype.gestureEnded.call(this);
        };
        /**检测超时*/
        __egretProto__.checkDoubleTapHandler = function () {
            this.touchCount = 0;
            this.isBegan = false;
            this.gestureFailed();
        };
        return DoubleTapGesture;
    })(gesture.AbstractGesture);
    gesture.DoubleTapGesture = DoubleTapGesture;
    DoubleTapGesture.prototype.__class__ = "gesture.DoubleTapGesture";
})(gesture || (gesture = {}));
