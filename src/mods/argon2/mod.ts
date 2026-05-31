import { argon2Wasm } from "@hazae41/argon2-wasm";

await argon2Wasm.load()

export class Deriver {

  constructor(
    readonly inner: argon2Wasm.Argon2Deriver
  ) { }

  static create(algorithm: string, version: number, memory: number, iterations: number, parallelism: number) {
    const { Argon2Deriver } = argon2Wasm

    const inner = new Argon2Deriver(algorithm, version, memory, iterations, parallelism)

    return new Deriver(inner)
  }

  derive(password: Uint8Array, salt: Uint8Array) {
    const { Memory } = argon2Wasm

    const result = this.inner.derive(new Memory(password), new Memory(salt))

    return new Uint8Array(result.bytes)
  }

}