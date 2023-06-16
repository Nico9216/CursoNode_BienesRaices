import {DataTypes} from 'sequelize';
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

})

export default Usuario