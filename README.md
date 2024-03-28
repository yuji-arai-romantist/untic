# 19studio-wp
[19Studio-official](https://github.com/Romantist-inc/19studio-official/)をWP環境の上で確認、編集する


## 必要なもの
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- 本レポジトリーをクローン

## 最初起動
1. クローンしたレポジトリーをVSCodeで開ける
2. Codeのターミナルから下のコマンドでDockerを設定
```
docker-compose up
```
3. 新しいターミナルを作って下のコマンドでnodeを起動
```
npm install
npm start
```
4. [ローカルサーバー](http://localhost:8000)(localhost:8000)に接続してWP設定
5. [管理画面](http://localhost:8000/wp-admin/)のプラグインメニューからAll-in-One WP Migrationを検索してインストール
6. 19Studioの既存のデータを[ダウンロード](https://app.box.com/folder/245608103169)
7. All-in-One WP Migrationでデータをマイグレーション（マイグレーションの後、変わったアカウントとパスワードは担当者に確認）

### All-in-One WP Migrationに2mb以上のデータが入れない場合
1. プロジェクトローカルの「php.ini」ファイルをDockerのWordPressコンテナ内のphp.iniにコピー/上書きする 
  ```
  docker cp ./php.ini {container_id}:/usr/local/etc/php/php.ini  
  ```
2. この後、修正を反映するために19studioのコンテナを再起動する
  ```
  docker restart 19studio-wp-db-1 19studio-wp-wordpress-1    
  ```

  **{container_id}** は19studio-wpのwordpress-1コンテナーのid     
  確認するにはdockerを起動する間ターミナルで`docker ps`から確認     
  またはDocker Desktopの19studio-wpのwordpress-1のところで確認     

### Windowsで環境を作る時、"WordPress needs to access your web server."エラーが出る場合
1. 起動中のWordPressコンテナに入る
  ```
  $ docker-compose exec wordpress /bin/bash
  ```
2. WordPressが入っているファイルのオーナーをwww-dataに変更
  ```
  $ chown -R www-data.www-data .
  ```
3. コンテナから抜ける
  ```
  $ exit
  ```
[参考1](https://cfautog.tokyo/2023/01/05/docker-wordpress-ftp-chown/#toc4)
[参考2](https://qiita.com/naritomo08/items/226ef6fb1c9368131b20)
