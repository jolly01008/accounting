# 記帳工具 accounting

## 後端技術堆疊

語言與框架：Node.js、Express  
雙向通訊：Socket.io 聊天室。基於 WebSocket，提供了房間管理、即時消息傳遞、廣播的相關事件處理。  
資料庫：MongoDB  
身份認證：JWT（JSON Web Token）

## 專案介紹

這是一個能夠幫助用戶，記錄與朋友彼此消費與欠款狀況的記帳工具。  
可以新增、編輯和刪除記錄。根據所有記錄，計算最終的欠款結果。  
用戶可建立群組，群組人數以兩人為主，能一同做記帳。  
支持即時聊天功能，便於雙方即時交流欠款細節。

適用於想簡單清楚地紀錄管理借款與欠款狀況的用戶，並能夠促進更便捷的溝通。

## 功能介紹

- 帳號管理：
 - 註冊與登入：未登入時，用戶可註冊及登入帳號。登入後，根據用戶帳號展示現有群組及相關功能。
 - 登出：用戶可隨時登出帳號，退出後無法使用相關功能，直到重新登入。  
- 群組管理：用戶可以建立群組，並填寫一名用戶加入群組。可將群組頁面連結分享給對方，與對方一起記帳。  
- 記錄管理：可以新增、編輯和刪除借出、欠款紀錄。包含項目、價格、時間。  
- 欠款計算：結算單一群組的全部紀錄，計算最終的欠款金額，顯示誰欠誰多少錢。  
- 即時聊天：點擊傳訊息給對方，若雙方都在線，支持實時文字發送聊天訊息，便於討論和協商。

## 畫面截圖

![image](https://github.com/jolly01008/accounting/blob/main/public/readmeImage/image01.png)

![image](https://github.com/jolly01008/accounting/blob/main/public/readmeImage/image02.png)

![image](https://github.com/jolly01008/accounting/blob/main/public/readmeImage/image03.png)

![image](https://github.com/jolly01008/accounting/blob/main/public/readmeImage/image04.png)

![image](https://github.com/jolly01008/accounting/blob/main/public/readmeImage/image05.png)

![image](https://github.com/jolly01008/accounting/blob/main/public/readmeImage/image06.png)

## 共用帳號

- 第一組 user 帳號

  - email: user1@example.com
  - password: 12345678

- 第二組 user 帳號

  - email: user2@example.com
  - password: 12345678

- 第三組 user 帳號

  - email: user3@example.com
  - password: 12345678


## 本地基礎設置

確認本地端已安裝 Node.js (v20.16.0) 、 npm 、 Studio 3T Free（管理 MongoDB 資料庫）

## 資料庫連線設定

1. 註冊並設置 MongoDB Atlas 賬戶，創建新集群。

2. 設定資料庫用戶和連線，取得如下格式的 Connection String。

```
- mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
```

3. 使用 Studio 3T Free 連接 MongoDB Atlas

- 打開 Studio 3T，點擊 New Connection。
- 在連線設置中，將 MongoDB Atlas 提供的 Connection String 填入相應欄位。
- 點擊 Test Connection，確保連接成功後點擊 Connect。


## 開始使用

1. 將專案 clone 到本地

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```

cd accounting

```

3. 安裝所需套件

```

npm install

```

4. 設置.env 檔

```

請修改 `.env.example` 成 .env，並設定相關參數。 包括MongoDB Atlas 提供的 Connection String 

```

5. 匯入種子檔案

```

npm run seed

```

6. 啟動伺服器，執行 app.js 檔案

```

npm run dev

```

7. 當 terminal 出現類似以下字樣，表示伺服器已啟動  

> App is running on http://localhost:3001

8. 可搭配以下前端網址，用瀏覽器操作畫面  

<https://github.com/jolly01008/accounting-frontend>

