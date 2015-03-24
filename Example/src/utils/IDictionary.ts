/**
 * Created by L on 2015-03-24.
 */
interface IDictionary
{
    add(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): any[];
}