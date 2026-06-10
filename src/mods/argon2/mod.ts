import { Argon2Deriver, load, Memory } from "@hazae41/argon2-wasm";

await load()

export class Deriver {

  /**
   * Do not use
   * @param inner 
   */
  constructor(
    readonly inner: Argon2Deriver
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
    return new Deriver(new Argon2Deriver(algorithm, version, memory, iterations, parallelism))
  }

  /**
   * Derive a key from the given password and salt
   * @param password 
   * @param salt 
   * @returns 
   */
  derive(password: Uint8Array, salt: Uint8Array): Uint8Array<ArrayBuffer> {
    return new Uint8Array(this.inner.derive(new Memory(password), new Memory(salt)).bytes)
  }

}