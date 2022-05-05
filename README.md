This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

~~⚠️ Deploy 環境不明原因壞掉了(可能是換了新的 env token 不適用舊的 deployment)!!! 搶修中 2022/4/10 21:22 ⚠️~~
2022/4/10 21:43 搶修完畢

## 自評&使用技術說明

✔️ Github REST API：

- 主要使用到的 endpoint
  1. [GET /users/{username}](https://docs.github.com/en/rest/users/users#get-a-user)
  2. [GET /users/{username}/repos](https://docs.github.com/en/rest/reference/repos#list-repositories-for-a-user)
  3. [GET /search/users](https://docs.github.com/en/rest/search#search-users)
     某些 endpoint 會直接寫在 lib 這個 folder 並直接調用；某些會進一步寫進 pages/api 作為 serverless function call 使用。還不確定什麼方式比較適合，正在摸索當中。

✔️ Magic Link[2022/5/5 新增]：

- 看好 Passwordless 在正在國外被推行(安全性高、使用者不須記住密碼)，且由於目前此專案尚未實作後端資料庫，暫時以 Magic Link 替代登入功能

✔️ 開發過程的札記：

- 為何使用 Next.js 開發：
  個人覺得 file-based routing 這個特點開發起來超舒服，再來還有現成 Vercel 可以在每次 push 程式碼後順便 preview 線上環境是否 work ， 同時還能自由決定何時使用 CSR、SSR、ISR 等等 (此專案僅用到 CSR、SSR)
- 例外狀況處理：
  目前能想到的狀況大概是當使用者在任何一個 route reload page 導致資料被清空的問題
  因此我有使用 sessionStorage 儲存一些基本資料如 username，
  reload 後會再用這些存的資料再重新打一次 API 取得先前看到的資料。不過在首頁 reload 預設就是直接清空搜尋，
- useDebounce hook：

  - 開發到中後期發現原來的 useState 會出現兩個狀況：

  1. key in 速度太快例如快速輸入 ntubrain，結果 state 只吃到 ntubria 造成搜尋跟預期不符
  2. 每打一個字母就會 fire 一次 API call，雖然說用到目前為止好像是沒有流量限制，不過為了
     節流必須想辦法做到當使用者 key in 完畢才打 API

  在寫這個專案才學到原來解決上面這兩個問題的技巧叫做 useDebounce

- 頁面轉換不順暢[2022/5/5 新增]：
  各個頁面轉換時會有 Flicker 的現象(不順暢)，因此在 \_app.js 使用 router.events.on 觸發 route 尚未完成時先載入 <Loading> 的頁面

- RWD :
  有針對手機排版進行處理

## 注意!!

在串接 Github REST API 時，官方文件的範例是寫

```
await octokit.request('GET /users/{username}/repos', {
username: 'username'
})
```

在本機開發這樣寫就能 work，deploy 上去卻會得到 401 (unauthorized) Error
網路完全找不到相關 issue @@
最後發現是 GET 要拿掉 ==' (幸好通靈成功)

```
await octokit.request('/users/{username}/repos', {
username: 'username'
})
```

## Getting Started

在 root path (dcard-frontend) 先準備好 .env file
可以使用提供好的範例
(⚠️ 請自行 create github personal-access-token)

```bash
cp .env.example .env.local
```

接著

```bash
npm install # or yarn install
npm run dev # or yarn dev
# 開啟 http://localhost:3000
```

## File Structure (尚未更新@@)

```
├── components
│   ├── Back.js             # 返回建 (使用 ant design)
│   ├── Home.js             # 回到首頁 home 鍵 (使用 ant design)
│   ├── Result.js           # 首頁用來顯示搜尋凡回結果的 Card (使用 ant design)
├── context                 # 避免單向資料流的問題因此使用 context 這個 API
│   ├── github-user-context
├── hooks
├── ├── useDebounce.js      # 針對使用者 key in 特別處理
├── lib
├── ├── getOneUserMeta.js   # 使用到的 Github REST API
├── pages                   # 所有的路由跟 server side api
```
