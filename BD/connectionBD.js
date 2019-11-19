const mongoose = require('mongoose');
const config = require('../config/config');

const connect_url = config.url;
const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true }

 mongoose.connect(connect_url, options);
 mongoose.set('useCreateIndex', true);

 mongoose.connection.on('connected', () => console.log(`Conexão com banco de dados realizada com sucesso`));
 mongoose.connection.on('error', (err) => console.log(`Erro na conexão com o banco de dados, ${err}`));
 mongoose.connection.on('disconnected', () => console.log(`Fim da conexão com o bancod de dados`));

 module.exports = mongoose;
