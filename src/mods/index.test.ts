import "@hazae41/symbol-dispose-polyfill"

import { test } from "@hazae41/phobos"
import { Argon2 } from "index.js"

import { Argon2Wasm } from "@hazae41/argon2.wasm"

test("argon", async () => {
  await Argon2Wasm.initBundled()

  const { Memory, Argon2Deriver } = Argon2.fromWasm(Argon2Wasm)

  using pass = Memory.importOrThrow(crypto.getRandomValues(new Uint8Array(256)))
  using salt = Memory.importOrThrow(crypto.getRandomValues(new Uint8Array(32)))

  using deriver = Argon2Deriver.createOrThrow("argon2d", 19, 16384, 12, 2)
  using derived = deriver.deriveOrThrow(pass, salt)

  console.log(derived.bytes)
})