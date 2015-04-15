/**
 * Created by lucius on 2015/2/3.
 */
class Pieces extends egret.Sprite
{
    private _id:egret.Point;
    private _bmp:egret.Bitmap;
    private _dragale:Boolean;

    public constructor()
    {
        super();
        //this._bmp = new egret.Bitmap();
        //this._bmp = bmp;
        //this._bmp.texture._bitmapX = x;
        //this._bmp.texture._bitmapY = y;
        //this._bmp.texture._bitmapWidth = width;
        //this._bmp.texture._bitmapHeight = height;
        //this.addChild(this._bmp);
    }

    public get id():egret.Point
    {
        return this._id;
    }

    public set id(value:egret.Point)
    {
        this._id = value;
    }

    public get bmp():egret.Bitmap
    {
        return this._bmp;
    }

    public set bmp(value:egret.Bitmap)
    {
        this._bmp = value;
        this.addChild(this._bmp);
    }

    public get dragale():Boolean
    {
        return this._dragale;
    }

    public set dragale(value:Boolean)
    {
        this._dragale = value;
    }

    public getBitmap(_bitmapX: number, _bitmapY, width:number, height:number, name: string):egret.Bitmap {
        var baseTexture = RES.getRes(name);
        baseTexture.drawToTexture()
        var bd = baseTexture.bitmapData;
        var texture = new egret.Texture();
        var scale = egret.MainContext.instance.rendererContext._texture_scale_factor;
        texture._bitmapData = bd;

        texture._bitmapX = baseTexture._bitmapX - baseTexture._offsetX + _bitmapX;
        texture._bitmapY = baseTexture._bitmapY - baseTexture._offsetY + _bitmapY;
        texture._bitmapWidth = width * scale;
        texture._bitmapHeight = height * scale;
        texture._offsetX = 0;
        texture._offsetY = 0;
        texture._textureWidth = width * scale;
        texture._textureHeight = height * scale;
        texture._sourceWidth = width;
        texture._sourceHeight = height;
        var b = new egret.Bitmap;
        b.texture = texture;
        return b;
    }

    public getBitmap2(_bitmapX: number, _bitmapY, width:number, height:number, bmp: egret.Bitmap):egret.Bitmap
    {
        var texture:egret.RenderTexture = new egret.RenderTexture;
        var rec:egret.Rectangle = new egret.Rectangle(_bitmapX, _bitmapY, width, height);
        texture.drawToTexture(bmp, rec);

        var b = new egret.Bitmap;
        b.texture = texture;
        return b;
    }
}