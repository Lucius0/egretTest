var test;
(function (test) {
    var DomElement = (function () {
        function DomElement(ele) {
            this._node = ele;
            this._rotation = 0;
        }
        var __egretProto__ = DomElement.prototype;
        __egretProto__.css = function () {
        };
        __egretProto__.transition = function (animate, transition) {
            if (animate === void 0) { animate = {}; }
            if (transition === void 0) { transition = 1000; }
            this._node.style.transition = transition + "ms";
            this._node.style["-webkit-transition"] = transition + "ms";
            if (animate.rotate == 0 || animate.rotate) {
                var rotate = animate.rotate - this._rotation;
                //console.log(rotate);
                this._node.style.transform = "rotate(" + rotate + "deg)";
                this._node.style["-webkit-transform"] = "rotate(" + rotate + "deg)";
                this._rotation = rotate;
            }
        };
        Object.defineProperty(__egretProto__, "node", {
            get: function () {
                return this._node;
            },
            enumerable: true,
            configurable: true
        });
        return DomElement;
    })();
    test.DomElement = DomElement;
    DomElement.prototype.__class__ = "test.DomElement";
    var Dom = (function () {
        function Dom() {
        }
        var __egretProto__ = Dom.prototype;
        __egretProto__.init = function () {
            //root.anchorX = root.anchorY = 0.5;
            window.onresize = this.resized.bind(this);
        };
        /**
         * ready
         */
        __egretProto__.checkready = function () {
            //console.log(this._readytask,document.readyState);
            if (document.readyState === "complete") {
                this.readyed();
            }
            else {
                // Use the handy event callback
                document.addEventListener("DOMContentLoaded", this.readyed.bind(this), false);
                // A fallback to window.onload, that will always work
                window.addEventListener("load", this.readyed.bind(this), false);
            }
        };
        __egretProto__.readyed = function () {
            document.removeEventListener("DOMContentLoaded", this.readyed, false);
            window.removeEventListener("load", this.readyed, false);
            this.init();
            this._readytask = this.runtask(this._readytask);
        };
        __egretProto__.ready = function (callback, thisArg) {
            var param = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                param[_i - 2] = arguments[_i];
            }
            if (!this._readytask) {
                this._readytask = [];
            }
            this._readytask.push({ callback: callback, thisArg: thisArg, paramArr: param });
            this.checkready();
        };
        /**
         * resized
         */
        __egretProto__.resized = function () {
            this.runtask(this._resizetask);
        };
        __egretProto__.resize = function (callback, thisArg) {
            var param = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                param[_i - 2] = arguments[_i];
            }
            if (!this._resizetask) {
                this._resizetask = [];
            }
            this._resizetask.push({ callback: callback, thisArg: thisArg, paramArr: param });
        };
        __egretProto__.runtask = function (task) {
            if (task) {
                for (var i = 0; i < task.length; i++) {
                    task[i].callback.apply(task[i].thisArg, task[i].paramArr);
                }
            }
            task = [];
            return task;
        };
        __egretProto__.select = function (ele) {
            return new DomElement(ele);
        };
        Object.defineProperty(Dom, "instance", {
            get: function () {
                if (Dom._instance == null) {
                    Dom._instance = new Dom();
                }
                return Dom._instance;
            },
            enumerable: true,
            configurable: true
        });
        return Dom;
    })();
    test.Dom = Dom;
    Dom.prototype.__class__ = "test.Dom";
    test.d$ = Dom.instance;
})(test || (test = {}));
