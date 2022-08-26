const express=require('express')
const app=express()
const cors=require('cors')
const initRoutes=require('./routes')
const mongoose=require('mongoose')


app.use(express.json())
app.use(cors())

 
initRoutes(app)
// Conexión a Base de datos
const bbdd = "mongodb://localhost/promotions";
mongoose.connect(
    bbdd,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) throw err;
        console.log("Connected to MongoDB!!!");
    }
);
//iniciar server
app.listen(5000 , ()=>{
    console.log('Estamos escuchando en el puerto 5000');

})

