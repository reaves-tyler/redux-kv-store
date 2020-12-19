import KVStore from "..";

export enum KVEnum {
    Count = 'Count',
}

const kv = {
    [KVEnum.Count]: 0,
};

export const AppKV = new KVStore(kv);