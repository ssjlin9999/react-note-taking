# react-note-taking
 - 這是一個使用React Hook建構一個做筆記Web App
 - 參考並修改自[React-crash-course-2021-bruceFE](https://github.com/scps960740/React-crash-course-2021-bruceFE)

## User Story
 - [x] 輸入筆記的**筆記、日期、時間**，新增一個**筆記**後**清除輸入的值**並**更新資料庫**
 - [x] **列出所有筆記**，**依新到舊**的順序
 - [x] **刪除某一個筆記**後**更新資料庫**

## Demo
 - 在專案資料夾中，下指令 `npm run db-server` 啟動假db資料的json-server，再點擊下方連結才會存到資料庫(db.json)
 - live demo: http://ssjlin9999-reactnotetaking.surge.sh/

## Local setup and How to use?
 - 在本地端架設環境的使用方法
    - 在專案資料夾中，下指令 `npm install` 安裝相依的函式庫
    - 下指令 `npm run db-server` 啟動假db資料的json-server，要先執行!!
       - http://localhost:3000/
    - 開另一個終端機下指令 `npm start` 啟動此專案
       - http://localhost:3001/

## Main Project Structure
 - 專案檔案結構
 ```
    .
    ├── ...
    ├── src
    │   ├── components
    │   │   ├── NewNote
    │   │   │   ├── NewNote.css            # 新增一個筆記
    │   │   │   ├── NewNote.js
    │   │   ├── Note
    │   │   │   ├── Note.css
    │   │   │   ├── Note.js                # 顯示單一一個筆記的內容、日期、地點，具有刪除的功能
    │   ├── containers
    │   │   ├── NoteBuilder
    │   │   │   ├── NoteBuilder.css
    │   │   │   ├── NoteBuilder.js         # 採用functional component，主要負責 GET 和 PUT 到 db.json裡面的資料，嵌入 NewNote和 Note Components
    │   ├── shared
    │   │   ├── utility.js                 # 儲存不會變的共用的API URLs
    │   ├── App.js
    │   ├── index.css
    |   ├── index.js 
    │   └── ...
    ├── ...
    ├── README.md
    ├── package-lock.json
    └── package.json
```

## Technology
 - React
    - [Create React App](https://github.com/facebook/create-react-app)：建立React框架的App專案
      ```properties
        npx create-react-app [my-app]
        cd [my-app]
        npm start
      ```
    - [React Hook](https://reactjs.org/docs/hooks-intro.html)：使用useState、useEffect、useRef
 - npm library
     - [uuid library](https://www.npmjs.com/package/uuid)：為每個筆記添加唯一的ID
       ```properties
       npm install uuid
       ```
     - [json-server library](https://www.npmjs.com/package/json-server)：建立假db的json檔案
       ```properties
       npm install json-server
       ```
        - 在package.json的 `scripts` 加上 `"db-server": "json-server --watch db.json" `
          ```json
          "scripts": {

            "db-server": "json-server --watch db.json" 
          }
          ```
 - JavaScript
    - .map()
    - .filter()
    - async / await: 以看起來是同步的方式來寫一個非同步
    - Fetch API
 - React Hook
    - **useState:** 宣告變數的同時將變數與React的渲染(render)綁定
    - **useEffect:** 設定依賴項，關連到function中會用到的變數
      - 第一次渲染 = 每次頁面重新整理時 => 不設定依賴項 = [] 空陣列 
        ```
        useEffect(() => {
          // Will only be executed once, that is the first time.
        }, []);
        ```
      - 依賴項改變後的渲染 = 每次 data 的值變動時才呼叫functionName
        ```
        useEffect(() => {
          functionName(data); // When "data" changed, the "functionName" function will be called.
        }, [data]);
        ```
    - **useRef:** 回傳一個可變的(mutable) `ref` 物件，物件的 `.current` 屬性就是一開始傳入的值，此物件會存在於該component的整個生命週期，不會因重新渲染而改變
       - 避免第一次進入時db.json被PUT成空的陣列，而沒顯示出預設db.json中的內容
          - 優化：只在加入筆記與刪除筆記時，才會更新db.json
