---
title: 2019 年版：Electron の環境構築（Windows 向け）
description: Electron の環境を構築する方法を紹介します。5分あれば Hello World を表示するテストアプリケーションが作れます！
thumbnail: electron-logo.png
createdAt: 2019-02-08 00:00:00
updateAt: 2020-03-01 00:00:00
---

## Electron とは？

公式サイトはこちら → [Electron](https://electronjs.org/)

Electron は、Web 系技術を用いてクロスプラットフォームなデスクトップアプリケーションを制作できるようにするエンジンです。

<alert>
簡単に言えば <span class="text-red-500">HTML + CSS + Javascript(Node.js)を用いてデスクトップアプリケーションを作成できる便利なツール</span>です。
</alert>

## 当記事における前提知識

<list :items="[
  'コマンドによる操作方法など、開発における一般的な知識があること',
  'HTML, CSS, JavaScript を知っていること',
  'Node.js をインストール済みであること',
  'npm や yarn を知っていること',
]" ></list>

「上記の知識は無いが、とりあえず Electron を動かしてみたい！」という方は、こちらの記事を御覧ください。→ [Electron の環境構築（for Windows）](https://qiita.com/TigRig/items/64d55b5fc5483b01c3b5)

## Electron プロジェクトの作成

Electron のアプリケーションを作成するプロジェクトを作成します。

最終的には以下のようなディレクトリ構成になります。

```
electron-test/
  ├ node_modules/
  ├ index.html
  ├ index.js
  └ package.json
```

では、順にプロジェクトを作成していきましょう。

### プロジェクトフォルダの作成

まず初めに、今回作成する Electron のアプリケーションのルートフォルダ（一番外側のフォルダ）を作成します。

例として、`C:\Users\ユーザー名\Documents\` に `electron-test` というフォルダを作成します。<br />
<span class="text-xs">※「ユーザー名」の箇所は自分の PC のユーザー名に置き換えてください。<span>

```bash
cd C:\Users\ユーザー名\Documents\
mkdir electron-test
```

### package.json の作成

続いて、プロジェクトフォルダ内に `package.json` というプロジェクト管理ファイルを作成します。

<code-group>
  <code-block label="Yarn" active>

```bash
cd electron-test
yarn init -y
```

  </code-block>
  <code-block label="NPM">

```bash
cd electron-test
npm init -y
```

  </code-block>
</code-group>

### Electron のインストール

パッケージマネージャー（npm や yarn）を用いて、Electron をインストールします。

プロジェクトフォルダ内にインストール（ローカルインストール）します。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add electron
```

  </code-block>
  <code-block label="NPM">

```bash
npm install --save electron
```

  </code-block>
</code-group>

<alert>
<p class="pb-4 text-lg font-bold">なぜローカルインストール？</p>
<p>プロジェクトごとに対応バージョンを柔軟に変更できるよう、あらかじめプロジェクト内にパッケージをインストールするほうが安全です。</p>
</alert>

### エントリーポイント JavaScript ファイルの作成

Electron の起動には、起動プログラムを記述した JavaScript ファイルが必要となります。

`package.json` の `main` の横に書かれている名称が、エントリーポイントのファイル名です。変更もできます。

imgDir

<img-in-post src="package-json-entry-point-name.png" alt="package.json のエントリーポイントファイル名の場所"></img-in-post>

`index.js`を作成します。以下、コードです。

```js[index.js]
// Electron のモジュールを取得
const {app, BrowserWindow} = require('electron')

// メインウィンドウはグローバル参照で保持
// 空になれば自動的にガベージコレクションが働き、開放される
let mainWindow

// Electron のウィンドウを生成する関数
function createWindow () {
  // ウィンドウ生成（横幅 800、高さ 600、フレームを含まないサイズ指定）
  mainWindow = new BrowserWindow({width: 800, height: 600, useContentSize: true})

  // 表示対象の HTML ファイルを読み込む
  mainWindow.loadFile('index.html')

  // ウィンドウを閉じた時に発生する処理
  mainWindow.on('closed', () => {
    // メインウィンドウの値を null にして、ガベージコレクタに開放させる
    mainWindow = null
  })
}

// Electronの初期化完了後に、ウィンドウ生成関数を実行
app.on('ready', createWindow)

// ↓↓ アプリが macOS で実行された際の対応（クロスプラットフォーム対応）

// 全てのウィンドウが閉じたときに発生
app.on('window-all-closed', () => {
  // macOS の場合、アプリを完全に終了するのではなく
  // メニューバーに残す（ユーザーが Ctrl + Q を押すまで終了しない）ことが
  // 一般的であるため、これを表現する
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// アプリが実行された時に発生
app.on('activate', function () {
  // macOS の場合、アプリ起動処理（Dock アイコンクリック）時に
  // 実行ウィンドウが空であれば、
  // アプリ内にウィンドウを再作成することが一般的
  if (mainWindow === null) {
    createWindow()
  }
})
```

### メインウィンドウ HTML ファイルの作成

続いて、Electron 上に表示させる画面のコードを記述した `index.html` を作成します。

この `index.html` というファイル名は、上記 `index.js` コードの 14 行目で指定しています。変更も可能です。

```html[index.html]
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>electron-test</title>
</head>
<body>
  <h1 style="color: rgb(255, 91, 50)">Hello World !</h1>
</body>
</html>
```

これで Electron プロジェクトが完成しました！

## Electron を実行してみる

Electron の実行は以下のコマンドで行います。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn electron .
```

  </code-block>
  <code-block label="NPM">

```bash
npm run electron .
```

  </code-block>
</code-group>

<img-in-post src="sample-result.png" alt="サンプルコードの実行結果"></img-in-post>

とても簡単にデスクトップアプリが作成できました！

ぜひ Electron を使って、気軽にデスクトップアプリ開発を初めてみましょう！
