/**
 * Created by shaorui on 15-1-26.
 */
var gesture;
(function (gesture) {
    /**手势管理*/
    var GestureManager = (function () {
        function GestureManager() {
        }
        var __egretProto__ = GestureManager.prototype;
        /**添加一个手势实例*/
        GestureManager.addHost = function (value) {
            var hc = gesture.GestureManager.hostCollection;
            if (hc.indexOf(value) != -1) {
                console.warn("不要重复添加手势实例");
                return;
            }
            gesture.GestureManager.registerEvent(value.target);
            hc.push(value);
            gesture.GestureManager.eventDict[value.target.hashCode] = [];
        };
        /**删除一个手势实例*/
        GestureManager.removeHost = function (value) {
            var hc = gesture.GestureManager.hostCollection;
            var index = hc.indexOf(value);
            if (index == -1) {
                console.warn("不存在这个实例");
                return;
            }
            hc.slice(index, 1);
            gesture.GestureManager.removeEvent(value.target);
            gesture.GestureManager.eventDict[value.target.hashCode] = null;
        };
        /**注册事件侦听*/
        GestureManager.registerEvent = function (value) {
            var hc = gesture.GestureManager.hostCollection;
            value.addEventListener(egret.TouchEvent.TOUCH_BEGIN, gesture.GestureManager.touchedHandler, value);
        };
        /**删除事件侦听*/
        GestureManager.removeEvent = function (value) {
            var hc = gesture.GestureManager.hostCollection;
            value.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, gesture.GestureManager.touchedHandler, value);
        };
        /**事件处理*/
        GestureManager.touchedHandler = function (e) {
            //console.log(e.type,e.currentTarget);
            //判断事件类型
            var target;
            var stage = egret.MainContext.instance.stage;
            if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
                target = e.currentTarget;
                gesture.GestureManager.currentTouchObject = target;
                stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, gesture.GestureManager.touchedHandler, stage);
                stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, gesture.GestureManager.touchedHandler, stage);
                stage.removeEventListener(egret.TouchEvent.TOUCH_END, gesture.GestureManager.touchedHandler, stage);
                stage.addEventListener(egret.TouchEvent.TOUCH_END, gesture.GestureManager.touchedHandler, stage);
                stage.removeEventListener(egret.Event.LEAVE_STAGE, gesture.GestureManager.leaveStageHandler, stage);
                stage.addEventListener(egret.Event.LEAVE_STAGE, gesture.GestureManager.leaveStageHandler, stage);
            }
            else {
                target = gesture.GestureManager.currentTouchObject;
            }
            if (gesture.GestureManager.eventDict[target.hashCode] == null) {
                gesture.GestureManager.eventDict[target.hashCode] = [];
            }
            //判断事件对象，如果是多点，则数组的长度大于1
            var ec = gesture.GestureManager.eventDict[target.hashCode];
            var currentEvent;
            var evtIndex = -1;
            if (!gesture.GestureManager.hasTouchEvent(e)) {
                currentEvent = gesture.GestureManager.evtPool.clone(e);
                ec.push(currentEvent);
            }
            else {
                currentEvent = gesture.GestureManager.getTouchEventByID(e.touchPointID, target);
                gesture.GestureManager.evtPool.setProperties(e, currentEvent);
            }
            //通知手势对象
            var hc = gesture.GestureManager.hostCollection;
            var ges;
            for (var i = 0; i < hc.length; i++) {
                ges = hc[i];
                if (ges.target == target)
                    ges.onTouch(ec);
            }
            //清理已经结束的事件
            if (currentEvent.type == egret.TouchEvent.TOUCH_END) {
                gesture.GestureManager.removeAllEvent();
            }
            //画圈
            if (gesture.GestureManager.showTouchPoint) {
                gesture.GestureManager.drawTouchPoint();
            }
        };
        /**根据TOUCH ID判断是不是已经存在了这个触碰对象*/
        GestureManager.hasTouchEvent = function (e) {
            var target = gesture.GestureManager.currentTouchObject;
            var ec = gesture.GestureManager.eventDict[target.hashCode];
            for (var index = 0; index < ec.length; index++) {
                if (ec[index].touchPointID == e.touchPointID) {
                    return true;
                }
            }
            return false;
        };
        /**根据TOUCH ID得到一个对象*/
        GestureManager.getTouchEventByID = function (touchID, target) {
            var ec = gesture.GestureManager.eventDict[target.hashCode];
            for (var index = 0; index < ec.length; index++) {
                if (ec[index].touchPointID == touchID) {
                    return ec[index];
                }
            }
            return null;
        };
        /**移出事件处理*/
        GestureManager.leaveStageHandler = function (e) {
            gesture.GestureManager.removeAllEvent();
        };
        /**remove all*/
        GestureManager.removeAllEvent = function () {
            var stage = egret.MainContext.instance.stage;
            for (var key in gesture.GestureManager.eventDict) {
                var ec = gesture.GestureManager.eventDict[key];
                if (ec != null)
                    gesture.GestureManager.evtPool.reclaimAll(ec);
            }
            stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, gesture.GestureManager.touchedHandler, stage);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, gesture.GestureManager.touchedHandler, stage);
            stage.removeEventListener(egret.Event.LEAVE_STAGE, gesture.GestureManager.leaveStageHandler, stage);
            gesture.GestureManager.drawTouchPoint();
        };
        /**用圆圈显示点的位置*/
        GestureManager.drawTouchPoint = function () {
            if (gesture.GestureManager.currentTouchObject == null)
                return;
            var drawLayer = gesture.GestureManager.drawLayer;
            var stage = egret.MainContext.instance.stage;
            if (drawLayer.stage == null)
                stage.addChild(drawLayer);
            var g = drawLayer.graphics;
            g.clear();
            g.beginFill(0x000000, 0.4);
            var evt;
            for (var key in gesture.GestureManager.eventDict) {
                if (gesture.GestureManager.currentTouchObject.hashCode != key)
                    continue;
                var ec = gesture.GestureManager.eventDict[key];
                if (ec != null && ec.length > 0) {
                    for (var index = 0; index < ec.length; index++) {
                        evt = ec[index];
                        g.drawCircle(evt.stageX, evt.stageY, 10);
                    }
                }
            }
            ec = gesture.GestureManager.simulatePoints;
            for (var index = 0; index < ec.length; index++) {
                evt = ec[index];
                g.drawCircle(evt.stageX, evt.stageY, 10);
            }
            g.endFill();
        };
        /*--------------setting-----------------------*/
        /**是否用圆形显示触碰的点(用于测试)*/
        GestureManager.showTouchPoint = false;
        /**是否开启模拟的多点(用于测试)*/
        GestureManager.simulateMultitouch = false;
        /**PC上模拟的点加到这里进行显示*/
        GestureManager.simulatePoints = [];
        /**用数组存放N个手势实例*/
        GestureManager.hostCollection = [];
        /**事件字典,每一个显示对象对应一个数组存储事件*/
        GestureManager.eventDict = {};
        /**事件池*/
        GestureManager.evtPool = new gesture.EventPool();
        /**用于辅助显示*/
        GestureManager.drawLayer = new egret.Sprite();
        return GestureManager;
    })();
    gesture.GestureManager = GestureManager;
    GestureManager.prototype.__class__ = "gesture.GestureManager";
})(gesture || (gesture = {}));
