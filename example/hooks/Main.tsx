import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AppKV, KVEnum } from '../AppStore';
import { IncreaseCount } from './ChangeCount';

const Main: React.FC = () => {
    const [count, setCount] = useState<number>(AppKV.get(KVEnum.Count));

    AppKV.sub(
        {
            [KVEnum.Count]: [count, setCount],
        },
        true
    );

    return (
        <>
            {count}
            <IncreaseCount />
        </>
    );
};

ReactDOM.render(<Main />, document.getElementById('app'));
