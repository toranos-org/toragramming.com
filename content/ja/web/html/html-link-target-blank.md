---
title: HTMLでリンクを別タブ・別ウィンドウで開く方法と、脆弱性に関する注意
description: HTMLでリンクを別タブ・別ウィンドウで開く方法を紹介します。また、 a タグに noopener noreferrer といった記述が必要な理由、そこに関わる脆弱性について説明します。
thumbnail: eyecatch.png
createdAt: 2019-02-19 00:00:00
updatedAt: 2021-03-05 09:24:00
---

## リンクの表示先を指定する方法

まず、HTML でリンクを作成するには以下のように記述します。

```html
<a href="リンク先のURL"></a>
```

リンクタグでは、<span class="text-red-500 font-bold">target 属性</span>を使用してリンクの表示先を設定することができます。

1. `target="_self"` ：[同じタブで開く](#同じタブで開く)
2. `target="_blank"` ：[新規（別の）タブで開く](#新規タブで開く)
3. `target="自作したフレーム名` ：インラインフレーム（iframe 要素）内で開く

当記事では上記 1, 2 と、加えて「[新規（別の）ウィンドウで開く](#新規ウィンドウで開く)」方法も紹介します。

3 については、こちらの記事で詳細に説明してくださっているので御覧ください。<br>
→ [インラインフレームを使用したときのリンクの設定方法](https://www.tagindex.com/html_tag/frame/iframe_target.html)

### 同じタブで開く

#### コード例

```html
<!--下記2つ、どちらでも良い-->
<a href="リンク先のURL" target="_self">同じタブで開きます</a>
<a href="リンク先のURL">同じタブで開きます</a>
```

`target="_self"` は、HTML リンクにおけるデフォルト値なので、省略が可能です。

#### 動作例

※Google のトップページにリンクしています。

<a href="https://www.google.com/" target="_self">同じタブで開きます</a><br>
<a href="https://www.google.com/">同じタブで開きます</a>

### 新規タブで開く

#### コード例

```html
<a href="リンク先のURL" target="_blank" rel="noopener noreferrer">
  新規タブで開きます
</a>
```

<alert type=warning>

この時、`rel="noopener noreferrer"` を必ず記述しましょう。<br>
詳しくは [target="\_blank"の脆弱性と対処法](#target_blank-の脆弱性と対処法) にて説明します。

</alert>

#### 動作例

<a href="https://www.google.com/" target="_blank" rel="noopener noreferrer">新規タブで開きます</a>

### 新規ウィンドウで開く

新規ウィンドウでリンクを開くには、JavaScript で `window.open` メソッドを用いる必要があります。

`window.open` メソッドについての詳細は、[リファレンス](https://developer.mozilla.org/ja/docs/Web/API/Window/open)を御覧ください。

#### コード例

```html
<a
  href="リンク先のURL"
  onclick="window.open('リンク先のURL', '適当なウィンドウ名称','width=1280,height=720,noopener'); return false;"
>
  新規ウィンドウで開きます
</a>
```

<alert type=warning>

この時、`window.open` の第三引数に `noopener` を必ず記述しましょう。<br>
詳しくは [target="\_blank"の脆弱性と対処法](#target_blank-の脆弱性と対処法) にて説明します。

</alert>

#### 動作例

<a href="https://www.google.com/" onclick="window.open('https:\/\/www.google.com/', 'google','width=1280,height=720,noopener'); return false;">新規ウィンドウで開きます</a>

## target="\_blank" の脆弱性と対処法

新規タブ、新規ウィンドウでリンクを開かせる際、どちらでも `noopener` というキーワードを使用しました。

`noopener` や `noreferrer` には **`target="_blank"` の脆弱性を利用した攻撃を防ぐ**という意図があります。

### どんな脆弱性？ 例えば何が起こるの？

`target="_blank"` の脆弱性は、「<span class="text-red-500 font-bold">開かれた新規タブ側で、リンク元タブの URL を操作できてしまう</span>」というものです。

例えば……

<Chat face="toragra" name="ブログ執筆者">良い参考記事があった、リンクを載せよう！</Chat>

<span class="text-red-500">リンク先サイトが悪意ある作者によるページだったら……</span>

<Chat face="man" name="記事閲覧ユーザー">参考記事をクリック！</Chat>

→ 新規タブで対象のページが開かれる

⇒ ブログを表示していた<span class="text-red-500">元のタブが Amazon を偽装したフィッシングサイトに切り替えられてしまった！</span>

<Chat face="man" name="記事閲覧ユーザー">参考記事を見終わったから、さっきの記事に戻ろ～</Chat>

ここで元のタブの URL は `http://amazom.co.jp/` に変わっている（本物の Amazon は `https://amazon.co.jp/` ）

<Chat face="man" name="記事閲覧ユーザー">あれ、Amazon なんて開いていたっけ？<br>
まぁ「再度ログインしてください」って書いてあるし、ログインしておこうかな……</Chat>

ログイン処理を行うことで、<span class="text-red-500 font-bold">閲覧ユーザーの Amazon の ID、パスワードが盗まれてしまいました！</span>

> そして後日……

<Chat face="man" name="記事閲覧ユーザー">
おい、お前の記事を見ていたらフィッシングサイトに飛ばされて情報が盗まれた！　どうしてくれる！
</Chat>

<Chat face="toragra" name="ブログ執筆者">ええ！　僕は悪い事していないのに！</Chat>

なんてことにならないように、皆さん注意しましょう！

### target="\_blank" 脆弱性への対処法

**noopener オプション** を使用することで、脆弱性を突いた攻撃を防ぐことができます。

<alert>

`noopener` は、リンクで開かれる新規タブにおいて `window.opener` の値を null にして、参照できなくするというものです。

</alert>

#### リンクタグの target="\_blank" を使う場合

```html
<a href="リンク先のURL" target="_blank" rel="noopener noreferrer">
  <!-- noopener 未対応ブラウザ用に noreferrer も指定 -->
  ここをクリック！
</a>
```

#### JavaScript の window.open を使う場合

```js
window.open(
  'リンク先のURL',
  '適当なウィンドウ名称',
  'width=1280,height=720,noopener' // ← 第三引数に noopener を指定
)
```

<alert type="success">

2021/2/21 現在、多くのブラウザがこの脆弱性に対応済みで、 `noopener` の記述がなくとも安全に動作するようです。

ただし一部ブラウザ（`Vivaldi` など）や、旧バージョンの各種ブラウザには脆弱性が残っているので、今のところは `noopener` オプションを付けるよう心がけていたほうが良さそうです。

</alert>

### target="\_blank" 脆弱性の検証

最後に、実際に `window.opener` を使って、リンク元ページの URL を操作してみましょう。

> ※2021/2/21 現在、当ブログでは [Vivaldi](https://vivaldi.com/ja/) でのみ当脆弱性の検証確認ができました。
>
> 検証を実際に行ってみたい方は、Vivaldi をインストールするか、またはバージョンの古い Chrome, Firefox, ... などで検証してみてください。

まず以下のリンクをクリックしてください。

<a href="https://toragramming.com/" target="_blank">新規タブで当ブログのトップページを開きます。（脆弱性有り）</a>

続いてデベロッパーツールを開き（ブラウザ上で「Ctrl + Shift + I」を入力）、「コンソール」のタブで以下のコードを入力します。

```js
window.opener.location = 'https://google.com/'
```

<img-in-post src="vulnerability-test-1.png" alt='target="_blank" 脆弱性の検証1' width="768"></img-in-post>

<img-in-post src="vulnerability-test-2.png" alt='target="_blank" 脆弱性の検証2' width="768"></img-in-post>

遷移元のタブ（ここ）が Google のトップページに変わりましたね？

このように <span class="text-red-500">リンク元ページの URL を操作できるというのが、target="\_blank" の怖さ</span>です。

次に、脆弱性に対策を講じたリンクで同じことを試してみましょう。

<a href="https://toragramming.com/" target="_blank" rel="noopener noreferrer">新規タブで当ブログのトップページを開きます。（安全）</a>

<img-in-post src="vulnerability-test-3.png" alt='target="_blank" 脆弱性の検証3' width="512"></img-in-post>

エラーが発生し、遷移元のタブを操作できないことがわかります。これで安心です！

しっかりと脆弱性への対策をして、安全なサイトを構築していきましょう！
