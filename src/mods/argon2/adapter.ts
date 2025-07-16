import { None, Nullable, Option } from "@hazae41/option"
import { Abstract } from "./abstract.js"

let global: Option<Adapter> = new None()

export function get() {
  return global
}

export function set(value: Nullable<Adapter>) {
  global = Option.wrap(value)
}

export interface Adapter {

  readonly Memory: Abstract.Memory.Static

  readonly Argon2Deriver: Abstract.Argon2Deriver.Static

}