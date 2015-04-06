/**
 * Created by shaorui on 15-1-26.
 */
var gesture;
(function (gesture) {
    /**点一下*/
    var TapGesture = (function (_super) {
        __extends(TapGesture, _super);
        /**构造方法*/
        function TapGesture(host) {
            if (host === void 0) { host = null; }
            _super.call(this, host);
            this.isBegan = false;
            this._useMultiPoints = false;
        }
        var __egretProto__ = TapGesture.prototype;
        /**收到事件*/
        __egretProto__.onTouch = function (eventCollection) {
            if (eventCollection.length > 1)
                return;
            var evt = eventCollection[0];
            if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
                this.gestureBegan();
                this.isBegan = true;
                this._startPoint = new egret.Point(evt.stageX, evt.stageY);
                egret.clearTimeout(this.callID);
                this.callID = egret.setTimeout(this.checkTimeHandler, this, 500);
            }
            else if (evt.type == egret.TouchEvent.TOUCH_END && this.isBegan) {
                //判断一下释放点和起始点的距离
                egret.clearTimeout(this.callID);
                this._endPoint = new egret.Point(evt.stageX, evt.stageY);
                var distance = egret.Point.distance(this._startPoint, this._endPoint);
                if (distance < gesture.TapGesture.TAP_DISTANCE && this._stats == 1)
                    this.gestureEnded();
                else
                    this.gestureFailed();
            }
        };
        /**检测超时*/
        __egretProto__.checkTimeHandler = function () {
            this.isBegan = false;
            this.gestureFailed();
        };
        TapGesture.TAP_DISTANCE = 20;
        return TapGesture;
    })(gesture.AbstractGesture);
    gesture.TapGesture = TapGesture;
    TapGesture.prototype.__class__ = "gesture.TapGesture";
})(gesture || (gesture = {}));
