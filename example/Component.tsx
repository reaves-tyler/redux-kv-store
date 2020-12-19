import React from 'react'
import { AppKV, KVEnum } from './AppStore';

interface state {
    [KVEnum.Count]: number
}

export class Component extends React.Component<{}, state> {
    constructor(props) {
        super(props);

        this.state = {
            [KVEnum.Count]: AppKV.get(KVEnum.Count) // Get default value from store on initialization
        };

        AppKV.sub(this);  // Subscribe to the App KV Store, by providing the Component's context to setState
    };

    add = () => {
        AppKV.set(KVEnum.Count, this.state[KVEnum.Count] + 1) // Set the value of Count via the store
    }

    render() {
        return(
        <>
            {this.state[KVEnum.Count]}
            <button onClick={this.add}>Add</button>
        </>
        );
    };
}
