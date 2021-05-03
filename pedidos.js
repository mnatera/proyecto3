const Sequelize = require ("sequelize");
const sequelize= new Sequelize("mysql://root:root@127.0.0.1:3306/pedidos");




function insertarpedidoproducto (id_pedido,element) {
    let{
        id_producto,
        cantidad
    } =element;
    sequelize.query ('INSERT INTO pedido (id_producto,cantidad,id_pedido) VALUES ( "' + id_producto + '","' + id_pedido + '","' + cantidad + '")',{
    /*type: sequelize.QueryTypes.INSERT*/
}).then(respuestaInsertarPP  => {
    return true;
}).catch((error ) => {return false;});
}

module.exports = {
insertarpedido:async (req,res)=>{
    const{
        estado,
        id_producto,
        pago,
        cantidad,
        id_usuario
    }=req.body
const data = new Date ();
const tms = `${data.getFullYear()}-${data.getMonth()}-${data.getDay()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
sequelize.query ('INSERT INTO pedido (estado,hora,id_producto,pago,cantidad,id_usuario) VALUES  ("' + estado + '", "' + tms + '", "' + id_producto + '", "' + pago+ '", "' + cantidad+ '","' + id_usuario + '")',/* ( "' + estado + '","' + tms + '", "'+id_producto+ '", "' + pago + '","' + cantidad+ '","' + id_usuario + '")',*/{
type: sequelize.QueryTypes.INSERT
}).then(respuestaInsertarP => {
    const capturarposicion= respuestaInsertarP[respuestaInsertarP.lenght - 1];
    console.log (respuestaInsertarP);
    if(capturarposicion==0) {
        res.json ({ status:"no se ingreso pedido"});
    }else{
        res.json({status:"se ingreso pedido correctamente"})
    }

}).catch((error) =>{
    res.json({status:"error: " + error})})
},

mostrarOrdersUser: (req, res) => {
    const usuario = res.locals.usuario;
    sequelize.query ('select * from pedido where id_usuario = ' + usuario , {
    }).then(respuestapedidouser => {
        (respuestapedidouser.lenght == 0) ?respuesta.json ({status: " no hay pedido con este id "})
        :res.json(respuestapedidouser)
    }).catch ((error) => {res.json({status:"error: " + error})})

},
mostrarOrdersAdmin : ( req,res) => {
    const usuario = res.locals.usuario;
    sequelize.query ('select * from pedido', {
    }).then(respuestapedidoadmin => {
        (respuestapedidoadmin.lenght == 0) ?respuesta.json ({status: " no hay pedidos guardados "})
        :res.json(respuestapedidoadmin)
    }).catch ((error) => {res.json({status:"error: " + error})})

},
actualizarpedido: (req,res) => {
    const{
        estado,
        id
    }=req.body;
    sequelize.query('update pedido set estado ="' + estado +'" where id = ' +id, { 
       type: sequelize.QueryTypes.UPDATE
    }).then((resultado) => {
    res.json({ "Status": "Succesfull" });
    }).catch((e) => {
    res.json({ "Status": "Error"+e });
    });
},
eliminarpedido: (req,res) => {

    const{
       id
    }=req.body;

sequelize.query('delete from pedido where id = ' + id + '', {
    type: sequelize.QueryTypes.DELETE
    }).then((resultado) => {
    res.json({ "Status": "Succesfull" });
    }).catch(() => {
    res.json({ "Status": "Error" });
    });
},
}



