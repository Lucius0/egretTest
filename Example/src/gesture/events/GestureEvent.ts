/**
 * Created by shaorui on 15-1-26.
 */
module gesture
{
    /**手势事件*/
    export class GestureEvent extends egret.Event
    {
        public static BEGAN:string = "began";
        public static UPDATE:string = "update";
        public static ENDED:string = "ended";
        public static FAILED:string = "failed";

        public host:any;
        public value:number;
        public offsetX:number;
        public offsetY:number;

        public rotation:number;
        public scale:number;

        public constructor(type:string) {
            super(type);
        }
    }
}