---
title: Nuxt + TypeScript で Vuex を扱うために ～ vuex-module-decorators
description: Nuxt の Vuex を TypeScript でタイプセーフに扱うための環境構築手順を紹介します。vuex-module-decorator を使います。
thumbnail: eyecatch.png
createdAt: 2019-09-26 00:00:00
updatedAt: 2019-09-26 00:00:00
---

## はじめに

**2019/09/25 執筆**

**[Nuxt TypeScript 公式](https://typescript.nuxtjs.org/) も参照して、比較しながら読んで頂けると幸いです**。

## とりあえず結論（やることまとめ）

`vuex-module-decorators` を使います。

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

Component 等から `import hoge from '~/store'` とインポートできるように、`~/store/index.ts` を作成します（当ファイルは基本編集しません）。

```typescript[store/index.ts]
import { Store } from 'vuex'
import { initializeStores } from '~/utils/store-accessor'
const initializer = (store: Store<any>) => initializeStores(store)
export const plugins = [initializer]
export * from '~/utils/store-accessor'
```

自由にストアモジュールを実装してください。下記例は、[Nuxt.js + TypeScript + Vuex で簡単な Todo リストを作るチュートリアル](../nuxt-typescript-vuex-todo-tutorial)で利用している Todo リスト用の Store です。

```typescript[models/Todo.ts]
// 後述の ~/store/todos.ts で使う型定義
export interface Todo {
  id: number
  text: string
  done: boolean
}
```

```typescript[store/todos.ts（ストアモジュールの一例）]
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
  addTodo(text: string) {
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

`~/utils/store-accessor.ts` にて、自作したストアモジュールを Export します。必要に応じて、ストアの記述を追加してください。

```typescript[utils/store-accessor.ts]
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Todos from '~/store/todos'

// eslint-disable-next-line import/no-mutable-exports ← 必要であれば
let todosStore: Todos
// let someStore: Something

function initializeStores(store: Store<any>): void {
  todosStore = getModule(Todos, store)
  // someStore = getModule(Something, store)
}

export { initializeStores, todosStore /*, someStore*/ }
```

最後に、Component からこれらを呼び出します。

※ .vue ファイルの `<script lang="ts"></script>` の箇所のみ記載しています。

※ OptionsAPI を使っていますが、ClassAPI、CompositionAPI 自由に変えて OK です。

```typescript[component-script]
import Vue from 'vue'
import { todosStore } from '~/store'

export default Vue.extend({
  computed: {
    todos() {
      return todosStore.todos
    }
  },
  methods: {
    addTodo(e): void {
      todosStore.add(e.target.value)
      e.target.value = ''
    },
    remove(todo: Todo) {
      todosStore.remove(todo)
    },
    toggle(todo: Todo) {
      todosStore.toggle(todo)
    }
  }
})
```

## Nuxt + TypeScript, vuex-module-decorators とかで調べて困ったこと

### OptionsAPI, ClassAPI, CompositionAPI って何？

Nuxt + TypeScript で Component 等を記述する時、**OptionsAPI, ClassAPI, CompositionAPI** の 3 パターンやり方がありますよ、という話。

個人的な見解もまじりますが、これらについての簡単な紹介。

#### OptionsAPI

Vue 本来の書き方とほとんど変えずに書ける。
逆に言うと、TypeScript っぽさは薄い。

Nuxt, Vue から始めた身としては、最も好み。

#### ClassAPI

TypeScript っぽく書ける。検索で一番ヒットする。
`vue-property-decorator` 使うやつ。

かつてはこれが公式推奨だったっぽいが、今は棄却されているらしい。

#### CompositionAPI

つい最近（2019/09/25 現在）発表されたばかりで、現在 RFC（Request for Comments: とりあえず開発が活発な感じ？）。

今後に備えて CompositionAPI を学ぶのも大いにありだとは思ったが、（日本語の）情報も少なく、初心者には難しかった。

### Nuxt + vuex-module-decorators はどうやって使えばいいの？

どうにも、[公式ドキュメント](https://championswimmer.in/vuex-module-decorators/pages/overview.html#what-it-does) に書いてあるのは、Vue.js の情報のよう。

Store の書き方は、公式にあるままで問題ないようだが、果たして Components の方はどう書けばよいのやら。

「Nuxt vuex-module-decorators」と検索すると、[Nuxt.js + Typescript + Vuex する現時点のベストと思う方法](https://qiita.com/suzukenz/items/0b5c0eb5196646599377) にたどり着いた（個人的な見解としては、2019/09/25 現在これが最適解なのかなと）。

上記の記事の内容は、`vuex-module-decorators` の 公式 npm パッケージページにも記載されていた。

[vuex-module-decorators - npm](https://www.npmjs.com/package/vuex-module-decorators)

## 参考記事

- [Vuex ストア - Nuxt.js](https://ja.nuxtjs.org/guide/vuex-store/)
- [Nuxt TypeScript での API 採用方法について](https://teratail.com/questions/211457)
- [Vue3.x で導入予定の function API を利用してみる](https://qiita.com/nkumag/items/f890e168be98bf3e4f77)
- [公式ドキュメント](https://championswimmer.in/vuex-module-decorators/pages/overview.html#what-it-does)
- [Nuxt.js + Typescript + Vuex する現時点のベストと思う方法](https://qiita.com/suzukenz/items/0b5c0eb5196646599377)
- [vuex-module-decorator - npm](https://www.npmjs.com/package/vuex-module-decorators)
