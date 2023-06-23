import {check,validationResult} from 'express-validator'
import Usuario from '../models/Usuario.js'
import {generarId} from '../helpers/tokens.js'

const formularioLogin=(req,res)=>{
    res.render('auth/login',{
        pagina:'Iniciar Sesión'
    })
}

const formularioRegistro=(req,res)=>{
    res.render('auth/registro',{
        pagina:'Crear cuenta'
    })
}

const formularioOlvidePassword=(req,res)=>{
    res.render('auth/olvide-password',{
        pagina:'Recupera tu acceso a Bienes Raices'
    })
}

const registrar= async (req,res)=>{
    //Validación
    //'nombre','email', 'password' son los "name" de los input del formulario de registro en registro.pug
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('Formato de email no válido').run(req)
    await check('password').isLength({min:6}).withMessage('El password debe tener al menos 6 caracteres').run(req)
    await check('repetir_password').equals(req.body.password).withMessage('Los passwords no coinciden').run(req)


    let resultado=validationResult(req) //revisa las reglas definidas anteriormente y devolverá un arreglo con los errores en caso de existir

    //Verificar que el resultado es vacío
    if(!resultado.isEmpty()){
        return res.render('auth/registro',{ //Recordar 'pagina', 'errores' son propiedades que yo creo y pueden variar el nombre
            pagina:'Recupera tu acceso a Bienes Raices',
            errores:resultado.array(), //Errores es una propiedad que accede registro.pug para mostrar los errores
            usuario:{
                nombre:req.body.nombre,
                email:req.body.email,
            }
        })
    }
    
    //Extraer los datos
    const{nombre,email,password}=req.body

    //Verificar que el usuario no este duplicado (mismo email=duplicado)
    const existeUsuario=await Usuario.findOne({where:{email}})//{email:email} como tiene el mismo nombre se puede omitir
    if(existeUsuario){
        return res.render('auth/registro',{ 
            pagina:'Recupera tu acceso a Bienes Raices',
            errores:[{msg:'El usuario ya está registrado'}],
            usuario:{
                nombre:req.body.nombre,
                email:req.body.email,
            }
        })
    }

    //Almacenar usuario
    await Usuario.create({
        nombre,
        email,
        password,
        token:generarId()}
    )

    //Mostrar mensaje de confirmación
    res.render('templates/mensaje',{
       pagina:'Cuenta Creada Correctamente' ,
       mensaje:'Hemos enviado un Email de confirmación, presione en el enlace'
    })
    
}

export{
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar
}