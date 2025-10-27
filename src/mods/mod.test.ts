import { test } from "@hazae41/phobos";

import { argon2 } from "@hazae41/argon2";
import { argon2Wasm } from "@hazae41/argon2-wasm";

test("argon", async () => {
  await argon2Wasm.initBundled()

  const { Memory, Argon2Deriver } = argon2.fromWasm(argon2Wasm)

  const pass = Memory.fromOrThrow(crypto.getRandomValues(new Uint8Array(256)))
  const salt = Memory.fromOrThrow(crypto.getRandomValues(new Uint8Array(32)))

  const deriver = Argon2Deriver.createOrThrow("argon2d", 19, 16384, 12, 2)
  const derived = deriver.deriveOrThrow(pass, salt)

  console.log(derived.bytes)
})