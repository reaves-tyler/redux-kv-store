export default class KVStore {
    actionTypes: object;
    store: any;
    private actions;
    constructor(actionTypes?: object);
    initActions(): Object;
    initState(): Object;
    rootReducer(state: object, action: {
        type: string;
        payload: object | [] | boolean | number | string | undefined;
    }): object & {
        [x: string]: string | number | boolean | object | [] | undefined;
    };
    classSync(context: any): void;
    fcSync(context: any): void;
    sub(context: any, fc?: boolean): void;
    reset(): void;
    set(prop: string, payload: object | [] | boolean | number | string | undefined): any;
    get(prop: string): any;
}
