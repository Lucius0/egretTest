class Dict{
    private _map:any;
    private _keys:string[];

    public constructor() {
        this._map = {};
        this._keys=[];
        //var a:Map = new Map()
    }

    public set(key:any,value){
        if(!this._map[key]){
            this._keys.push(key);
        }
        this._map[key] = value;
    }

    public get(key):any{
        return this._map[key]
    }

    public delete(key){
        var index = this._keys.indexOf(key, 0);
        if(index>=0){
            this._keys.splice(index, 1);
        }
        if(this.has(key))delete this._map[key];
    }

    public has(key):boolean{
        return this._map[key]?true:false;
    }

    public clear(){
        this._map = {};
        this._keys = [];
    }

    /** @/deprecated */
    public forEach(callbackfn: (value, key?:string)=>void, thisArg?: any): void{
        for(var i=0;i<this._keys.length;i++){
            var key = this._keys[i];
            var value = this._map[this._keys[i]];
            callbackfn.apply(thisArg,[value,key]);
        }
    }

    public get values(){
        var values = [];
        for(var i=0;i<this._keys.length;i++){
            var value = this._map[this._keys[i]];
            values.push(value);
        }
        return values;
    }

    /*public get keys(){
        return this._keys;
    }*/

    public get size():number{
        return this._keys.length;
    }
}

interface IDict{
    set(key:any,value);
    get(key);
    delete(key);
}
