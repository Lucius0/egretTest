/**
 * Created by lucius on 2015/2/3.
 */
var Pieces = (function (_super) {
    __extends(Pieces, _super);
    function Pieces() {
        _super.call(this);
        //this._bmp = new egret.Bitmap();
        //this._bmp = bmp;
        //this._bmp.texture._bitmapX = x;
        //this._bmp.texture._bitmapY = y;
        //this._bmp.texture._bitmapWidth = width;
        //this._bmp.texture._bitmapHeight = height;
        //this.addChild(this._bmp);
    }
    var __egretProto__ = Pieces.prototype;
    Object.defineProperty(__egretProto__, "id", {
        get: function () {
            return this._id;
        },
        set: function (value) {
            this._id = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "bmp", {
        get: function () {
            return this._bmp;
        },
        set: function (value) {
            this._bmp = value;
            this.addChild(this._bmp);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "dragale", {
        get: function () {
            return this._dragale;
        },
        set: function (value) {
            this._dragale = value;
        },
        enumerable: true,
        configurable: true
    });
    // 升级到1.6之后失效
    __egretProto__.getBitmap = function (_bitmapX, _bitmapY, width, height, name) {
        var baseTexture = RES.getRes(name);
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
    };
    // 鼠标的触发点出错
    __egretProto__.getBitmap2 = function (_bitmapX, _bitmapY, width, height, bmp) {
        var texture = new egret.RenderTexture;
        var rec = new egret.Rectangle(_bitmapX, _bitmapY, width, height);
        texture.drawToTexture(bmp, rec);
        var b = new egret.Bitmap;
        b.texture = texture;
        return b;
    };
    __egretProto__.getBitmap3 = function (_bitmapX, _bitmapY, width, height, texture) {
        var spriteSheet = new egret.SpriteSheet(texture);
        var t = spriteSheet.createTexture(texture.toString(), _bitmapX, _bitmapY, width, height);
        var b = new egret.Bitmap;
        b.texture = t;
        return b;
    };
    return Pieces;
})(egret.Sprite);
Pieces.prototype.__class__ = "Pieces";
