# Argon2

Argon2 adapter for WebAssembly and JS implementations

```bash
npm install @hazae41/argon2
```

[**📦 NPM**](https://www.npmjs.com/package/@hazae41/argon2)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies

## Usage

```tsx
const pass = crypto.getRandomValues(new Uint8Array(256))
const salt = crypto.getRandomValues(new Uint8Array(32))

const deriver = argon2.Deriver.create("argon2d", 19, 16384, 12, 2)
const derived = deriver.derive(pass, salt)
```