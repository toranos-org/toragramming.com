---
title: bootstrap-vue でホバー時ヒント（ポップオーバー）を出す方法
description: Vue.js の UI フレームワークである bootstrap-vue において、マウスホバー時ヒント（ポップオーバー）を出す方法を紹介します。
thumbnail: eyecatch.png
createdAt: 2019-06-17 00:00:00
updatedAt: 2019-06-17 00:00:00
---

## BootstrapVue Popover

BootstrapVue は、<a href="https://bootstrap-vue.js.org/docs/components/popover/" target="_blank" rel="noopener noreferer noreferrer">公式ドキュメント</a>がとても見やすいのでおすすめです。

当記事は、上記公式サイトの Components > Popover を参考にして作成しています。

## v-b-popover ディレクティブを使う方法

この方法は、<span class="marker-red">**とても簡単で実装しやすいですが、細かな設定ができません**</span>。

```html
<button
  class="popover"
  v-b-popover.hover="'こんにちは～\nこんばんはー'"
  title="ポップオーバーテスト"
>
  ここにマウスを載せてみよう！
</button>
```

<span class="marker-blue">`v-b-popover.hover="'テキスト'"`</span> で、ポップオーバーテキストを設定します。上記の例では `button` タグを使用していますが、その他の要素でも動作します。

また上記だと、`.hover` によって、ホバーイベントにバインドさせていますが、`.click` や `.focus` なども使うことができます。

<span class="marker-blue">`title="タイトル名"`</span> を指定することで、ポップオーバーで出てくる枠にタイトルを設定することもできます。

> ↓ で実際に動作を確認することができます。

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="TigRig" data-slug-hash="wLGPYv" style=" box-sizing: border-box; display: flex; align-items: center; justify-content: center;height: 265px; padding: 1em; margin: 1em 0; border: 2px solid;" data-pen-title="toragra/190617/bootstrap-vue-popover-1">
  <span>See the Pen <a href="https://codepen.io/TigRig/pen/wLGPYv">
  toragra/190617/bootstrap-vue-popover-1</a> by TigRig (<a href="https://codepen.io/TigRig">@TigRig</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## b-popover コンポーネントを使用する方法

この方法では、<span class="marker-red">**コードの量は増えますが、細かな設定をすることができます**</span>。

```html
<button id="popover" class="popover">ここにマウスを載せてみよう！</button>
<b-popover
  title="ポップオーバーテスト"
  content="こんにちは～\nこんばんはー"
  target="popover"
  triggers="hover focus"
  placement="bottomleft"
  boundary="viewport"
/>
```

まず、<span class="marker marker-blue">**ポップオーバーを設定したい要素に ID を指定**</span>します。

続いて、<span class="marker marker-blue">**b-popover 要素（コンポーネント）を追加**</span>し、<span class="marker-blue">**target 属性に先程の ID を指定**</span>します。
その他設定属性を記述すれば、自由な形式のポップオーバーを実装できます。

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="html,result" data-user="TigRig" data-slug-hash="VJaydw" style=" box-sizing: border-box; display: flex; align-items: center; justify-content: center;height: 265px; padding: 1em; margin: 1em 0; border: 2px solid;" data-pen-title="toragra/190617/bootstrap-vue-popover-2">
  <span>See the Pen <a href="https://codepen.io/TigRig/pen/VJaydw">
  toragra/190617/bootstrap-vue-popover-2</a> by TigRig (<a href="https://codepen.io/TigRig">@TigRig</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### b-popover のオプション一覧

※[公式サイト](https://bootstrap-vue.js.org/docs/components/popover/) の記載を和訳したものです。

| 属性名             | デフォルト値   | 説明                                                                                                                                                                                                                                                                   | 値                                                                                                               |
| :----------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| target             | null           | ポップオーバーを実装する対象要素に設定した ID。**必須**。                                                                                                                                                                                                              | 一意な ID（文字列）                                                                                              |
| title              | null           | ポップオーバーウィンドウのタイトル。                                                                                                                                                                                                                                   | 文字列                                                                                                           |
| content            | null           | ポップオーバーの内容テキスト。                                                                                                                                                                                                                                         | 文字列                                                                                                           |
| placement          | 'right'        | ポップオーバーの表示位置。対象要素の上下左右どの位置に表示させるかを指定します。                                                                                                                                                                                       | auto,top, bottom, left, right,topleft, topright,bottomleft,bottomright,lefttop, leftbottom,righttop, rightbottom |
| fallback-placement | 'flip'         | Auto-flip 設定時の反転方向？（すみません、[公式サイト](https://bootstrap-vue.js.org/docs/components/popover/)の英語を理解しきれませんでした）                                                                                                                          | flip, clockwise,counterclockwise                                                                                 |
| disabled           | false          | ポップオーバーの表示/非表示を管理します。.sync 修飾子との併用が推奨されています。                                                                                                                                                                                      | true, false                                                                                                      |
| triggers           | 'click'        | ポップオーバー表示/消去のトリガーとなるハンドルを指定します。半角スペース区切りで複数指定できます。                                                                                                                                                                    | hover, focus, click                                                                                              |
| no-fade            | false          | true を設定すると、ポップオーバー表示時のフェードをオフにします（パッと表示されます）。                                                                                                                                                                                | true, false                                                                                                      |
| delay              | 0              | トリガーイベント発火後、ポップオーバーを表示するまでの遅延秒数（ミリ秒単位）を指定します。消去の際にも適応されます。{show: 100, hide: 400 }のように指定することで、表示/消去それぞれの遅延秒数を設定できます。                                                         | 0 以上の整数                                                                                                     |
| offset             | 0              | ポップオーバーの表示位置をずらします（単位 Pixel）。                                                                                                                                                                                                                   | 整数                                                                                                             |
| container          | null           | 要素の ID を指定。ポップオーバー要素は、指定した ID 要素の小要素として Append （挿入）されます。null を指定した場合、また指定 ID が見つからない場合は、`body`要素の配下に挿入されます（デフォルト）。                                                                  | 一意な ID                                                                                                        |
| boundary           | 'scrollParent' | ポップオーバーウィンドウ表示エリア（ポップオーバーウィンドウは、このエリアに収まるように制約を受ける）を指定します。多くの場合、このオプションは指定せずとも正しく動作しますが、**ポップオーバーを表示する空間が小さく正しい場所に表示されない場合などに指定します**。 | 'scrollParent', 'viewport', 'window'、または各種 HTML 要素への参照                                               |
| boundary-padding   | 5              | ポップオーバーウィンドウ表示エリアの padding（内側余白）を指定します（単位 Pixel）。                                                                                                                                                                                   | 正の整数                                                                                                         |
