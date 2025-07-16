import { type Argon2Wasm } from "@hazae41/argon2.wasm"

import { Lengthed } from "@hazae41/lengthed"
import { Ownable, Owned, Unowned } from "libs/ownable/index.js"
import { Abstract } from "./abstract.js"
import { Adapter } from "./adapter.js"

export function fromWasm(Wasm: typeof Argon2Wasm) {

  class Memory<N extends number = number> extends Abstract.Memory {

    constructor(
      readonly inner: Argon2Wasm.Memory
    ) {
      super()
    }

    static fromOrThrow<N extends number = number>(memory: Abstract.Memory<N>): Ownable<Memory<N>> {
      if (memory instanceof Memory)
        return new Unowned(memory)
      if (memory.inner instanceof Wasm.Memory)
        return new Unowned(new Memory(memory.inner))

      const inner = new Wasm.Memory(memory.bytes)

      return new Owned(new Memory<N>(inner))
    }

    static importOrThrow<N extends number = number>(bytes: Uint8Array & Lengthed<N>): Memory<N> {
      return new Memory<N>(new Wasm.Memory(bytes))
    }

    [Symbol.dispose]() {
      this.inner[Symbol.dispose]()
    }

    get bytes() {
      return this.inner.bytes as Uint8Array & Lengthed<N>
    }

  }

  class Argon2Deriver extends Abstract.Argon2Deriver {

    constructor(
      readonly inner: Argon2Wasm.Argon2Deriver
    ) {
      super()
    }

    [Symbol.dispose]() {
      this.inner[Symbol.dispose]()
    }

    static createOrThrow(algorithm: string, version: number, memory: number, iterations: number, parallelism: number) {
      return new Argon2Deriver(new Wasm.Argon2Deriver(algorithm, version, memory, iterations, parallelism))
    }

    deriveOrThrow(password: Memory, salt: Memory) {
      if (password instanceof Memory === false)
        throw new Error()
      if (salt instanceof Memory === false)
        throw new Error()
      return new Memory(this.inner.derive(password.inner, salt.inner))
    }

  }

  return { Memory, Argon2Deriver } satisfies Adapter
}