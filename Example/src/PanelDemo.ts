/**
 * Created by lucius on 2015/2/3.
 */
module uidemo
{
    export class PanelDemo extends egret.gui.Panel
    {
        private panel:egret.gui.Panel;
        private btn_0:egret.gui.Button;
        private btn_1:egret.gui.Button;
        private btn_2:egret.gui.Button;

        public constructor()
        {
            super();
        }

        public createChildren():void
        {
            super.createChildren();
            this.skinName = "skins.simple.PuzzleSkin";
            //this.panel = new egret.gui.Panel();
            //this.panel.skinName = "skins.simple.PuzzleSkin";
            //this.panel.title = "测试拼图";
            //this.panel.x = this.panel.y = 40;
            //this.panel.width = 400;
            //this.panel.height = 300;
            //this.addElement(this.panel);
            //this.panel.validateNow();

        }

        public childrenCreated():void
        {
            //super.childrenCreated();
            for(var i:number = 0; i < 3; i++)
            {
                this["btn_" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchTapHandler, this);
            }
        }

        private TouchTapHandler(e:egret.TouchEvent):void
        {
            var name:string = e.target.name;
            //console.log(name + "---");
            switch (name)
            {
                case "btn_0":
                    this.btn_0.label = name + "00000";
                    break;
            }
        }
    }
}