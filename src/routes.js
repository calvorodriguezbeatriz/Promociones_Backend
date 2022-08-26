const data=require('./mockdata')

const Promotion = require('./models/promotionsModel')

module.exports = function(app){

	app.get('/', (req,res)=>{
			res.send('Hola qué tal')
	})

	app.get('/localizame', (req,res)=>{
			res.send('Estoy en la luna')
	})

	app.get('/alldata', (req,res)=>{
			Promotion.find()
				.then ( data=>{
					res.send(data)
				})
				.catch( error => {
					res.status.apply(400).send( error )
				})
	})

	app.get('/promotion/:id', (req,res)=>{
			const id=req.params.id
			// const promotion=data.filter ((promo)=>{
			// 		if (promo.id===id) return true
			// 		else return false
			// })

			Promotion.findOne({ id: id })
				.then( data => {
					res.send(data)
				})
				.catch( error => {
					res.status.apply(400).send( error )
				})
	})

	app.get('/search-promotion-bybrand/:brand', (req,res)=>{
			const brand=req.params.brand
			Promotion.find({ brand: /brand/i })
				.then( data => {
					res.send(data)
				})
				.catch( error => {
					res.status.apply(400).send( error )
				})

			// const promotion=data.filter ((promo)=>{
			// 		if (promo.brand.toLowerCase().indexOf (brand.toLowerCase())>=0) return true
			// 		else return false
			// })
			// res.send(promotion)
	})


	// body
	app.post('/login', (req,res)=>{
			const email=req.query.email
			const password=req.query.password
			res.send({
					email:email,
					password:password,
					test:"Se envió"
			})
	})

	app.post('/login-params/:email/:password', (req,res)=>{
			const email=req.params.email
			const password=req.params.password
			res.send({
					email:email,
					password:password,
					test:"Se envió"
			})
	})


	app.post('/login-body', (req,res)=>{
			const email=req.body.email
			const password=req.body.password
			console.log("Someone is trying to login",email, password)
			res.send({
					email:email,
					password:password,
					test:"Se envió"
			})
	})
}

