var Example = (function (_super) {
    __extends(Example, _super);
    function Example() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Example.prototype;
    __egretProto__.onAddToStage = function (event) {
        //注入自定义的素材解析器
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load("resource/theme.thm");
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    __egretProto__.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("rollMc");
        //RES.loadGroup("preload");
        //RES.loadGroup("particle");
        //RES.loadGroup("btnSource");
        //RES.loadGroup("p2");
    };
    /**
     * preload资源组加载完成
     */
    __egretProto__.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload" || event.groupName == "particle" || event.groupName == "btnSource" || event.groupName == "rollMc" || event.groupName == "p2") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.createScene();
        }
        //if(event.groupName == "rollMc") {
        //    //alert("ok");
        //}
    };
    __egretProto__.createScene = function () {
        this.guiLayer = new egret.gui.UIStage();
        this.addChild(this.guiLayer);
        //this.createLabel();
        //
        //this.createButton();
        //
        //this.createToggleButton();
        //
        //this.createCheckBox();
        //
        //this.createRadioButton();
        //
        //this.createSlider();
        //
        //this.createProgressBar();
        //
        //this.createAlert();
        //
        //this.createPanel();
        //
        //this.createDataGroup();
        //
        //this.createList();
        //
        //this.createTitleWindow();
        //
        //this.createViewStack();
        //
        //this.createTabWithViewStack();
        //
        //this.createTabWithArrayCollection();
        //
        //this.createRollMc();
        //
        this.createScrollBar();
        //
        //this.createLightLine();
        //
        //this.createLocalStorage();
        //
        //this.createMask();
        //
        //this.createParticle();
        //
        //this.createButtonByCustomerSkin();
        //
        //this.createMc();
        //
        //this.createRectWithBorder();
        //
        //this.createDictionary();
        //
        //this.callExternalFunction();
        //
        //this.createProtobuf();
        //
        //this.createTicker();
        //
        //this.createP2();
        //
        //this.testDragUtil();
        //
        //this.testMd5();
        //
        //this.testSocketIO();
        //this.testJsonp(); // 还没完成测试 教程：http://bbs.egret-labs.org/forum.php?mod=viewthread&tid=2460&extra=&page=2
        //this.testGesture();
        //this.drawSector(100, 100, 50, 0, 270);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    __egretProto__.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    __egretProto__.createLabel = function () {
        var label = new egret.gui.Label();
        label.text = "测试文本";
        label.fontFamily = "Tahoma";
        label.size = 35;
        label.textColor = 0xFFFFFF;
        label.bold = true;
        label.italic = true;
        label.textAlign = "center";
        this.guiLayer.addElement(label);
    };
    __egretProto__.createButton = function () {
        var btn = new egret.gui.Button();
        btn.label = "测试按钮";
        btn.y = 100;
        this.guiLayer.addElement(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandle, this);
    };
    __egretProto__.touchTapHandle = function (e) {
        console.log("touch tap");
    };
    __egretProto__.createToggleButton = function () {
        this.toggleBtns = [];
        for (var i = 0; i < 4; i++) {
            var btn = new egret.gui.ToggleButton();
            btn.label = i + 1 + "";
            btn.y = 200;
            btn.width = 80;
            btn.x = 20 + i * 80;
            btn.addEventListener(egret.Event.CHANGE, this.toggleBtnChange, this);
            this.toggleBtns.push(btn);
            this.guiLayer.addElement(btn);
        }
    };
    __egretProto__.toggleBtnChange = function (e) {
        for (var i = 0; i < this.toggleBtns.length; i++) {
            var btn = this.toggleBtns[i];
            btn.selected = (btn == e.target);
        }
    };
    __egretProto__.createCheckBox = function () {
        var cbx1 = new egret.gui.CheckBox();
        cbx1.addEventListener(egret.Event.CHANGE, this.checkBoxChangeHandld, this);
        cbx1.label = "checkBox1";
        cbx1.y = 300;
        this.guiLayer.addElement(cbx1);
        var cbx2 = new egret.gui.CheckBox();
        cbx2.addEventListener(egret.Event.CHANGE, this.checkBoxChangeHandld, this);
        cbx2.label = "checkBox2";
        cbx2.y = 300;
        cbx2.x = cbx1.width + 120;
        this.guiLayer.addElement(cbx2);
    };
    __egretProto__.checkBoxChangeHandld = function (e) {
        console.log(e.target.selected);
    };
    __egretProto__.createRadioButton = function () {
        var radioGroup = new egret.gui.RadioButtonGroup();
        radioGroup.addEventListener(egret.Event.CHANGE, this.radioButtonChangeHandle, this);
        var rdb1 = new egret.gui.RadioButton();
        rdb1.label = "radion1";
        rdb1.value = 1;
        rdb1.y = 400;
        rdb1.group = radioGroup;
        this.guiLayer.addElement(rdb1);
        var rdb2 = new egret.gui.RadioButton();
        rdb2.label = "radion2";
        rdb2.value = 2;
        rdb2.y = 400;
        rdb2.x = rdb1.width + 120;
        rdb2.selected = true;
        rdb2.group = radioGroup;
        this.guiLayer.addElement(rdb2);
    };
    __egretProto__.radioButtonChangeHandle = function (e) {
        var radioGroup = e.target;
        console.log(radioGroup.selectedValue);
    };
    __egretProto__.createSlider = function () {
        var hSlider = new egret.gui.HSlider();
        hSlider.width = 200;
        hSlider.y = 500;
        hSlider.minimum = 0;
        hSlider.maximum = 100;
        hSlider.value = 10;
        hSlider.addEventListener(egret.Event.CHANGE, this.slideChangeHandle, this);
        this.guiLayer.addElement(hSlider);
    };
    __egretProto__.slideChangeHandle = function (e) {
        console.log(e.target.value);
    };
    __egretProto__.createProgressBar = function () {
        this.pBar = new egret.gui.ProgressBar();
        //this.pBar.hostComponentKey = "HProgressBar";
        this.pBar.y = 600;
        this.pBar.width = 300;
        this.pBar.height = 40;
        this.pBar.minimum = 0;
        this.pBar.maximum = 100;
        this.pBar.value = 0;
        this.pBar.labelFunction = this.barLabelFunction;
        this.guiLayer.addElement(this.pBar);
        var timer = new egret.Timer(100, 100);
        timer.addEventListener(egret.TimerEvent.TIMER, this.progressBarChange, this);
        timer.start();
    };
    __egretProto__.barLabelFunction = function (value, maximum) {
        return "加载中... " + Math.ceil(value / maximum * 100) + "%";
    };
    __egretProto__.progressBarChange = function (e) {
        this.pBar.value += 1;
    };
    __egretProto__.createAlert = function () {
        var btn = new egret.gui.Button();
        btn.label = "测试弹框";
        btn.y = 700;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapCreateAlertHandler, this);
        this.guiLayer.addElement(btn);
    };
    __egretProto__.touchTapCreateAlertHandler = function (e) {
        //var alert:egret.gui.Alert = new egret.gui.Alert();
        //alert.contentText = "a";
        //alert.title = "title";
        egret.gui.Alert.show("啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊", "Title", this.confirmHandle, "OK", "CANCEL");
    };
    __egretProto__.confirmHandle = function (e) {
        if (e.detail == egret.gui.Alert.FIRST_BUTTON) {
            console.log("用户点击了OK");
        }
        else {
            console.log("用户点击了CANCEL");
        }
    };
    __egretProto__.createPanel = function () {
        var panel = new uidemo.PanelDemo();
        this.guiLayer.addElement(panel);
    };
    __egretProto__.createDataGroup = function () {
        var sourceArr = [];
        for (var i = 1; i < 5; i++) {
            sourceArr.push({ label: "item" + i });
        }
        var myCollection = new egret.gui.ArrayCollection(sourceArr);
        var dataGroup = new egret.gui.DataGroup();
        dataGroup.itemRenderer = new egret.gui.ClassFactory(uiskins.LabelRenderer);
        dataGroup.dataProvider = myCollection;
        dataGroup.percentHeight = 100;
        dataGroup.percentWidth = 100;
        this.guiLayer.addElement(dataGroup);
    };
    __egretProto__.createList = function () {
        var sourceArr = [];
        for (var i = 1; i < 50; i++) {
            sourceArr.push({ name: "item" + i });
        }
        var myCollection = new egret.gui.ArrayCollection(sourceArr);
        var dataList = new egret.gui.List();
        dataList.itemRendererSkinName = "skins.simple.ToggleRendererSkin";
        dataList.itemRenderer = new egret.gui.ClassFactory(uiskins.ToggleRenderer);
        dataList.dataProvider = myCollection;
        dataList.percentHeight = 100;
        dataList.percentWidth = 100;
        //dataList.labelField = "name";
        dataList.selectedIndex = 0;
        dataList.addEventListener(egret.gui.ListEvent.ITEM_CLICK, this.listClickhandler, this);
        this.guiLayer.addElement(dataList);
    };
    __egretProto__.listClickhandler = function (e) {
        console.log(e.item.name + " clicked");
    };
    __egretProto__.createTitleWindow = function () {
        var tw = new uiskins.TitleWindowDemo();
        this.guiLayer.addElement(tw);
    };
    __egretProto__.createViewStack = function () {
        var vs = new uiskins.ViewStackDemo();
        this.guiLayer.addElement(vs);
    };
    __egretProto__.createTabWithViewStack = function () {
        var viewStack = new egret.gui.ViewStack();
        for (var i = 0; i < 3; i++) {
            var group = new egret.gui.Group();
            group.name = "Group_" + i;
            var btn = new egret.gui.Button();
            btn.label = "Button_" + i;
            group.addElement(btn);
            viewStack.addElement(group);
        }
        viewStack.selectedIndex = 0;
        var tabBar = new egret.gui.TabBar();
        tabBar.dataProvider = viewStack;
        this.guiLayer.addElement(viewStack);
        this.guiLayer.addElement(tabBar);
    };
    __egretProto__.createTabWithArrayCollection = function () {
        var tabBar = new egret.gui.TabBar();
        tabBar.dataProvider = new egret.gui.ArrayCollection(["tab 1", "tab 2", "tab 3"]);
        tabBar.addEventListener(egret.gui.ListEvent.ITEM_CLICK, this.onBarItemClick, this);
        this.guiLayer.addElement(tabBar);
    };
    __egretProto__.onBarItemClick = function (event) {
        console.log(event.itemIndex);
    };
    __egretProto__.createRollMc = function () {
        var data = RES.getRes("rollMc_json");
        var texture = RES.getRes("rollMc_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData());
        this.mc.gotoAndStop(1);
        this.addChild(this.mc);
        this.mc.touchEnabled = true;
        this.preHeight = this.stage.stageHeight;
        this.curFrame = 1;
        this.mc.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.mc.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    __egretProto__.onTouchBegin = function (e) {
        this.touchBeginY = e.stageY;
    };
    __egretProto__.onTouchEnd = function (e) {
        e.stopPropagation();
        this.touchEndY = e.stageY;
        if (this.touchEndY - this.touchBeginY < 0) {
            this.curFrame--;
            if (this.curFrame <= 0) {
                this.curFrame = this.mc.totalFrames;
            }
            this.preHeight = -this.stage.stageHeight;
        }
        else {
            this.curFrame++;
            if (this.curFrame > this.mc.totalFrames) {
                this.curFrame = 1;
            }
            this.preHeight = this.stage.stageHeight;
        }
        egret.Tween.removeTweens(this);
        var tw = egret.Tween.get(this.mc);
        this.mc.touchEnabled = false;
        tw.to({ y: this.preHeight }, 1000);
        tw.call(this.onCall, this);
    };
    __egretProto__.onCall = function () {
        this.mc.y = -this.preHeight;
        this.mc.gotoAndStop(this.curFrame);
        var tw = egret.Tween.get(this.mc);
        tw.to({ y: 0 }, 1000);
        this.mc.touchEnabled = true;
    };
    __egretProto__.createLightLine = function () {
        var light = new Light();
        this.addChild(light);
    };
    __egretProto__.createLocalStorage = function () {
        var btn = new egret.gui.Button();
        btn.label = "touch me";
        btn.touchEnabled = true;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickLocalStorage, this);
        this.guiLayer.addElement(btn);
    };
    __egretProto__.clickLocalStorage = function () {
        var value;
        if (egret.localStorage.getItem("pro")) {
            value = egret.localStorage.getItem("pro");
        }
        else {
            value = "1";
        }
        console.log(value);
        var v2 = (parseInt(value) + 1).toString();
        egret.localStorage.setItem("pro", v2);
    };
    __egretProto__.createMask = function () {
        var bg = this.createBitmapByName("bgImage");
        bg.width = 480;
        bg.height = 800;
        bg.x = (this.stage.stageWidth - bg.width) / 2;
        //egret.MainContext.instance.stage.addChild(bg);
        this.addChild(bg);
        // 不规则遮罩，使用 RenderTexture + BlendMode 实现，这个调用方式在未来会进一步简化
        // 实现原理： 创建一个 Container，在其中先添加一个图片，然后再添加一个蒙版，并将蒙版的混合模式设置为擦除，然后将这个 Container 通过 RenderTexture 绘制为一个纹理
        var mask = this.createBitmapByName("hero");
        mask.width = 100;
        mask.height = 100;
        var maskW = mask.width;
        var maskH = mask.height;
        mask.x = (this.stage.stageWidth - mask.width) / 2;
        mask.y = (this.stage.stageHeight - mask.height) / 2;
        mask.blendMode = egret.BlendMode.ERASE_REVERSE;
        this.addChild(mask);
        var texture = new egret.RenderTexture();
        //为保证擦除结果正确，传入clipRect参数，规定最终RenderTexture大小只有mask区域大小
        texture.drawToTexture(this, new egret.Rectangle(mask.x, mask.y, maskW, maskH));
        var bitmap = new egret.Bitmap(texture);
        bitmap.x = 200;
        egret.MainContext.instance.stage.addChild(bitmap);
        // 矩形遮罩，使用 DisplayObject.mask 属性
        //var hero2 = this.createBitmapByName("hero");
        //hero2.mask = new egret.Rectangle(mask.x, mask.y, maskW, maskH);
        //egret.MainContext.instance.stage.addChild(hero2);
    };
    __egretProto__.createParticle = function () {
        var p = new ParticleDemo();
        this.addChild(p);
    };
    __egretProto__.createButtonByCustomerSkin = function () {
        var btn = new egret.gui.Button();
        btn.skinName = "skins.simple.TestButtonSkin";
        this.guiLayer.addElement(btn);
    };
    __egretProto__.createMc = function () {
        var data = RES.getRes("rollMc_json");
        var texture = RES.getRes("rollMc_png");
        var mcDataFactory = new egret.MovieClipDataFactory(data, texture);
        this.mc = new egret.MovieClip(mcDataFactory.generateMovieClipData());
        this.mc.gotoAndPlay(1);
        this.mc.addEventListener(egret.Event.COMPLETE, this.playOver, this);
        this.addChild(this.mc);
    };
    __egretProto__.playOver = function (e) {
        this.mc.removeEventListener(egret.Event.COMPLETE, this.playOver, this);
        if (e.target) {
            e.target.parent.removeChild(e.target);
        }
    };
    __egretProto__.createRectWithBorder = function () {
        var sp = new egret.Sprite();
        sp.graphics.lineStyle(2, 0xFFFFFF, 1); // 边框有条线
        sp.graphics.beginFill(0x3476CD);
        sp.graphics.drawRect(0, 0, 100, 100);
        sp.graphics.endFill();
        this.stage.addChild(sp);
    };
    __egretProto__.createDictionary = function () {
        var s = "字符串";
        var o = { name: "对象" };
        var a = ["数组"];
        var dic = new utils.Dictionary(); //new Dictionary([{ key: "one", value: "1" }, { key: "two", value: { hitted: true } }]);
        dic.add(s, s);
        dic.add(o, o);
        dic.add(a, a);
        alert(dic.getByKey(s));
    };
    __egretProto__.callExternalFunction = function () {
        // 在core.d.ts 添加一个方法
        // declare function greed(msg:string): void;
        // 在index.html 同时也添加一个方法
        // function greed(msg) { alert(msg); }
        //greed("hello");
    };
    __egretProto__.createProtobuf = function () {
        var message = dcodeIO.ProtoBuf.loadProto(RES.getRes("simple_proto"));
        var user_login_class = message.build("user_login_c2s");
        var user_login = new user_login_class({
            "accid": 888,
            "tstamp": 999,
            "ticket": "yongsong"
        });
        var bytes = user_login.toArrayBuffer();
        console.log("序列化数据：", bytes);
        var new_user_login = user_login_class.decode(bytes);
        console.log("反序列化数据：", new_user_login);
    };
    __egretProto__.createTicker = function () {
        var label = new egret.TextField();
        this.addChild(label);
        label.x = 0;
        label.y = 150;
        label.text = "setTimeout实现，3秒后文字会改变";
        egret.setTimeout(function () {
            label.text = "setTimeOut";
        }, this, 3000);
        var label2 = new egret.TextField();
        this.addChild(label2);
        label2.x = 0;
        label2.y = 300;
        label2.text = "Ticker实现，3秒后文字会改变";
        var time = 0;
        var func = function (dt) {
            time += dt;
            if (time >= 3000) {
                egret.Ticker.getInstance().unregister(this, this);
                label2.text = "Ticker";
            }
        };
        egret.Ticker.getInstance().register(func, func);
    };
    __egretProto__.createP2 = function () {
        var pd = new PhysicsDemo();
        this.addChild(pd);
    };
    __egretProto__.testDragUtil = function () {
        var drag = new utils.Drag();
        var sp = new egret.Sprite();
        sp.graphics.lineStyle(2, 0xFFFFFF, 1); // 边框有条线
        sp.graphics.beginFill(0x3476CD);
        sp.graphics.drawRect(0, 0, 100, 100);
        sp.graphics.endFill();
        this.stage.addChild(sp);
        drag.start(sp);
    };
    __egretProto__.testMd5 = function () {
        //var text1:egret.TextField = new egret.TextField();
        //this.addChild(text1);
        //text1.text = "原始字符: 23233dfa";
        //text1.x = 50;
        //text1.y = 300;
        //text1.size = 30;
        //
        //var str:string = "23233dfa";
        //var md5Str:string = new md5().hex_md5(str);
        //
        //var text2:egret.TextField = new egret.TextField();
        //this.addChild(text2);
        //text2.text = "md5后字符: " + md5Str;
        //text2.x = 50;
        //text2.y = 350;
        //text2.size = 30;
        //text2.width = 300;
    };
    __egretProto__.testSocketIO = function () {
        var sky = this.createBitmapByName("bgImage");
        this.addChild(sky);
        var stageH = this.stage.stageHeight;
        var stageW = this.stage.stageWidth;
        sky.width = stageW;
        sky.height = stageH;
        this.txt = new egret.TextField();
        this.txt.text = "点击屏幕发送消息";
        this.addChild(this.txt);
        var self = this;
        this.socket = io.connect("http://localhost:3101/");
        this.socket.on("news", function (data) {
            self.trace("receive message: " + data);
        });
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            self.sendMessage("message content");
        }, this);
    };
    __egretProto__.sendMessage = function (msg) {
        this.trace("send message: " + msg);
        this.socket.emit("message", msg);
    };
    __egretProto__.trace = function (msg) {
        console.log(msg);
        this.txt.text += "\n" + msg;
    };
    __egretProto__.testJsonp = function () {
        var url = "http://localhost:3000/launcher/index.html";
        var para = "callback";
        var loader = new egret.URLLoader();
        var req = new egret.URLRequest(url + "?" + para + "=onGetComplete");
        loader._request = req;
        JsonpReq.process(loader);
        loader.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
    };
    __egretProto__.onGetComplete = function (e) {
        var loader = e.target;
        var data = loader.data;
        console.log("---------------------------------------\n" + data.toString());
    };
    __egretProto__.testGesture = function () {
        if (document.location.toString().indexOf("type=2") == -1) {
            document.title = "普通手势测试";
            var test1 = new GestureTest();
            this.addChild(test1);
        }
        else {
            document.title = "变换测试";
            var test2 = new TransformTest();
            this.addChild(test2);
        }
    };
    __egretProto__.drawSector = function (x, y, r, startFrom, angle, color) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (r === void 0) { r = 100; }
        if (startFrom === void 0) { startFrom = 0; }
        if (angle === void 0) { angle = 360; }
        if (color === void 0) { color = 0xff0000; }
        var sp = new egret.Sprite();
        sp.graphics.beginFill(color);
        //this.graphics.lineStyle(0, 0xff0000);
        sp.graphics.moveTo(x, y);
        angle = (Math.abs(angle) > 360) ? 360 : angle;
        var n = Math.ceil(Math.abs(angle) / 45);
        var angleA = angle / n;
        angleA = angleA * Math.PI / 180;
        startFrom = startFrom * Math.PI / 180;
        sp.graphics.lineTo(x + r * Math.cos(startFrom), y + r * Math.sin(startFrom));
        for (var i = 1; i <= n; i++) {
            startFrom += angleA;
            var angleMid = startFrom - angleA / 2;
            var bx = x + r / Math.cos(angleA / 2) * Math.cos(angleMid);
            var by = y + r / Math.cos(angleA / 2) * Math.sin(angleMid);
            var cx = x + r * Math.cos(startFrom);
            var cy = y + r * Math.sin(startFrom);
            sp.graphics.curveTo(bx, by, cx, cy);
        }
        if (angle != 360) {
            sp.graphics.lineTo(x, y);
        }
        sp.graphics.endFill(); // if you want a sector without filling color , please remove this line.
        this.addChild(sp);
    };
    __egretProto__.createScrollBar = function () {
        var controller = new egret.gui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        controller.x = 40;
        controller.y = 40;
        controller.width = 400;
        controller.height = 300;
        controller.autoHideScrollBars = false; // 是否自动隐藏滚动条。
        controller.verticalScrollPolicy = egret.gui.ScrollPolicy.OFF; //关闭垂直滚动策略
        var group = new egret.gui.Group();
        this.guiLayer.addElement(group);
        //创建一个大图添加到容器上
        var bmpAsset = new egret.gui.UIAsset("rollMc_png");
        group.addElement(bmpAsset);
        //设置viewport
        controller.viewport = group;
        controller.validateNow();
        this.guiLayer.addElement(controller);
        var btn = new egret.gui.Button();
        btn.label = "click me!";
        this.guiLayer.addElement(btn);
    };
    return Example;
})(egret.DisplayObjectContainer);
Example.prototype.__class__ = "Example";
