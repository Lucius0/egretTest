/**
 * Created by L on 2015-03-24.
 */
module utils
{
    export class Dictionary implements IDictionary
    {
        _keys: any[] = [];
        _values: any[] = [];

        constructor(init?: { key: any; value: any; }[]) {

            for (var x = 0; x < init.length; x++) {
                this[init[x].key] = init[x].value;
                this._keys.push(init[x].key);
                this._values.push(init[x].value);
            }
        }

        add(key: any, value: any) {
            this[key] = value;
            this._keys.push(key);
            this._values.push(value);
        }

        remove(key: any) {
            var index = this._keys.indexOf(key, 0);
            this._keys.splice(index, 1);
            this._values.splice(index, 1);

            delete this[key];
        }

        getByKey(key: any):any {
            return this[key];
        }

        keys(): any[] {
            return this._keys;
        }

        values(): any[] {
            return this._values;
        }

        containsKey(key: any) {
            if (typeof this[key] === "undefined") {
                return false;
            }

            return true;
        }

        toLookup(): IDictionary {
            return this;
        }
    }
}