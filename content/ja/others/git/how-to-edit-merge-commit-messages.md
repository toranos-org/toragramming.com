---
title: 【Git】マージコミットを修正する方法【git rebase -i -r】
description: Git でマージコミットを修正する方法（git rebase -i -r）を紹介します。
thumbnail: eyecatch.png
createdAt: 2020-08-03 00:00:00
updateAt: 2021-03-01 00:00:00
---

## 先にまとめ

### マージコミットのメッセージを修正したい場合

1. `git rebase -i --rebase-merges head~`
2. 対象のマージコミットの `merge -C ハッシュ値 ラベル名` の `-C` を `-c`（小文字）に変更する
3. コミットメッセージ編集状態（`git commit --amend` などと同じ状態）になるので、コミットメッセージを修正する

### マージ元ブランチのコミットを修正する

1. `git rebase -i --rebase-merges head~`
2. `git rebase -i head~` と同じように作業する
   1. コミットメッセージ左側に `pick` と表示されるので、これを適宜 `edit` や `squash` などに変更
   2. コミットメッセージを編集したり、コミットの内容を変更したり、コミットをまとめたりする（参考：[【git rebase -i】git の commit をまとめる](https://qiita.com/tsuuuuu_san/items/f708a9f7ea8ab8eb6945)）

## どんな状況で使う？

※管理上よろしいかどうかは置いておいて……

<img-in-post src="git-edit-merge-commit-when.png" alt="マージコミットを修正したい場面"></img-in-post>

では、以下２つの作業について手順を紹介します。

1. マージコミットのメッセージを修正
2. マージ元ブランチのコミットをまとめる

## 1. マージコミットのメッセージを修正

修正したいマージコミットを含むブランチにいる状態（上図の状態だと、`master` ブランチが対象）で、以下のコマンドを実行します。

```bash
git rebase -i --rebase-merges head~3
# または git rebase -i -r head~3
# head~○ の数字は、さかのぼるコミットログの数
```

すると、以下のようなコミット編集画面になります。

```bash
label onto

# Branch develop
reset efef77a # Update: リクルート内容 ～ 女性声優
pick a573a1d Update: `recruit` page and add `RecruitWrapper`
pick befbc9d Update: `recruit` page structure
pick d0ff9e8 Update: recruit top page to use vuex store data
pick 84e2b4a Add: recruit slug page
pick 256c175 Update: set `RecruitWrapper` min-height
pick 21dcf12 Update: リクルート個別ページの head 反映
# ★1. このあとのマージコミットのメッセージを修正したい場合
label develop # ★2. ここのラベルに基づいて……

# Branch develop-2
# （略）
label develop-2

# Branch develop-3
# （略）
label develop-3

reset onto
merge -c 60de973 develop # ★3. 「★2」のラベルと一致する行を見つけ、"-C" を "-c"（小文字）に変更する
merge -C e052557 develop-2
merge -C 42a68aa develop-3
```

上記のとおり、対象のコミットの `-C` を `-c` に変えたら、コミット編集画面を閉じます。

すると再びコミット編集画面が立ち上がるので、今度はコミットメッセージの編集を行います。

```bash
# Merge branch 'develop' ← 元のメッセージを消して……
修正後のメッセージを記載する
```

そしてコミット編集画面を閉じると、処理が走って、問題なければ完了となります。

## 2. マージ元ブランチのコミットをまとめる

修正したいマージコミットを含むブランチにいる状態で、以下のコマンドを実行します。

```bash
git rebase -i --rebase-merges head~3
# または git rebase -i -r head~3
# head~○ の数字は、さかのぼるコミットログの数
```

以降は基本的に `git rebase -i` の手順と一緒です。

（参考：[【git rebase -i】git の commit をまとめる](https://qiita.com/tsuuuuu_san/items/f708a9f7ea8ab8eb6945)）

```bash
label onto

# Branch develop
reset efef77a # Update: リクルート内容 ～ 女性声優
pick a573a1d Update: `recruit` page and add `RecruitWrapper`
pick befbc9d Update: `recruit` page structure
pick d0ff9e8 Update: recruit top page to use vuex store data
pick 84e2b4a Add: recruit slug page
squash 256c175 Update: set `RecruitWrapper` min-height # ★ 合成したいコミットを `squash` に設定
pick 21dcf12 Update: リクルート個別ページの head 反映
label develop

# 他の場所は変更しないで、編集画面を閉じる
```

## コンフリクトが起こって元に戻したい時

`git rebase --abort` すれば、とりあえず rebase 前の状態に戻ります。

## 参考記事

- https://stackoverflow.com/questions/7279196/git-how-to-edit-reword-a-merge-commits-message/#answer-61850632
- [【git rebase -i】git の commit をまとめる](https://qiita.com/tsuuuuu_san/items/f708a9f7ea8ab8eb6945)
