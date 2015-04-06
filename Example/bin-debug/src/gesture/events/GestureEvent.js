/**
 * Created by shaorui on 15-1-26.
 */
var gesture;
(function (gesture) {
    /**手势事件*/
    var GestureEvent = (function (_super) {
        __extends(GestureEvent, _super);
        function GestureEvent(type) {
            _super.call(this, type);
        }
        var __egretProto__ = GestureEvent.prototype;
        GestureEvent.BEGAN = "began";
        GestureEvent.UPDATE = "update";
        GestureEvent.ENDED = "ended";
        GestureEvent.FAILED = "failed";
        return GestureEvent;
    })(egret.Event);
    gesture.GestureEvent = GestureEvent;
    GestureEvent.prototype.__class__ = "gesture.GestureEvent";
})(gesture || (gesture = {}));
