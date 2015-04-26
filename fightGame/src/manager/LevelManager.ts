/**
 * Created by L on 2015-04-26.
 */
class LevelManager extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
    }

    public static root:egret.gui.UIStage;
    public static level1:egret.gui.Group;
    public static level2:egret.gui.Group;
    public static level3:egret.gui.Group;

    public static setup(root:egret.gui.UIStage):void
    {
        this.root = root;

        this.level1 = new egret.gui.Group();
        this.level1.name = "level1";
        this.root.addElement(this.level1);
        this.level2 = new egret.gui.Group();
        this.level2.name = "level2";
        this.root.addElement(this.level2);
        this.level3 = new egret.gui.Group();
        this.level3.name = "level3";
        this.root.addElement(this.level3);
    }

    public static openTouchEvent():void
    {
        this.level1.touchChildren = this.level1.touchEnabled = true;
    }

    public static closeTouchEvent():void
    {
        this.level1.touchChildren = this.level1.touchEnabled = false;
    }
}