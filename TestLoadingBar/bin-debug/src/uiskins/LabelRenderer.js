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
    var LabelRenderer = (function (_super) {
        __extends(LabelRenderer, _super);
        function LabelRenderer() {
            _super.call(this);
            this.touchChildren = true;
        }
        LabelRenderer.prototype.dataChanged = function () {
            this.labelDisplay.text = this.data.label;
        };
        return LabelRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.LabelRenderer = LabelRenderer;
    LabelRenderer.prototype.__class__ = "uiskins.LabelRenderer";
})(uiskins || (uiskins = {}));
