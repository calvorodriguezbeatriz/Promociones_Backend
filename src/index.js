const express=require('express')
const app=express()
const cors=require('cors')
const data=require('./mockdata')

app.use(express.json())
app.use(cors())


// middlewares
app.get('/', (req,res)=>{
    res.send('Hola qué tal')
})

app.get('/localizame', (req,res)=>{
    res.send('Estoy en la luna')
})

app.get('/alldata', (req,res)=>{
    res.send(data)
})

app.get('/promotion/:id', (req,res)=>{
    const id=req.params.id
    const promotion=data.filter ((promo)=>{
        if (promo.id===id) return true
        else return false
    })
    res.send(promotion)
})

app.get('/search-promotion-bybrand/:brand', (req,res)=>{
    const brand=req.params.brand
    const promotion=data.filter ((promo)=>{
        if (promo.brand.toLowerCase().indexOf (brand.toLowerCase())>=0) return true
        else return false
    })
    res.send(promotion)
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

//iniciar server
app.listen(5000 , ()=>{
    console.log('Estamos escuchando en el puerto 5000');

})

