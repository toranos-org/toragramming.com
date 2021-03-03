---
title: TyranoScript Ver 5.00 と TyranoStudio でノベルゲーム開発！
description: ノベルゲーム制作エンジン TyranoScript の Ver 5.00 （最新版）と、ノベルゲーム制作支援 GUI ツール TyranoStudio の使い方を紹介します。
thumbnail: eyecatch.png
createdAt: 2020-03-11 00:00:00
---

2020 年の 1 月、TyranoScript に待望のバージョンアップデートが来ました！

[ティラノスクリプト V5.0 ベータ版を配布開始。新ツール「ティラノスタジオ」も同時公開。](https://tyranos.me/archives/1652)

ということで、TyranoScript Ver 5.00 と TyranoStudio を用いたノベルゲームの開発方法を紹介します。

## 開発の準備

### ダウンロード

まずは、[ティラノスクリプト ベータ版のダウンロード](https://tyrano.jp/dl/alpha_v5) より、`TyranoScript Ver 5.00` および `TyranoStudio` をダウンロードしましょう。

<img-in-post src="how-to-get-tyrano.png" alt="TyranoScript/TyranoStudio ダウンロード方法"></img-in-post>

### TyranoStudio の起動と、プロジェクトのロード

ダウンロードが完了したら、以下の手順で TyranoStudio を起動、および TyranoScript Ver 5.00 のサンプルゲームをロードします。

- ダウンロードした 2 つの ZIP ファイルを展開
- 展開した `TyranoStudio-win32-x64` フォルダの中の、`TyranoStudio.exe` を起動
- 起動した TyranoStudio 画面の右上『プロジェクト選択』をクリック
- 展開した `tyranoscript_v500_beta_3` フォルダの中の `index.html` を選択

<img-in-post src="how-to-load-tyrano-01.png" alt="TyranoStudio ゲームロード手順 1"></img-in-post>
<img-in-post src="how-to-load-tyrano-02.png" alt="TyranoStudio ゲームロード手順 2"></img-in-post>
<img-in-post src="how-to-load-tyrano-03.png" alt="TyranoStudio ゲームロード手順 3"></img-in-post>
<img-in-post src="how-to-load-tyrano-04.png" alt="TyranoStudio ゲームロード手順 4"></img-in-post>
<img-in-post src="how-to-load-tyrano-05.png" alt="TyranoStudio ゲームロード手順 5"></img-in-post>
<img-in-post src="how-to-load-tyrano-06.png" alt="TyranoStudio ゲームロード手順 6"></img-in-post>
<img-in-post src="how-to-load-tyrano-07.png" alt="TyranoStudio ゲームロード手順 7"></img-in-post>

これで、開発の準備は完了です！

## ゲームの実行

まず初めに、ロードしたサンプルゲームを実行してみましょう。

右上の `ゲーム再生` ボタン、またはサイドバーの `プレビュー` → `ゲーム再生` ページの `ゲームを再生する` ボタンで実行できます。

<img-in-post src="tyranostudio-preview-play.png" alt="TyranoStudio ゲームの再生方法"></img-in-post>

## スクリプトの編集：エディタでシナリオファイルを開く

次に、ゲームの動作を定義している `スクリプト` を編集し、ゲーム動作を変更してみましょう。

サイドバーの `開発` → `エディタ` でスクリプトエディタを開きます。

<img-in-post src="tyranostudio-dev-editor-01.png" alt="TyranoStudio エディタの使い方 1"></img-in-post>

続いて `読込` ボタンの左側のテキストボックスに、`ks` と入力してみましょう。

<img-in-post src="tyranostudio-dev-editor-02.png" alt="TyranoStudio エディタの使い方 2"></img-in-post>

シナリオファイル一覧が表示されましたね！

このテキストボックスは、**開きたいシナリオファイル名を入力するエリア**で、入力した文字列から対象のファイル名を推測表示してくれます。

<chat face="toragra">

全てのファイルを表示したいときは、`ks` と入力すると良いですよ！

</chat>

では、`scene1.ks` を選択し、`読込` ボタンをクリックしましょう。

<img-in-post src="tyranostudio-dev-editor-03.png" alt="TyranoStudio エディタの使い方 3"></img-in-post>

## スクリプトの編集：支援機能を使う

スクリプトを開くことができたので、少し編集してみましょう。

こんな動作を目指します。

<alert :icon-visible="false">

- BGM を再生（対象ファイルは、サンプルゲームに同梱のもの）
- 背景を『廊下』に変更
- キャラクター「アカネ」を表示
  - 表情は「悲しい」
  - 表示位置は、画面中央よりも少し左
- カメラズーム

</alert>

`scene1.ks` の 45 行目 `「さて、ゲームが簡単に作れるというから、来てみたものの[p]` の下に、これらの処理スクリプトを記述していきます。

……しかし、<span class="marker-red">**BGM 再生、背景変更 ……どうやって書けば実装できるのか、わからなかったり、忘れたりしちゃいますよね**</span>。

そんなときには、TyranoStudio の<span class="marker-red">**タグ入力支援機能**</span>を使用しましょう！

### タグリファレンス

『タグリファレンス』ページには、以下のような支援機能があります。

<alert type="success" :icon-visible="false">

- ① タグ検索
  - タグ名の一部でも知っていれば、絞り込み検索することが可能
- ② タグ詳細の参照
  - パラメータ、解説、サンプルコードを参照する
  - 一部のタグ（`[camera]` など）には、デモサイトへのリンクも
- ③ タグの作成
  - 作成したタグは `コピー` 可能
- ④ タグの実行
  - ③ で作成したタグを、再生中ゲームにテスト反映する

</alert>

サイドバー `開発` → `タグ` で『タグリファレンス』ページを開き、以下の機能を試してみてください。

#### ① タグ検索

<img-in-post src="tyranostudio-dev-tag-search.png" alt="TyranoStudio タグ検索"></img-in-post>

#### ② タグ詳細の参照

<img-in-post src="tyranostudio-dev-tag-details.png" alt="TyranoStudio タグ詳細の参照"></img-in-post>

#### ③ タグの作成

<img-in-post src="tyranostudio-dev-tag-create.png" alt="TyranoStudio タグの作成"></img-in-post>

#### ④ タグの実行

<img-in-post src="tyranostudio-dev-tag-execute.png" alt="TyranoStudio タグの実行"></img-in-post>

<video controls autoplay loop src="/assets/gamedev/tyranoscript/how-to-develop-tyranoscript-ver5-tyranostudio/tyranostudio-tag-execute.mp4"></video>

### ゲーム素材

『ゲーム素材』ページには、以下のような支援機能があります。

<alert type="success" :icon-visible="false">

- ① 素材参照
  - 各種画像や音声、動画ファイルの一覧表示
  - プレビューも表示できる
- ② 座標プレビュー
  - 画像素材に限り、再生中ゲームに素材を乗せて、座標確認が可能

サイドバー `開発` → `ゲーム素材` で『ゲーム素材』ページを開き、以下の機能を試してみてください。

</alert>

#### ① 素材参照

<img-in-post src="tyranostudio-dev-assets-refer.png" alt="TyranoStudio ゲーム素材参照"></img-in-post>

※『ゲーム素材』ページに表示されている素材は、全て `プロジェクトフォルダ/data/` 以下にあります。

<img-in-post src="tyranostudio-dev-assets-directories.png" alt="TyranoStudio ゲーム素材のディレクトリ"></img-in-post>

#### ② 座標プレビュー

<img-in-post src="tyranostudio-dev-assets-preview.png" alt="TyranoStudio 座標プレビュー"></img-in-post>

### キャラクター

『キャラクター』ページでは、

<alert type="success" :icon-visible="false">

- 定義済みキャラクター要素一覧の確認
- キャラクター関連タグの作成

</alert>

が可能です。

※この機能は、<span class="marker-blue">**ゲーム再生中**</span>のみ使用できます。

ゲームを再生した状態で、サイドバー `開発` → `キャラクター`を開きましょう。

<img-in-post src="tyranostudio-dev-character.png" alt="TyranoStudio キャラクターページ">]</img-in-post>

## スクリプトの編集：実演

目標とする動作は、以下のとおりです。

<alert :icon-visible="false">

- BGM を再生（対象ファイルは、サンプルゲームに同梱のもの）
- 背景を『廊下』に変更
- キャラクター「アカネ」を表示
  - 表情は「悲しい」
  - 表示位置は、画面中央よりも少し左
- カメラズーム

</alert>

TyranoStudio の各種支援機能を用いて、上記スクリプトを制作する様子を動画にしてみました。

<video controls src="/assets/gamedev/tyranoscript/how-to-develop-tyranoscript-ver5-tyranostudio/tyranostudio-edit-game-demo.mp4"></video>

最終的に実装したコードは以下のとおりです。

```ks
; ============= ↓ ここから編集 ↓ =============
[playbgm  storage="music.ogg"   ]
[bg  storage="rouka.jpg"   ]
[chara_show  name="akane"  face="default"  left="157" top="46"  ]
[camera  zoom="2"  ]
; ============= ↑ ここまで編集 ↑ =============
```

## 動作確認

TyranoStudio では、動作確認の支援機能もいくつか提供されています。

### デバッグコンソール ～ 実行中スクリプトの確認

`デバッグコンソール` 機能を使うことで、<span class="marker-red">**再生中のゲームについて、「現在どこのスクリプトを実行しているのか」をリアルタイムに確認**</span>することができます。

<video controls autoplay loop src="/assets/gamedev/tyranoscript/how-to-develop-tyranoscript-ver5-tyranostudio/tyranostudio-debug-console.mp4"></video>

### 変数ウォッチ ～ 定義した変数の値の監視

`変数ウォッチ` 機能を使うことで、<span class="marker-red">**スクリプトで定義したゲーム内変数の値の変化をリアルタイム監視する**</span>ことができます。`デバッグコンソール` 同様に、ゲーム再生中でのみ使える機能です。

『変数』がわからないという方は、こちらの記事を御覧ください → [変数と演算を活用する - ティラノスクリプト](https://tyrano.jp/usage/tech/hensuu)

実験用に、`エディタ` で変数を定義してからゲームを再生してみましょう。

```ks
; ============= ↓ ここから編集 ↓ =============
[iscript]
  f.gameVar = 1;
  tf.tmpGameVar = 'hello';
  sf.systemGameVar = [true, false];
[endscript]
; ============= ↑ ここまで編集 ↑ =============
```

<img-in-post src="tyranostudio-preview-watch-var-01.png" alt="TyranoStudio 変数ウォッチの使い方 1"></img-in-post>

<img-in-post src="tyranostudio-preview-watch-var-02.png" alt="TyranoStudio 変数ウォッチの使い方 2"></img-in-post>

<alert type="warning">

『ゲーム内の変数をすべて追加』ボタンは、再生中ゲームにおいて、現時点で存在している変数のみを表示します。また、変数の数が極端に多い場合、読み込みに時間がかかる可能性もあります。

</alert>

## 完成したゲームを配布する（パッケージング）

最後に、ゲームのパッケージング（配布用データの出力）方法を紹介します。

まず TyranoStudio で、サイドバー `エクスポート` → `配布用パッケージング` ページを開きます。

`配布用パッケージング` では、以下の設定が可能です。

<alert type="success" :icon-visible="false">

- 配布形式
  - `ブラウザ`、`Windows`、`Mac`、`Linux` の 4 つのプラットフォームから選択可能
- 対応 PC
  - 『配布形式』が `Windows`、`Mac`、`Linux` の場合、`64bit OS` 向けか、`32bit OS` 向けかを選択可能
- アイコン設定
  - ゲームのアイコンに、独自の画像ファイルを設定
- ウィンドウ
  - ゲーム画面のサイズを、ユーザーが自由に変えられるようにする設定
- ファイル
  - **ゲームの素材ファイルを隠す設定（[後述](###ゲームの素材ファイルを隠す)）**

</alert>

まず TyranoStudio で、サイドバー `エクスポート` → `配布用パッケージング` ページを開きます。

<img-in-post src="tyranostudio-export-packaging-01.png" alt="TyranoStudio パッケージング方法 1"></img-in-post>

<img-in-post src="tyranostudio-export-packaging-02.png" alt="TyranoStudio パッケージング方法 2"></img-in-post>

<img-in-post src="tyranostudio-export-packaging-03.png" alt="TyranoStudio パッケージング方法 3"></img-in-post>

### ゲームの素材ファイルを隠す

`ファイルを隠蔽する` 設定について詳しく紹介します。

`ファイルを隠蔽する` のチェックを外したままエクスポートすると……

パッケージフォルダの `resources/app` 以下に、<span class="marker-blue">**全てのティラノスクリプト素材ファイルがそのまま配置**</span>されます。

<img-in-post src="tyranostudio-export-hide-app-01.png" alt="TyranoStudio パッケージファイル隠蔽 1"></img-in-post>

<alert type="danger">

この状態だと、`data/fgimage` からキャラの立ち絵画像を抜き取ったり、`data/scenario` 内のシナリオファイルを読んで攻略方法を解析する……などのことが容易にできてしまいます。

</alert>

一方、`ファイルを隠蔽する` のチェックをつけてエクスポートすると……

<img-in-post src="tyranostudio-export-hide-app-02.png" alt="TyranoStudio パッケージファイル隠蔽 2"></img-in-post>

素材ファイルが隠蔽され、簡単には解析できない状態になりましたね！

※一応、このファイルを展開する方法もあるにはありますが、ここでは紹介しません。

<alert type="warning">

`ファイルを隠蔽する` の注釈にも書いてあるとおり、隠蔽を行うと**ゲームの起動時間が遅くなる**ことがありますので、実際に試してみて検討して下さい。

</alert>

## まとめ

ということで、一通り TyranoScript Ver 5 × TyranoStudio での開発手順を紹介しました！

筆者自身、とても便利になったと感じていますが、まだこれらは β 版で、これからより良くなっていくと思われますので、楽しみに待ちましょう 😆

また、当記事では紹介していない TyranoStudio の機能もいくつかあります。

- `プレビュー` → `ゲーム再生` ページの『デバッグを表示する』オプション
- `プレビュー` → `セーブデータ` ページの機能
- `開発` → `カラーパレット` ページの機能
- `その他` → `セッティング` ページの機能（2020/03/10 時点では、まだ開発中のようです）

これらも簡単に扱える便利機能なので、ぜひ実際に操作してみてください。
