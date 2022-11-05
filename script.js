const fs = require("fs");
const knex = require('knex')
const {productosOptions} = require('./data/configDb')

class Contenedor{
    constructor(nameFile){
        this.nameFile = nameFile;
        this.database = knex(productosOptions);

        if(!this.database.schema.hasTable('productos')){
            this.database.schema.createTable('productos',tabla =>{
                tabla.increments('id').primary();
                tabla.string('title',50);
                tabla.float('price');
                tabla.string('thumbnail',150)
            }).then((result) => {
                console.log("creado");
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    save = async(product)=>{
        try {
            console.log(product);
            await this.database('productos').insert(product)
        } catch (error) {
            console.log(error);
        }
    }

    getById = async(id)=>{
        try {
            return this.database('productos').select().where({ id: id })
        } catch (error) {
            console.log(error)
        }
    }

    getAll = async()=>{
        try {
            return this.database('productos').select()
        } catch (error) {
            console.log(error)
        }
    }

    deleteById = async(id)=>{
        try {
            return this.database('productos').where({id:id}).del()
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async()=>{
        try {
            return this.database('productos').del()
        } catch (error) {
            console.log(error)
        }
    }
    getRandomProduct = async()=>{
        let productos = await this.getAll()
        let NumRand = parseInt(Math.random()*productos.length)
       
        return productos[NumRand]
    }
}

const listaProductos = new Contenedor("./productos.txt")
const producto1 = {
    title:"mayonesa",
    price:200,
    thumbnail:"https://f.fcdn.app/imgs/a9fa89/www.elclon.com.uy/clonuy/ce5d/original/catalogo/83745-1/460_460/mayonesa-uruguay-d-p-500cc-mayonesa-uruguay-d-p-500cc.jpg"
}

const producto2 = {
    title:"leche",
    price:90,
    thumbnail:"https://geant.vteximg.com.br/arquivos/ids/251828-1000-1000/240501.jpg?v=637272144698570000"
}

const producto3 = {
    title:"arroz",
    price:70,
    thumbnail:"https://www.saman.uy/wp-content/uploads/2021/07/DonRuggero1KgProducto.png"
}

/* const crearProducto = async()=>{
    await listaProductos.save(producto1);
    await listaProductos.save(producto2);
    await listaProductos.save(producto3);
    const resultadoId = await listaProductos.getById(2);
    console.log(resultadoId)
    const productos = await listaProductos.getAll();
    console.log(productos)
    await listaProductos.deleteById(3);
    await listaProductos.save(producto3);
    // await listaProductos.deleteAll();
} */

/* crearProducto(); */

module.exports = Contenedor