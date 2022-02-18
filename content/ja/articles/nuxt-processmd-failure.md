---
title: 【Nuxt.js】processmd を使った Markdown ファイルの JSON 変換で躓いたことメモ
description: Nuxt.js × processmd で Markdown ファイルの JSON 変換を行うにあたって、うまく JSON 出力ができなかったときの備忘録。
thumbnail: eyecatch.png
createdAt: 2019-07-10 00:00:00
updatedAt: 2019-07-10 00:00:00
---

## ディレクトリ構成

```bash
プロジェクトルート/
├ assets/
├ components/
├ ... など Nuxt で使うディレクトリ、ファイル色々
└ contents/
  ├ json/ ← processmd によって、ここに JSON ファイルが出力される
  └ markdown/ ← ここにマークダウンファイルを配置
```

## 1. 何故か JSON 出力されない

実行したコマンド（[公式サイト](https://www.npmjs.com/package/processmd#user-content-advanced-usage)のコマンドを参考にしています）。

```bash
yarn processmd \"contents/**/*.md\" --stdout --outputDir contents/json > contents/summary.json
```

### 実行結果のディレクトリ構成

```bash
プロジェクトルート/
├ ... Nuxt で使うディレクトリ、ファイル色々
└ contents/
  ├ json/ ← 何も作成されない
  └ markdown/
  └ summary.json ← 作成される
```

### 解決策

実行コマンドの、<span class="marker-red">**『cotents/\*\*/\*.md』を囲っているダブルクォーテーション前のバックスラッシュ（エスケープ記号）を削除。**</span>

```bash
yarn processmd "contents/**/*.md" --stdout --outputDir contents/json > contents/summary.json
```

これで JSON ファイルが出力されるようになった。

※<span class="marker-blue">**package.json の scripts 等に記述する場合には、バックスラッシュが必要となります。**</span>

## 2. summary.json に不要な実行コマンドまで出力される

```bash
yarn processmd "contents/**/*.md" --stdout --outputDir contents/json > contents/summary.json
```

上記コマンドで出力された summary.json は、以下のようになっていました。

```bash
yarn run v1.12.3
$ プロジェクトルートまでのパス\node_modules\.bin\processmd contents/**/*.md --stdout --outputDir contents/json
{
  "fileMap": {
    "contents/json/2019-07-10-version1.json": {
      "title": "Version 1.00 ～（2019-6-16 ～ ）",
      "description": "Scripon! バージョン１系の更新履歴",
      "created_at": "2019-07-10 00:00:00",
      "dir": "contents/json",
      "base": "2019-07-10-version1.json",
      "ext": ".json",
      "sourceBase": "2019-07-10-version1.md",
      "sourceExt": ".md"
    }
  },
  "sourceFileArray": [
    "contents/markdown/history/2019-07-10-version1.md"
  ]
}Done in 1.41s.

```

1, 2 行目、および最終行に「コマンド実行時のログ」が出力されています。

### 解決策

<strong><span class="marker-red">summary.json の出力命令を、 > ではなく、summaryOutput オプションで行います。</span></strong>

```bash
yarn processmd "contents/markdown/**/*.md" --outputDir contents/json --summaryOutput contents/summary.json
```

これで、正しく summary.json が出力されました。

<chat face="toragra">

今更になって気がついたけど、yarn コマンドを > でファイル出力すれば、当然 yarn のログもファイルに書き出されちゃうよね……

</chat>

## 該当プロジェクトの Github

実際のディレクトリ構成や processmd 実行コマンド（package.json の script を御覧ください）や、出力結果ファイルおよびその使い方などが見てみたい方は、以下の URL をご覧いただければ幸いです。

https://github.com/tigrig29/scripon
