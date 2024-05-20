import { Client } from 'pg';

const config = {
    host: 'localhost',
    database: 'postgres',
    port: 5432, // Puerto por defecto de PostgreSQL
    searchPath: ['Obligatorio'] 
  };

const client = new Client(config);

client.connect()
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => {throw new Error('Error al conectar a la base de datos')});

client.query('SET search_path TO Obligatorio').then(() => console.log('Cambiado el search_path a Obligatorio'));

export default client;
