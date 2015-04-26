/**
 * Created by L on 2015-03-24.
 */
module ds {
    export interface IDictionary {
        add(key:any, value:any): void;
        remove(key:any): void;
        containsKey(key:any): boolean;
        keys(): any[];
        values(): any[];
        getByKey(key:any):any;
    }
}