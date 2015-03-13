/**
 * Created by lucius on 2015/3/13.
 */
class Line extends egret.Sprite
{
    public static sets:Array<any> = [];

    public sX:number;
    public sY:number;
    public eX:number;
    public eY:number;

    public lineSize:number;

    public constructor(sX:number, sY:number, eX:number, eY:number, lineSize:number = 8)
    {
        super();
        Line.sets.push(this);
        this.sX = sX;
        this.sY = sY;
        this.eX = eX;
        this.eY = eY;
        this.lineSize = lineSize;
        this.draw();
    }

    private draw():void
    {
        this.graphics.clear();
        this.graphics.lineStyle(this.lineSize, 0xFFFFFF);
        this.graphics.moveTo(this.sX, this.sY);
        this.graphics.lineTo(this.eX, this.eY);
    }

    public update():void
    {
        this.draw();
        this.lineSize -= 1;
        if(this.lineSize < 1)
        {
            this.clear();
        }
    }

    private clear():void
    {
        this.graphics.clear();
        for (var i:number = 0; i < Line.sets.length; i++)
        {
            var l:Line = <Line>Line.sets[i];
            if(l == this)
            {
                Line.sets.splice(i, 1);
                this.parent.removeChild(this);
            }
        }
    }
}