/**
 * Created by lucius on 2015/4/28.
 */
/**
 * 发现没有，给j原型链动态添加方法，就可以在j使用其他类的方法了。
 */
var TestTs2 = (function (_super) {
    __extends(TestTs2, _super);
    function TestTs2() {
        _super.call(this);
        var j = new XssTommy();
        j.mixExtend(Domry);
        j.mixExtend(Jerry);
        j.mixExtend(SevenYue);
        j.balabala();
        j.sayhi();
        j.hello();
        console.log(j);
    }
    var __egretProto__ = TestTs2.prototype;
    return TestTs2;
})(egret.DisplayObjectContainer);
TestTs2.prototype.__class__ = "TestTs2";
var Jerry = (function () {
    function Jerry() {
    }
    var __egretProto__ = Jerry.prototype;
    __egretProto__.hello = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i - 0] = arguments[_i];
        }
        console.log('hi!i m cute jerry!');
    };
    return Jerry;
})();
Jerry.prototype.__class__ = "Jerry";
var Domry = (function () {
    function Domry() {
    }
    var __egretProto__ = Domry.prototype;
    __egretProto__.balabala = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i - 0] = arguments[_i];
        }
        console.log('balabala!i m cute domry!');
    };
    return Domry;
})();
Domry.prototype.__class__ = "Domry";
var SevenYue = (function () {
    function SevenYue() {
    }
    var __egretProto__ = SevenYue.prototype;
    __egretProto__.sayhi = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i - 0] = arguments[_i];
        }
        console.log('hi!i m cute 7yue!');
    };
    return SevenYue;
})();
SevenYue.prototype.__class__ = "SevenYue";
var XssTommy = (function () {
    function XssTommy() {
    }
    var __egretProto__ = XssTommy.prototype;
    //获取一个类的所有方法
    __egretProto__.mixExtend = function (Class) {
        for (var i in Class['prototype']) {
            var f = Class['prototype'][i];
            if (i != '__class__' && !this[i]) {
                this['__proto__'][i] = f;
            }
        }
    };
    return XssTommy;
})();
XssTommy.prototype.__class__ = "XssTommy";
