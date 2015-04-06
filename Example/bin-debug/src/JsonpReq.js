/**
 * Created by L on 2015-04-06.
 */
var JsonpReq = (function () {
    function JsonpReq() {
    }
    var __egretProto__ = JsonpReq.prototype;
    JsonpReq.process = function ($loader) {
        JsonpReq.completeCall["call_" + JsonpReq._regID] = function (data) {
            var id = JsonpReq._regID;
            $loader.data = data;
            $loader.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
            delete JsonpReq.completeCall["call_" + id];
        };
        JsonpReq.startLoader($loader, JsonpReq._regID++);
    };
    JsonpReq.startLoader = function (loader, id) {
        var script = document.createElement('script');
        script.src = loader._request.url + "JsonpReq.completeCall.call_" + id + "";
        document.body.appendChild(script);
    };
    JsonpReq._regID = 0;
    JsonpReq.completeCall = {};
    return JsonpReq;
})();
JsonpReq.prototype.__class__ = "JsonpReq";
