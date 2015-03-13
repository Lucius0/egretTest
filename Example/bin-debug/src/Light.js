var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by lucius on 2015/3/13.
 */
var Light = (function (_super) {
    __extends(Light, _super);
    function Light() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Light.prototype.onAddToStage = function (event) {
        this._scene = new egret.Sprite();
        this.addChild(this._scene);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.downHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.upHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveHandler, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
    };
    Light.prototype.downHandler = function (e) {
        this._cacheX = e.stageX;
        this._cacheY = e.stageY;
        this._mouseX = e.stageX;
        this._mouseY = e.stageY;
        this._isDown = true;
    };
    Light.prototype.upHandler = function (e) {
        this._isDown = false;
    };
    Light.prototype.moveHandler = function (e) {
        this._mouseX = e.stageX;
        this._mouseY = e.stageY;
    };
    Light.prototype.enterFrame = function (e) {
        for (var i = 0; i < Line.sets.length; i++) {
            Line.sets[i].update();
        }
        this.update();
    };
    Light.prototype.update = function () {
        if (!this._isDown)
            return;
        var line = new Line(this._cacheX, this._cacheY, this._mouseX, this._mouseY);
        this._scene.addChild(line);
        this._cacheX = this._mouseX;
        this._cacheY = this._mouseY;
    };
    return Light;
})(egret.Sprite);
Light.prototype.__class__ = "Light";
