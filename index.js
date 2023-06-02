import express from 'express';

//Crear la app/servidor
const app=express(); //Otros le llaman servidor 

//Routing
app.get('/',function(req,res){
    res.send('Funcionando')
})

app.get('/nosotros',function(req,res){
    res.json({msg:'Funcionando'})
})

//Definir un puerto y arrancar el proyecto
const port=3000;
app.listen(port,()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})