// 在 app.js 建立路由
const express = require('express')
const { engine } = require('express-handlebars') // 設定在 Express 中使用的樣版引擎
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurants.json').results // listing：把 restaurants.json 的 results 傳進去 

// 告訴 Express：麻煩幫我把樣板引擎交給 express-handlebars：
// app.engine：透過這個方法來定義要使用的樣板引擎，其中參數 .hbs 是這個樣板引擎的名稱。
app.engine('.hbs', engine({extname: '.hbs'}))  
// app.set：透過這個方法告訴 Express 說要設定的 view engine 是 hbs (handlebars)。
app.set('view engine', '.hbs') 
app.set('views', './views')

// 新增 for MVC 的 Model
// 在 app.js 檔案使用 app.use，並提供靜態檔案的路徑，就可以將 JSON 檔案載入
app.use(express.static('public'))

// 設定路由
app.get('/', (req, res) => {
  res.redirect('/restaurants') // 將根路徑 / redirect 到 /restaurants ，原因是專案規格中，網站的首頁會直接導向餐廳清單。
})

app.get('/restaurants', (req, res) => {
  res.render('index', { restaurants } )
})

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id // 使用 params 做動態路由：取得使用者在網址列中輸入的「請求物件」，取得使用者於網址上 :id 位置輸入的內容，再把這個取得的內容動態回應到使用者所看的網站畫面中，最終讓使用者可以在瀏覽器畫面上看到自己於網址列所輸入的內容
  const restaurant = restaurants.find((rt) => rt.id.toString() === id) // reading 新增，rt 是 restaurant 的縮寫 
  res.render('detail', {restaurant} ) // reading：將 res.send(`read restaurant: ${id}`) 更新為 res.render('detail')，但無論怎麼點，都是直接跳出樣板的內容
  // reading：再更新為 res.render('detail', { restaurant })，所以點擊後，可跳出對應樣板的內容  
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})