// deno-lint-ignore-file no-namespace

export namespace Abstract {

  export type MemoryLike = Memory | Uint8Array

  export abstract class Memory implements Disposable {

    abstract [Symbol.dispose](): void

    abstract readonly inner: unknown

    abstract readonly bytes: Uint8Array

  }

  export namespace Memory {

    export interface Static {

      fromOrThrow(memory: MemoryLike): Memory

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