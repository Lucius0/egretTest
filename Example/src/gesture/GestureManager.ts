/**
 * Created by shaorui on 15-1-26.
 */
module gesture
{
    /**手势管理*/
    export class GestureManager
    {
        /*--------------setting-----------------------*/
        /**是否用圆形显示触碰的点(用于测试)*/
        public static showTouchPoint:boolean = false;
        /**是否开启模拟的多点(用于测试)*/
        public static simulateMultitouch:boolean = false;
        /**PC上模拟的点加到这里进行显示*/
        public static simulatePoints:egret.TouchEvent[] = [];


        /**用数组存放N个手势实例*/
        private static hostCollection:gesture.AbstractGesture[] = [];
        /**事件字典,每一个显示对象对应一个数组存储事件*/
        private static eventDict:Object = {};
        /**事件池*/
        private static evtPool:gesture.EventPool = new gesture.EventPool();
        /**用于辅助显示*/
        private static drawLayer:egret.Sprite = new egret.Sprite();
        /**private*/
        private static currentTouchObject:egret.DisplayObject;
        /**添加一个手势实例*/
        public static addHost(value:gesture.AbstractGesture):void {
            var hc:gesture.AbstractGesture[] = gesture.GestureManager.hostCollection;
            if(hc.indexOf(value) != -1) {
                console.warn("不要重复添加手势实例");
                return;
            }
            gesture.GestureManager.registerEvent(value.target);
            hc.push(value);
            gesture.GestureManager.eventDict[value.target.hashCode] = [];
        }
        /**删除一个手势实例*/
        public static removeHost(value:gesture.AbstractGesture):void {
            var hc:gesture.AbstractGesture[] = gesture.GestureManager.hostCollection;
            var index:number = hc.indexOf(value);
            if(index == -1) {
                console.warn("不存在这个实例");
                return;
            }
            hc.slice(index,1);
            gesture.GestureManager.removeEvent(value.target);
            gesture.GestureManager.eventDict[value.target.hashCode] = null;
        }
        /**注册事件侦听*/
        private static registerEvent(value:egret.DisplayObject):void {
            var hc:gesture.AbstractGesture[] = gesture.GestureManager.hostCollection;
            value.addEventListener(egret.TouchEvent.TOUCH_BEGIN, gesture.GestureManager.touchedHandler, value);
        }
        /**删除事件侦听*/
        private static removeEvent(value:egret.DisplayObject):void {
            var hc:gesture.AbstractGesture[] = gesture.GestureManager.hostCollection;
            value.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, gesture.GestureManager.touchedHandler, value);
        }
        /**事件处理*/
        private static touchedHandler(e:egret.TouchEvent):void {
            //console.log(e.type,e.currentTarget);
            //判断事件类型
            var target:egret.DisplayObject;
            var stage:egret.Stage = egret.MainContext.instance.stage;
            if(e.type == egret.TouchEvent.TOUCH_BEGIN) {
                target = e.currentTarget;
                gesture.GestureManager.currentTouchObject = target;
                stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, gesture.GestureManager.touchedHandler, stage);
                stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, gesture.GestureManager.touchedHandler, stage);
                stage.removeEventListener(egret.TouchEvent.TOUCH_END, gesture.GestureManager.touchedHandler, stage);
                stage.addEventListener(egret.TouchEvent.TOUCH_END, gesture.GestureManager.touchedHandler, stage);
                stage.removeEventListener(egret.Event.LEAVE_STAGE, gesture.GestureManager.leaveStageHandler, stage);
                stage.addEventListener(egret.Event.LEAVE_STAGE, gesture.GestureManager.leaveStageHandler, stage);
            } else {
                target = gesture.GestureManager.currentTouchObject;
            }
            if(gesture.GestureManager.eventDict[target.hashCode] == null) {
                gesture.GestureManager.eventDict[target.hashCode] = [];
            }
            //判断事件对象，如果是多点，则数组的长度大于1
            var ec:egret.TouchEvent[] = gesture.GestureManager.eventDict[target.hashCode];
            var currentEvent:egret.TouchEvent;
            var evtIndex:number = -1;
            if(!gesture.GestureManager.hasTouchEvent(e)) {
                currentEvent = gesture.GestureManager.evtPool.clone(e);
                ec.push(currentEvent);
            } else {
                currentEvent = gesture.GestureManager.getTouchEventByID(e.touchPointID,target);
                gesture.GestureManager.evtPool.setProperties(e,currentEvent);
            }
            //通知手势对象
            var hc:gesture.AbstractGesture[] = gesture.GestureManager.hostCollection;
            var ges:gesture.AbstractGesture;
            for (var i = 0; i < hc.length; i++) {
                ges = hc[i];
                if(ges.target==target)
                    ges.onTouch(ec);
            }
            //清理已经结束的事件
            if(currentEvent.type == egret.TouchEvent.TOUCH_END) {
                gesture.GestureManager.removeAllEvent();
            }
            //画圈
            if(gesture.GestureManager.showTouchPoint) {
                gesture.GestureManager.drawTouchPoint();
            }
        }
        /**根据TOUCH ID判断是不是已经存在了这个触碰对象*/
        private static hasTouchEvent(e:egret.TouchEvent):boolean {
            var target:egret.DisplayObject = gesture.GestureManager.currentTouchObject;
            var ec:egret.TouchEvent[] = gesture.GestureManager.eventDict[target.hashCode];
            for (var index = 0; index < ec.length; index++) {
                if (ec[index].touchPointID == e.touchPointID) {
                    return true;
                }
            }
            return false;
        }
        /**根据TOUCH ID得到一个对象*/
        private static getTouchEventByID(touchID:number,target:egret.DisplayObject):egret.TouchEvent {
            var ec:egret.TouchEvent[] = gesture.GestureManager.eventDict[target.hashCode];
            for (var index = 0; index < ec.length; index++) {
                if (ec[index].touchPointID == touchID) {
                    return ec[index];
                }
            }
            return null;
        }
        /**移出事件处理*/
        private static leaveStageHandler(e:egret.TouchEvent):void {
            gesture.GestureManager.removeAllEvent();
        }
        /**remove all*/
        private static removeAllEvent():void {
            var stage:egret.Stage = egret.MainContext.instance.stage;
            for (var key in gesture.GestureManager.eventDict) {
                var ec:egret.TouchEvent[] = gesture.GestureManager.eventDict[key];
                if(ec != null)
                    gesture.GestureManager.evtPool.reclaimAll(ec);
            }
            stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, gesture.GestureManager.touchedHandler, stage);
            stage.removeEventListener(egret.TouchEvent.TOUCH_END, gesture.GestureManager.touchedHandler, stage);
            stage.removeEventListener(egret.Event.LEAVE_STAGE, gesture.GestureManager.leaveStageHandler, stage);
            gesture.GestureManager.drawTouchPoint();
        }
        /**用圆圈显示点的位置*/
        private static drawTouchPoint():void {
            if(gesture.GestureManager.currentTouchObject==null)
                return;
            var drawLayer:egret.Sprite = gesture.GestureManager.drawLayer;
            var stage:egret.Stage = egret.MainContext.instance.stage;
            if(drawLayer.stage==null)
                stage.addChild(drawLayer);
            var g:egret.Graphics = drawLayer.graphics;
            g.clear();
            g.beginFill(0x000000,0.4);
            var evt:egret.TouchEvent;
            for (var key in gesture.GestureManager.eventDict) {
                if(gesture.GestureManager.currentTouchObject.hashCode != key)
                    continue;
                var ec:egret.TouchEvent[] = gesture.GestureManager.eventDict[key];
                if(ec != null && ec.length>0) {
                    for (var index = 0; index < ec.length; index++) {
                        evt = ec[index];
                        g.drawCircle(evt.stageX,evt.stageY,10);
                    }
                }
            }
            ec = gesture.GestureManager.simulatePoints;
            for (var index = 0; index < ec.length; index++) {
                evt = ec[index];
                g.drawCircle(evt.stageX,evt.stageY,10);
                //console.log("绘制额外点",evt.stageX,evt.stageY);
            }
            g.endFill();
        }
    }
}