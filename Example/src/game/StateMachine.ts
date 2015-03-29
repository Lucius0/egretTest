/**
 * Created by L on 2015-03-29.
 */
class StateMachine {

    private _state:State;

    constructor() {

    }

    public change(state:State):void {
        if (this._state) {
            this._state.onExit();
        }
        this._state = state;
        this._state.onEnter();
    }
}