var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by lucius on 2015/2/28.
 */
var uiskins;
(function (uiskins) {
    var ToggleRenderer = (function (_super) {
        __extends(ToggleRenderer, _super);
        function ToggleRenderer() {
            _super.call(this);
            this.touchChildren = true;
        }
        ToggleRenderer.prototype.dataChanged = function () {
            this.labelDisplay.text = this.data.name;
            this.toggleButton.selected = this.data.checked;
            this.toggleButton.addEventListener(egret.Event.CHANGE, this.toggleChangeHandler, this);
            this.toggleButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toggleTouchHandler, this);
        };
        /**取消事件的传递，避免按钮操作影响列表操作*/
        ToggleRenderer.prototype.toggleChangeHandler = function (e) {
            e.stopImmediatePropagation();
        };
        /**将按钮的操作映射到数据上*/
        ToggleRenderer.prototype.toggleTouchHandler = function (evt) {
            this.data.checked = this.toggleButton.selected;
        };
        return ToggleRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.ToggleRenderer = ToggleRenderer;
    ToggleRenderer.prototype.__class__ = "uiskins.ToggleRenderer";
})(uiskins || (uiskins = {}));
