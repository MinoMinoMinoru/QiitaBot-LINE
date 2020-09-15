# What is this?
GAS で LINE Bot を作成する。
- 「Article」というWordに反応してQiita の記事を返す（ランダムワード）
- 「#azure」のような形式で入力することで特定のタグの記事を返す
- GAS の時刻指定実行の機能でProactive にQiita の記事を送信（ランダムワード）
- いずれの場合も最新 100 件のうち LGTM の多いものから7件をカルーセルで表示する

# Version of API
より新しい ver にしたい等がある場合は注意
- LINE:v2
- Qiita:v2

# 必要なアクション
## GAS のコード
### push.js
以下の値をそれぞれ設定(コードの頭にてハードコーディングしてる)
- CHANNEL_ACCESS_TOKEN : LINE Bot との認証なんかで使用 
- USER_ID:Proactive Message の送信先を指定するのに使用

### reply.js
以下の値を設定(コードの頭にてハードコーディングしてる)
- CHANNEL_ACCESS_TOKEN : LINE Bot との認証なんかで使用

## GAS のtriggerの設定
時間駆動でmainfunction を実行するようにする
