/**
 * Created by L on 2015-04-22.
 */
var hitCheck;
(function (hitCheck) {
    var TreeNode = (function () {
        function TreeNode(x, y, w, h, deep, depth, zhc, parent) {
            if (parent === void 0) { parent = null; }
            this.key = TreeNode.num;
            this.zhc = zhc;
            TreeNode.num++;
            this.data = [];
            this.parent = parent;
            this.deep = deep;
            this.depth = depth;
            this.x = x;
            this.y = y;
            this.resize(w, h);
        }
        var __egretProto__ = TreeNode.prototype;
        __egretProto__.clear = function () {
            if (0 != this.deep) {
                this.q1.clear();
                this.q2.clear();
                this.q3.clear();
                this.q4.clear();
            }
            else {
                this.data.splice(0, this.data.length);
            }
        };
        __egretProto__.checkHit = function () {
            if (0 != this.deep) {
                this.q1.checkHit();
                this.q2.checkHit();
                this.q3.checkHit();
                this.q4.checkHit();
            }
            else {
                this.checkNode();
            }
        };
        __egretProto__.resize = function (w, h) {
            this.w = w;
            this.h = h;
            this.createChildren(this.deep);
        };
        __egretProto__.createChildren = function (deep) {
            this.deep = deep;
            if (deep == 0) {
                return;
            }
            var hw = this.w >> 1;
            var hh = this.w >> 1;
            this.q1 = new TreeNode(this.x + hw, this.y, hw, hh, deep - 1, this.depth + 1, this.zhc, this);
            this.q2 = new TreeNode(this.x + hw, this.y + hh, hw, hh, deep - 1, this.depth + 1, this.zhc, this);
            this.q3 = new TreeNode(this.x, this.y + hh, hw, hh, deep - 1, this.depth + 1, this.zhc, this);
            this.q4 = new TreeNode(this.x, this.y, hw, hh, deep - 1, this.depth + 1, this.zhc, this);
            this.check1x = this.q4.x + this.q4.w;
            this.check1y = this.q4.y + this.q4.h;
        };
        __egretProto__.check = function (x, y, x2, y2, zn) {
            if (0 != this.deep) {
                if (x > this.check1x) {
                    if (y > this.check1y) {
                        this.q2.check(x, y, x2, y2, zn);
                    }
                    else if (y2 > this.check1y) {
                        this.q1.check(x, y, x2, y2, zn);
                        this.q2.check(x, y, x2, y2, zn);
                    }
                    else {
                        this.q1.check(x, y, x2, y2, zn);
                    }
                }
                else if (x2 <= this.check1x) {
                    if (y > this.check1y) {
                        this.q3.check(x, y, x2, y2, zn);
                    }
                    else if (y2 > this.check1y) {
                        this.q3.check(x, y, x2, y2, zn);
                        this.q4.check(x, y, x2, y2, zn);
                    }
                    else {
                        this.q4.check(x, y, x2, y2, zn);
                    }
                }
                else {
                    this.q1.check(x, y, x2, y2, zn);
                    this.q4.check(x, y, x2, y2, zn);
                    if (y2 > this.check1y) {
                        this.q2.check(x, y, x2, y2, zn);
                        this.q3.check(x, y, x2, y2, zn);
                    }
                }
            }
            else {
                this.data.push(zn);
                zn.tns.push(this);
            }
        };
        __egretProto__.checkNode = function (zhn) {
            if (zhn === void 0) { zhn = null; }
            var node1, node2, j, isHit;
            for (var i = this.data.length - 1; i > 0; i--) {
                for (j = i - 1; j >= 0; j--) {
                    node1 = this.data[i];
                    node2 = this.data[j];
                    isHit = false;
                    if (node1.x < node2.x) {
                        if (node1.x2 > node2.x) {
                            if (node1.y < node2.y) {
                                if (node1.y2 > node2.y) {
                                    isHit = true;
                                }
                            }
                            else if (node2.y2 > node1.y) {
                                isHit = true;
                            }
                        }
                    }
                    else if (node2.x2 > node1.x) {
                        if (node1.y < node2.y) {
                            if (node1.y2 > node2.y) {
                                isHit = true;
                            }
                        }
                        else if (node2.y2 > node1.y) {
                            isHit = true;
                        }
                    }
                    if (isHit) {
                        if (null == zhn) {
                            this.zhc.addHit(node1, node2);
                        }
                    }
                }
            }
        };
        __egretProto__.remove = function (zn) {
            var num = this.data.indexOf(zn);
            if (0 <= num) {
                this.data.splice(num, 1);
            }
        };
        return TreeNode;
    })();
    hitCheck.TreeNode = TreeNode;
    TreeNode.prototype.__class__ = "hitCheck.TreeNode";
})(hitCheck || (hitCheck = {}));
