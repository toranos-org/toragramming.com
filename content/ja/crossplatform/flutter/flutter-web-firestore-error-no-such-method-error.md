---
title: "【Flutter × Firestore】エラー「NoSuchMethodError: invalid member on null: 'includeMetadataChanges'」が発生した場合の対処法"
description: "Flutter（Web）で [cloud_firestore/unknown] NoSuchMethodError: invalid member on null: 'includeMetadataChanges' とエラー表示されたときの原因と対処法"
createdAt: 2021-03-25 16:02:17
updatedAt: 2021-03-25 17:10:29
---

## 事象

Flutter（Web）で、Firestore から取得したドキュメント一覧を `FutureBuilder` で表示させるため、下記のコードを実装しました。

```dart
FutureBuilder<QuerySnapshot>(
  future: FirebaseFirestore.instance
      .collection('posts')
      .get(),
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      final List<DocumentSnapshot> documents = snapshot.data.docs;
      return ListView(
        children: documents.map((document) {
          return Card(
            child: ListTile(
              title: Text(document['text']),
              subtitle: Text(document['email']),
            ),
          );
        }).toList(),
      );
    } else if (snapshot.hasError) {
      return Text(snapshot.error.toString());
    }

    // 読込中の場合
    return Center(
      child: Text('読込中……'),
    );
  }
)
```

すると、エラーが発生していたようで、`snapshot.error` より以下のエラーメッセージが取得できました。

```
[cloud_firestore/unknown] NoSuchMethodError: invalid member on null: 'includeMetadataChanges'
```

## 筆者の環境

### OS

Windows 10 バージョン 20H2

### flutter doctor

```bash
Doctor summary (to see all details, run flutter doctor -v):
[√] Flutter (Channel stable, 2.0.1, on Microsoft Windows [Version 10.0.19041.867], locale ja-JP)
[√] Android toolchain - develop for Android devices (Android SDK version 30.0.2)
[√] Chrome - develop for the web
[√] Android Studio (version 4.1.0)
[√] VS Code (version 1.54.3)
[√] Connected device (2 available)

• No issues found!
```

### pubspec.yaml の dependencies

```yaml
dependencies:
flutter:
sdk: flutter

firebase_core: ^1.0.1
firebase_auth: ^1.0.1
cloud_firestore: ^1.0.1

cupertino_icons: ^1.0.2
```

## 対処法

`web/index.html` の Firebase JS SDK のバージョンを `8.0.1` 以下に変更します。

参考：[Firebase JS SDK Release Notes](https://firebase.google.com/support/release-notes/js?hl=ja)

```html
<!DOCTYPE html>
<html>
  <!-- head 省略 -->
  <body>
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('flutter-first-frame', function () {
          navigator.serviceWorker.register('flutter_service_worker.js')
        })
      }
    </script>
    <script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-auth.js"></script>
    <!--                 ここを変更                  ↓↓↓↓         -->
    <script src="https://www.gstatic.com/firebasejs/8.0.1/firebase-firestore.js"></script>
    <!--                 ここを変更                  ↑↑↑↑         -->
    <script>
      // Your web app's Firebase configuration
      var firebaseConfig = {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
      }
      firebase.initializeApp(firebaseConfig)
    </script>
    <script src="main.dart.js" type="application/javascript"></script>
  </body>
</html>
```

`8.0.2` 以上にすると、当エラーが発生するようです。

## その他の情報

- Android/iOS では正しく動作する（Flutter Web だけエラーになる）
- StreamBuilder を使えば正しく動作する（FutureBuilder を使うとエラーになる）

といった情報も寄せられています（詳細は、下記[参考サイト](#参考サイト)を御覧ください）。

## 参考サイト

- https://stackoverflow.com/questions/65001207/flutter-cloud-firestore-unknown-nosuchmethoderror-invalid-member-on-null-i
- https://github.com/FirebaseExtended/flutterfire/issues/4127
