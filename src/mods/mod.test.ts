import { test } from "@hazae41/phobos";
import { argon2 } from "../mod.ts";

test("argon", () => {
  const pass = crypto.getRandomValues(new Uint8Array(256))
  const salt = crypto.getRandomValues(new Uint8Array(32))

  const deriver = argon2.Deriver.create("argon2d", 19, 16384, 12, 2)
  const derived = deriver.derive(pass, salt)

  console.log(derived)
})