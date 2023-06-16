import Sequelize from 'sequelize';
import dotenv from 'dotenv'
dotenv.config({path:'.env'})

const db= new Sequelize(process.env.BD_NOMBRE,process.env.BD_USER,process.env.BD_PASS ??'',{ //nombre de la db,user, pass, config
    host:process.env.BD_HOST,
    port:3307,
    dialect:'mysql',
    define:{
        timestamps:true //Cuando un usuario se registra agrega de manera automatica dos columnas extras 
                        //a la tabla usuario con la fecha de creación y cuando fue actualizado.
    },
    pool:{ //Connection pool - configura el comportamiento para conexiones nuevas y/o existentes, 
            //Sequelize trata de mantener/reutilizar las conexioens que esten "vivas", 
            //se configura el pool para que en caso de que hayya una conexion viva se siga utilizando y no se cree una nueva
        
        max:5,//Maximo de conexiones a mantener
        min:0, //Cuando no haya actividad en el sitio, tratará de desconectar las conexiones.
        acquire:30000,//30000 ms/30s el tiempo que tratará para elaborar un error antes de marcar un error
        idle:10000, //10000 ms/10s tiempo que debe transcurrir sin actividad en el sitio para finalizar una conexión,
    },
    operatorAliases:false // operatorAliases ya estan obsoletos
});

export default db;