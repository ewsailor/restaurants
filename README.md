# 我的餐廳清單（ALPHA Camp 作業）

## 版本
- v1.0.0（AC C3-M3）：用 Node.js 建立本機伺服器，透過 Express 與 Template Engine（Handlebars）自靜態 json 檔建立餐廳網頁，可瀏覽所有餐廳列表、查看餐廳詳細資訊、搜尋餐廳
- v2.0.0（AC C4-M1）：加入資料庫（MySQL）、CRUD 的應用。

## 功能
- 搜尋：使用者可以用「餐廳名稱」、「餐廳類別」搜尋
- 新增：使用者可以新增一家餐廳（CRUD 的 C：Create），並將資料儲存於資料庫（MySQL）中
- 瀏覽：使用者可以瀏覽一家餐廳的詳細資訊（CRUD 的 R：Read）
- 瀏覽：使用者可以瀏覽所有餐廳列表（CRUD 的 R：Read）
- 修改：使用者可以修改、編輯一家餐廳的資訊（CRUD 的 U：Update）
- 刪除：使用者可以刪除一家餐廳（CRUD 的 D：Delete）
   
## 執行環境（RTE：Run-Time Environment）
※ 執行此專案前，需安裝 Node.js 與 MySQL
- [Node.js v18.15.0](https://github.com/coreybutler/nvm-windows)
- [MySQL v8.0.15](https://downloads.mysql.com/archives/installer/)


## 如何使用

1. 開啟終端機（Terminal），cd 至欲存放本專案的資料夾，Clone 此專案：在 Terminal 輸入以下指令

```
git clone https://github.com/ewsailor/restaurants.git
```

2. 進入存放此項目的資料夾：在 Terminal 輸入以下指令

```
cd restaurants
```

3. 安裝 npm 套件：在 Terminal 輸入以下指令

```
npm install
```

4. ⚠️ 確認是否需更改 MySQL server 的預設設定：如不需更改預設設定，可略過此步驟
- 4-1. MySQL server 之預設設定如下：
```
hostname: 'localhost'
user: 'root'
password: 'password'
database: 'restaurant'
```

- 4-2. 若欲更改設定：

```
1. 請編輯專案資料夾，根目錄中的 `create-db.js` 檔
2. 修改完成後，將修改後的設定同步更新至 config 資料夾下的 `config.json` 檔案中的 "development"  

```

5. 資料庫設定：執行以下指令以快速建立資料庫、建立資料表、匯入種子資料

```
npm run setup-db
```

- 5-1. 也可以透過以下指令分別執行資料庫建立、資料表建立、匯入種子資料：
```
1. 資料庫建立：npm run db:create
2. 資料表建立：npm run db:migrate
3. 匯入種子資料：npm run db:seed 
```

6. 開啟專案：在 Terminal 輸入以下指令

```
npm run dev
```

7. 若在 Terminal 看見以下字樣，表示伺服器與資料庫已啟動並成功鏈接

```
express server is running on http://localhost:3000
```

8. 觀看結果：打開瀏覽器，在網址列輸入 http://localhost:3000

9. 結束運行：在 Terminal 按 Ctrl + C

## 開發工具

- 開發環境：[Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/)
- 執行環境(1)：[Node.js v18.15.0](https://github.com/coreybutler/nvm-windows)
- 執行環境(2)：[MySQL v8.0.15](https://downloads.mysql.com/archives/installer/)
- 自動重啟伺服器套件：[nodemon @3.1.7](https://nodemon.io/)
- 應用程式框架：[express ^4.21.1](https://www.npmjs.com/package/express) 
- 樣版引擎：[express-handlebars ^7.0.4](https://www.npmjs.com/package/express-handlebars)
- HTTP method 套件：[method-override ^3.0.0](https://www.npmjs.com/package/method-override)
- 資料庫套件：[mysql2 v3.2.0](https://www.npmjs.com/package/mysql2)
- ORM：[Sequelize v6.30.0 & Sequelize-CLI 6.6.0](https://sequelize.org/)
- 資料庫管理工具：[MySQL Workbench 8.0.15](https://downloads.mysql.com/archives/installer/)
- 樣式框架：[Bootstrap v5.1.3](https://getbootstrap.com/docs/5.1/getting-started/download/)
- 字體圖標工具：[Font Awesome](https://fontawesome.com/) 

## 開發者 (Contributor)
[Oscar Chung](https://github.com/ewsailor)
