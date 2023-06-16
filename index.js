import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

//Crear la app/servidor
const app=express(); //Otros le llaman servidor 

//Habilitar lectura de datos de formularios (recibir requests)
app.use(express.urlencoded({extended:true})) 

//Conexión a la base de datos
try {
    await db.authenticate();
    db.sync();//Crea las tablas(las de model) en caso de no existir
    console.log('Conexión correcta a la base de datos')
} catch (error) {
    console.log(error)
}

//Habilitar Pug
app.set('view engine','pug')
app.set('views','./views')

//Carpeta Pública
app.use(express.static('public')) //Establezco la ruta donde estara la parte publica, es decir la que podrá acceder 
//el usuario que visita el sitio web, ejemplo imagenes, css,archivos etc.

//Routing
app.use('/auth',usuarioRoutes); //.use() busca todas las rutas que inicien con / 
                            //.get() busca la ruta en exacta

//Si utilizaría app.get(‘/’) solo podría acceder al get(‘/’) mientras que con app.use()
// puedo acceder al ‘/’ y al ‘nosotros’ de usuarioRoutes



//Definir un puerto y arrancar el proyecto
const port=3000;
app.listen(port,()=>{
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})

