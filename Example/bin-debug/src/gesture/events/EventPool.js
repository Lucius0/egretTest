/**
 * Created by shaorui on 15-1-28.
 */
var gesture;
(function (gesture) {
    /**事件的对象池，避免重复创建对象*/
    var EventPool = (function () {
        function EventPool() {
            this._collection = [];
        }
        var __egretProto__ = EventPool.prototype;
        __egretProto__.clone = function (e) {
            var evt = this._collection.pop();
            if (evt == null) {
                evt = new egret.TouchEvent(e.type);
            }
            for (var key in e) {
                evt[key] = e[key];
            }
            return evt;
        };
        __egretProto__.setProperties = function (e, resultEvent) {
            for (var key in e) {
                resultEvent[key] = e[key];
            }
            return resultEvent;
        };
        __egretProto__.reclaim = function (e) {
            if (this._collection.indexOf(e) != -1)
                return;
            this._collection.push(e);
        };
        __egretProto__.reclaimAll = function (arr) {
            while (arr.length > 0) {
                this.reclaim(arr[0]);
                arr.shift();
            }
        };
        return EventPool;
    })();
    gesture.EventPool = EventPool;
    EventPool.prototype.__class__ = "gesture.EventPool";
})(gesture || (gesture = {}));
