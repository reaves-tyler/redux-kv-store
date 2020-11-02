import KVStore from "./index";

const defaultValues = {
  NAME: "Tyler",
  ADDRESS: "123 John Ct.",
};

const kv = new KVStore(defaultValues);
const kvState = {
  state: {
    NAME: "Jack",
  },
};

test("Check Initial Store Values, must be stored as JSON", () => {
  expect(kv.store.getState().NAME).toBe(JSON.stringify("Tyler"));
  expect(kv.store.getState().ADDRESS).toBe(JSON.stringify("123 John Ct."));
});

test("get() store values", () => {
  expect(kv.get("NAME")).toBe("Tyler");
  expect(kv.get("EMAIL")).toBeUndefined();
});

test("set() and get() store values", () => {
  // Update NAME
  expect(kv.set("NAME", "Bill")).toStrictEqual({
    payload: JSON.stringify("Bill"),
    type: "NAME",
  });
  expect(kv.get("NAME")).toBe("Bill");

  // Update ADDRESS
  expect(kv.set("ADDRESS", "456 Smith Road")).toStrictEqual({
    payload: JSON.stringify("456 Smith Road"),
    type: "ADDRESS",
  });
  expect(kv.get("ADDRESS")).toBe("456 Smith Road");
});

test("sync()", () => {
  expect(kv.sync(kvState)).toStrictEqual({ NAME: "Bill" });
});

test("reset() to original state values", () => {
  kv.reset();
  expect(kv.get("NAME")).toBe(defaultValues.NAME);
  expect(kv.get("ADDRESS")).toBe(defaultValues.ADDRESS);
});

test("rootReducer()", () => {
  // Pass invalid payload object
  expect(
    kv.rootReducer(kv.store.getState(), {
      payload: "William",
      type: "NAME",
    })
  ).toEqual({
    "@@redux/INITs.x.6.x.3.l": undefined,
    ADDRESS: '"123 John Ct."',
    NAME: "William",
  });
});
