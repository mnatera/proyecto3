const {validarusuario,mostrarUsuarios,mostrarUsuariosUser,} = require('./clientes');
const{ValidarProducto} =require('./productos');
const {descodificar} = require('./seguridad');
const{mostrarOrdersUser,mostrarOrdersAdmin} = require ('./pedidos');

module.exports ={
ValidarDatos:(req,res,next) => {
    
    const{
        username,
        fullname,
        estado,
        direccion,
        correo,
        contraseña,
        celular
    }=req.body;
    if (username!=""&&fullname!=""&&estado!=""&&direccion!=""&&correo!=""&&contraseña!=""&&celular!=""){
        next()   
    } else {
        res.json({ "Status": "ingresar datos" });
    }
},
validarDatosIngresados: (req,res,next) =>{
    const{
        username,
        contraseña
    }=req.body;
    if (username!=""&&contraseña!=""){
        next()   
    } else {
        res.json({ "Status": "ingresar datos" });
    }
},

validaciones: async (req,res,next) => {

    const Token = req.headers.autenticacion;

    if (!Token) {
        res.json({status: "token invalido"})
    }
    else{
        const usuario = descodificar(Token);
        
        if (!usuario){
           return res.json({estado: "no tienes permisos"})
        }
        else {
            const {
                id,
                rol
            } = usuario;
        
           if(rol == "admin"){
            switch (req.path) {
        case '/newProduct':
        const {
            nombre_producto
        } = req.body;
      
        await ValidarProducto(nombre_producto)
        .then (respuestavalidar => {
            if (respuestavalidar.length == 0){
                next ();
            }else{
                res.json({status:"nombre del producto ya esta registrado"})
            }
        }).catch((error) => {
            res.json ({
            status:"error: " + error }) 
        })
            break; 
        case '/showOrders':
            mostrarOrdersAdmin(req,res);
            break;
            
        case'/showUser':
            mostrarUsuarios (req,res);
            break;
    
            default:next();
            break;
        }
    } else {
       /*"usuarios"*/
       switch (req.path){
           case '/showProduct':
               next ();
               break;

           case '/newOrders':
            next ();
            break;
            
            case '/showUser':
                res.locals.usuario = id;
                mostrarUsuariosUser(req,res)
                break;


                case'/showOrders':
                res.locals.usuario = id;
                console.log(usuario)
                mostrarOrdersUser(req,res)
                break;
                
                default: res.json ({status: "no tienes persmisos"})
                break;
       }
    }
    }
}
},
}
