import React, { useState } from 'react';
import { AppKV, KVEnum } from '../AppStore';

export const IncreaseCount: React.FC = () => {
    const [count, setCount] = useState<number>(AppKV.get(KVEnum.Count));

    // The store setter need to be subscribed to the count so it can add 1 properly
    AppKV.sub(
        {
            [KVEnum.Count]: [count, setCount],
        },
        true
    );

    return <button onClick={() => AppKV.set(KVEnum.Count, count + 1)}>CHANGE COUNT</button>;
};
