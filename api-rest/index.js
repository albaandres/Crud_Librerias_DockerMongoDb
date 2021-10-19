'use static'
const express= require('express')
//const bodyParser = require('body-parser')
const bodyParser = require('body-parser')
const mongose= require('mongoose')
const Product= require('./models/product')

const app = express()

const port = process.env.PORT || 3000



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
/*
app.get('/hola/:nombre',(req,res) =>
{
    res.send(  "Mensaje : Hola soy "+ req.params.nombre)
})
*/
app.get('/api/product',(req,res)=>{
    
    Product.find({},(err,products) =>{
        if(err) res.status(500).send('message : Error al leer: '+err)
        if(!products) return res.status(404).send('No existen productos')
        res.send(200, {products:products})
    })

})
app.get('/api/product/:productId',(req,res)=>{
    let productId=req.params.productId
    Product.findById(productId,(err, product)=>{
        if(err) res.status(500).send('message : Error al leer: '+err)
        if(!product) return res.status(404).send('No existe')
        res.status(200).send({product})
    })
}) 
app.post('/api/product',(req,res)=>{
    //console.log(req.body)
   // res.send({message : 'Producto recibido'})
    console.log('POST /api/product')
    console.log(req.body)

    let product = new  Product()
    product.name= req.body.name
    product.picture= req.body.picture
    product.price= req.body.price
    product.category= req.body.category
    product.description= req.body.description
    
    product.save((err,productStored)=>{
        if(err) res.status(500).send('message : Error al grabar: '+err)
        res.status(200).send({product:productStored})
    })

    //res.status(200).send({message : 'Producto recibido'})
    //res.status(404).send({message : 'Producto NO recibido'})
})
app.delete('/api/product/:productId',(req,res)=>{

    let productId=req.params.productId
    Product.findById(productId,(err, product)=>{
        if(err) res.status(500).send({message:'Error al borrar : ${err}'})
        product.remove(err =>{
            if(err) res.status(500).send('message : Error al borrar : '+err)  
            res.status(200).send({message: 'Regsitro borrdo : '})
        })
      //  if(!product) return res.status(404).send('No existe')
       
    })
})


app.put('/api/product/:productId',(req,res)=>{
    let productId = req.params.productId
    let registroModificado= req.body;
    Product.findByIdAndUpdate(productId,registroModificado, (err,productUpdated) => {
        if(err) res.status(500).send({message: 'Error al modificar: ${err}'})
        res.status(200).send({product:productUpdated})
    })
    
})
 

//mongose.connect('mongodb://localhost:58140/mydatabase',(err,res)=>{
mongose.connect('mongodb://localhost:27017/mydatabase',(err,res)=>{
    if(err) {
        return console.log("Erroe de conexion ${}")
    }
    console.log('Conexión establecida')

    app.listen(port,()=>{
        console.log("Api Rest ejecutandose en http:/localhost:${port}")
    })

})
/*
app.listen(port,()=>{
    console.log("Api Rest ejecutandose en http:/localhost:${port}")
})*/