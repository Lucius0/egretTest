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
        var __egretProto__ = LabelRenderer.prototype;
        __egretProto__.dataChanged = function () {
            this.labelDisplay.text = this.data.label;
        };
        return LabelRenderer;
    })(egret.gui.ItemRenderer);
    uiskins.LabelRenderer = LabelRenderer;
    LabelRenderer.prototype.__class__ = "uiskins.LabelRenderer";
})(uiskins || (uiskins = {}));
