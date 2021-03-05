---
title: 【WordPress】スクロール追尾サイドバーが正しい位置で固定されない・ズレる原因と対処法
description: WordPress で構築したサイトの固定サイドバーにおいて、固定される位置がずれてしまう現象の原因と対処法を紹介します。
thumbnail: eyecatch.png
createdAt: 2019-03-14 00:00:00
updatedAt: 2019-03-14 00:00:00
---

## 概要

サイドバーのスクロール追尾要素が、<span class="marker-red">**スクロール時に変なタイミングで固定されたり**</span>、<span class="marker-red">**固定される位置が少しズレていたり**</span>、といった件でお悩みの方向けの解決方法です。

<video autoplay controls loop src="/assets/web/wordpress/wordpress-tracking-sidebar-misaligned/tracking-sidebar-misaligned.mp4"></video>

### ↑ 動画でのブログ環境

- Wordpress バージョン
  - 5.1.1
- テーマ
  - JIN

## 追尾サイドバーの位置がズレる原因

追尾サイドバーがズレる原因は、Wordpress プラグイン『<span class="marker-red">**BJ Lazy Load**</span>』にありました！

以下３つの条件を満たしている時に、追尾サイドバーの固定位置がおかしくなるようです。

<ul><li>BJ Lazy Load を使っている</li><li>BJ Lazy Load の設定で<span class="marker2">**「Apply to post thumbnails」を ON**</span> にしている</li><li>サイドバーに、<span class="marker2">**アイキャッチ付きの記事ウィジェット**</span>を登録している</li></ul>

<div class="concept-box2">
BJ Lazy Load 以外でも、遅延読み込みを行うプラグインであれば発生し得ます。
</div>

## 追尾サイドバーを正しい位置に修正する方法

BJ Lazy Load の設定を行います。

<img-in-post src="how-to-show-bjlazyload-settings.png" alt="BJ Lazy Load 設定までの遷移方法" ></img-in-post>

下記画像の通り、<span class="marker-red">**「Apply to post thumbnails」以外を Yes で設定**</span>します。

<img-in-post src="bjlazyload-settings.png" alt="BJ Lazy Load 設定内容" ></img-in-post>

これで、追従サイドバーが正しく動作します！

<video autoplay controls loop src="/assets/web/wordpress/wordpress-tracking-sidebar-misaligned/tracking-sidebar-aligned.mp4"></video>

<chat face="toragra">

もしこの通りにやっても改善しなかったら、使っているプラグインを一つずつ停止していって、どこに問題があるのか調べてみよう！

</chat>

## 補足：位置ずれが発生した理由

追尾サイドバーでは、サイドバーの要素の高さ（縦幅）から固定すべき位置を計算しています。

BJ Lazy Load などのプラグインで行っている「遅延読み込み」は、スクロールに合わせて必要な画像を読み込むため、未ロードの画像は高さ０（存在しないもの）として扱います。

つまり、<span class="marker-red">**サイドバー要素の一部が高さ０として扱われていたため、追尾固定位置を正しく計算できず、位置ずれを起こしていた**</span>と考えられます。

<chat face="toragra">

サイドバーだけじゃなく、目次のジャンプ機能でも同じことが言えるね！

</chat>

BJ Lazy Load では細かな設定項目があり、追尾サイドバーのズレ問題に対応できました。

他の遅延読み込みプラグインで同様の問題が発生していると思しき場合は、一度そのプラグインの設定を見直してみて下さい。
