---
title: vuex-module-decorators の Getter で引数を使う方法（Method-Style Access）
description: vuex-module-decorators の Getter を引数付き関数として使用したい場合の記述方法です。
createdAt: 2019-10-03 00:00:00
updatedAt: 2019-10-03 00:00:00
---

## Getter 部分

```typescript
// getter 名はこれまで通り記述する（引数は書かない）
get getTodoById() {
  // ここで function を return する
  return (id: string) => {
    // 普段どおり、取得するデータを return
    return this.todos.find(todo => todo.id === id)
  }
}
```

## Store 全体（モジュールモード）

```typescript
import { Module, VuexModule } from 'vuex-module-decorators'
import { Todo } from '~/models/Todo'

@Module({ stateFactory: true, namespaced: true, name: 'todos' })
export default class Todos extends VuexModule {
  todos: Array<Todo> = []

  // getter 名はこれまで通り記述する（引数は書かない）
  get getTodoById() {
    // ここで function を return する
    return (id: string) => {
      // 普段どおり、取得するデータを return
      return this.todos.find((todo) => todo.id === id)
    }
  }
}
```

## 参考

- [Possibility of using a getter with a parameter?](https://github.com/championswimmer/vuex-module-decorators/issues/40)
- [Getters | Vuex](https://vuex.vuejs.org/guide/getters.html#method-style-access)
