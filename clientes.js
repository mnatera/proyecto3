const Sequelize = require ("sequelize");
const sequelize= new Sequelize("mysql://root:root@127.0.0.1:3306/pedidos");
const {codificar} = require('./seguridad');
module.exports = {

insertarUsuario: (req,res) =>{
    const{
        username,
        fullname,
        correo,
        celular,
        direccion,
        contraseña,
        rol
    }=req.body;

sequelize.query('INSERT INTO Usuarios (username,fullname,correo,celular,direccion,contraseña,rol) VALUES ("' + username + '", "' + fullname + '", "' + correo + '", "' + celular + '", "' + direccion + '","' + contraseña + '","' + rol + '")', {
    type: sequelize.QueryTypes.INSERT
    }).then((resultado) => {
        console.log (resultado);
        const usuarioId = resultado[0];
        const Token = codificar( username, contraseña, rol, usuarioId);
        res.json({ estado: "Usuario registrado", Token: Token });
    }).catch((error) => {
    res.json({"estado":error});
    });
},
validarUsuario: (req,res) =>{
    const{
        username,
        contraseña
     
    }=req.body;
   
    var query = 'select id,rol from usuarios where username = "'+ username + '" and contraseña ="'+ contraseña+'"'
    sequelize.query (query, {type: sequelize.QueryTypes.SELECT}).then(respuestavalidar => {
            if(respuestavalidar.length == 1){
                console.log(respuestavalidar);
                const {id,rol} = respuestavalidar[0];
                const Token = codificar( username, contraseña, rol,id);
                (Token) ?res.json({status:"usuario autenticado",Token}) :res.json ({status:"usuario no autenticado"});
            } else{res.json ({status:"usuario o clave invalida"});
            }
        }).catch((e) => {
        res.json({ "Status": "Error" +e}) });

},

mostrarUsuarios: (req,res) => {
    sequelize.query ('select * from usuarios',{
        type: sequelize.QueryTypes.SELECT})
    .then(mostrarusuarios =>{
        (mostrarusuarios.length== 0) ?res.json({status:"no hay usuarios registrados"}) :res.json ({status:mostrarusuarios});
    }).catch((e) => {
            res.json({ "Status": "Error" +e}) })
    
    },
mostrarUsuariosUser:(req,res) => {
    const id = res.locals.usuario;


    sequelize.query ('select * from usuarios where id = '+ id +'',{
type: sequelize.QueryTypes.SELECT})
.then(mostrarusuario =>{
    (mostrarusuario.length== 0) ?res.json({status:"no hay información disponible"}) :res.json ({status:mostrarusuario});
    }).catch((e) => {
            res.json({ "Status": "Error" +e}) })
    
    },
}