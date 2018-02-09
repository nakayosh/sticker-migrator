# API References

## Methods

### Stickers
**stickersを取得:**
```
GET /api/stickers/:id
```
既存の[Sticker](#sticker)を返します

### Stpacks
**stpacksを取得:**
```
GET /api/stpacks/:id
```
既存の[Stpack](#stpack)のオブジェクトを返します

**stpacksを作成:**
```
PATCH /api/stpacks/:id
```
|Key|Type|Value|Nullable|
|:--|:---|:----|:-------|
|`id`|`Number`|sticker packのユニークなID|`false`|
|`stickers`|`Array`|sticker packにインデックスされた[Sticker](#sticker)の配列．`emoji`が指定された状態です．|`false`|

**最近追加されたstpacksを取得:**
```
GET /api/stpacks/recent
```
|Key|Value|Nullable|
|:--|:----|:-------|
|`limit`|取得するStpackの個数上限，デフォルト15件|`true`|
|`offset`|取得するStpackの最初のインデックス|`true`|

[StpacksList](#stpackslist)を返します．

**登録済みのstpacksを検索:**
```
GET /api/stpacks/search
```
|Key|Value|Nullable|
|:--|:----|:-------|
|`q`|検索に使う文字列|`false`|
|`limit`|取得するStpackの個数上限，デフォルト15件|`true`|
|`offset`|取得するStpackの最初のインデックス|`true`|

[StpacksList](#stpackslist)を返します．

## Entities

### Sticker
|Key|Type|Value|Nullable|
|:--|:---|:----|:-------|
|`id`|`Number`|stickerのユニークなID|`false`|
|`id_str`|`String`|stickerのユニークなIDの文字列|`false`|
|`file_id`|`String`|Telegram APIで利用されるID|`true`|
|`stpack_id`|`Number`|stickerが登録を被っている[Stpack](#stpack)のID|`false`|
|`stpack_id_str`|`String`|stickerが登録を被っている[Stpack](#stpack)のIDの文字列|`false`|
|`original_url`|`String`|stickerの画像へのURL|`false`|
|`emojis`|`String`|stickerに対応する絵文字|`true`|
|`created_at`|`String`|stickerが作成された日付|`false`|
|`updated_at`|`String`|stickerが最後に更新された日付|`false`|

### Stpack
|Key|Type|Value|Nullable|
|:--|:---|:----|:-------|
|`id`|`Number`|sticker packのユニークなID|`false`|
|`id_str`|`String`|sticker packのユニークなIDの文字列|`false`|
|`status`|`Number`|sticker packの状態を示す数字, [Status](#status)を参照|`false`|
|`name`|`String`|sticker packの名前|`false`|
|`short_name`|`String`|sticker packのshort name|`false`|
|`thumbnail_url`|`String`|sticker packのサムネイルに使用される画像のURL|`false`|
|`url`|`String`|sticker packのダウンロード用URL|`true`|
|`original_url`|`String`|sticker packのオリジナルへのURL|`false`|
|`compiled_stickers_count`|`Number`|コンパイル済みのstickersの数 (statusが1の場合のみ)|`false`|
|`uploaded_stickers_count`|`Number`|アップロード済みのstickersの数 (statusが2の場合のみ)|`false`|
|`created_at`|`String`|sticker packが作成された日付|`false`|
|`updated_at`|`String`|sticker packが最後に更新された日付|`false`|
|`stickers`|`Array`|sticker packにインデックスされた[Sticker](#sticker)の配列|`false`|

#### Status
|Number|String key  |Content|
|:-----|:-----------|:------|
|0     |`downloaded`|Stpackのダウンロードが完了(初期状態)|
|1     |`compiling` |Stpackをコンパイル中|
|2     |`uploading` |Stpackをアップロード中|
|3     |`uploaded`  |Stpackのアップロードが完了|
|4     |`failed`    |Stpackのアップロードに失敗|

### StpacksList
|Key|Type|Value|Nullable|
|:--|:---|:----|:-------|
|`results`|`Array`|[Stpack](#stpack)の配列．昇順です．|`false`|
|`next`|`Number`|次のlistのインデックス, offset + limitと等しい|`true`|
|`prev`|`Number`|前のlistのインデックス, offset - limitと等しい|`true`|

### Error
|Key|Type|Value|Nullable|
|:--|:---|:----|:-------|
|`error`|`String`|エラーIDとか，`not_found`的なわかりやすいもの|`false`|
|`error_description`|`String`|`error`より詳細なエラーの説明．ユーザーが見ます．|`true`|

## The streaming API

### Channels
|Channel|Description|
|`stpacks.[id]`|Stpackのコンパイル/アップロードの状態変化があるたびに最新の情報がストリーミングされます|

#### `stpacks.[id]`
|Event|When|Entity|
|:----|:---|:-----|
|`StickerCompileStarting`|ステッカーのコンパイルが開始|[Stpack](#stpack)|
|`StickerCompiling`|ステッカーをコンパイル中，ステッカー毎|[Stpack](#stpack)|
|`StickerCompiled`|ステッカーのコンパイルが終了|[Stpack](#stpack)|
|`StickerUploadStarting`|ステッカーのアップロードが開始|[Stpack](#stpack)|
|`StickerUploading`|ステッカーをアップロード中，ステッカー毎|[Stpack](#stpack)|
|`StickerUploaded`|ステッカーのアップロードが終了|[Stpack](#stpack)|
|`StickerUploadFailed`|ステッカーのアップロードに失敗|[Stpack](#stpack)|
