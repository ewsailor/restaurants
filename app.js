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

// 取得 GET restaurants 清單頁：http://localhost:3000/restaurants
app.get('/restaurants', (req, res) => {
  const keyword = req.query.search?.trim() || '' // searching：因為在 index.hbs 中，input 的 name="search"，去除多餘空白，確保 keyword 至少是一個空字串
  // console.log('keyword', keyword)
  const matchedRestaurants = keyword ? restaurants.filter(rt =>
        (rt.name && rt.name.toLowerCase().includes(keyword.toLowerCase())) ||
        (rt.category && rt.category.toLowerCase().includes(keyword.toLowerCase()))
      )
    : restaurants
  res.render('index', { restaurants: matchedRestaurants, keyword} ) 
})

// create-取得 GET restaurants 新增頁：http://localhost:3000/restaurants/new
app.get('/restaurants/new', (req, res) => {
	res.send('create restaurant')
})

// create-新增 POST restaurant：http://localhost:3000/restaurants/new
app.post('/restaurants', (req, res) => { // 建立、新增 restaurant
	res.send('add restaurant')
})

// Read-取得 GET restaurants 項目頁-看 restaurant 的 detail：http://localhost:3000/restaurants/{id}
app.get('/restaurants/:id', (req, res) => {
	res.send(`get restaurant: ${req.params.id}`)
})

// Update-取得 GET restaurants 編輯頁
app.get('/restaurants/:id/edit', (req, res) => {
	res.send(`get restaurant edit: ${req.params.id}`)
})

// Update-編輯 PUT restaurant
app.put('/restaurants/:id', (req, res) => { // 更新、編輯 restaurant，用 id 指定編輯的對象
	res.send(`restaurant id: ${req.params.id} has been modified`) // 指定前面路由參數設定的 id
})

// Delete-刪除 restaurant
app.delete('/restaurants/:id', (req, res) => { // 刪除 restaurant
	res.send(`restaurant id: ${req.params.id} has been deleted`)
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