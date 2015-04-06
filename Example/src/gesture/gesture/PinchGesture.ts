/**
 * Created by shaorui on 15-1-26.
 */
module gesture
{
    /**缩放手势*/
    export class PinchGesture extends gesture.AbstractGesture
    {
        private startLen:number = 0;
        private currentLen:number = 0;

        /**构造方法*/
        public constructor(host:egret.DisplayObject=null) {
            super(host);
            this._useMultiPoints = true;
        }
        /**收到事件*/
        public onTouch(eventCollection:egret.TouchEvent[]):void {
            var ec:egret.TouchEvent[] = eventCollection;
            var evt1:egret.TouchEvent;
            var evt2:egret.TouchEvent;
            if(gesture.GestureManager.simulateMultitouch) {
                evt1 = eventCollection[0];
                evt2 = this.reverseEvent(evt1);
                gesture.GestureManager.simulatePoints = [evt2];
                ec = [evt1,evt2];
            }
            if(ec.length<2)
                return;
            evt1 = ec[0];
            evt2 = ec[1];
            if(evt2.type == egret.TouchEvent.TOUCH_BEGIN){
                this.gestureBegan();
                this.startLen = egret.Point.distance(new egret.Point(evt1.stageX,evt1.stageY),new egret.Point(evt2.stageX,evt2.stageY));
            }
            else if(evt1.type == egret.TouchEvent.TOUCH_MOVE || evt2.type == egret.TouchEvent.TOUCH_MOVE) {
                this.currentLen = egret.Point.distance(new egret.Point(evt1.stageX,evt1.stageY),new egret.Point(evt2.stageX,evt2.stageY));
                this.gestureUpdate();
            }
            else if(evt1.type == egret.TouchEvent.TOUCH_END || evt2.type == egret.TouchEvent.TOUCH_END) {
                gesture.GestureManager.simulatePoints = [];
                this.gestureEnded();
            }
        }
        /**触点更新*/
        public gestureUpdate():void {
            this._stats = 2;
            var evt:gesture.GestureEvent = new gesture.GestureEvent(gesture.GestureEvent.UPDATE);
            evt.value = this.currentLen/this.startLen;
            evt.host = this.target;
            this.dispatchEvent(evt);
        }
        /**获取一个事件的映像副本(for test)*/
        private reverseEvent(evt1:egret.TouchEvent):egret.TouchEvent {
            var evt2:egret.TouchEvent = new egret.TouchEvent(evt1.type);
            var globalX:number = evt1.stageX;
            var globalY:number = evt1.stageY;
            var t:egret.DisplayObject = this.target;
            var op:egret.Point = t.localToGlobal(t.anchorX*t.width,t.anchorY*t.height);
            var dix:number = globalX-op.x;
            var diy:number = globalY-op.y;
            var tp:egret.Point = new egret.Point(op.x-dix,op.y-diy);
            evt2._stageX = tp.x;
            evt2._stageY = tp.y;
            return evt2;
        }
    }
}