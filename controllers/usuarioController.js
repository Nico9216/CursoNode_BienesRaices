import {check,validationResult} from 'express-validator'
import Usuario from '../models/Usuario.js'
import {generarId} from '../helpers/tokens.js'
import {emailRegistro} from '../helpers/emails.js'

const formularioLogin=(req,res)=>{
    res.render('auth/login',{
        pagina:'Iniciar Sesión'
    })
}

const formularioRegistro=(req,res)=>{
    res.render('auth/registro',{
        pagina:'Crear cuenta',
        csrfToken:req.csrfToken()
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
            csrfToken:req.csrfToken(),
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
            csrfToken:req.csrfToken(),
            errores:[{msg:'El usuario ya está registrado'}],
            usuario:{
                nombre:req.body.nombre,
                email:req.body.email,
            }
        })
    }

    //Almacenar usuario
    const usuario =await Usuario.create({
        nombre,
        email,
        password,
        token:generarId()}
    )
    
    //Envia Email de confirmación
    emailRegistro({
        nombre:usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    //Mostrar mensaje de confirmación
    res.render('templates/mensaje',{
       pagina:'Cuenta Creada Correctamente' ,
       mensaje:'Hemos enviado un Email de confirmación, presione en el enlace'
    })
    
}

//Función que comprueba una cuenta
const confirmar=async (req,res,next)=>{
    const {token}=req.params //Al ser ruta dinámica lo obtenfo de req.params y no .body.

    //Verificar si el token es válido
    const usuario= await Usuario.findOne({where:{token}})
    
    if(!usuario){
        return res.render('auth/confirmar-cuenta',{
            pagina:'Error al confirmar tu cuenta' ,
            mensaje:'Hubo un error al confirmar tu cuneta, intenta de nuevo',
            error:true
        })
    }

    //Confirmar la cuenta
    usuario.token=null;
    usuario.confirmado=true;
    await usuario.save();

    res.render('auth/confirmar-cuenta',{
        pagina:'Cuenta Confirmada' ,
        mensaje:'La cuenta se confirmo correctamente',
    })

    //next();//En ves de quedarse cargando a la espera de una respuesta, va al siguiente middware
}

export{
    formularioLogin,
    formularioRegistro,
    formularioOlvidePassword,
    registrar,
    confirmar
}