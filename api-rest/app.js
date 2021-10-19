'use static'
const express= require('express')
//const bodyParser = require('body-parser')
const bodyParser = require('body-parser')
const mongose= require('mongoose')
const Librerias= require('./models/libreria')

const app = express()

const port = process.env.PORT || 3000


const cors = require('cors'); 
app.use(cors());
//https://stackoverflow.com/questions/36878255/allow-access-control-allow-origin-header-using-html5-fetch-api

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
/*
app.get('/hola/:nombre',(req,res) =>
{
    res.send(  "Mensaje : Hola soy "+ req.params.nombre)
})
*/
app.get('/api/libreria',(req,res)=>{
    
    Librerias.find({},(err,libreria) =>{
        if(err) res.status(500).send('message : Error al leer: '+err)
        if(!libreria) return res.status(404).send('No existen Librerias')
        //res.send(200, {products:products})
         res.status(200).send(libreria)
    })

})
app.get('/api/libreria/:libreriaId',(req,res)=>{
    let libreriaId=req.params.libreriaId
    Librerias.findById(isbn,(err, libreria)=>{
        if(err) res.status(500).send('message : Error al leer: '+err)
        if(!libreria) return res.status(404).send('No existe')
        res.status(200).send({libreria})
    })
}) 
app.post('/api/libreria',(req,res)=>{
    //console.log(req.body)
   // res.send({message : 'Producto recibido'})
    console.log('POST /api/libreria')
    console.log(req.body)
   
    let libreria = new  Librerias()

    libreria.nombre= req.body.nombre
    libreria.especialidad= req.body.especialidad
    libreria.longitud= req.body.longitud
    libreria.latitud= req.body.latitud
    libreria.numero= req.body.numero
   
    
    libreria.save((err,Libreriastored)=>{
        if(err) res.status(500).send('message : Error al grabar: '+err)
        res.status(200).send({libreria:Libreriastored})
    })

    
})

app.delete('/api/libreria/:libreriaId',(req,res)=>{

    let libreriaId=req.params.libreriaId
    Librerias.findById(libreriaId,(err, libreria)=>{
        if(err) res.status(500).send({message:'Error al borrar : ${err}'})
        libreria.remove(err =>{
            if(err) res.status(500).send('message : Error al borrar : '+err)  
            res.status(200).send({message: 'Registro borrado : '})
        })
      //  if(!product) return res.status(404).send('No existe')
       
    })
})


app.put('/api/libreria/:libreriaId',(req,res)=>{
    let libreriaId = req.params.libreriaId
    let registroModificado= req.body;
    Librerias.findByIdAndUpdate(libreriaId,registroModificado, (err,libreriaUpdated) => {
        if(err) res.status(500).send({message: 'Error al modificar: ${err}'})
        res.status(200).send({libreria:libreriaUpdated})
    })
    
})
 

//mongose.connect('mongodb://localhost:58140/mydatabase',(err,res)=>{
mongose.connect('mongodb://localhost:27017/mydb',(err,res)=>{
    if(err) {
        return console.log("Error de conexion ${}")
    }
    console.log('Conexión establecida')

    app.listen(port,()=>{
        console.log(`Api Rest ejecutandose en http:/localhost:${port}`)
    })

})