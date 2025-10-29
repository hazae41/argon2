import type { Lengthed } from "@/libs/lengthed/mod.ts";

export namespace Abstract {

  export type MemoryLike<N extends number = number> =
    | Memory<N>
    | Memory<N>["bytes"]

  export abstract class Memory<N extends number = number> implements Disposable {

    abstract [Symbol.dispose](): void

    abstract readonly inner: unknown

    abstract readonly bytes: Uint8Array & Lengthed<N>

  }

  export namespace Memory {

    export interface Static {

      fromOrThrow<N extends number>(memory: MemoryLike<N>): Memory<N>

    }

  }

  export abstract class Argon2Deriver implements Disposable {

    abstract [Symbol.dispose](): void

    abstract deriveOrThrow(password: Memory, salt: Memory): Memory

  }

  export namespace Argon2Deriver {

    export interface Static {

      createOrThrow(algorithm: string, version: number, memory: number, iterations: number, parallelism: number): Argon2Deriver

    }

  }

}