/// <reference types="./style.d.ts" />
/// <reference types="./images.d.ts" />
/// <reference types="./node-modules.d.ts" />
/// <reference types="./react.d.ts" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
