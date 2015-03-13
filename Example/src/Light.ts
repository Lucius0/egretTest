/**
 * Created by lucius on 2015/3/13.
 */
class Light extends egret.Sprite
{
    private _cacheX:number;
    private _cacheY:number;
    private _mouseX:number;
    private _mouseY:number;
    private _isDown:boolean;
    private _scene:egret.Sprite;

    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event)
    {
        this._scene = new egret.Sprite();
        this.addChild(this._scene);

        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.upHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
    }

    private downHandler(e:egret.TouchEvent):void
    {
        this._cacheX = e.stageX;
        this._cacheY = e.stageY;
        this._mouseX = e.stageX;
        this._mouseY = e.stageY;
        this._isDown = true;
    }

    private upHandler(e:egret.TouchEvent):void
    {
        this._isDown = false;
    }

    private moveHandler(e:egret.TouchEvent):void
    {
        this._mouseX = e.stageX;
        this._mouseY = e.stageY;
    }

    private enterFrame(e:Event):void
    {
        for(var i = 0; i < Line.sets.length; i++)
        {
            Line.sets[i].update();
        }
        this.update();
    }

    private update():void
    {
        if(!this._isDown) return;

        var line:Line = new Line(this._cacheX, this._cacheY, this._mouseX, this._mouseY);
        this._scene.addChild(line);
        this._cacheX = this._mouseX;
        this._cacheY = this._mouseY;
    }
}