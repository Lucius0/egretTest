var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        client.setRender(320, 480);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.onAddToStage = function (event) {
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load("resource/theme.thm");
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.start, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    __egretProto__.start = function (event) {
        var _this = this;
        egret.Profiler.getInstance().run();
        this.hackEgret();
        test.d$.checkready();
        test.d$.ready(function () {
            _this.onResize();
            test.d$.resize(function () {
                _this.onResize();
            });
        });
        //var a = new egret.Sprite();
        //a.width = a.height = 100;
        //a.graphics.beginFill(0xffffff);
        //a.graphics.drawRect(0,0,100,100);
        //a.graphics.endFill();
        //a.anchorX = a.anchorY = 0.5;
        //test.canvasele.GamePosition.instance.lockPosition(a,0.5,0.5)
        //a.touchEnabled = true;
        //this.addChild(a);
        //a.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        //a.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onTouchEnd,this);
        //a.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        var guiLayer = new egret.gui.UIStage();
        this.addChild(guiLayer);
        var bmpAsset = new egret.gui.UIAsset("bgImage");
        guiLayer.addElement(bmpAsset);
    };
    __egretProto__.onTouchBegin = function (e) {
        //console.log('onTouchBegin');
        egret.Tween.get(e.target).to({ scaleX: 0.8, scaleY: 0.8 }, 200);
    };
    __egretProto__.onTouchEnd = function (e) {
        //console.log('onTouchEnd');
        egret.Tween.get(e.target).to({ scaleX: 1, scaleY: 1 }, 200);
    };
    __egretProto__.onResize = function () {
        var container = new egret.EqualToFrame();
        this._contentstrategy = new test.AutoOrient();
        var policy = new egret.ResolutionPolicy(container, this._contentstrategy);
        egret.StageDelegate.getInstance()._setResolutionPolicy(policy);
        stage().dispatchEventWith(egret.Event.RESIZE);
    };
    __egretProto__.hackEgret = function () {
        var _this = this;
        var relocationtouch = function (x, y) {
            var tmp;
            switch (_this._contentstrategy.orient) {
                default:
                case 0: {
                    break;
                }
                case -90: {
                    tmp = x;
                    x = stageWidth() - y;
                    y = tmp;
                    break;
                }
                case 90: {
                    tmp = x;
                    x = y;
                    y = stageHeight() - tmp;
                    break;
                }
            }
            return { x: x, y: y };
        };
        implementMethod(context().touchContext, "onTouchBegan", function (x, y, identifier) {
            var result = relocationtouch(x, y);
            x = result.x;
            y = result.y;
            context().touchContext["__origin__"]["onTouchBegan"](x, y, identifier);
        });
        implementMethod(context().touchContext, "onTouchMove", function (x, y, identifier) {
            var result = relocationtouch(x, y);
            x = result.x;
            y = result.y;
            context().touchContext["__origin__"]["onTouchMove"](x, y, identifier);
        });
        implementMethod(context().touchContext, "onTouchEnd", function (x, y, identifier) {
            var result = relocationtouch(x, y);
            x = result.x;
            y = result.y;
            context().touchContext["__origin__"]["onTouchEnd"](x, y, identifier);
        });
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
var client;
(function (client) {
    var _renderWidth = 480;
    var _renderHeight = 800;
    function setRender(width, height, offset, free) {
        if (offset === void 0) { offset = 1.26; }
        _renderWidth = width;
        _renderHeight = height;
        if (!free) {
            client.orient = width > height ? 1 /* Horizontal */ : 2 /* Vertical */;
            switch (client.orient) {
                case 1 /* Horizontal */: {
                    _renderWidth = width * offset;
                    break;
                }
                case 2 /* Vertical */: {
                    _renderHeight = height * offset;
                    break;
                }
            }
        }
    }
    client.setRender = setRender;
    function renderWidth() {
        return _renderWidth;
    }
    client.renderWidth = renderWidth;
    function renderHeight() {
        return _renderHeight;
    }
    client.renderHeight = renderHeight;
    function renderSize() {
        return renderWidth() / renderHeight();
    }
    client.renderSize = renderSize;
    client.orient = 0 /* Free */;
    (function (Orient) {
        Orient[Orient["Horizontal"] = 1] = "Horizontal";
        Orient[Orient["Vertical"] = 2] = "Vertical";
        Orient[Orient["Free"] = 0] = "Free";
    })(client.Orient || (client.Orient = {}));
    var Orient = client.Orient;
    function width() {
        var result;
        if (document.documentElement.clientWidth) {
            result = document.documentElement.clientWidth;
        }
        else {
            result = window.innerWidth;
        }
        return result;
    }
    client.width = width;
    function height() {
        var result;
        if (document.documentElement.clientHeight) {
            result = document.documentElement.clientHeight;
        }
        else {
            result = window.innerHeight;
        }
        return result;
    }
    client.height = height;
    function size() {
        return client.width() / client.height();
    }
    client.size = size;
    function perfectSize() {
        return _renderHeight / _renderWidth;
    }
    client.perfectSize = perfectSize;
})(client || (client = {}));
var test;
(function (test) {
    //游戏元素定位系统
    var canvasele;
    (function (canvasele) {
        var GamePosition = (function () {
            function GamePosition() {
                this._displayobjpool = new Dict();
                stage().addEventListener(egret.Event.RESIZE, this.onResize, this);
            }
            var __egretProto__ = GamePosition.prototype;
            __egretProto__.onResize = function () {
                this._displayobjpool.forEach(function (value) {
                    value.obj.x = stageWidth(value.posx);
                    value.obj.y = stageHeight(value.posy);
                });
                //console.log(this._displayobjpool);
            };
            __egretProto__.lockPosition = function (target, posx, posy) {
                this._displayobjpool.set(target.hashCode, { obj: target, posx: posx, posy: posy });
                target.x = stageWidth(posx);
                target.y = stageHeight(posy);
            };
            __egretProto__.unlockPosition = function (target) {
                this._displayobjpool.delete(target.hashCode);
            };
            Object.defineProperty(GamePosition, "instance", {
                get: function () {
                    if (GamePosition._instance == null) {
                        GamePosition._instance = new GamePosition();
                    }
                    return GamePosition._instance;
                },
                enumerable: true,
                configurable: true
            });
            return GamePosition;
        })();
        canvasele.GamePosition = GamePosition;
        GamePosition.prototype.__class__ = "test.canvasele.GamePosition";
    })(canvasele = test.canvasele || (test.canvasele = {}));
})(test || (test = {}));
function context() {
    return egret.MainContext.instance;
}
function stage() {
    return egret.MainContext.instance.stage;
}
function stageWidth(multiple) {
    if (multiple === void 0) { multiple = 1; }
    return egret.MainContext.instance.stage.stageWidth * multiple;
}
function stageHeight(multiple) {
    if (multiple === void 0) { multiple = 1; }
    return egret.MainContext.instance.stage.stageHeight * multiple;
}
function egret_canvas_container() {
    var container = document.getElementById(egret.StageDelegate.canvas_div_name);
    return container;
}
function egret_canvas() {
    var canvas = egret_canvas_container().getElementsByTagName("canvas")[0];
    return canvas;
}
function implementMethod(thisArg, method, fn, forceOverride) {
    if (forceOverride === void 0) { forceOverride = true; }
    if (fn && method != '__class__') {
        if (thisArg[method]) {
            if (!forceOverride) {
                console.warn(method + "() already exist in " + thisArg._name + " use forceOverride and try?");
                return;
            }
            if (!thisArg["__origin__"])
                thisArg["__origin__"] = {};
            thisArg["__origin__"][method] = thisArg[method].bind(thisArg);
        }
        thisArg['__proto__'][method] = fn;
    }
}
