---
title: Nuxt 2.10↑ + TypeScirpt + ESLint + Prettier + VSCode 環境構築（2020/01/17）
description: Nuxt 2.10 + TypeScript の環境構築記事です。エディタは VisualStudioCode 、ESLint + Prettier を用いて、保存時に自動フォーマットが走る設定をします。
thumbnail: eyecatch.png
---

## はじめに

**2019/09/20 執筆**

Nuxt + TypeScript の環境構築記事です。

- Nuxt
  - v2.10.0 ～ v2.14.0 あたりが対象です（v2.15.0 は未確認です）
- 筆者の環境
  - Windows
  - VisualStudioCode （VSCode）

**[Nuxt TypeScript 公式](https://typescript.nuxtjs.org/) も参照して、比較しながら読んで頂けると幸いです**。

## やることまとめ

### 1. 下記コマンド実行

<code-group>
  <code-block label="Yarn" active>

```bash
yarn create nuxt-app # ESLint, Prettier を選択（その他のオプションは自由です）

yarn add -D @nuxt/typescript-build @nuxtjs/eslint-config-typescript
yarn add nuxt @nuxt/typescript-runtime
yarn remove @nuxtjs/eslint-config
```

  </code-block>
  <code-block label="NPM">

```bash
npm init create nuxt-app # ESLint, Prettier を選択（その他のオプションは自由です）

npm install --sav-dev @nuxt/typescript-build @nuxtjs/eslint-config-typescript
npm install --save nuxt @nuxt/typescript-runtime
npm remove @nuxtjs/eslint-config
```

  </code-block>
</code-group>

### 2. `nuxt.config.js` → `nuxt.config.ts` にリネーム

### 3. `nuxt.config.ts` の内容を以下の通りに設定

<code-group>
  <code-block label="変更箇所" active>

```diff
- export default {
+ import { Configuration } from '@nuxt/types'
+ const config: Configuration = {

  // ...（中略）

  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
-   '@nuxtjs/eslint-module'
+   '@nuxtjs/eslint-module',
+   '@nuxt/typescript-build'
  ],

  // ...（中略）
  build: {
-   /*
-    ** You can extend webpack config here
-    */
-   extend(config, ctx){} // extend オプションが必要であれば残してください
  }
}

+ export default config
```

  </code-block>
  <code-block label="変更後のコード（コピー用）">

```js
import { Configuration } from '@nuxt/types'
const config: Configuration = {
  // ...（中略）

  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
  ],

  // ...（中略）

  build: {},
}

export default config
```

  </code-block>
</code-group>

### 4. `tsconfig.json`作成（内容は以下）

```json[tsconfig.json]
{
  "compilerOptions": {
    "target": "es2018",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": ["esnext", "esnext.asynciterable", "dom"],
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noImplicitAny": false,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"]
    },
    "typeRoots": ["/types"],
    "types": ["@types/node", "@nuxt/types"] // Axios を使うのであれば、"@nuxtjs/axios" も追加
  },
  "exclude": ["node_modules"]
}
```

### 5. `package.json` の `scripts` を以下の通りに修正

<code-group>
  <code-block label="変更箇所" active>

```diff
// ...（略）
  "scripts": {
-   "dev": "nuxt",
-   "build": "nuxt build",
-   "start": "nuxt start",
-   "generate": "nuxt generate",
-   "lint": "eslint --ext .js,.vue --ignore-path .gitignore ."
+   "dev": "nuxt-ts",
+   "build": "nuxt-ts build",
+   "start": "nuxt-ts start",
+   "generate": "nuxt-ts generate",
+   "lint": "eslint --ext .ts,.js,.vue --ignore-path .gitignore ."
  },
// ...（略）
```

  </code-block>
  <code-block label="変更後のコード（コピー用）">

```json
// ...（略）
  "scripts": {
    "dev": "nuxt-ts",
    "build": "nuxt-ts build",
    "start": "nuxt-ts start",
    "generate": "nuxt-ts generate",
    "lint": "eslint --ext .ts,.js,.vue --ignore-path .gitignore ."
  },
// ...（略）
```

  </code-block>
</code-group>

### 6. `.eslintrc.js` に一文追加

<code-group>
  <code-block label="変更箇所" active>

```diff
// ...（略）
  extends: [
    '@nuxtjs',
+   '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
// ...（略）
```

  </code-block>
  <code-block label="変更後のコード（コピー用）">

```js
// ...（略）
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
// ...（略）
```

  </code-block>
</code-group>

### 7. VSCode のワークスペース設定を以下の通りに設定

```json[.vscode/settings.json]
{
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "typescript.format.insertSpaceBeforeFunctionParenthesis": true,
  "eslint.enable": true,
  "editor.formatOnSave": false,
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "vue-html",
      "autoFix": true
    }
  ],
  "eslint.run": "onType",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.postcss": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
  "vetur.format.defaultFormatter.ts": "prettier",
  "vetur.validation.style": true,
  "vetur.validation.template": true
}
```

## 手順解説

### Create Nuxt App

まずは Create Nuxt App します（詳しくは学びたい方は → [インストール - Nuxt.js](https://ja.nuxtjs.org/guide/installation/)）

<code-group>
  <code-block label="Yarn" active>

```bash
yarn create nuxt-app env-nuxt-typescript
```

  </code-block>
  <code-block label="NPM">

```bash
npm init nuxt-app env-nuxt-typescript
```

  </code-block>
</code-group>

```bash
? Project name env-nuxt-typescript
? Project description My excellent Nuxt.js project
? Author name 自由
? Choose the package manager 自由（Yarn がおすすめ）
? Choose UI framework 自由
? Choose custom server framework 自由
? Choose Nuxt.js modules 自由
? Choose linting tools
 (*) ESLint ← チェック付けます
 (*) Prettier ← チェック付けます
 ( ) Lint staged files ← これは自由
? Choose test framework 自由
? Choose rendering mode 自由
? Choose development tools 自由
```

インストールオプションでは、 **ESLint**, **Prettier** を選択してください（後に VSCode + ESLint + Prettier の設定紹介があります；不要な方はスルーしてください）。

その他のオプションは自由です。

### TypeScript の設定

#### パッケージインストール

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D @nuxt/typescript-build @nuxtjs/eslint-config-typescript
yarn add @nuxt/typescript-runtime
```

  </code-block>
  <code-block label="NPM">

```bash
npm install --sav-dev @nuxt/typescript-build @nuxtjs/eslint-config-typescript
npm install --save @nuxt/typescript-runtime
```

  </code-block>
</code-group>

※ `@nuxt/typescript-build` および `@nuxt/typescript-runtime` は、<span class="marker-red">**Nuxt 2.9 以上でのみ使用できます**</span>。

#### nuxt.config.ts

`nuxt.config.js` を `nuxt.config.ts` に拡張子変更し、以下ように内容を修正します。

<code-group>
  <code-block label="変更箇所" active>

```diff
- export default {
+ import { Configuration } from '@nuxt/types'
+ const config: Configuration = {

  // ...（中略）

  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
-   '@nuxtjs/eslint-module'
+   '@nuxtjs/eslint-module',
+   '@nuxt/typescript-build'
  ],

  // ...（中略）

}

+ export default config
```

  </code-block>
  <code-block label="変更後のコード（コピー用）">

```js
import { Configuration } from '@nuxt/types'
const config: Configuration = {
  // ...（中略）

  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
  ],

  // ...（中略）
}

export default config
```

  </code-block>
</code-group>

#### tsconfig.json

以下のとおり、`tsconfig.json`を作成します。

（設定内容について詳しく知りたい方は → [tsconfig 日本語訳](https://qiita.com/alfas/items/539ade65926deb530e0e)）

```json[tsconfig.json]
{
  "compilerOptions": {
    "target": "es2018",
    "module": "esnext",
    "moduleResolution": "node",
    "lib": ["esnext", "esnext.asynciterable", "dom"],
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noImplicitAny": false,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"]
    },
    "typeRoots": ["/types"],
    "types": ["@types/node", "@nuxt/types"] // Axios を使うのであれば、"@nuxtjs/axios" も追加
  },
  "exclude": ["node_modules"]
}
```

#### package.json

`package.json` の `scripts` を、Nuxt TypeScript 用に修正します。

- `nuxt` → `nuxt-ts` に変更
- `"lint"` で指定する拡張子に、`.ts` を追加

<code-group>
  <code-block label="変更箇所" active>

```diff
// ...（略）
  "scripts": {
-   "dev": "nuxt",
-   "build": "nuxt build",
-   "start": "nuxt start",
-   "generate": "nuxt generate",
-   "lint": "eslint --ext .js,.vue --ignore-path .gitignore ."
+   "dev": "nuxt-ts",
+   "build": "nuxt-ts build",
+   "start": "nuxt-ts start",
+   "generate": "nuxt-ts generate",
+   "lint": "eslint --ext .ts,.js,.vue --ignore-path .gitignore ."
  },
// ...（略）
```

  </code-block>
  <code-block label="変更後のコード（コピー用）">

```json
// ...（略）
  "scripts": {
    "dev": "nuxt-ts",
    "build": "nuxt-ts build",
    "start": "nuxt-ts start",
    "generate": "nuxt-ts generate",
    "lint": "eslint --ext .ts,.js,.vue --ignore-path .gitignore ."
  },
// ...（略）
```

  </code-block>
</code-group>

### ESLint の設定

#### パッケージインストール

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D @nuxtjs/eslint-config-typescript
yarn remove @nuxtjs/eslint-config
```

  </code-block>
  <code-block label="NPM">

```bash
npm install --save-dev @nuxtjs/eslint-config-typescript
npm remove @nuxtjs/eslint-config
```

  </code-block>
</code-group>

※[Nuxt TypeScript ドキュメント](https://typescript.nuxtjs.org/guide/lint.html)によると、`@nuxtjs/eslint-config` は `@nuxtjs/eslint-config-typescript` に含まれているため、不要だとのことです。

#### .eslintrc.js

`.eslintrc.js` に一文追加します。

<code-group>
  <code-block label="変更箇所" active>

```diff
// ...（略）
  extends: [
    '@nuxtjs',
+   '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
// ...（略）
```

  </code-block>
  <code-block label="変更後のコード（コピー用）">

```js
// ...（略）
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
// ...（略）
```

  </code-block>
</code-group>

#### nuxt.config.ts

`nuxt.config.ts` の `build` の中身を空にします。
`extend(config, ctx){}` という記述が、`@typescript-eslint/no-unused-vars` でエラーとなるためです。

```diff[nuxt.config.ts]
  // ...(略)
  build: {
-   /*
-    ** You can extend webpack config here
-    */
-   extend(config, ctx){}
  }
  // ...(略)
```

### VSCode の設定

VSCode にて、保存時に Prettier によるフォーマットが走るように設定します。

`.vscode` フォルダを作成し、その中に `setting.json` を作成します。

```json[setting.json]
{
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "typescript.format.insertSpaceBeforeFunctionParenthesis": true,
  "eslint.enable": true,
  "editor.formatOnSave": false,
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "vue-html",
      "autoFix": true
    }
  ],
  "eslint.run": "onType",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.postcss": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
  "vetur.format.defaultFormatter.ts": "prettier",
  "vetur.validation.style": true,
  "vetur.validation.template": true
}
```

## 参考記事

### Nuxt + TypeScript

- https://teratail.com/questions/211457
- https://typescript.nuxtjs.org/cookbook/components/#template
- [3 分でつくる 2019 年版 Nuxt.js TypeScript 開発環境設定](https://qiita.com/hiropy0123/items/4ee85fdb9b19bc89056f)
  [Vue.js to TypeScript の書き方一覧](https://qiita.com/ryo2132/items/4d43209ea89ad1297426)

### TypeScript

- [tsconfig 日本語訳](https://qiita.com/alfas/items/539ade65926deb530e0e)
