---
title: Oracle Forms でテキストボックスの入力チェック→不正時はフォーカスを戻す方法
description: 完全に過去の遺物となった Oracle Forms ... 。テキストボックスの入力チェックを行い、不正時はフォーカスを戻す仕組みを実装する方法を紹介します。
---

## when-validate-item 使おう

トリガーの**`when-validate-item` の中にチェック処理**を書いて、

異常時は`raise form_trigger_failure`でフォーカス移動をとめましょう。

```oracle
if エラーチェック条件式 then
  エラー出すなどの処理;
  raise form_trigger_failure; -- これで Tab キー押下時のフォーカス移動を止められる
end if;
```

## Oracle Forms インターネット上の情報少なすぎィ！

……未だにこれを使ってる会社が低レベルなだけか。

Oracle Forms 使ってる会社の皆、もっとインターネット上に情報を公開するんだ！
