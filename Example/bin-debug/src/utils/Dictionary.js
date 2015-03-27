/**
 * Created by L on 2015-03-24.
 */
var utils;
(function (utils) {
    var Dictionary = (function () {
        function Dictionary(init) {
            this._keys = [];
            this._values = [];
            if (init != null) {
                for (var x = 0; x < init.length; x++) {
                    this[init[x].key] = init[x].value;
                    this._keys.push(init[x].key);
                    this._values.push(init[x].value);
                }
            }
        }
        var __egretProto__ = Dictionary.prototype;
        __egretProto__.add = function (key, value) {
            this[key] = value;
            this._keys.push(key);
            this._values.push(value);
        };
        __egretProto__.remove = function (key) {
            var index = this._keys.indexOf(key, 0);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            delete this[key];
        };
        __egretProto__.getByKey = function (key) {
            return this[key];
        };
        __egretProto__.keys = function () {
            return this._keys;
        };
        __egretProto__.values = function () {
            return this._values;
        };
        __egretProto__.containsKey = function (key) {
            if (typeof this[key] === "undefined") {
                return false;
            }
            return true;
        };
        __egretProto__.toLookup = function () {
            return this;
        };
        return Dictionary;
    })();
    utils.Dictionary = Dictionary;
    Dictionary.prototype.__class__ = "utils.Dictionary";
})(utils || (utils = {}));
