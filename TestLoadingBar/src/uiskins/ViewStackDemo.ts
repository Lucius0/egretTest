/**
 * Created by lucius on 2015/3/1.
 */
module uiskins
{
    export class ViewStackDemo extends egret.gui.Group
    {
        private viewStack1:egret.gui.ViewStack;

        public constructor()
        {
            super();
        }

        public createChildren():void
        {
            super.createChildren();
            this.viewStack1 = new egret.gui.ViewStack();
            var btn1:egret.gui.Button = new egret.gui.Button();
            btn1.label = "btn one";
            this.viewStack1.addElement(btn1);
            var btn2:egret.gui.Button = new egret.gui.Button();
            btn2.label = "btn two";
            this.viewStack1.addElement(btn2);

            this.viewStack1.selectedIndex = 1;

            var timer:egret.Timer = new egret.Timer(500);
            timer.addEventListener(egret.TimerEvent.TIMER, this.changeIndexByTimer, this);
            timer.start();

            this.addElement(this.viewStack1);
        }

        private changeIndexByTimer(e:egret.TimerEvent):void
        {
            this.viewStack1.selectedIndex = this.viewStack1.selectedIndex == 0 ? 1 : 0;
        }
    }
}