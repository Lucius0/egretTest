var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GuiTest = (function (_super) {
    __extends(GuiTest, _super);
    function GuiTest() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    GuiTest.prototype.onAddToStage = function (event) {
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
    GuiTest.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     */
    GuiTest.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            this.createScene();
        }
    };
    GuiTest.prototype.createScene = function () {
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
        this.createTabWithArrayCollection();
    };
    GuiTest.prototype.createLabel = function () {
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
    GuiTest.prototype.createButton = function () {
        var btn = new egret.gui.Button();
        btn.label = "测试按钮";
        btn.y = 100;
        this.guiLayer.addElement(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandle, this);
    };
    GuiTest.prototype.touchTapHandle = function (e) {
        console.log("touch tap");
    };
    GuiTest.prototype.createToggleButton = function () {
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
    GuiTest.prototype.toggleBtnChange = function (e) {
        for (var i = 0; i < this.toggleBtns.length; i++) {
            var btn = this.toggleBtns[i];
            btn.selected = (btn == e.target);
        }
    };
    GuiTest.prototype.createCheckBox = function () {
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
    GuiTest.prototype.checkBoxChangeHandld = function (e) {
        console.log(e.target.selected);
    };
    GuiTest.prototype.createRadioButton = function () {
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
    GuiTest.prototype.radioButtonChangeHandle = function (e) {
        var radioGroup = e.target;
        console.log(radioGroup.selectedValue);
    };
    GuiTest.prototype.createSlider = function () {
        var hSlider = new egret.gui.HSlider();
        hSlider.width = 200;
        hSlider.y = 500;
        hSlider.minimum = 0;
        hSlider.maximum = 100;
        hSlider.value = 10;
        hSlider.addEventListener(egret.Event.CHANGE, this.slideChangeHandle, this);
        this.guiLayer.addElement(hSlider);
    };
    GuiTest.prototype.slideChangeHandle = function (e) {
        console.log(e.target.value);
    };
    GuiTest.prototype.createProgressBar = function () {
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
    GuiTest.prototype.barLabelFunction = function (value, maximum) {
        return "加载中... " + Math.ceil(value / maximum * 100) + "%";
    };
    GuiTest.prototype.progressBarChange = function (e) {
        this.pBar.value += 1;
    };
    GuiTest.prototype.createAlert = function () {
        var btn = new egret.gui.Button();
        btn.label = "测试弹框";
        btn.y = 700;
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapCreateAlertHandler, this);
        this.guiLayer.addElement(btn);
    };
    GuiTest.prototype.touchTapCreateAlertHandler = function (e) {
        //var alert:egret.gui.Alert = new egret.gui.Alert();
        //alert.contentText = "a";
        //alert.title = "title";
        egret.gui.Alert.show("啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊", "Title", this.confirmHandle, "OK", "CANCEL");
    };
    GuiTest.prototype.confirmHandle = function (e) {
        if (e.detail == egret.gui.Alert.FIRST_BUTTON) {
            console.log("用户点击了OK");
        }
        else {
            console.log("用户点击了CANCEL");
        }
    };
    GuiTest.prototype.createPanel = function () {
        var panel = new uidemo.PanelDemo();
        this.guiLayer.addElement(panel);
    };
    GuiTest.prototype.createDataGroup = function () {
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
    GuiTest.prototype.createList = function () {
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
    GuiTest.prototype.listClickhandler = function (e) {
        console.log(e.item.name + " clicked");
    };
    GuiTest.prototype.createTitleWindow = function () {
        var tw = new uiskins.TitleWindowDemo();
        this.guiLayer.addElement(tw);
    };
    GuiTest.prototype.createViewStack = function () {
        var vs = new uiskins.ViewStackDemo();
        this.guiLayer.addElement(vs);
    };
    GuiTest.prototype.createTabWithViewStack = function () {
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
    GuiTest.prototype.createTabWithArrayCollection = function () {
        var tabBar = new egret.gui.TabBar();
        tabBar.dataProvider = new egret.gui.ArrayCollection(["tab 1", "tab 2", "tab 3"]);
        tabBar.addEventListener(egret.gui.ListEvent.ITEM_CLICK, this.onBarItemClick, this);
        this.guiLayer.addElement(tabBar);
    };
    GuiTest.prototype.onBarItemClick = function (event) {
        console.log(event.itemIndex);
    };
    return GuiTest;
})(egret.DisplayObjectContainer);
GuiTest.prototype.__class__ = "GuiTest";