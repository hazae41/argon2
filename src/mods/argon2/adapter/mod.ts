import type { Nullable } from "@/libs/nullable/mod.ts";
import { None, Option } from "@hazae41/result-and-option";
import type { Abstract } from "../abstract/mod.ts";

let global: Option<Adapter> = new None()

export function get(): Option<Adapter> {
  return global
}

export function set(value: Nullable<Adapter>) {
  global = Option.wrap(value)
}

export interface Adapter {

  readonly Memory: Abstract.Memory.Static

  readonly Argon2Deriver: Abstract.Argon2Deriver.Static

}