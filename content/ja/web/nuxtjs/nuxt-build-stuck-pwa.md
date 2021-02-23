---
title: 【Nuxt.js】dev や build スクリプト実行時、Client Bundle が 95％（nuxt-pwa-icon）で止まってしまう場合の対処法
description: Nuxt.js で yarn (npm run) dev 実行時、Client Bundle が 95% で止まったしまったときの対処法備忘録（pwa モジュールに原因）
thumbnail: eyecatch.png
---

## 発生条件

以下の条件で発生しました。

- @nuxtjs/pwa モジュールをインストールしている
- <span class="marker-red">**@nuxtjs/pwa のバージョンが 3.0.0-0**</span>
- nuxt.config.js の modules に '@nuxtjs/pwa' を指定している
- static ディレクトリに icon.png という名称の画像ファイル（サイズ 512\*512 以上）が配置されている

つまり、[Nuxt PWA の Get Started](https://pwa.nuxtjs.org/setup.html) に記載のとおりセットアップを行って `yarn(npm run) dev` を実行したり、`create-nuxt-app` で pwa を選択した場合に発生します。

この不具合は、<span class="marker-blue">**開発モードでしか発生しない**</span>ようです。

参考：[PWA cause live site to stuck on loading files/api calls](https://github.com/nuxt-community/pwa-module/issues/89)

## 対処法

1. node_modules/@nuxtjs/icon/.cache を削除する
2. @nuxjs/pwa のバージョンを、3.0.0-beta.1 以上に更新する

まず、<span class="marker-red">**node_modules/@nuxtjs/icon/.cache フォルダを削除**</span>します。

<img src="https://toragramming.com/wp-content/uploads/2019/08/image-1.png" alt=""/>

続いて、次のコマンドを実行して <span class="marker-red">**@nuxtjs/pwa モジュールのバージョンを 3.0.0-beta.1 に更新**</span>します。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add @nuxtjs/pwa@3.0.0-beta.1
```

  </code-block>
  <code-block label="NPM">

```bash
npm install save @nuxtjs/pwa@3.0.0-beta.1
```

  </code-block>
</code-group>

<alert>

下記参考記事 2 によると、当不具合はキャッシュが関係するものらしく、**`@nuxtjs/pwa 3.0.0-beta.1` で改善された**とのことなので、3.0.0-beta.1 以上のバージョンであれば OK です。

</alert>

## 参考記事

- [PWA cause live site to stuck on loading files/api calls](https://github.com/nuxt-community/pwa-module/issues/89)
- [Hot Reload make page not load anything till restart of server](https://github.com/nuxt-community/pwa-module/issues/88)
