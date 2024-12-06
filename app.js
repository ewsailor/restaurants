// 在 app.js 建立路由
const express = require('express')
const { engine } = require('express-handlebars') // 設定在 Express 中使用的樣版引擎
const app = express()

const methodOverride = require('method-override') // 使用 methodOverride
const db = require('./models') // 要在 app.js 取用 sequelize 相關的套件，需要引用models資料夾。
const restaurant = db.restaurant
// db：在 models 資料夾裡的 index.js 的邏輯中，是透過 module exports 的方式讓外部使用，而 module.exports = db
// restaurant：使用 models 資料夾裡的 restaurant.js 所定義的「modelName: 'restaurant',」

const port = 3000

const restaurants = require('./public/jsons/restaurants.json').results // listing：把 restaurants.json 的 results 傳進去 

// 告訴 Express：麻煩幫我把樣板引擎交給 express-handlebars：
// app.engine：透過這個方法來定義要使用的樣板引擎，其中參數 .hbs 是這個樣板引擎的名稱。
app.engine('.hbs', engine({extname: '.hbs'}))  
// app.set：透過這個方法告訴 Express 說要設定的 view engine 是 hbs (handlebars)。
app.set('view engine', '.hbs') 
app.set('views', './views')
app.use(express.urlencoded({ extended: true })) // Create：app.use 的使用方式在後面的章節會搭配 middleware 有詳細說明，這邊可以先簡單理解 app.use 是用來對「所有的 request」進行前置處理即可
// 由於 Express.js 如果要獲取傳送過來的表單資料需要另外設定，否則會回傳 undefined，因此，這裡需要使用 express.urlencoded，從請求網址中獲取表單資料，並加入 extended: true 的設定
app.use(methodOverride('_method')) // 使用 methodOverride，用 '_method' 作為識別

// 新增 for MVC 的 Model
// 在 app.js 檔案使用 app.use，並提供靜態檔案的路徑，就可以將 JSON 檔案載入
app.use(express.static('public'))

// 設定路由
// http://localhost:3000/
app.get('/', (req, res) => {
	// res.render('index')
  res.redirect('/restaurants') // 將根路徑 / redirect 到 /restaurants ，原因是專案規格中，網站的首頁會直接導向餐廳清單。
})

// 取得 GET restaurants 清單頁：http://localhost:3000/restaurants
app.get('/restaurants', async (req, res) => {
  try {
    // 從 database 取得餐廳資料
    const restaurants = await restaurant.findAll({ // 刪除原本的 res.send('get all restaurants')，改成利用 restaurant.findAll 取得全部的 restaurant 項目     
      attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'],
      raw: true
    })
    // 若關鍵字存在則進行篩選，若無關鍵字則回傳所有資料
    const keyword = req.query.search?.trim().toLowerCase()
    const matchedRestaurants = keyword? restaurants.filter((rst) => 
      Object.values(rst).some((prop) => {
        if (typeof prop === 'string') {
          return prop.toLowerCase().includes(keyword)
        }
        return false
      })
    ) : restaurants
    // 渲染畫面
    res.render('index', {restaurants: matchedRestaurants, keyword})
    // 錯誤處理
    } catch (err) {
        console.log(err)  
    }
})  

// create-取得 GET restaurants 新增頁：http://localhost:3000/restaurants/new
app.get('/restaurants/new', (req, res) => {
	return res.render('new') // 刪除原本的「res.send('create restaurant')」，改成「return res.render('new')」，以「透過 view 引擎去拿 new 樣板」
})

// create-新增 POST restaurant：http://localhost:3000/restaurants/new
app.post('/restaurants', (req, res) => {
  // 刪除原本的「res.send('add restaurant')」
  // 從表單中獲取資料
  const { // 原本是 const name = req.body.RestaurantName // 表單資料可以從 request 的 body 得到，並依據剛剛我們在 Input 中指定的 Name 屬性來定義
    RestaurantName,
    RestaurantName_en,
    RestaurantCategory,
    RestaurantImage,
    RestaurantLocation,
    RestaurantPhone,
    RestaurantGoogle_map,
    RestaurantRating,
    RestaurantDescription,
  } = req.body;

  // 使用 Sequelize 的 Model Create 方法插入資料
  return restaurant.create({ // 原本是 return restaurant.create({ name })
    name: RestaurantName,
    name_en: RestaurantName_en,
    category: RestaurantCategory,
    image: RestaurantImage,
    location: RestaurantLocation,
    phone: RestaurantPhone,
    google_map: RestaurantGoogle_map,
    rating: RestaurantRating,
    description: RestaurantDescription,
  })
    .then(() => res.redirect('/restaurants')) // 成功後用 redirect，將網址導回 restaurants 清單頁
    .catch((err) => console.error(err));
});

// Read-取得 GET restaurants 項目頁-看 restaurant 的 detail：http://localhost:3000/restaurants/{id}
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id // 刪除原本的「res.send(`get restaurant: ${req.params.id}`)」，改成「const id = req.params.id」，以「使用 params 做動態路由：取得使用者在網址列中輸入的「請求物件」，取得使用者於網址上 :id 位置輸入的內容，再把這個取得的內容動態回應到使用者所看的網站畫面中，最終讓使用者可以在瀏覽器畫面上看到自己於網址列所輸入的內容」 
  // const restaurant = restaurants.find((rt) => rt.id.toString() === id) // reading 新增，rt 是 restaurant 的縮寫 
	return restaurant.findByPk(id, {
		attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'], // 加入 Attribute 取得特定欄位
		raw: true
	})
		.then((restaurant) => res.render('detail', { restaurant })) // reading：將 res.send(`read restaurant: ${id}`) 更新為 res.render('detail')，但無論怎麼點，都是直接跳出樣板的內容
  // reading：再更新為 res.render('detail', { restaurant })，所以點擊後，可跳出對應樣板的內容  
		.catch((err) => console.log(err))
})

// Update-取得 GET restaurants 編輯頁
app.get('/restaurants/:id/edit', (req, res) => {
	const id = req.params.id // 在渲染表單之前，我們要先取得編輯物件的 restaurant 內容
	// 刪除原本的「res.send(`get restaurant edit: ${req.params.id}`)」，改成「return res.render('edit')」，以「取得 edit.hbs 中的樣板」
	// 再改成	return restaurant.findByPk
	return restaurant.findByPk(id, {
		attributes: ['id', 'name', 'name_en', 'category', 'image', 'location', 'phone', 'google_map', 'rating', 'description'], // 加入 Attribute 取得特定欄位
		raw: true
	})
		.then((restaurant) => res.render('edit', { restaurant })) // 取得結果後，透過 View Template，渲染 restaurant 編輯頁
		.catch((err) => console.log(err))	
})

// Update-編輯 PUT restaurant
app.put('/restaurants/:id', (req, res) => { // 更新、編輯 restaurant，用 id 指定編輯的對象
	// 刪除：res.send(`restaurant id: ${req.params.id} has been modified`) // 指定前面路由參數設定的 id
	const body = req.body
	// console.log(body) 
	const id = req.params.id
	 
	return restaurant.update({ // 原本是 return restaurant.update({ name: body.RestaurantName })
    name: body.RestaurantName, 
    name_en: body.RestaurantName_en,
    category: body.RestaurantCategory,
    image: body.RestaurantImage,
    location: body.RestaurantLocation,
    phone: body.RestaurantPhone,
    google_map: body.RestaurantGoogle_map,
    rating: body.RestaurantRating,
    description: body.RestaurantDescription,
  }, { where: { id }})
		.then(() => res.redirect(`/restaurants/${id}`))
})
 
// Delete-刪除 restaurant
app.delete('/restaurants/:id', (req, res) => { // 刪除 restaurant
	const id = req.params.id

	return restaurant.destroy({ where: { id }})
		.then(() => res.redirect('/restaurants'))
	// 刪除：res.send(`restaurant id: ${req.params.id} has been deleted`)
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