<p align="center"><img src="https://i.imgur.com/KzB72Jc.png" width="300px"></p>

Sticker Migratorは，LINEからTelegramに簡単にステッカーを移植するアプリケーションです．

---
## Features
- URLを入力するだけで簡単に作成することができます
- Dockerで簡単にデプロイが可能です

## Installation
はじめに，環境変数ファイル `.env` を作成します． `.env.example` というファイルが既に用意されているので，コピーしてそれを作成することができます．

```bash
cp .env.example .env
```

つぎに，`docker-compose.yml` の設定を変更し，データベースを永続化させます．以下のように変更します．

```
  db:
    restart: always
    image: mariadb:10.2
    environment:
      - "MYSQL_DATABASE=smigrator"
      - "MYSQL_ROOT_PASSWORD=root"
-    # volumes:
-    #   - ./mariadb:/var/lib/mysql
+    volumes:
+      - ./mariadb:/var/lib/mysql
```

つぎに，データベースのイニシャライズ，依存関係のインストール，アセットのビルドを行います．これには時間が掛かる場合があります．

```
docker-compose run --rm web ash -c "composer install --no-progress \
 && php artisan key:generate
 && php artisan migrate \
 && yarn --pure-lockfile \
 && yarn run prod"
```

最後に，コンテナを起動し，ホストに公開します．デフォルトでは `8080` 番に公開されているので，ホスト側でプロキシの設定を行うことでアクセスできるようになります．ローカル環境の場合，`localhost:8080` からもアクセスできます．
```bash
docker-compose up
```

## Requirements
- Docker
