---
title: 【正規表現】CSS のコメント一括削除～複数行や前後の空白の削除にも対応！
description: CSS のコメントを一括削除（置換）する正規表現記法を紹介します。需要があるのかわかりませんが……。
thumbnail: eyecatch.png
createdAt: 2019-02-27 00:00:00
createdAt: 2019-02-27 00:00:00
---

## CSS のコメントを削除する正規表現

```regexp
[\s\t]*/\*/?(\n|[^/]|[^*]/)*\*/
```

上記の正規表現で、<span class="marker-red">**CSS におけるコメントを全て**</span>指定することができます！

置換処理で空（から）と置き換えれば、<span class="marker-blue">**コメントの全削除**</span>が可能です。

<video autoplay loop src="/assets/web/css/regexp-delete-css-comment/delete-css-comment-on-vscode.mp4"></video>

## 正規表現の解説

せっかくなので、CSS のコメントを削除する正規表現を分解して、一つ一つ解説したいと思います。

<img-in-post src="regexp-delete-css-block-separate.png" alt="CSSコメント削除～正規表現ブロック分け" ></img-in-post>

正規表現において各記号の示す意味がわからない方は 、[正規表現一覧](https://gimite.net/help/devas-ja/all_regex.html)を参照しつつ、御覧ください！

### 1. [\s\t]\*

<img-in-post src="regexp-delete-css-block-separate.png" alt="CSSコメント削除～正規表現ブロック分け"></img-in-post>

① は、 <span class="marker-red">**CSS コメント直前の空白やインデントを指定する**</span>正規表現です。

この正規表現を日本語に訳して読むと、「<span class="marker-blue">**【空白またはタブ】が０個以上 または 何もなし に該当**</span>」という意味になります。

<img-in-post src="regexp-delete-css-block1.png" alt="CSSコメント削除～正規表現指定箇所1"></img-in-post>

### 2. /\*/?

<img-in-post src="regexp-delete-css-block-separate.png" alt="CSSコメント削除～正規表現ブロック分け"></img-in-post>

② は、 <span class="marker-red">**CSS コメント開始を意味する `/*` を指定する**</span>正規表現です。

<img-in-post src="regexp-delete-css-block2.png" alt="CSSコメント削除～正規表現指定箇所2"></img-in-post>

「\*」（アスタリスク）は特殊記号なので、「\\\*」のようにバックスラッシュをつけて指定する必要があります。

最後についている「/?」は、「/\*」の直後に「/」が書かれている場合に対応するため必要です（上記画像の 17 行目）。

### 3. (\n|[^/]|[^*]/)\*

<img-in-post src="regexp-delete-css-block-separate.png" alt="CSSコメント削除～正規表現ブロック分け"></img-in-post>

③ は、 <span class="marker-red">**コメント内部の文字列を指定する**</span>正規表現です。

<img-in-post src="regexp-delete-css-block3.png" alt="CSSコメント削除～正規表現指定箇所3"></img-in-post>

日本語訳は「**【改行 または スラッシュ以外 または アスタリスク以外の直後のスラッシュ】が０個以上 に該当**」です。

わかりにくいですね！<br>簡単に言うと、<span class="marker-blue">**該当対象は「改行」「\*/ 以外でのスラッシュ」「その他文字全部」の３種類**</span>です。

### 4. \*/

④ は、<span class="marker-red">**CSS コメント終了を意味する `*/`を指定する正規表現**</span>です。

<img-in-post src="regexp-delete-css-block4.png" alt="CSSコメント削除～正規表現指定箇所4"></img-in-post>

## まとめ

CSS コメントを削除するには、以下のように記述します！

```regexp
[\s\t]*/\*/?(\n|[^/]|[^*]/)*\*/
```

CSS コメントを削除したいときにはぜひ使ってみてください！[^1]

[^1]: 記事を作ってから思いましたが、CSS コメントを削除したいときなんてそうそうないような……
