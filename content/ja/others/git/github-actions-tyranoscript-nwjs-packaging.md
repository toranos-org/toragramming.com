---
title: GitHub Actions で NW.js（TyranoScript Ver4 系）の Windows 向けパッケージングと Releases への添付を自動化
description: GitHub Actions で、NW.js（TyranoScript Ver4 系）の Windows 向けパッケージングと Releases 作成、およびパッケージングデータの添付までを自動化するワークフローの紹介
createdAt: 2022-08-04 20:17
updatedAt: 2022-08-04 20:17
---

## 前置き

TyranoScript Ver4 系って 2022 年現在使っている人はどれくらいいるのだろうか……。

いまや TyranoScript Ver5 系 × TyranoStudio で開発からパッケージングまで一貫して出来るので、 Ver4 系使ってる人ほとんどいないような気もしますが。

<span class="marker-red"> **TyranoScript Ver4 系のパッケージング** </span>、あるいは <span class="marker-red">**NW.js パッケージング**</span> のワークフローとして参考になれば幸いです。

ディレクトリ構成やリソースファイルが基本 TyranoScript ベースなので、NW.js に興味があってご覧くださっている方は、そのあたり適宜読み替えて頂けますと幸いです。

### ディレクトリ構成

```bash
tyranoscriptv4-packaging-test/
  ├ .github/
  │   └ workflows/
  │     └ packaging.yml  ← ワークフローファイル
  ├ binwin/              ← NW.js のファイル群（ nw.exe などが入っている）
  ├ data/                ← プロジェクトファイル
  ├ node_modules/        ← プロジェクトファイル
  ├ tyrano/              ← プロジェクトファイル
  ├ index.html           ← プロジェクトファイル（エントリポイント）
  ├ link.png             ← プロジェクトファイル（favicon）
  └ package.json         ← プロジェクトファイル（設定ファイル）
```

## 完成形

`.github/workflows/packaging.yml`

```yml
name: packaging
on:
  push:
    tags:
      - 'v*'
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Get repository name
        id: get_repository_name
        run: |
          REPOSITORY=$(echo ${{ github.repository }} | sed -e "s#.*/##")
          echo ::set-output name=repository::$REPOSITORY

      - name: Get package title
        id: get_package_title
        run: |
          TITLE=$(cat package.json | head -2 | tail -1 | sed -e 's/ *"name": //' | sed -e 's/,//' | sed -e 's/"//g')
          echo ::set-output name=title::$TITLE

      - name: Get commit summary
        id: get_commit_summary
        run: |
          PREVIOUS_TAG=$(git tag --sort=-creatordate | sed -n 2p)
          echo "PREVIOUS_TAG: $PREVIOUS_TAG"
          COMMIT_SUMMARY="$(git log --oneline --pretty=tformat:"%h %s" $PREVIOUS_TAG..${{ github.ref }})"
          COMMIT_SUMMARY="${COMMIT_SUMMARY//$'\n'/'%0A'}"
          echo ::set-output name=commit_summary::$COMMIT_SUMMARY

      - name: Copy project files
        run: |
          mkdir project-files
          cp -r data project-files
          cp -r tyrano project-files
          cp -r node_modules project-files
          cp index.html package.json link.png project-files

      - name: Create zip file
        run: |
          cd project-files
          zip -r app.nw *

      - name: Create exe file
        run: |
          TITLE="${{ steps.get_package_title.outputs.title }}"
          mv project-files/app.nw binwin
          cd binwin
          cat nw.exe app.nw > "$TITLE.exe"

      - name: Delete unnecessary files
        run: |
          cd binwin
          rm nw.exe app.nw

      - name: Create Release Asset
        run: |
          REPOSITORY=${{ steps.get_repository_name.outputs.repository }}
          mv binwin $REPOSITORY
          zip -r "$REPOSITORY.zip" $REPOSITORY

      - name: Create release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: |
            ${{ steps.get_commit_summary.outputs.commit_summary }}
          draft: false
          prerelease: false

      - name: Upload Release Asset
        id: upload-release-asset
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./${{ steps.get_repository_name.outputs.repository }}.zip
          asset_name: ${{ steps.get_repository_name.outputs.repository }}.zip
          asset_content_type: application/zip
```

## 解説

完成形のワークフローファイルについて、ここから順に解説していきます。

※各所で `${{ github.??? }}` というコンテキストを使用していますが、こちらについては [公式サイト](https://docs.github.com/ja/actions/learn-github-actions/contexts#github-context) を参照しながらお読み頂けますとわかりやすいかと思います。

### `v` から始まるタグ作成時に Job 実行

```yml
on:
  push:
    tags:
      - 'v*'
```

`v1.0.0` `v2.0` `v300` など、 `v` から始まるタグを作成したときに以後の Job が実行されます。

### 各種 output の作成

<span class="marker-red"> **後の処理で値を参照できるように、 output （変数的なもの）を作成** </span>します。

後の処理で、 `${{ steps.[id].outputs.[name] }}` の形式で値を参照できるようになります。

#### Get repository name

```yml
- name: Get repository name
  id: get_repository_name
  run: |
    REPOSITORY=$(echo ${{ github.repository }} | sed -e "s#.*/##")
    echo ::set-output name=repository::$REPOSITORY
```

GitHub リポジトリ名の取得（Releases に添付する ZIP ファイル名に使用します）。

`${{ steps.get_repository_name.outputs.repository }}` で参照できるように設定しています。

リポジトリ名を取得する `${{ github.repository }}` は **organization_name/repository_name** の形式で名称を返してくるため、以下のコマンドで `repository_name` の部分だけ切り取っています。

```bash
$(echo ${{ github.repository }} | sed -e "s#.*/##")
```

#### Get package title

```yml
- name: Get package title
  id: get_package_title
  run: |
    TITLE=$(cat package.json | head -2 | tail -1 | sed -e 's/ *"name": //' | sed -e 's/,//' | sed -e 's/"//g')
    echo ::set-output name=title::$TITLE
```

package.json の `name` パラメータ取得（NW.js の パッケージング EXE ファイル名に使用します）。

`${{ steps.get_package_title.outputs.title }}` で参照可。

`package.json` は以下のようなファイルです。

```json
{
  "name": "tyranoscript-packaging-test",
  "version": "0.0.1",
  "main": "index.html"
}
```

以下コマンドで、 `package.json` 2 行目の `name` パラメータの値を取得しています。

※2 行目以外の場所に `name` がある場合は考慮していません 🙇

```bash
$(cat package.json | head -2 | tail -1 | sed -e 's/ *"name": //' | sed -e 's/,//' | sed -e 's/"//g')
```

#### Get commit summary

```yml
- name: Get commit summary
  id: get_commit_summary
  run: |
    PREVIOUS_TAG=$(git tag --sort=-creatordate | sed -n 2p)
    echo "PREVIOUS_TAG: $PREVIOUS_TAG"
    COMMIT_SUMMARY="$(git log --oneline --pretty=tformat:"%h %s" $PREVIOUS_TAG..${{ github.ref }})"
    COMMIT_SUMMARY="${COMMIT_SUMMARY//$'\n'/'%0A'}"
    echo ::set-output name=commit_summary::$COMMIT_SUMMARY
```

Git の過去ログから、今回タグと前回タグの差分コミットメッセージを取得（GitHub Releases の詳細メッセージとして利用します）。

`${{ steps.get_commit_summary.outputs.commit_summary }}` で参照可。

※以下の記事をまるまる真似させていただきました ↓↓

[GitHub Actions で tag の push を trigger に前 tag からの差分をまとめた release を生成する](https://zenn.dev/seita/articles/d1dba77043be8fd50eeb)

### プロジェクトファイルの ZIP 化

```yml
- name: Copy project files
  run: |
    mkdir project-files
    cp -r data project-files
    cp -r tyrano project-files
    cp -r node_modules project-files
    cp index.html package.json link.png project-files
- name: Create zip file
  run: |
    cd project-files
    zip -r app.nw *
```

HTML ファイル等のプロジェクトに必要なリソースを `project-files` フォルダにコピーし、ZIP 化します。

<alert type="warning">

Create zip file のコマンドについて、 `cd project-files` をせずに `zip -r app.nw project-files/*` とすると、正しくパッケージングできませんでした。

</alert>

### パッケージング

```yml
- name: Create exe file
  run: |
    TITLE="${{ steps.get_package_title.outputs.title }}"
    mv project-files/app.nw binwin
    cd binwin
    cat nw.exe app.nw > "$TITLE.exe"
```

NW.js のパッケージングとして、 先ほど作成した ZIP ファイル `app.nw` と `nw.exe` をファイル結合します。

結合後のファイル名には [Get package title](#get-package-title) で取得した名称を使用しています。

※ここで使用している `binwin` フォルダ（およびその中のファイル群）は、[NW.js 公式サイトからダウンロード](https://nwjs.io/downloads/)したものです。

### 不要なファイルの削除

```yml
- name: Delete unnecessary files
  run: |
    cd binwin
    rm nw.exe app.nw
```

後ほど Release Asset として `binwin` フォルダを ZIP 化するため、その中に入っている不要なファイル（結合する前のファイル）を削除しておきます。

### Release Asset の作成

```yml
- name: Create Release Asset
  run: |
    REPOSITORY=${{ steps.get_repository_name.outputs.repository }}
    mv binwin $REPOSITORY
    zip -r "$REPOSITORY.zip" $REPOSITORY
```

Release に添付できるように、先程の `binwin` フォルダを ZIP 化しておきます。

ZIP ファイル名には [Get repository name](#get-repository-name) で取得した GitHub リポジトリ名を利用しています。

### GitHub Release の作成

```yml
- name: Create release
  id: create_release
  uses: actions/create-release@v1
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    tag_name: ${{ github.ref }}
    release_name: Release ${{ github.ref }}
    body: |
      ${{ steps.get_commit_summary.outputs.commit_summary }}
    draft: false
    prerelease: false
```

タグ名（ `tag_name` ）には作成したタグ名をセット。（例： `v1.0.0`）

リリース名（ `release_name` ）には “Release” + タグ名をセット。（例： `Release v1.0.0`）

リリースの説明文（ `body` ）には、[Get commit summary](#get-commit-summary) で取得した「今回タグと前回タグの差分コミットメッセージ」を設定します。

参考記事 → [GitHub Actions で tag の push を trigger に前 tag からの差分をまとめた release を生成する](https://zenn.dev/seita/articles/d1dba77043be8fd50eeb)

### Release Asset の添付

```yml
- name: Upload Release Asset
  id: upload-release-asset
  uses: actions/upload-release-asset@v1
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    upload_url: ${{ steps.create_release.outputs.upload_url }}
    asset_path: ./${{ steps.get_repository_name.outputs.repository }}.zip
    asset_name: ${{ steps.get_repository_name.outputs.repository }}.zip
    asset_content_type: application/zip
```

作成した ZIP ファイルを GitHub Release に添付します。

ここで指定する `asset_path` や `asset_name` には作成した ZIP ファイル名が必要となるため、[Get repository name](#get-repository-name) で取得した GitHub リポジトリ名を利用します。

参考情報 → [upload-release-asset](https://github.com/actions/upload-release-asset)

## あとがき

### このワークフローを作った経緯

同人サークル [STail](https://twitter.com/STail_Official) にて開発中のノベルゲーム [YouthSignal](https://youthsingal.stail-gamers.com) では、TyranoScript Ver4 系を改造したエンジンを利用しております。

TyranoScript では TyranoRider というツールでパッケージング出来る仕組みがありますが、一部の設定が TyranoRider ではサポートされていなかったことから、パッケージングツールを自作した過去があります。 → [TyranoScript のパッケージングツールを自作する](https://qiita.com/TigRig/items/bd5c5d3990f8276bd541)

これで万事解決！ と思って数年…… YouthSignal は毎月の分割リリースを始めました。

毎月１本パッケージングするのも面倒ですが、何より<span class="marker-red">**不具合が起こったときにそのバグフィックスを数十本にも反映させて再パッケージングするのが大変でした。**</span>

従来のパッケージングまでのフローは以下のとおりです。

- スクリプターの作業
  - GitHub 上で管理しつつスクリプト制作
  - 完成次第、エンジニアにパッケージング連絡
- エンジニア（パッケージング）の作業
  - 上記連絡を頂きしだい作業開始
  - [TyranoScriptPackager](https://github.com/tigrig29/TyranoScriptPackager) でパッケージングを行う
  - GitHub Release を作成
  - パッケージングファイルを ZIP 化して GitHub Release に添付

特に「パッケージングしてー！」 → パッケージング作業 → 「パッケージング終わったよー！ Release からダウンロードしてー！」とテンプレート的なやり取りを毎回行うのが面倒で、自動化する動機の一つとなりました。

また NW.js を使っているという点でも、NW.js は[公式サイト](https://docs.nwjs.io/en/latest/For%20Users/Package%20and%20Distribute/)にもある通り shell コマンドベースでパッケージング出来るため、GitHub Actions で簡単に自動化出来るのでは！？ と思った次第でした。

### GitHub Actions でパッケージング自動化してみて

現在は以下のフローでパッケージング出来るようになりました。

- スクリプターの作業
  - GitHub 上で管理しつつスクリプト制作
  - スクリプト完成次第、 Git で `v1.0.0` のようなタグを作成して頂く
    - → 自動で GitHub 上に Releases が生成され、パッケージングデータがアップロードされる
- エンジニアの作業
  - なし

<span class="marker-red">**パッケージング自体にかかる作業時間が大幅に短縮でき、また毎回スクリプター → エンジニアへ連絡する必要もなくなり、なかなか効率化出来た**</span>のではないかと思います。

私個人の振り返りとしては、今まで GitHub Actions を触ったことがなかったため、なんで早くやっとかなかったんだ……という後悔はありつつも、今回を機に GitHub Actions を最低限扱えるようになって良かったと思います。

これからも単純作業をどんどん自動化して、効率上げていきたい！

<chat face="toragra">

YouthSignal は、2022 年 8 月現在で Volume1 ～ 20 まで、累計 20 本リリースしているよ！

良かったら YouthSignal の [公式ホームページ](https://youthsignal.stail-gamers.com/) や [Ci-en](https://ci-en.net/creator/2349/article/412646) も見てみてね！

</chat>

## 参考記事

### NW.js のパッケージング

- https://docs.nwjs.io/en/latest/For%20Users/Package%20and%20Distribute/

### GitHub Actions まわり

- https://docs.github.com/ja/actions/learn-github-actions/contexts#github-context
- https://github.com/actions/create-release
- https://github.com/actions/upload-release-asset
- https://zenn.dev/hashito/articles/aef4de448f341b
- https://qiita.com/hotpepsi/items/756bf03812af66fdeb8c
- https://zenn.dev/seita/articles/d1dba77043be8fd50eeb
