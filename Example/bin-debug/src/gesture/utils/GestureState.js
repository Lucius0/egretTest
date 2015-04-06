var GestureState = (function () {
    function GestureState() {
    }
    var __egretProto__ = GestureState.prototype;
    GestureState.POSSIBLE = "possible";
    GestureState.RECOGNIZED = "recognized";
    GestureState.FAILED = "failed";
    GestureState.BEGAN = "began";
    GestureState.CHANGED = "changed";
    GestureState.ENDED = "ended";
    GestureState.CANCELLED = "cancelled";
    return GestureState;
})();
GestureState.prototype.__class__ = "GestureState";
