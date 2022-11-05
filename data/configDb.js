const mdb = require('knex-mariadb')

const mensajesOptions = {
    client: 'sqlite3',
    connection: {
      filename: __dirname+'/mensajes.sqlite',
    },
    useNullAsDefault: true
  }

const productosOptions = {
    client: mdb,
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : 'root',
      password : 'rootroot',
      database : 'ecommerce'
    },
    useNullAsDefault: true
} 

module.exports = {mensajesOptions,productosOptions}
