---
title: GitHub CLI 『gh』の使い方 for Windows
description: Windows で GitHub をコマンドラインベース操作できるようになる GitHub CLI を紹介します。
thumbnail: eyecatch.png
createdAt: 2020-02-17 00:00:00
updatedAt: 2020-02-18 00:00:00
---

## GitHub CLI とは

GitHub 公式製の **GitHub 操作コマンドラインツール** です。

[gh : The GitHub CLI tool](https://github.com/cli/cli)

注意: 2020/02/17 現在、gh は Beta 版ですので、今後仕様が変わる可能性があります。

GitHub の CLI といえば、[hub](https://github.com/github/hub) がありますが、公式はその違いを以下のように表明しています。

> 引用元：[Comparison with hub - gh](https://github.com/cli/cli#comparison-with-hub)
>
> 長年、`hub` が非公式の GitHub CLI ツールでした。 `gh` は、根本的に異なったデザインの公式 CLI ツールがどのようなものになるかを探求するための新しいプロジェクトです。どちらもターミナルで GitHub を使えるようにしますが、`hub` は `git` の `proxy` として動作し、一方 `gh` はスタンドアロンツールです。

## Windows でのインストール方法

※当記事は、Windows 環境を前提としています。

### インストーラーを利用する方法

[https://cli.github.com/](https://cli.github.com/) にアクセスし、`Download for Windows` をクリックし、インストーラーをダウンロードします。

<img-in-post src="how-to-install-github-cli-1.png" alt="GitHub CLI インストール手順 1"></img-in-post>

続いて、以下に従ってインストールを進めます。

<img-in-post src="how-to-install-github-cli-2.png" alt="GitHub CLI インストール手順 2"></img-in-post>

<img-in-post src="how-to-install-github-cli-3.png" alt="GitHub CLI インストール手順 3"></img-in-post>

<img-in-post src="how-to-install-github-cli-4.png" alt="GitHub CLI インストール手順 4"></img-in-post>

<img-in-post src="how-to-install-github-cli-5.png" alt="GitHub CLI インストール手順 5"></img-in-post>

<img-in-post src="how-to-install-github-cli-6.png" alt="GitHub CLI インストール手順 6"></img-in-post>

以上でインストールは完了です。

### Scoop を利用する方法

[Scoop](https://github.com/lukesampson/scoop) を導入されている方は、以下のコマンドでインストールができます。

```bash
scoop bucket add github-gh https://github.com/cli/scoop-gh.git
scoop install gh
```

## GitHub CLI の認証

初めて `gh` コマンドを実行すると認証を求められます。

適当なコマンドを実行してみましょう。

```bash
gh pr list
```

すると、以下のように表示されますので、`Enter` を押します。

```bash
Notice: authentication required
Press Enter to open github.com in your browser...
```

Web ブラウザが開くので、`Authorize github` ボタンを押下し、認証完了です。

<img-in-post src="how-to-authorize-github-cli-1.png" alt="GitHub CLI 認証手順 1"></img-in-post>

<img-in-post src="how-to-authorize-github-cli-2.png" alt="GitHub CLI 認証手順 2"></img-in-post>

## gh コマンドの使い方

`gh` では、以下 3 つのコマンド使用方法があります（2020/02/17 現在）。

- gh pr
  - pull request 関連のコマンド
- gh issue
  - issue 関連のコマンド
- gh help
  - gh コマンドのヘルプを参照する

上記の `gh pr`、`gh issue` について詳しく紹介していきます。

※以下で紹介するコマンドの使用方法は `gh help` または、[Manual | GitHub CLI Beta](https://cli.github.com/manual/) にて確認することができます。

## `gh pr` - Pull Request 関連

`gh pr` コマンドは以下の書式で実行します。

```bash
gh pr [status, list, view, checkout, create] [subcommand]
```

### gh pr create [subcommand]

プルリクエストを作成します。

| subcommand        | 概要                                                               |
| :---------------- | :----------------------------------------------------------------- |
| -B または --base  | マージ対象のブランチを指定 [ `gh pr create -B ブランチ名` ]        |
| -b または --body  | プルリクエストの内容を指定 [ `gh pr create -b 内容` ]              |
| -d または --draft | ドラフトとしてプルリクエストを作成 [ `gh pr create -d` ]           |
| -t または --title | プルリクエストのタイトルを指定 [ `gh pr create -t タイトル` ]      |
| -w または --web   | ブラウザで GitHub のプルリクエスト画面を開く [ `gh pr create -w` ] |

`gh pr create` で実行すると、任意のエディター上で、対話式で上記オプションを指定していくことができます。

#### `gh pr create` の実行例

まずコマンドを実行すると、プルリクエストの概要が表示されます。

`-B` オプションをつけていないので、マージ対象のブランチはデフォルトブランチになります。

```bash
gh pr create

Creating pull request for ブランチ名 into マージ対象のブランチ名 in リポジトリ名
```

最初にタイトルの入力を要求されますので、そのまま入力します。

```bash
? Title タイトルを入力
```

次に内容欄の入力を要求されます。

ここでは、`e` キーを押下して、テキストエディタを起動します。

```bash
? Body [(e) to launch notepad, enter to skip]
```

内容を入力し、テキストエディタを閉じると、以下のように表示されます。

```bash
? Body <Received>
```

最後に、「ブラウザで確認するか」「Submit するか」「キャンセルするか」を問われます。

```bash
? What's next?  [Use arrows to move, type to filter]
> Preview in browser
  Submit
  Cancel
```

矢印キーでカーソルマーク `>` を移動し、`Enter` で確定しましょう。

### gh pr status

プルリクエストのステータスを表示します。

#### 入力

```bash
gh pr status
```

#### 結果

```bash
Relevant pull requests in リポジトリ名

Current branch
  カレントブランチの PR 情報

Created by you
  自分が作成した PR 情報

Requesting a code review from you
  レビュー依頼されている PR の情報
```

### gh pr list [subcommand]

プルリクエストの一覧を表示します。

[subcommand] を指定することで、フィルタリングすることができます。

| subcommand           | 概要                                                      |
| :------------------- | :-------------------------------------------------------- |
| -a または --assignee | アサインされた人でフィルタリング [ `gh pr list -a 名前` ] |
| -l または --label    | ラベルでフィルタリング [ `gh pr list -l ラベル名` ]       |
| -L または --limit    | 表示件数の指定 [ `gh pr list -L 整数 [ 10 など ]` ]       |
| -s または --state    | open, clesed, merged, all のいずれかでフィルタリング      |

`gh pr list` = `gh pr list -s open` になります。

#### 入力例

```bash
gh pr list -s all
```

#### 出力例

```bash
Pull requests for リポジトリ名

#4 ..
#3 ....
#2 プルリクエスト #2 のタイトル
#1 プルリクエスト #1 のタイトル
```

### gh pr view { \<number> | \<url> | \<branch> } [subcommand]

指定されたプルリクエストをブラウザ、またはターミナル上で表示します。

- \<number> : #1, 2, 3 のようなプルリクエストに割り当てられる番号で指定（`#` は不要）
- \<url> : プルリクエストページの URL で指定
- \<branch> : ブランチ名で指定

| subcommand          | 概要                                                                                                    |
| :------------------ | :------------------------------------------------------------------------------------------------------ |
| -p または --preview | コマンド上でプルリクエスト内容のプレビューを行う（`fzf` のような他の CLI ツールとも連携できるようです） |

`-p` オプションを使わなければ、ブラウザで表示されます。

### gh pr checkout { \<number> | \<url> | \<branch> }

指定されたプルリクエストの branch に checkout します。

- \<number> : #1, 2, 3 のようなプルリクエストに割り当てられる番号で指定（`#` は不要）
- \<url> : プルリクエストページの URL で指定
- \<branch> : ブランチ名で指定

## `gh issue` - issue 関連

`gh issue` コマンドは `gh pr` と同じく、以下の書式で実行します。

```bash
gh pr [status, list, view, checkout, create] [subcommand]
```

各種オプション、サブコマンドの効果も `gh pr` と同じです。

## 雑感

2 年ほど前から Git を使用し始めた筆者ですが、**Git 操作についてはコマンド**で（`VSCode` のターミナルを使用）、**GitHub 操作については GitHub Desktop**で行っていました。

[GitHub Desktop](https://desktop.github.com/)は、グラフィカルに Git の操作ができて大変便利なのですが、マウス操作ベースなので CLI に比べて手間がかかり、ストレスに感じていました。

そこで `GitHub CLI` を導入して、ターミナル上で操作できるようになったので、とても快適になりました。

まだ `GitHub CLI` は Beta 版で、`hub` と比べると機能が劣っているように感じる点もありますが、今後の発展が大いに期待できるのでぜひ使ってみてください！

## 参考サイト

[Manual - GitHub CLI Beta](https://cli.github.com/manual/)

[Supercharge your command line experience: GitHub CLI is now in beta - The GitHub Blog](https://github.blog/2020-02-12-supercharge-your-command-line-experience-github-cli-is-now-in-beta/?utm_campaign=1581528372&utm_medium=social&utm_source=facebook,linkedin,twitter&utm_content=1581528372)
