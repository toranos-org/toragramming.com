---
title: Nuxt.js + TypeScript + Vuex で簡単な Todo リストを作るチュートリアル
description: Nuxt + TypeScript + Vuex で簡単な Todo リストを作るチュートリアルの紹介です。Nuxt のバージョンは v10 - v14 が対象です。
thumbnail: eyecatch.png
---

## はじめに

Nuxt.js + TypeScript + Vuex（ストア）で簡単な Todo リスト制作を行った際の覚書です。

完成品はこちら → https://github.com/tigrig29/todo-nuxt-typescript

**2019/09/20 執筆**

- Nuxt
  - v2.10.0 ～ v2.14.0 あたりが対象です（v2.15.0 は未確認です）

**[Nuxt TypeScript 公式](https://typescript.nuxtjs.org/) も参照して、比較しながら読んで頂けると幸いです**。

### 対象

- Nuxt.js 経験あり
- TypeScript 試したい
- Vuex（ストア）も使ってちゃんと型推論（入力補完）させたい

### 筆者の環境

- Windows10
- VSCode
- yarn

## Nuxt + TypeScript の環境構築

当記事では触れません。

環境構築が必要な方は、以下の記事を参考にしてみてください。

[Nuxt + TypeScirpt 環境構築 for Windows, VSCode（2019/09/20）](../nuxt-typescript-vscode-env-2019-09/)

また、Nuxt + TypeScript + Vuex の基本的な構築方法だけを知りたい方は、[Nuxt + TypeScript で Vuex を扱うために ～ vuex-module-decorators](../nuxt-typescript-vuex-how-to) を御覧ください。

## ディレクトリ構成

今回、[Nuxt + TypeScript の環境構築](#nuxt--typescript-の環境構築)に加えて、作成するフォルダ、ファイルは以下のとおりです。

```diff[ディレクトリ構成]
  @
  ├── assets
  ├── components
  ├── layouts
  ├── middleware
+ ├── models
+ │   ├── HTMLElementEvent.ts ← クリックイベント等の e.target を型推論できるようにする型定義ファイル
+ │   └── Todo.ts ← Todo の型定義ファイル
  ├── pages
+ │   └── index.vue ← 編集： 簡単な Todo リストページ の vue ファイル
  ├── plugins
  ├── static
  ├── store
+ │   ├── index.ts ← Store をインポートするための定義を記述するファイル１
+ │   └── todos.ts ← Todo リストのストア
+ └── utils
+     └── store-accessor.ts ← Store をインポートするための定義を記述するファイル２
```

## vuex-module-decorators のインストール

Nuxt + TypeScript + Vuex で型推論を行えるようにするため、`vuex-module-decorators` をインストールします。

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add -D vuex-module-decorators
```

  </code-block>
  <code-block label="NPM">

```bash
npm install --save-dev vuex-module-decorators
```

  </code-block>
</code-group>

## Todo を管理する Store の作成

### `~/models/Todo.ts` の作成

あらかじめ Todo の型定義を作成しておきます。

```typescript[models/Todo.ts]
export interface Todo {
  id: number
  text: string
  done: boolean
}
```

### `~/store/todos.ts` の作成

続いて、Todo リストの Store を作成します。

基本的には Nuxt で Store を作成するとき（モジュールモード）と同様ですが、今回は JavaScript ではなく TypeScript で記述します。

具体的なコードの内容は、コード内のコメントを参照してください。

```typescript[store/todos.ts]
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { Todo } from '~/models/Todo'

// stateFactory: true → Vuex をモジュールモードで扱うために指定
@Module({ stateFactory: true, namespaced: true, name: 'todos' })
export default class Todos extends VuexModule {
  todos: Todo[] = []

  /**
   * Todo を追加する
   * @param text Todo テキスト
   */
  @Mutation
  add(text: string) {
    const todos: Todo[] = this.todos
    // Todo を作成
    const todo: Todo = {
      // リストがない場合、id = 0
      // リストがある場合、id = リストの最終要素の id + 1
      id: todos.length === 0 ? 0 : todos[todos.length - 1].id + 1,
      text,
      done: false
    }
    // リストに Todo を追加
    this.todos.push(todo)
  }

  /**
   * Todo を削除する
   * @param todo 削除する Todo インスタンス
   */
  @Mutation
  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1)
  }

  /**
   * Todo の done（完了状態）を切り替える
   * @param todo 完了状態を切り替える対象の Todo インスタンス
   */
  @Mutation
  toggle(todo: Todo) {
    todo.done = !todo.done
  }
}
```

## Store をインポートするためのファイル作成

## `~/utils/store-accessor.ts` の作成

作成した Store（Todo リスト）をインポートするための `store-accessor.ts` を作成します。

```typescript[utils/store-accessor.ts]
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Todos from '~/store/todos'

// eslint-disable-next-line import/no-mutable-exports
let todosStore: Todos

/**
 * ストアを初期化する（型推論できるモジュールとして取得する）
 * @param store Vuex.Store
 */
function initializeStores(store: Store<any>): void {
  // Todos を型推論できるストアモジュール化
  todosStore = getModule(Todos, store)
}

export { initializeStores, todosStore }
```

コード中間の `// eslint-disable-next-line import/no-mutable-exports` は、ESLint の設定によっては不要です。

※ [vuex-module-decorators - npm](https://www.npmjs.com/package/vuex-module-decorators) ので説明されているコードをそのまま使っていますが、TypeScript エラーとなります。仕方ないので、ESLint を無効化しています。

### `~/store/index.ts` の作成

`store` ディレクトリ直下に `index.ts` ファイルを作成します。

これは `~/utils/store-accessor.ts` と連携して、 **Component 等の vue ファイルから Store にアクセスできるようにするファイル** です。

```typescript[store/index.ts]
import { Store } from 'vuex'
import { initialiseStores } from '~/utils/store-accessor'
const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]
export * from '~/utils/store-accessor'
```

## `~/pages/index.vue` の編集： Todo リストの実装

`~/pages/index.vue` を編集して、Todos ストアを用いた Todo リストページを作成します。

※ 当記事では TypeScript の実装を **OptionsAPI** で行っていますが、ClassAPI、CompositionAPI お好みの方法で実装してみてください。

[参考：Nuxt TypeScript での API 採用方法について](https://teratail.com/questions/211457)

```vue[pages/index.vue]
<template>
  <div id="app">
    <h1>簡単な Todo リスト</h1>
    <!-- Todo リスト -->
    <ul>
      <li v-for="(todo, i) in todos" :key="i">
        <input type="checkbox" :checked="todo.done" @change="toggle(todo)" />
        <span :class="{ done: todo.done }">{{ todo.text }}</span>
        <button @click="remove(todo)">削除</button>
      </li>
      <!-- 新規 Todo 入力エリア -->
      <li>
        <input placeholder="Todo を入力" @keyup.enter="addTodo" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// 下記、「OptionsAPI で記述」するために必要
import Vue from 'vue'

// Todo の型定義をインポート
import { Todo } from '~/models/Todo'
// Todo リストのストアモジュールをインポート
import { todosStore } from '~/store'

// OptionsAPI で記述
export default Vue.extend({
  computed: {
    todos(): Array<Todo> {
      // リスト（todos）を取得
      // ※ todosStore. と打つと、インテリセンス（入力補完機能）が働く
      return todosStore.todos
    }
  },
  methods: {
    // Todo の追加
    addTodo(e): void {
      todosStore.add(e.target.value)
      e.target.value = ''
    },
    // Todo の削除
    remove(todo: Todo) {
      todosStore.remove(todo)
    },
    // Todo の done（完了状態）切り替え
    toggle(todo: Todo) {
      todosStore.toggle(todo)
    }
  }
})
</script>

<style>
/* 完了状態の Todo には打消し線をつける */
.done {
  text-decoration: line-through;
}
</style>
```

`import { todosStore } from '~/store'` と記述するだけで、ストアモジュールが使えるようになります。

`todosStore.` と、ドットまで入力すればインテリセンス（入力補完機能）が働き、自分が定義した State や Mutations, Actions ……全てが確認できるので、とても作業効率が上がりますね！

また、JavaScript では `this.$store.state.todos.todos` と書かなければならないところが、TypeScript では `todosStore.todos` だけで済むことや、同じ記述方法で Mutations や Actions も呼び出せるところが良いですね。

## 最後に動作確認

<video autoplay controls loop src="/assets/web/nuxtjs/nuxt-typescript-vuex-todo-tutorial/nuxt-typescript-vuex-todo-sample-movie.mp4"></video>

- ソースコードは Github にて公開しています
  - https://github.com/tigrig29/todo-nuxt-typescript
- サンプルアプリは Netlify に公開中（実際に使ってみたい方は ↓ の URL へお越しください）
  - https://nuxt-typescript-vuex-todo-tutorial.netlify.com/

## 参考記事

### Nuxt + TypeScript + Vuex

- [【Nuxt.js】Todo リストで理解する TypeScript で Vuex 入門](https://qiita.com/kawa64372358/items/7f84d8b1b765837ae9dd)
- [Examples of how to use the modules in a Vue component](https://github.com/championswimmer/vuex-module-decorators/issues/80)
- [Nuxt.js + Typescript + Vuex する現時点のベストと思う方法](https://qiita.com/suzukenz/items/0b5c0eb5196646599377)
- [vuex + typescript を vuex-module-decorators で無敵になる](https://qiita.com/tsrnk/items/fd95c3d8013d0795a260)

### Nuxt + TypeScript

- [Nuxt + TypeScirpt 環境構築 for Windows, VSCode（2019/09/20）](https://toragramming.com/programming/nuxt-js/nuxt-typescript-vscode-env-2019-09/)
- https://teratail.com/questions/211457
- [Components - Nuxt TypeScript](https://typescript.nuxtjs.org/cookbook/components/#template)

### Vue + TypeScript

- [Vue.js to TypeScript の書き方一覧](https://qiita.com/ryo2132/items/4d43209ea89ad1297426)

### TypeScript

- [tsconfig 日本語訳](https://qiita.com/alfas/items/539ade65926deb530e0e)

### vuex-module-decorators

- [vuex-module-decorators 公式ドキュメント](https://championswimmer.in/vuex-module-decorators/)
- [vuex-module-decorators - npm](https://www.npmjs.com/package/vuex-module-decorators)
