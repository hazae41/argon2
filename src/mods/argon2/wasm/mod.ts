import type { argon2Wasm } from "@hazae41/argon2-wasm";

import type { Lengthed } from "@/libs/lengthed/mod.ts";
import { Abstract } from "../abstract/mod.ts";
import type { Adapter } from "../adapter/mod.ts";

export function fromWasm(wasm: typeof argon2Wasm): Adapter {

  class Memory<N extends number = number> extends Abstract.Memory {

    constructor(
      readonly inner: argon2Wasm.Memory
    ) {
      super()
    }

    [Symbol.dispose]() {
      this.inner[Symbol.dispose]()
    }

    static fromOrThrow<N extends number = number>(memory: Abstract.MemoryLike<N>): Memory<N> {
      if (memory instanceof Memory)
        return memory

      if (memory instanceof Uint8Array)
        return new Memory<N>(new wasm.Memory(memory))

      if (memory.inner instanceof wasm.Memory)
        return new Memory<N>(memory.inner)

      return new Memory<N>(new wasm.Memory(memory.bytes))
    }

    get bytes() {
      return this.inner.bytes as Uint8Array & Lengthed<N>
    }

  }

  class Argon2Deriver extends Abstract.Argon2Deriver {

    constructor(
      readonly inner: argon2Wasm.Argon2Deriver
    ) {
      super()
    }

    [Symbol.dispose]() {
      this.inner[Symbol.dispose]()
    }

    static createOrThrow(algorithm: string, version: number, memory: number, iterations: number, parallelism: number) {
      return new Argon2Deriver(new wasm.Argon2Deriver(algorithm, version, memory, iterations, parallelism))
    }

    deriveOrThrow(password: Memory, salt: Memory) {
      if (password instanceof Memory === false)
        throw new Error()
      if (salt instanceof Memory === false)
        throw new Error()
      return new Memory(this.inner.derive(password.inner, salt.inner))
    }

  }

  return { Memory, Argon2Deriver }
}