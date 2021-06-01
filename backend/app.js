const path = require ('path');
const express = require('express');
const app = express();
app.use(express.json());
const Cliente = require('./models/cliente');
const mongoose = require('mongoose');
const clienteRoutes = require ('./rotas/clientes');
const usuarioRoutes = require ('./rotas/usuarios');


mongoose.connect('mongodb+srv://Igor123:Igor123@cluster.hhxrl.mongodb.net/teste_mean?retryWrites=true&w=majority')
  .then(() => {
    console.log("Conexão OK")
  }).catch(() => {
    console.log("Conexão NOK")
  });

app.use('/imagens', express.static(path.join("backend/imagens"))); 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,  Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE,  OPTIONS');
  next();
});

//app.use (clienteRoutes);
app.use ('/api/clientes', clienteRoutes);
app.use ('/api/usuario', usuarioRoutes);



module.exports = app;
