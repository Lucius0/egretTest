/**
 * Created by L on 2015-04-22.
 */
var hitCheck;
(function (hitCheck) {
    var HitCheck = (function () {
        function HitCheck(x, y, w, h) {
            this.d = new utils.Dictionary();
            this.resize(x, y, w, h);
        }
        var __egretProto__ = HitCheck.prototype;
        __egretProto__.resize = function (x, y, w, h) {
            this.rootTN = new hitCheck.TreeNode(x, y, w, h, 2, 0, this);
        };
        __egretProto__.clear = function () {
            this.rootTN.clear();
        };
        __egretProto__.checkHit = function () {
            if (null == this.hitV) {
                this.hitV = new Array();
            }
            else {
                this.hitV.splice(0, this.hitV.length);
            }
            this.rootTN.checkHit();
            return this.hitV;
        };
        __egretProto__.addHit = function (node1, node2) {
            if (0 > this.hitV.indexOf(node1)) {
                this.hitV.push(node1);
            }
            if (0 > this.hitV.indexOf(node2)) {
                this.hitV.push(node2);
            }
        };
        __egretProto__.check = function (x, y, w, h, o, isClearOnly) {
            if (isClearOnly === void 0) { isClearOnly = false; }
            var node = this.d.getByKey(o);
            if (null == node) {
                node = new hitCheck.HitNode(o);
                this.d.remove(o);
                this.d.add(o, node);
            }
            node.x = x;
            node.y = y;
            node.x2 = x + w;
            node.y2 = y + h;
            node.clear(isClearOnly);
            this.rootTN.check(node.x, node.y, node.x2, node.y2, node);
            return node;
        };
        return HitCheck;
    })();
    hitCheck.HitCheck = HitCheck;
    HitCheck.prototype.__class__ = "hitCheck.HitCheck";
})(hitCheck || (hitCheck = {}));
