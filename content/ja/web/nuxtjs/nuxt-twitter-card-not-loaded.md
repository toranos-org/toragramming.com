---
title: 【Nuxt.js】SPA モード で Twitter Card が読み込まれず困った話
description: Nuxt.js で SPA サイトを構築したときに、Twitter Card がうまく読み込まれない場合の対処法を紹介します。
thumbnail: eyecatch.png
---

## 解決方法

### 各ページ（routing）ごとに OGP を設定したい場合

<span class="marker-red"> **universal（SSR）モードに設定しましょう。** </span>

SPA モードだと、ページごとの OGP 設定（というかそもそも meta タグ）が反映されないので、SSR モードを使用しましょう。
`nuxt.config.js` にて、以下のように設定します。

```js[nuxt.config.js]
export default {
  mode: 'universal',

  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
    },
    // 以下各種設定が続く……
  },

  // 以下各種設定が続く……
}
```

次に、各ページの vue ファイル内で以下のように記述します。

ここは、[head プロパティ - NuxtJs](https://ja.nuxtjs.org/api/configuration-head/) を参考にしつつ、Twitter カードの設定を記述すれば良いです。

（※Twitter カード設定方法参考：[【2019 年版】Twitter カードとは？使い方と設定方法まとめ - サルワカ](https://saruwakakun.com/html-css/reference/twitter-card)）

```vue[各ページの.vueファイル]
<script>
export default {
  head() {
    return {
      meta: [
        { hid: 'twitter:card', name: 'twitter:card', content: /*カードタイプ*/ },
        { hid: 'twitter:site', name: 'twitter:site', content: /*@ツイッターID*/ },
        { hid: 'og:type', property: 'og:type', content: /*website とか blog とか*/ },
        {
          hid: 'og:title',
          property: 'og:title',
          content: /*サイト名*/
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: /*サイトURL*/
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: /*サイト説明文*/
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: /*OGP 画像への絶対パス*/
        },
        { hid: 'og:site_name', name: 'og:site_name', content: /*サイト名*/ }
      ]
    }
  }
}
</script>
```

## 全ページ同じ OGP 設定で良い場合

単純に、<span class="marker-red">**nuxt.config.js で meta タグ設定をする**</span> だけです。

各 layout や page の vue ファイルに head() プロパティを使って指定した場合、初期レンダリング時には正しく head の内容が出力されないようで、Twitter Card が正しく読み込まれません。

※僕の場合、Twitter Card が正しく読み込まれなかった理由はまさにこれで、layouts/default.vue に head() プロパティで各種メタタグを設定しようとしていたのが原因でした orz

`nuxt.config.js` に以下のように記述します。

```js[nuxt.config.js]
export default {
  head: {
    meta: [
      { hid: 'twitter:card', name: 'twitter:card', content: /*カードタイプ*/ },
      { hid: 'twitter:site', name: 'twitter:site', content: /*@ツイッターID*/ },
      { hid: 'og:type', property: 'og:type', content: /*website とか blog とか*/ },
      {
        hid: 'og:title',
        property: 'og:title',
        content: /*サイト名*/
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: /*サイトURL*/
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: /*サイト説明文*/
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: /*OGP 画像への絶対パス*/
      },
      { hid: 'og:site_name', name: 'og:site_name', content: /*サイト名*/ }
    ]
  }
}
```

## 最後に、キャッシュ更新をお忘れなく

[Card Validator](https://cards-dev.twitter.com/validator) にて、デプロイ済みのサイト URL を入力して、正しくカードイメージが表示されることを確認しましょう。

上記のように設定してもうまくいかない場合は、

- robots.txt の設定の問題
- SSL の問題
- meta タグの書き方間違い

などが考えられます。

ちなみに、[Card Validator](https://cards-dev.twitter.com/validator) で『Preview Card』ボタンを押して、右側の『Log』欄に出てくるエラーメッセージを見れば、案外簡単に問題がわかる場合もありますので、一度確認してみてください。

## 参考サイト

- [nuxt.js(v2)で SEO に必要な meta(OGP)を入れたい](https://qiita.com/amishiro/items/b7260116b282d2cf2756)
- [Nuxt.js で title・description・OGP タグを設定し SEO 効果を出す方法【SSR(サーバーサイドレンダリング)】](https://rara-world.com/nuxt-ogp-head-tag/)
- [【2019 年版】Twitter カードとは？使い方と設定方法まとめ - サルワカ](https://saruwakakun.com/html-css/reference/twitter-card)
