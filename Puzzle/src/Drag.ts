/**
 * Created by L on 2015-03-29.
 */
module utils
{
    export class Drag extends egret.Sprite
    {
        private dragObject:egret.DisplayObject;
        private offsetX:number = 0;
        private offsetY:number = 0;
        private stopCallBack:Function;

        public constructor()
        {
            super();
        }

        /*
         * 开始拖拽
         * @param _dragObject 拖拽对象
         * @param offsetX     X轴偏移
         * @param offsetY     Y轴偏移
         * */
        public start(_dragObject:egret.DisplayObject, offsetX:number = 0, offsetY:number = 0, callBack?:Function) {
            this.offsetX = offsetX;
            this.offsetY = offsetY;
            //
            this.dragObject = _dragObject;
            this.stopCallBack = callBack;
            this.dragObject.touchEnabled = true;
            this.dragObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEend, this);
        }

        private onTouchEend(e:egret.TouchEvent) {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        }

        private onTouchBegin(e:egret.TouchEvent) {
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        }

        private onTouchMove(e:egret.TouchEvent) {
            var tempX:number = e.stageX -
                ((this.dragObject.width * this.dragObject.scaleX ) / 2)
                - (this.dragObject.anchorX * (this.dragObject.width * this.dragObject.scaleX)) + this.offsetX;
            var tempY:number = e.stageY -
                ((this.dragObject.height * this.dragObject.scaleY ) / 2) +
                (this.dragObject.anchorY * (this.dragObject.height * this.dragObject.scaleY)) + this.offsetY;
            if (this.dragObject) {
                this.dragObject.x = tempX;
                this.dragObject.y = tempY;
            }
            else {
                this.stop();
            }
        }

        public stop() {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEend, this);
            this.dragObject.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            if(this.stopCallBack)
            {
                this.stopCallBack(this.dragObject);
            }
        }
    }
}