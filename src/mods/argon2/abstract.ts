import { Lengthed } from "@hazae41/lengthed"
import { Ownable } from "libs/ownable/index.js"

export namespace Abstract {

  export abstract class Memory<N extends number = number> {

    abstract [Symbol.dispose](): void

    abstract readonly inner: unknown

    abstract readonly bytes: Uint8Array & Lengthed<N>

  }

  export namespace Memory {

    export interface Static {

      fromOrThrow<N extends number>(memory: Memory<N>): Ownable<Memory<N>>

      importOrThrow<N extends number>(bytes: Uint8Array & Lengthed<N>): Memory<N>

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