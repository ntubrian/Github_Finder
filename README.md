This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Dcard 前端作業自評&使用技術說明

✔️ 所有指定基本要求都有達到：
不過有一點作業要求是 [串接 GET /repos/{owner}/{repo}](https://docs.github.com/en/rest/reference/repos#get-a-repository)，由於在第一支要求的 API [GET /users/{username}/repos](https://docs.github.com/en/rest/reference/repos#list-repositories-for-a-user) 就已經回傳所需要的資料，個人覺得沒必要再打另一支 API 得到重複的資料，因此 [串接 GET /repos/{owner}/{repo}] 有實作但沒有用到它。另外當使用者在首頁搜尋時我選擇使用 client-side API call，而另外兩個 route 則是使用 server-side API call，沒特別原因，單純為了更熟悉 Next.js 的框架使用而已

✔️ 使用 Vercel 部署：
[點此連結查看](https://dcard-frontend-test.vercel.app/)

- 為何使用 Next.js 開發：
  因為個人覺得 file-based routing 這個特點開發起來超舒服，再來還有現成 Vercel 可以在每次 push 程式碼後順便 preview 線上環境是否 work ，只能說好舒服呀 ~
  (外傳：
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
  )
- 例外狀況處理：
  不確定這能不能算例外狀況，目前能想到的狀況大概是當使用者在任何一個 route reload page 資料被清空的問題
  因此我有使用 sessionStorage 儲存一些基本資料如 username，
  reload 後會再用這些存的資料再重新打一次 API，不過在首頁 reload 預設就是直接清空搜尋，而在其他兩個 routing reload 後甚至在回到首頁都還會保有最後一次搜尋紀錄
- useDebounce hook：
  開發到中後期發現原來的 useState 會出現兩個狀況：

  1. key in 速度太快例如快速輸入 ntubrain，結果 state 只吃到 ntubria 造成搜尋跟預期不符
  2. 每打一個字母就會 fire 一次 API call，雖然說用到目前為止好像是沒有流量限制，不過為了
     節流必須想辦法做到當使用者 key in 完畢才打 API

  在寫這個專案才學到原來解決上面這兩個問題的技巧叫做 useDebounce

- RWD :
  - web
  https://user-images.githubusercontent.com/43328591/159704484-eab162ef-c9a0-4d2f-92ee-160b0a47e592.mp4
  - mobile
  https://user-images.githubusercontent.com/43328591/159703899-025bf232-30e5-42bf-a0c6-27846e7679c5.mp4


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

## File Structure

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
