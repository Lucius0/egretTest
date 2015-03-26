/**
 * Created by lucius on 2015/3/1.
 */
module uiskins
{
    export class TitleWindowDemo extends egret.gui.Group
    {
        private win:egret.gui.TitleWindow;

        public constructor()
        {
            super();
        }

        public createChildren():void
        {
            super.createChildren();
            this.win = new egret.gui.TitleWindow();
            this.win.skinName = "skins.simple.TitleWindowDemoSkin";
            this.win.showCloseButton = true;
            this.win.title = "Hello Window";
            this.win.width = 400;
            var btn:egret.gui.Button = new egret.gui.Button();
            btn.label = "Touch Me";
            btn.horizontalCenter = btn.verticalCenter = 0;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTouchHandler, this);
            this.win.addElement(btn);
            this.win.addEventListener(egret.gui.CloseEvent.CLOSE, this.closeWindHandler, this);
            egret.gui.PopUpManager.addPopUp(this.win, true, true)
        }

        private btnTouchHandler(e:egret.TouchEvent):void
        {
            egret.gui.PopUpManager.removePopUp(this.win);
        }

        private closeWindHandler(e:egret.gui.CloseEvent):void
        {
            egret.gui.PopUpManager.removePopUp(this.win);
        }
    }
}