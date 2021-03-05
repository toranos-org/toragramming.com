---
title: Nuxt + Stylelint + Prettier + VSCode で、保存時に SCSS を自動フォーマットする
description: VSCode 環境にて、Prettier および Stylelint を用いて、Nuxt.js のコードを保存時自動フォーマットする方法を紹介します。
thumbnail: eyecatch.png
createdAt: 2020-01-04 00:00:00
updatedAt: 2020-01-04 00:00:00
---

## 動作確認した環境

- OS
  - Windows 10 Pro
- Editor
  - VisualStudioCode ( v1.14.1 )
- Package Manager
  - Yarn
- Packages
  - Create Nuxt App ( v2.12.0 )
  - Nuxt ( v2.11.0 )
  - Stylelint ( v13.0.0 )

## やることまとめ

### Nuxt パッケージ導入

<code-group>
  <code-block label="Yarn" active>

```bash
yarn create nuxt-app  # 設定は自由に

yarn add -D node-sass sass-loader
yarn add -D stylelint@13.0.0 @nuxtjs/stylelint-module
yarn add -D stylelint-config-standard stylelint-config-recess-order
yarn add -D stylelint-scss stylelint-config-recommended-scss
yarn add -D stylelint-prettier stylelint-config-prettier

# 上記では 5 行に分けているが、まとめても良い
# ↓↓
# yarn add -D node-sass sass-loader stylelint @nuxtjs/stylelint-module stylelint-config-standard stylelint-config-recess-order stylelint-scss stylelint-config-recommended-scss stylelint-prettier stylelint-config-prettier
```

  </code-block>
  <code-block label="NPM">

```bash
npm init nuxt-app  # 設定は自由に

npm install --save-dev node-sass sass-loader
npm install --save-dev stylelint@13.0.0 @nuxtjs/stylelint-module
npm install --save-dev stylelint-config-standard stylelint-config-recess-order
npm install --save-dev stylelint-scss stylelint-config-recommended-scss
npm install --save-dev stylelint-prettier stylelint-config-prettier

# 上記では 5 行に分けているが、まとめても良い
# ↓↓
# npm install --save-dev node-sass sass-loader stylelint @nuxtjs/stylelint-module stylelint-config-standard stylelint-config-recess-order stylelint-scss stylelint-config-recommended-scss stylelint-prettier stylelint-config-prettier
```

  </code-block>
</code-group>

### stylelint.config.js の作成

```js[stylelint.config.js]
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-scss',
    'stylelint-prettier/recommended'
  ],
  plugins: [],
  rules: {}
}
```

### VSCode 設定

拡張機能の導入

- Prettier - Code Formatter
- stylelint

ワークスペースの設定ファイル `.vscode/settings.json` 作成

```json[settings.json]
{
  "[scss]": {
    "editor.formatOnSave": false
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  },
  "css.validate": false,
  "scss.validate": false
}
```

## まえがき

### 経緯

数カ月ぶりに `create nuxt app` してみたら、`Choose linting tools` に `Stylelint` が追加されていました。

ぜひ使ってみよう！ と記事を漁り、実践してみたのですが、以下のような課題に悩まされました。

> - Stylelint の設定ファイルの書き方がわからん
>   - extends には何を書くの？
>   - plugins には何を書くの？
>   - ルールセットは何が良いの？
>   - 複数のルールセット入れられるの？
>   - なんであの記事では〇〇のルールセット・プラグインを入れてるのに、こっちの記事では入れてないの？
> - VSCode の保存動作時にフォーマットが走らない
>   - どの拡張機能を使えばいいの？
>   - どうやって Stylelint と連携すればいいの？

などなど。

Linter 初学者の私としては、これらの情報がまとまった記事があったら楽だったな～と思いましたので、執筆した次第です 🤣

### 注意

- 上記、[動作確認した環境](##動作確認した環境)以外で動作するかは未検証です

結構長いので、目次から必要なところにジャンプしていただいてもいいと思います。

※PC の方は `Ctrl + Home` でページ最上部にいけますよ（おせっかい）

では、以下より手順・詳細の説明です。

## Create Nuxt App

まずは `create nuxt app` します。

説明は省略します → [インストール - Nuxt.js](https://ja.nuxtjs.org/guide/installation/)

<code-group>
  <code-block label="Yarn" active>

```bash
yarn create nuxt-app
```

  </code-block>
  <code-block label="NPM">

```bash
npm init nuxt-app
```

  </code-block>
</code-group>

設定はご自由で構いません。

## Webpack ローダー（SCSS）の導入

`create nuxt app` した時点では、SCSS 構文での記述はできないので、ローダーを導入します。

[CSS プリプロセッサを使うには？ - Nuxt.js](https://ja.nuxtjs.org/faq/pre-processors/)

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D node-sass sass-loader
```

  </code-block>
  <code-block label="NPM">

```bash
npm install --save-dev node-sass sass-loader
```

  </code-block>
</code-group>

## Nuxt プロジェクトへのパッケージ導入

### Stylelint の導入

※Create Nuxt App で、 `Choose linting tools` → `Stylelint` を選択した場合でも**必要です**。

`stylelint` と `@nuxtjs/stylelint-module` （ Stylelint の Nuxt 用モジュール）をインストールします。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D stylelint@13.0.0 @nuxtjs/stylelint-module
```

  </code-block>
  <code-block label="NPM">

```bash
npm install --save-dev stylelint@13.0.0 @nuxtjs/stylelint-module
```

  </code-block>
</code-group>

`stylelint@13.0.0` は、「バージョン 13.0.0 の Stylelint をインストールする」という意味です。

<alert type=warning>

後述の[SCSS プラグインの導入](#SCSS-プラグインの導入)にて利用する、SCSS 用プラグインとの関係で、古いバージョンの Stylelint だとエラーが発生したため、2020/01/24 時点での最新バージョンを指定しています。

</alert>

<chat face=toragra>

そういえば、全て `yarn add -D` （ `npm install --save-dev` ）でやっていますが、そこらへんの理由はこちらが参考になるのでどうぞ → [ちゃんと使い分けてる? dependencies いろいろ。](https://qiita.com/cognitom/items/acc3ffcbca4c56cf2b95)

</chat>

#### とりあえず Stylelint 実行してみよう

さて無事に Stylelint をインストールできましたので、とりあえず `.vue` ファイルに対して実行してみます。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn stylelint **/*.vue

yarn run v1.17.3

$ ~\node_modules\.bin\stylelint **/*.vue
Error: No rules found within configuration. Have you provided a "rules" property?
    at module.exports (~\node_modules\stylelint\lib\utils\configurationError.js[11:27)]
    at augmentConfigBasic.then.then.then (~\node_modules\stylelint\lib\augmentConfig.js[110:11)]
error Command failed with exit code 78.

info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

  </code-block>
  <code-block label="NPM">

```bash
npm run stylelint **/*.vue

$ ~\node_modules\.bin\stylelint **/*.vue
Error: No rules found within configuration. Have you provided a "rules" property?
    at module.exports (~\node_modules\stylelint\lib\utils\configurationError.js[11:27)]
    at augmentConfigBasic.then.then.then (~\node_modules\stylelint\lib\augmentConfig.js[110:11)]
error Command failed with exit code 78.

info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

  </code-block>
</code-group>

エラーを吐いていますね。

> Error: No rules found within configuration. Have you provided a "rules" property?

Stylelint のルールを設定しろ！ とのことです。

#### Stylelint のルール

Stylelint （に限らず様々な Linter ）では、<span class="marker-blue">**ルールというものを追加・編集することで、構文チェックの細かな設定をする**</span>ことができます。

<alert type=success>

例えば、16 進数カラーコードを `#ffffff` と書きたい人もいれば、`#fff` に省略したい人もいるはずです。

Stylelint では、`color-hex-length` というルールを `short` に設定することで、`#fff` という省略した書き方を強制化させることができますが、省略したくないという方は、このルールを `long` に設定すれば良いのです。

このようなルールを設定してあげてはじめて Stylelint は動作します。

</alert>

試しに設定してみましょう。

まずルートディレクトリに `stylelint.config.js` を作成します（既に存在する場合は作成不要です）。

続いて、以下のコードを `stylelint.config.js` に記述します。

```js[stylelint.config.js]
module.exports = {
  rules: {
    'color-hex-length': 'long' // #fff → #ffffff と書かなければダメ！ というルール
  }
}
```

では、再度 `.vue` ファイルに対して Stylelint を実行してみましょう。

<code-group>
  <code-block label="Yarn" active>

```bash
# コマンド実行
yarn stylelint **/*.vue

# 結果
layouts/default.vue
 37:10  ×  Expected "#fff" to be "#ffffff"   color-hex-length
 52:10  ×  Expected "#fff" to be "#ffffff"   color-hex-length
```

  </code-block>
  <code-block label="NPM">

```bash
# コマンド実行
npm run stylelint **/*.vue

# 結果
layouts/default.vue
 37:10  ×  Expected "#fff" to be "#ffffff"   color-hex-length
 52:10  ×  Expected "#fff" to be "#ffffff"   color-hex-length
```

  </code-block>
</code-group>

Stylelint が正しく動作し、`layouts/default.vue` で指定されている `#fff` に対してエラーを吐きましたね。

[Rules - Stylelint](https://stylelint.io/user-guide/rules)

[stylelint の導入方法と各ルール解説](https://qiita.com/DesignChips/items/cd5282dba553026757c8)

細かく設定したい方は、上記の記事あたりを参照しつつ、必要なルールを検討すれば良いと思います。

一方、<span class="marker-blue">良さげなルールをまとめて導入したい！</span> という方向けには、<span class="marker-blue">ルールセット</span>というものがあります。

当記事では、ルールセットを用いて簡単に Stylelint を使えるようにしていきます。

### Stylelint ルールセットの導入

[npm](https://www.npmjs.com/) で `stylelint-config` とキーワード検索してみると沢山ヒットすると思いますが、これらは全て Stylelint のルールセットです。

<span class="marker-red">複数導入することができますが、ルールセットを拡張したルールセットというのも存在するので、**二重に導入してしまわないように注意**しましょう。</span>

> （例）
>
> - stylelint-config-recommended を入れた
> - その後に stylelint-config-standard も入れた
>
> → ルール重複しています。
>
> - standard は recommended の拡張版なので、standard を入れるならば recommended は不要

まずは以下二つのルールセットを導入します。

- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)：Google や Airbnb のスタイルガイドなどが含まれた一般的なスタイル規則
- [stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order)：Recess（Twitter's CSS Hinter）や Bootstrap で使用された/使用されている CSS プロパティソート（並び替え）手法を取り入れるルールセット

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D stylelint-config-standard stylelint-config-recess-order
```

  </code-block>
  <code-block label="NPM">

```bash
npm install --save-dev stylelint-config-standard stylelint-config-recess-order
```

  </code-block>
</code-group>

パッケージインストールが終わったら、`stylelint.config.js` を編集します。

```js[stylelint.config.js]
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  plugins: [],
  rules: {}
}
```

再度 `yarn stylelint **/*.vue` （ `npm run stylelint **/*.vue` ）を実行すると、今度は結構な量のエラーが発生するかと思います。

ルールセットが適用された証拠ですね！

### SCSS プラグインの導入

続いて、SCSS の記述にも対応できるように、プラグインというものを追加します。

<alert>

プラグインは、素の Stylelint ではチェックできなかった構文をチェックできるようにする機能拡張です。

しかしプラグイン自体はルールを持たないので、追加でルールを記述する、またはルールセットを導入する必要があります。

</alert>

今回は SCSS の構文チェックをするため、以下 2 つのパッケージを導入します。

- [stylelint-scss](https://github.com/kristerkari/stylelint-scss)：SCSS プラグイン
- [stylelint-config-recommended-scss](https://github.com/kristerkari/stylelint-config-recommended-scss)：SCSS 用ルールセット

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D stylelint-scss stylelint-config-recommended-scss
```

  </code-block>
  <code-block label="NPM">

```bash
npm install --save-dev stylelint-scss stylelint-config-recommended-scss
```

  </code-block>
</code-group>

`stylelint.config.js` を編集します。

```js[stylelint.config.js]
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-scss'
  ],
  plugins: [],
  rules: {}
}
```

#### 追加説明：なぜ、stylelint.config.js の plugins に 'stylelint-scss' を記述しないのか

※こちらは少し本題から外れた話なので、必要ない方は[Prettier プラグインの導入](#prettier-プラグインの導入)までジャンプしてください。

通常、Stylelint のプラグインパッケージをインストールしたら、設定ファイル（`stylelint.config.js`等）の `plugin` プロパティに追記します。

しかし、`stylelint-scss` プラグインと `stylelint-config-recommended-scss` を併用する場合、`plugin` への追加は不要となります。

理由は **`stylelint-config-recommended-scss` が、自動で `stylelint-scss` を読み込んでくれるから**です。

[stylelint-config-recommended-scss](https://github.com/kristerkari/stylelint-config-recommended-scss/blob/master/index.js) の `index.js` のコードを見てみましょう。

```js[index.js（引用）]
'use strict'

module.exports = {
  extends: ['stylelint-config-recommended'],
  plugins: ['stylelint-scss'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true
  }
}
```

ご覧の通り、`plugins` に `stylelint-scss` が設定されています。

従って、 **`extends` に `stylelint-config-recommended-scss` を記述するだけで、`stylelint-scss` プラグインが読み込まれるため、`plugin` の記述が不要**という仕組みになっています。

ちなみに、[stylelint-config-recommended-scss](https://github.com/kristerkari/stylelint-config-recommended-scss/blob/master/package.json) の `package.json` を覗いてみると、どんな依存関係を持っているか――すなわち、以下のことがわかります。

- `dependencies`：合わせて自動でインストールされるパッケージ
- `peerDependencies`：自分でインストールしなければいけないパッケージ

```json[stylelint-config-recommended-scss/package.json]
~~~~
  "dependencies": {
    "stylelint-config-recommended": "^3.0.0"
  },
  "peerDependencies": {
    "stylelint": "^10.1.0 || ^11.0.0 || ^12.0.0",
    "stylelint-scss": "^3.0.0"
  },
~~~~
```

つまり、`stylelint-config-recommended-scss` は

- 自動で `stylelint-config-recommended` も導入する
- `stylelint`, `stylelint-scss` を自分でインストールしなければいけない

ということがわかります。

stylelint のルールセットパッケージ（`stylelint-config` で始まるパッケージ）は、**導入前に一度リポジトリを確認してみると良いかも**しれませんね！

脱線しました。以下より本題の続きです。

### Prettier プラグインの導入

最後のパッケージです。

[Prettier](https://prettier.io/) は、コードフォーマッターと呼ばれるもので、<span class="marker-blue">**ソースコードの整形を行ってくれるツール**</span>です。

ただ、StyleLint にもコード整形の機能は存在します（`yarn stylelint --fix` とコマンド入力すると、構文チェックだけでなく、フォーマットも行ってくれます）。

なぜ Stylelint のコード整形を使わず、Prettier を使うのか……というと、<span class="marker-red">**Stylelint には整形できない規則も、Prettier であれば整形できるから**</span>です。

これは Stylelint だけでなく ESLint や TSLint など、その他の Linter ツールでも言えることです。

> ※こちらの記事が参考になりました → [Prettier 入門 ～ ESLint との違いを理解して併用する～](https://qiita.com/soarflat/items/06377f3b96964964a65d)

では、StyleLint と Prettier を併用できるように、StyleLint × Prettier の関連パッケージを導入していきましょう。

- [stylelint-pretter](https://github.com/prettier/stylelint-prettier)：Prettier 用プラグイン
- [stylelint-config-pretter](https://github.com/prettier/stylelint-config-prettier)：Prettier 用ルールセット

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D stylelint-prettier stylelint-config-prettier
```

  </code-block>
  <code-block label="NPM">

```bash
npm install --save-dev stylelint-prettier stylelint-config-prettier
```

  </code-block>
</code-group>

```js[stylelint.config.js]
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-scss',
    'stylelint-prettier/recommended'
  ],
  plugins: [],
  rules: {}
}
```

#### 追加説明：なぜ、stylelint.config.js の plugins に 'stylelint-prettier' を記述しないのか

前述の [なぜ、stylelint.config.js の plugins に 'stylelint-scss' を記述しないのか](#追加説明なぜstylelintconfigjs-の-plugins-に-stylelint-scss-を記述しないのか)と同様の疑問ですが、理由は少し異なります。

理由は公式にかかれています → [Recommended Configuration | stylelint-pretter](https://github.com/prettier/stylelint-prettier#user-content-recommended-configuration)

意訳するとこんな感じです。（※筆者は中学生レベルの英語能力なので、正確に知りたい方は原文を御覧ください）

> `stylelint-prettier` プラグインは、"競合する他の Stylelint ルールを無効化"することで、最適に動作します。
> `stylelint-config-prettier` と併用することで、"競合する他の Stylelint ルールを無効化"することができます。
> 利用方法は、以下のとおりです。
>
> 1. `stylelint-config-prettier` をインストールする
>
> ```bash
> npm install --save-dev stylelint-config-prettier
> ```
>
> 2. `stylelint.config.js` 等の設定ファイルに、以下を記述する
>
> ```js
> {
>   "extends": ["stylelint-prettier/recommended"]
> }
> ```
>
> この設定により、以下 3 つの有効化が行われます。
>
> 1. `stylelint-prettier` プラグインの有効化
> 2. `prettier/prettier` ルールの有効化
> 3. `stylelint-config-prettier` ルールセットの有効化（ルール拡張）

### ここまでの動作確認

パッケージの導入が完了したので、実際に動作確認してみましょう。

わかりやすくするため、ルートディレクトリにテスト用 SCSS ファイルを作成します。

```scss[test.scss]
.test    {
  color: #f00;
background-color: #ffffff;
font-size: 1rem
}

@mixim hoge {
  padding: 10px;margin: 0 auto;
}

```

VisualStudioCode を使っている方は、ルートディレクトリに `.vscode` フォルダを作成し、
更にその中に `settings.json` ファイルを作成してください（内容は以下の通り）。

```json[settings.json]
{
  "[scss]": {
    "editor.formatOnSave": false
  }
}
```

> ※ VSCode の `format on save` 機能によって、自動でコードフォーマットされるのを防いでいます。

では、`yarn stylelint test.scss` （ `npm run stylelint test.scss` ）と、コマンド実行してみてください。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn stylelint test.scss

yarn run v1.17.3
~\node_modules\.bin\stylelint test.scss

test.scss
 1:7   ×  Delete "···"                                               prettier/prettier
 3:1   ×  Insert "··"                                                prettier/prettier
 3:19  ×  Expected "#ffffff" to be "#fff"                            color-hex-length
 4:1   ×  Expected "font-size" to come before "background-color"     order/properties-order
 4:1   ×  Replace "font-size:·1rem" with "··font-size:·1rem;"        prettier/prettier
 7:1   ×  Unexpected unknown at-rule "@mixim" (at-rule-no-unknown)   scss/at-rule-no-unknown
 8:17  ×  Insert "⏎··"                                               prettier/prettier
```

  </code-block>
  <code-block label="NPM">

```bash
npm run stylelint test.scss

~\node_modules\.bin\stylelint test.scss

test.scss
 1:7   ×  Delete "···"                                               prettier/prettier
 3:1   ×  Insert "··"                                                prettier/prettier
 3:19  ×  Expected "#ffffff" to be "#fff"                            color-hex-length
 4:1   ×  Expected "font-size" to come before "background-color"     order/properties-order
 4:1   ×  Replace "font-size:·1rem" with "··font-size:·1rem;"        prettier/prettier
 7:1   ×  Unexpected unknown at-rule "@mixim" (at-rule-no-unknown)   scss/at-rule-no-unknown
 8:17  ×  Insert "⏎··"                                               prettier/prettier
```

  </code-block>
</code-group>

いかがでしょう！

各エラーの右側に、`scss/~` や `prettier/~` など、エラー発生源のプラグインルールが表示されています。

これで、正しく Stylelint のルールが適用されていることが確認できました。

#### エラーが出た場合

こんなエラーが出ることがあります（以下）。

```bash
Error: Undefined rule unicode-bom
    at module.exports (~\node_modules\stylelint\lib\utils\configurationError.js[8:28)]
    at Object.keys.forEach.ruleName (~\node_modules\stylelint\lib\augmentConfig.js[325:13)]
    at Array.forEach (<anonymous>)
    at normalizeAllRuleSettings (~\node_modules\stylelint\lib\augmentConfig.js[318:29)]
    at augmentConfigBasic.then.then.then.augmentedConfig (~\node_modules\stylelint\lib\augmentConfig.js[94:14)]
error Command failed with exit code 78.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

対応策は、

1. VSCode を再起動する
2. stylelint のバージョンを変更する

です。

2 については、最新版の Stylelint を使うか、筆者が動作確認済みの v13.0.0 を使用するのが良いと思います。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D stylelint  # 最新版インストール
yarn add -D stylelint@13.0.0 # v13.0.0 インストール
```

  </code-block>
  <code-block label="NPM">

```bash
npm install --save-dev stylelint  # 最新版インストール
npm install --save-dev stylelint@13.0.0 # v13.0.0 インストール
```

  </code-block>
</code-group>

## VSCode の設定

当記事最後のトピックです。

Stylelint と VisualStudioCode を連携させて、<span class="marker-red">**保存動作時に Stylelint ルールに従って自動フォーマットが走るように設定**</span>します。

### 拡張機能の導入

以下の 2 つをインストールします。

- Prettier - Code formatter
- stylelint

VSCode 上で、`Ctrl + Shift + X` キーを押下 → 左上のテキストボックス（「Marketplace で拡張機能を検索する」と書いてある）に、これらの拡張機能名称を入力してください。

すると拡張機能が検索され、上記の通りのパッケージ名が表示されると思いますので、その右下の小さな「Install」という緑色のボタンを押下してください。

### .vscode/settings.json の作成

まだ作成していない場合は、ルートディレクトリに `.vscode` フォルダ、その中に `settings.json` を作成してください。

```json[.vscode/settings.json]
{
  "[scss]": {
    "editor.formatOnSave": false
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  },
  "css.validate": false,
  "scss.validate": false
}
```

### 動作確認（保存時にコード整形されるか）

拡張機能の導入と、`settings.json` の設定が終わったら、動作確認してみましょう。

ルートディレクトリにテスト用 SCSS ファイルを作成。

```scss[test.scss]
.test    {
  color: #f00;
background-color: #ffffff;
font-size: 1rem
}

@mixim hoge {
  padding: 10px;margin: 0 auto;
}

```

今度はコマンド実行ではなく、VSCode で `test.scss` を開き、`Ctrl + S` （上書き保存）！

```scss[test.scss]
.test {
  color: #f00;
  background-color: #fff;
  font-size: 1rem;
}

@mixim hoge {
  padding: 10px;
  margin: 0 auto;
}
```

整形（フォーマット）されました！

しかし、まだ `font-size` プロパティにエラーの赤波線が出ているのではないでしょうか？

エラーの数が多かったりすると、『CSS プロパティの並び順ルール』（`order/properties-order`）のフォーマットが走らないことがあるようです。

そのような場合には、もう一度保存を行えば……

```scss[test.scss]
.test {
  font-size: 1rem;
  color: #f00;
  background-color: #fff;
}

@mixim hoge {
  padding: 10px;
  margin: 0 auto;
}
```

並び替わりました！

あとは `@mixim` の箇所に赤波線がついていると思いますが、これは prettier や stylelint でフォーマットできないエラーなので、赤波線が表示されていれば OK です。

ちなみに、`@mixim` は `@mixin` のタイプミスですね。

以上で、『Nuxt + Stylelint + Prettier + VSCode で、保存時に SCSS を自動フォーマットする』設定は完了となります！

## あとがき

相当長い記事になってしまいました orz

ここまで読んでくださった方、ありがとうございました & お疲れさまです！

少しでも Stylelint 導入時の疑問を解消できていれば幸いです。

当記事の誤りに気づかれた方、あるいは疑問がある方、などなど遠慮なくコメントしてください！

では、皆さま良い開発ライフを～ 😎

## 参考記事

### Stylelint

- [stylelint 入門](https://qiita.com/ohnaka0410/items/509a5a9a0bb8d88c65fa)
- [チームで美しくメンテナブルな CSS を書くための 「Stylelint」導入のすすめ](https://www.webprofessional.jp/taking-css-linting-next-level-stylelint/)
- [stylelint の order モジュール選定](https://qiita.com/nabepon/items/4168eae542861cfd69f7)

### Stylelint + Prettier

- [Prettier と Stylelint を使って自動整形・アルファベット順に並べる＋ α【コピペ】](https://flex-box.net/stylelint/)
- [stylelint,prettier を使って scss のコード品質を保つ](https://qiita.com/miwashutaro0611/items/437db965a819018f86d5)

### Stylelint + Nuxt

- [Nuxt.js のプロジェクトに stylelint を導入する方法](https://qiita.com/munieru_jp/items/ea41284f473ad3669616)

### Stylelint + VSCode

- [VS Code に Prettier・ESLint・Stylelint を導入してファイル保存時にコードを自動整形させる方法](https://wemo.tech/3307#index_id12)
- [stylelint の導入と VS Code の設定の方法](https://qiita.com/y-w/items/bd7f11013fe34b69f0df)
- [VS Code で Prettier と Stylelint を連携して CSS/SCSS ファイル保存時にオートフォーマットをかける](https://qiita.com/tkiryu/items/016aa9ef8a25b631e7e6)
- [npm-scripts で静的サイトの制作環境を構築 (3) 構文ハイライトのインストール～ファイル保存時に自動整形 (改)](https://blog.isonishi.com/2019/12/20/npm-scripts-3-1/#toc24)
- [stylelint/vscode-stylelint - GitHub](https://github.com/stylelint/vscode-stylelint)
