/**
 * Created by shaorui on 15-1-26.
 */
var gesture;
(function (gesture) {
    /**手势的抽象类*/
    var AbstractGesture = (function (_super) {
        __extends(AbstractGesture, _super);
        /**构造方法*/
        function AbstractGesture(target) {
            if (target === void 0) { target = null; }
            _super.call(this);
            /**手势是否需要多点判断*/
            this._useMultiPoints = false;
            /**状态,1代表手势开始,2代表手势更新,3代表手势结束*/
            this._stats = -1;
            /**位置*/
            this._location = new egret.Point();
            this._target = target;
            if (this._target != null)
                this.addHostToManager();
        }
        var __egretProto__ = AbstractGesture.prototype;
        Object.defineProperty(__egretProto__, "target", {
            /**getter and setter*/
            get: function () {
                return this._target;
            },
            set: function (value) {
                if (this._target == value)
                    return;
                this._stats = -1;
                if (this._target != null)
                    this.removeHostFromManager();
                this._target = value;
                if (this._target != null)
                    this.addHostToManager();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "location", {
            get: function () {
                return this._location.clone();
            },
            enumerable: true,
            configurable: true
        });
        /**通知Manager来管理这个显示对象*/
        __egretProto__.addHostToManager = function () {
            gesture.GestureManager.addHost(this);
        };
        /**通知Manager删除这个显示对象*/
        __egretProto__.removeHostFromManager = function () {
            gesture.GestureManager.removeHost(this);
        };
        /**收到事件*/
        __egretProto__.onTouch = function (eventCollection) {
            //console.log(eventCollection);
            //override by subclasses
        };
        /**手势开始*/
        __egretProto__.gestureBegan = function () {
            this._stats = 1;
            var evt = new gesture.GestureEvent(gesture.GestureEvent.BEGAN);
            evt.host = this._target;
            this.dispatchEvent(evt);
        };
        /**触点更新*/
        __egretProto__.gestureUpdate = function () {
            this._stats = 2;
            var evt = new gesture.GestureEvent(gesture.GestureEvent.UPDATE);
            evt.host = this._target;
            this.dispatchEvent(evt);
        };
        /**手势结束*/
        __egretProto__.gestureEnded = function () {
            this._stats = 3;
            var evt = new gesture.GestureEvent(gesture.GestureEvent.ENDED);
            evt.host = this._target;
            this.dispatchEvent(evt);
            this._stats = -1;
        };
        /**手势失败*/
        __egretProto__.gestureFailed = function () {
            var evt = new gesture.GestureEvent(gesture.GestureEvent.FAILED);
            evt.host = this._target;
            this.dispatchEvent(evt);
            this._stats = -1;
        };
        /**实现Flash中Point的subtract方法*/
        __egretProto__.subtract = function (p1, p2) {
            var p = new egret.Point();
            p.x = p1.x - p2.x;
            p.y = p1.y - p2.y;
            return p;
        };
        /**实现Flash中Point的length*/
        __egretProto__.getPointLength = function (p) {
            var len = 0;
            var p0 = new egret.Point(0, 0);
            len = egret.Point.distance(p, p0);
            return len;
        };
        /**释放*/
        __egretProto__.dispose = function () {
            this._stats = -1;
            gesture.GestureManager.removeHost(this);
            this._target = null;
        };
        return AbstractGesture;
    })(egret.EventDispatcher);
    gesture.AbstractGesture = AbstractGesture;
    AbstractGesture.prototype.__class__ = "gesture.AbstractGesture";
})(gesture || (gesture = {}));
