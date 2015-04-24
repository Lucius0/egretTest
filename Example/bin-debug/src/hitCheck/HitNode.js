/**
 * Created by lucius on 2015/4/24.
 */
var hitCheck;
(function (hitCheck) {
    var HitNode = (function () {
        function HitNode(o) {
            this.o = o;
            this.key = HitNode.num;
            HitNode.num++;
            this.tns = new Array();
            this.hited = new Array();
        }
        var __egretProto__ = HitNode.prototype;
        __egretProto__.addHited = function (zhn) {
            if (0 > this.hited.indexOf(zhn)) {
                this.hited.push(zhn);
            }
        };
        __egretProto__.clear = function (isClearOnly) {
            if (!isClearOnly) {
                for (var i = this.tns.length - 1; i >= 0; i--) {
                    this.tns[i].remove(this);
                }
            }
            this.tns.splice(0, this.tns.length);
            this.hited.splice(0, this.hited.length);
        };
        __egretProto__.check = function () {
            for (var i = this.tns.length - 1; i >= 0; i--) {
                this.tns[i].checkNode(this);
            }
        };
        HitNode.num = 0;
        return HitNode;
    })();
    hitCheck.HitNode = HitNode;
    HitNode.prototype.__class__ = "hitCheck.HitNode";
})(hitCheck || (hitCheck = {}));
