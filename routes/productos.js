const express = require("express");
const router = express.Router();

const co = require("../script")
const conte = new co("productos.txt")

//Obtengo todos los productos
/* router.get("/", async (request, response)=>{
    const productos = await conte.getAll();
    response.send(productos);
}) */

//Obtengo el producto segun la id 
/* router.get("/:productoId", async (request, response)=>{
    const productos = await conte.getAll();
    const {productoId} = request.params;
    const producto = productos.find(elem=>elem.id === parseInt(productoId));
    if(producto == undefined){
        response.status(404).send({msg:"producto no encontrado"})
    }else{
        response.send(producto);
    }
}) */

/* router.post("/", async (request, response)=>{
    const newProducto = request.body
    const productoAgregado = await conte.save(newProducto)
    response.json({msg:"Post realizado correctamente", data: productoAgregado})
}) */

router.put("/:id", async (request, response)=>{
    const {id} = request.params;
    const modificacion = request.body;
    let productos = await conte.getAll();
    const posProducto = productos.findIndex(elem=>elem.id === parseInt(id));
    if(posProducto>= 0){
        productos[posProducto] = modificacion;
        conte.deleteAll();
        for(let producto of productos){
            await conte.save(producto);
        }
        productos = await conte.getAll();
        response.status(200).json({msg:"Se realizo correctamente la actualizacion", data: productos})
    }else{
        response.status(404).send({error:"producto no encontrado"})
    }
    
})

router.delete("/:id", async (request, response)=>{
    const {id} = request.params
    await conte.deleteById(parseInt(id))
    response.send("Peroducto eliminado con exito")
})

//Ruta para mostrar los productos en una tabla
router.get("/mostrarProductos", async (request, response)=>{
    const productos = await conte.getAll();
    response.render("mostrarProductos", {productos})
})

//Ruta con formulario para agregar los productos mediante post
router.get("/agregarProductos", async (request, response)=>{
    const productos = await conte.getAll();
    response.render("agregarProductos", {productos})
})

//Post de los productos
router.post("/", async (request, response)=>{
    const newProducto = request.body
    console.log(newProducto)
    const productoAgregado = await conte.save(newProducto)
    response.redirect("/productos/mostrarProductos")
})

module.exports = router;