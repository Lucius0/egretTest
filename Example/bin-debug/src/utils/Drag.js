/**
 * Created by L on 2015-03-29.
 */
var utils;
(function (utils) {
    var Drag = (function (_super) {
        __extends(Drag, _super);
        function Drag() {
            _super.call(this);
            this.offsetX = 0;
            this.offsetY = 0;
        }
        var __egretProto__ = Drag.prototype;
        /*
         * 开始拖拽
         * @param _dragObject 拖拽对象
         * @param offsetX     X轴偏移
         * @param offsetY     Y轴偏移
         * */
        __egretProto__.start = function (_dragObject, offsetX, offsetY) {
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            this.offsetX = offsetX;
            this.offsetY = offsetY;
            //
            this.dragObject = _dragObject;
            this.dragObject.touchEnabled = true;
            this.dragObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEend, this);
        };
        __egretProto__.onTouchEend = function (e) {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        };
        __egretProto__.onTouchBegin = function (e) {
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        };
        __egretProto__.onTouchMove = function (e) {
            if (this.dragObject) {
                this.dragObject.x = e.stageX - ((this.dragObject.width * this.dragObject.scaleX) / 2) - (this.dragObject.anchorX * (this.dragObject.width * this.dragObject.scaleX)) + this.offsetX;
                this.dragObject.y = e.stageY - ((this.dragObject.height * this.dragObject.scaleY) / 2) + (this.dragObject.anchorY * (this.dragObject.height * this.dragObject.scaleY)) + this.offsetY;
            }
            else {
                this.stop();
            }
        };
        __egretProto__.stop = function () {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEend, this);
            this.dragObject.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        return Drag;
    })(egret.Sprite);
    utils.Drag = Drag;
    Drag.prototype.__class__ = "utils.Drag";
})(utils || (utils = {}));
