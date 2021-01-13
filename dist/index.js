"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
class KVStore {
    constructor(actionTypes = {}) {
        this.actionTypes = actionTypes;
        this.actions = this.initActions();
        this.store = redux_1.createStore(this.rootReducer, this.initState());
    }
    initActions() {
        let a = new Object();
        for (let prop in this.actionTypes) {
            a[prop] = (payload) => {
                return { type: prop, payload };
            };
        }
        return a;
    }
    initState() {
        let s = new Object();
        for (let action in this.actionTypes) {
            s[action] = JSON.stringify(this.actionTypes[action]);
        }
        return s;
    }
    rootReducer(state, action) {
        return Object.assign({}, state, {
            [action.type]: state[action.type] = action.payload,
        });
    }
    classSync(context) {
        if (context.updater.isMounted(context)) {
            let state = Object.assign({}, context.state);
            for (let prop in state) {
                if (Object.keys(this.store.getState()).includes(prop)) {
                    let statUx = this.get(String(prop));
                    if (JSON.stringify(state[prop]) !== JSON.stringify(statUx)) {
                        state[prop] = statUx;
                    }
                    else {
                        delete state[prop];
                    }
                }
                else {
                    delete state[prop];
                }
            }
            if (Object.keys(state).length !== 0 && context.setState) {
                context.setState(state);
            }
        }
    }
    fcSync(context) {
        for (let prop in context) {
            let statUx = this.get(String(prop));
            if (statUx &&
                context[prop] &&
                context[prop].length === 2 &&
                JSON.stringify(context[prop][0]) !== JSON.stringify(statUx)) {
                context[prop][1](statUx);
            }
        }
    }
    sub(context, fc = false) {
        if (!fc) {
            this.store.subscribe(() => this.classSync(context));
        }
        if (fc) {
            this.store.subscribe(() => this.fcSync(context));
        }
    }
    reset() {
        for (let k in this.actionTypes) {
            this.set(k, this.actionTypes[k]);
        }
    }
    set(prop, payload) {
        return this.store.dispatch(this.actions[prop](JSON.stringify(payload)));
    }
    get(prop) {
        if (this.store.getState()[prop]) {
            return JSON.parse(this.store.getState()[prop]);
        }
        else {
            return undefined;
        }
    }
}
exports.default = KVStore;
//# sourceMappingURL=index.js.map