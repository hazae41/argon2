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

    static fromOrThrow<N extends number = number>(memory: Abstract.MemoryLike<N>): Memory<N> {
      if (memory instanceof Uint8Array)
        return new Memory<N>(new wasm.Memory(memory))

      if (memory instanceof Memory)
        return memory
      if (memory.inner instanceof wasm.Memory)
        return new Memory(memory.inner)

      const inner = new wasm.Memory(memory.bytes)

      return new Memory<N>(inner)
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

    static createOrThrow(algorithm: string, version: number, memory: number, iterations: number, parallelism: number) {
      return new Argon2Deriver(new wasm.Argon2Deriver(algorithm, version, memory, iterations, parallelism))
    }

    deriveOrThrow(password: Abstract.MemoryLike, salt: Abstract.MemoryLike) {
      return new Memory(this.inner.derive(Memory.fromOrThrow(password).inner, Memory.fromOrThrow(salt).inner))
    }

  }

  return { Memory, Argon2Deriver }
}