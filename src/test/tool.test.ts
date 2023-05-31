import { getSum } from "../utils/tool";

test(" 5 + 5 应该等于 10", () => {
  expect(getSum(5, 5)).toBe(10);
});
