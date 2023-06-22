import {DataTypes} from 'sequelize';
import bcrypt from 'bcrypt'
import db from '../config/db.js'

const Usuario=db.define('usuarios',{ //usuarios sera el nombre de la tabla
    nombre:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    token:DataTypes.STRING,
    confirmado:DataTypes.BOOLEAN

},{
    hooks:{
        beforeCreate:async function(usuario){ //usuario sería el req.body
            const salt =await bcrypt.genSalt(10)
            usuario.password=await bcrypt.hash(usuario.password,salt);
        }
    }
}
)

export default Usuario