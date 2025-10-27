# Argon2

Argon2 adapter for WebAssembly and JS implementations

```bash
npm install @hazae41/argon2
```

```bash
deno install jsr:@hazae41/argon2
```

[**📦 NPM**](https://www.npmjs.com/package/@hazae41/argon2) • [**📦 JSR**](https://jsr.io/@hazae41/argon2)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies

## Usage

### WebAssembly

```bash
npm i @hazae41/argon2.wasm
```

```typescript
import { Argon2 } from "@hazae41/argon2"
import { Argon2Wasm } from "@hazae41/argon2-wasm"

await Argon2Wasm.initBundled()

Argon2.set(Argon2.fromWasm(Argon2Wasm))
```