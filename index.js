const express = require('express');
const app = express ();
app.use(express.json());
const PORT = 4452;

const swaggerUI=require ("swagger-ui-express")
const swaggerDocument=require("./swagger.json");
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument))

const {insertarUsuario,validarUsuario,mostrarUsuarios} = require('./clientes');
const{ingresarProducto,mostrarproducto,actualizarProducto,eliminarProducto} =require('./productos');
const{insertarpedido,actualizarpedido,eliminarpedido} = require ('./pedidos');
const {ValidarDatos,validarDatosIngresados,validaciones} = require('./midleware');
//////////////Usuarios/////////////////////////////////
app.post('/newUser',ValidarDatos,insertarUsuario);////// ingresar un usuario a la tabla de usuarios///
app.post ('/loguinUser',validarDatosIngresados,validarUsuario);// loguear el usario en la rest api///
app.get ('/showUser',validaciones,mostrarUsuarios);////// muestra todos los usuarios/////
//////////////////////////////////producto/////////////
app.post('/newProduct',validaciones,ingresarProducto);/////ingresa los nuevos alimentos en la tabla de productos//////
app.put('/updateProduct',validaciones,actualizarProducto);///// Actualizar los alimentos que se encuentra en la tabla productos///
app.delete('/deleteProduct',validaciones,eliminarProducto);/// eliminar un alimento de la tabla productos //
app.get('/showProduct',validaciones,mostrarproducto);/////muestra todos los alimentos de la tabla productos///
//////////////////////////////Pedido///////////////////
app.post('/newOrders',insertarpedido);///// ingresar un nueva orden dentro de la tabla pedidos///
app.get ('/showOrders',validaciones);////// muestra las ordenes procesadas al administrador////
app.put ('/updateOrders',validaciones,actualizarpedido);///// actualiza el estado de las ordenes///
app.delete('/deletePedido',validaciones,eliminarpedido);///// eliminar un pedido//////

app.listen(PORT,()=>console.log("servidor funcionando" + " "+ PORT));



