import { createStore } from "redux";

export default class KVStore {
  /*
    [Module]Store.js

    export enum KVEnum {
        Administrator = 'Administrator'
        Secondary = 'Secondary'
    }

    const kv = {
        [KVEnum.Administrator]: 'Tyler',
        [KVEnum.Secondary]: 'Bill'
    };

    export const AdministrationKV = new KVStore(kv);
    *
    */

  public actionTypes: object;
  public store: any; // TODO change to Store type
  private actions: {};
  constructor(actionTypes: object = {}) {
    this.actionTypes = actionTypes;
    this.actions = this.initActions();
    this.store = createStore(this.rootReducer, this.initState());
  }

  /*
   * Build Redux actions based on actionTypes defined
   */
  initActions() {
    let a = new Object();
    for (let prop in this.actionTypes) {
      a[prop] = (payload) => {
        return { type: prop, payload };
      };
    }
    return a;
  }

  /*
   * Build Redux initial state based on actionTypes defined
   */
  initState() {
    let s = new Object();
    for (let action in this.actionTypes) {
      s[action] = JSON.stringify(this.actionTypes[action]);
    }
    return s;
  }

  /*
   * Core Redux Reducer, set the value of a property, extend this if you want!
   */
  rootReducer(
    state: object,
    action: {
      type: string;
      payload: object | [] | boolean | number | string | undefined;
    }
  ) {
    return Object.assign({}, state, {
      [action.type]: state[action.type] = action.payload,
    });
  }

  /*
   * Redux store subscribe helper function to compare component state and redux state and setState if applicable
   */
  classSync(context: any) {
    // Check if the component is mounted instead of unsubscribing on componentWillUnmount
    if (context.updater.isMounted(context)) {
      // Create new object to prevent reference issues
      let state = Object.assign({}, context.state);

      // Iterate state of subscriber component
      for (let prop in state) {
        if (Object.keys(this.store.getState()).includes(prop)) {
          // Get the Redux state of the subscriber state property
          let statUx = this.get(String(prop));

          // Compare types using Stringify (Functions do not compare here)
          if (JSON.stringify(state[prop]) !== JSON.stringify(statUx)) {
            // If values are not equal between the subscriber state and redux state
            // Set the subscriber state property to the value of the redux state
            state[prop] = statUx;
          } else {
            // If the state values are the same, we don't need to update that property
            delete state[prop];
          }
        } else {
          delete state[prop];
        }
      }

      //  Check to make sure we have properties in our object and `setState` exists
      if (Object.keys(state).length !== 0 && context.setState) {
        context.setState(state);
      }
    }
  }

  // Functional Component / Hooks Sync
  fcSync(context: any) {
    for (let prop in context) {
      // Get the Redux state of the subscriber state property
      let statUx = this.get(String(prop));

      // Compare current value of Functional Component and Redux Store
      if (
        statUx !== undefined &&
        context[prop] &&
        context[prop].length === 2 &&
        JSON.stringify(context[prop][0]) !== JSON.stringify(statUx)
      ) {
        // Execute hook setter function
        context[prop][1](statUx);
      }
    }
  }

  // Shorthand subscriber for subbed component
  sub(context: any, fc: boolean = false) {
    if (!fc) {
      this.store.subscribe(() => this.classSync(context));
    }

    if (fc) {
      this.store.subscribe(() => this.fcSync(context));
    }
  }

  //Reset the store to it's default values
  reset() {
    for (let k in this.actionTypes) {
      this.set(k, this.actionTypes[k]);
    }
  }

  // Simple KV dispatcher
  set(
    prop: string,
    payload: object | [] | boolean | number | string | undefined
  ) {
    return this.store.dispatch(this.actions[prop](JSON.stringify(payload)));
  }

  // Retrieve a property from the store
  get(prop: string) {
    if (this.store.getState()[prop]) {
      return JSON.parse(this.store.getState()[prop]);
    } else {
      return undefined;
    }
  }
} // End KVStore
