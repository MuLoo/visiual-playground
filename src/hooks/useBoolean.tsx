import { useMemo, useState } from "react";
type InitialState = boolean | (() => boolean);

export default function useBoolean(initialState: InitialState = false) {
  const [value, setValue] = useState(initialState);
  const cb = useMemo(
    () => ({
      on: () => setValue(true),
      off: () => setValue(false),
      toggle: () => setValue((prev) => !prev),
    }),
    []
  );
  return [value, cb] as const; // 告诉ts该数组只读
}
