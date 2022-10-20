import { generateRandomID } from "./index";

test("random ID generator", () => {
  expect(generateRandomID(12)).not.toBe(0);
});
