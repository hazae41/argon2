import { argon2Wasm } from "@hazae41/argon2-wasm";

await argon2Wasm.load()

export class Deriver {

  /**
   * Do not use
   * @param inner 
   */
  constructor(
    readonly inner: argon2Wasm.Argon2Deriver
  ) { }

  /**
   * Create a new deriver with the specified parameters
   * @param algorithm 
   * @param version 
   * @param memory 
   * @param iterations 
   * @param parallelism 
   * @returns 
   */
  static create(algorithm: string, version: number, memory: number, iterations: number, parallelism: number): Deriver {
    const { Argon2Deriver } = argon2Wasm

    const inner = new Argon2Deriver(algorithm, version, memory, iterations, parallelism)

    return new Deriver(inner)
  }

  /**
   * Derive a key from the given password and salt
   * @param password 
   * @param salt 
   * @returns 
   */
  derive(password: Uint8Array, salt: Uint8Array): Uint8Array<ArrayBuffer> {
    const { Memory } = argon2Wasm

    const result = this.inner.derive(new Memory(password), new Memory(salt))

    return new Uint8Array(result.bytes)
  }

}