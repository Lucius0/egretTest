/**
 * Created by L on 2015-04-26.
 */
class ModuleUtils
{
    //public static destroyForInstance(o:Object):void
    //{
    //    var dotIndex:any = 0;
    //    var i:any = 0;
    //    var x:any = 0;
    //    var url:String = egret.getQualifiedClassName(o);
    //    var count:number = url.split(".").length - 1;
    //    if(count == 4)
    //    {
    //        i = 0;
    //        while(i < url.length)
    //        {
    //            if(url.charAt(i) == ".")
    //            {
    //                x++;
    //            }
    //            if(x == 3)
    //            {
    //                dotIndex = i;
    //                break;
    //            }
    //            i++;
    //        }
    //    }
    //    else
    //    {
    //        dotIndex = url.lastIndexOf(".");
    //    }
    //    url = url.substr(dotIndex + 1);
    //    url = url.split("::").join("/");
    //    if(count == 4)
    //    {
    //        url = url.split(".").join("/");
    //    }
    //    url = ClientConfig.getModule(url);
    //    ModuleUtils.destroy(url);
    //    _eventDispatcher.dispatchEvent(new DataEvent(MODEL_CLOSE,false,false,url));
    //}
    //
    //public static destroy(url:String) : void
    //{
    //    app = _map.remove(url);
    //    if(app)
    //    {
    //        app.destroy();
    //        app = null;
    //    }
    //}
}