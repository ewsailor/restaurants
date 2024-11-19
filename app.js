// 在 app.js 建立路由
const express = require('express')
const app = express()
const port = 3000

// 設定路由
app.get('/', (req, res) => {
  res.redirect('/restaurants') // 將根路徑 / redirect 到 /restaurants ，原因是專案規格中，網站的首頁會直接導向餐廳清單。
})

app.get('/restaurants', (req, res) => {
  res.send('listing restaurants')
})

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id // 使用 params 做動態路由：取得使用者在網址列中輸入的「請求物件」，取得使用者於網址上 :id 位置輸入的內容，再把這個取得的內容動態回應到使用者所看的網站畫面中，最終讓使用者可以在瀏覽器畫面上看到自己於網址列所輸入的內容
  res.send(`read restaurant: ${id}`)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})