var Dict = (function () {
    function Dict() {
        this._map = {};
        this._keys = [];
        //var a:Map = new Map()
    }
    var __egretProto__ = Dict.prototype;
    __egretProto__.set = function (key, value) {
        if (!this._map[key]) {
            this._keys.push(key);
        }
        this._map[key] = value;
    };
    __egretProto__.get = function (key) {
        return this._map[key];
    };
    __egretProto__.delete = function (key) {
        var index = this._keys.indexOf(key, 0);
        if (index >= 0) {
            this._keys.splice(index, 1);
        }
        if (this.has(key))
            delete this._map[key];
    };
    __egretProto__.has = function (key) {
        return this._map[key] ? true : false;
    };
    __egretProto__.clear = function () {
        this._map = {};
        this._keys = [];
    };
    /** @/deprecated */
    __egretProto__.forEach = function (callbackfn, thisArg) {
        for (var i = 0; i < this._keys.length; i++) {
            var key = this._keys[i];
            var value = this._map[this._keys[i]];
            callbackfn.apply(thisArg, [value, key]);
        }
    };
    Object.defineProperty(__egretProto__, "values", {
        get: function () {
            var values = [];
            for (var i = 0; i < this._keys.length; i++) {
                var value = this._map[this._keys[i]];
                values.push(value);
            }
            return values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "size", {
        /*public get keys(){
            return this._keys;
        }*/
        get: function () {
            return this._keys.length;
        },
        enumerable: true,
        configurable: true
    });
    return Dict;
})();
Dict.prototype.__class__ = "Dict";
