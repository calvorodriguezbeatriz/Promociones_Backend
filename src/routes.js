const data=require('./mockdata')
const jwt = require('jsonwebtoken');
const Promotion = require('./models/promotionsModel')
const usersModel = require('./models/usersModel')

function authenticateToken(req, res, next) {
  const token = req.headers['auth-token']
  
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, 'BEA', ( err ) => {
		console.log(err)

		if (err) return res.sendStatus(403)

		next()
  })
}

module.exports = function(app){

	app.get('/', (req,res)=>{
			res.send('Hola qué tal')
	})

	app.get('/localizame', (req,res)=>{
			res.send('Estoy en la luna')
	})

	app.get('/alldata', authenticateToken, (req,res)=>{
			Promotion.find()
				.then ( data=>{
					res.send(data)
				})
				.catch( error => {
					res.status.apply(400).send( error )
				})
	})

	app.get('/promotion/:id', authenticateToken, (req,res)=>{
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

	app.get('/search-promotion-bybrand/:brand', authenticateToken, (req,res)=>{
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

			usersModel.findOne({email:email})
			.then(data=>{
				if (data?.password===password && password!=undefined) {

					const token = jwt.sign( data.email, 'BEA' )
				
					res
						.header({ 'auth-token': token })
						.status(200)
						.send({data:token})
				
				}
				else {res.status(403).send("¿Me estás intentando piratear?")}
			})
			.catch( error => {
				res.status(403).send( error )
			})

	})
}

