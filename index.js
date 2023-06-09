import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js'

//Crear la app/servidor
const app=express(); //Otros le llaman servidor 

//Routing
app.use('/',usuarioRoutes); //.use() busca todas las rutas que inicien con / 
                            //.get() busca la ruta en exacta

//Si utilizaría app.get(‘/’) solo podría acceder al get(‘/’) mientras que con app.use()
// puedo acceder al ‘/’ y al ‘nosotros’ de usuarioRoutes

//Definir un puerto y arrancar el proyecto
const port=3000;
app.listen(port,()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})

