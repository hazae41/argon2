# Argon2

Argon2 adapter for WebAssembly and JS implementations

```bash
npm install --save-peer @hazae41/argon2
```

[**📦 NPM**](https://www.npmjs.com/package/@hazae41/argon2)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies

## Implementation

### WebAssembly

```bash
npm i @hazae41/argon2-wasm
```

```typescript
import { argon2 } from "@hazae41/argon2"
import { argon2Wasm } from "@hazae41/argon2-wasm"

await argon2Wasm.load() // or argon2Wasm.loadSync()

argon2.set(argon2.fromWasm(argon2Wasm))
```