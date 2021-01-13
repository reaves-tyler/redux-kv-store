"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
var KVEnum;
(function (KVEnum) {
    KVEnum["NAME"] = "Name";
    KVEnum["ADDRESS"] = "Address";
})(KVEnum || (KVEnum = {}));
const defaultValues = {
    [KVEnum.NAME]: "Tyler",
    [KVEnum.ADDRESS]: "123 John Ct.",
};
const kv = new index_1.default(defaultValues);
const kvState = {
    state: {
        [KVEnum.NAME]: "Jack",
    },
};
test("Check Initial Store Values, must be stored as JSON", () => {
    expect(kv.store.getState()[KVEnum.NAME]).toBe(JSON.stringify("Tyler"));
    expect(kv.store.getState()[KVEnum.ADDRESS]).toBe(JSON.stringify("123 John Ct."));
});
test("get() store values", () => {
    expect(kv.get(KVEnum.NAME)).toBe("Tyler");
    expect(kv.get("EMAIL")).toBeUndefined();
});
test("set() and get() store values", () => {
    expect(kv.set(KVEnum.NAME, "Bill")).toStrictEqual({
        payload: JSON.stringify("Bill"),
        type: KVEnum.NAME,
    });
    expect(kv.get(KVEnum.NAME)).toBe("Bill");
    expect(kv.set(KVEnum.ADDRESS, "456 Smith Road")).toStrictEqual({
        payload: JSON.stringify("456 Smith Road"),
        type: KVEnum.ADDRESS,
    });
    expect(kv.get(KVEnum.ADDRESS)).toBe("456 Smith Road");
});
test("reset() to original state values", () => {
    kv.reset();
    expect(kv.get(KVEnum.NAME)).toBe(defaultValues[KVEnum.NAME]);
    expect(kv.get(KVEnum.ADDRESS)).toBe(defaultValues[KVEnum.ADDRESS]);
});
test("rootReducer()", () => {
    expect(kv.rootReducer(kv.store.getState(), {
        payload: "William",
        type: KVEnum.NAME,
    })).toEqual({
        "@@redux/INITs.x.6.x.3.l": undefined,
        [KVEnum.ADDRESS]: '"123 John Ct."',
        [KVEnum.NAME]: "William",
    });
});
test("Functional Component Hook sync()", () => {
    let hookValue = "initial";
    const hookSetter = (value) => {
        hookValue = value;
    };
    expect(hookValue).toBe("initial");
    kv.sub({
        [KVEnum.NAME]: [hookValue, hookSetter],
    }, true);
    kv.set(KVEnum.NAME, "Tyler");
    expect(hookValue).toBe("Tyler");
});
test("Functional Component Hook sync() with invalid configuration", () => {
    let hookValue = "initial";
    const hookSetter = (value) => {
        hookValue = value;
    };
    expect(hookValue).toBe("initial");
    kv.sub({
        [KVEnum.NAME]: [hookValue],
    }, true);
    kv.set(KVEnum.NAME, "Tyler");
    expect(hookValue).toBe("initial");
});
test("Functional Component Hook sync() with invalid configuration {}", () => {
    let hookValue = "initial";
    expect(hookValue).toBe("initial");
    kv.sub({
        [KVEnum.NAME]: {},
    }, true);
    kv.set(KVEnum.NAME, "Tyler");
    expect(hookValue).toBe("initial");
});
test("Functional Component Hook sync() with invalid configuration boolean", () => {
    let hookValue = "initial";
    expect(hookValue).toBe("initial");
    kv.sub({
        [KVEnum.NAME]: true,
    }, true);
    kv.set(KVEnum.NAME, "Tyler");
    expect(hookValue).toBe("initial");
});
test("Functional Component Hook sync() with invalid configuration empty string", () => {
    let hookValue = "initial";
    expect(hookValue).toBe("initial");
    kv.sub({
        [KVEnum.NAME]: "",
    }, true);
    kv.set(KVEnum.NAME, "Tyler");
    expect(hookValue).toBe("initial");
});
test("Functional Component Hook sync() with invalid configuration string", () => {
    let hookValue = "initial";
    expect(hookValue).toBe("initial");
    kv.sub({
        [KVEnum.NAME]: "John",
    }, true);
    kv.set(KVEnum.NAME, "Tyler");
    expect(hookValue).toBe("initial");
});
test("Functional Component Hook sync() with store property that doesn't exist", () => {
    let hookValue = "initial";
    const hookSetter = (value) => {
        hookValue = value;
    };
    expect(hookValue).toBe("initial");
    kv.sub({
        abc123: [hookValue, hookSetter],
    }, true);
    kv.set(KVEnum.NAME, "Tyler");
    expect(hookValue).toBe("initial");
});
//# sourceMappingURL=index.test.js.map