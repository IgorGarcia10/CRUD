const express = require('express');
const app = express();
app.use(express.json());
const Cliente = require('./models/cliente');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Igor123:Igor123@cluster.hhxrl.mongodb.net/teste_mean?retryWrites=true&w=majority')
  .then(() => {
    console.log("Conexão OK")
  }).catch(() => {
    console.log("Conexão NOK")
  });



const clientes = [{
  id: '1',
  nome: 'Vitoria',
  fone: '11223344',
  email: 'jose@email.com'
},
{
  id: '2',
  nome: 'Elcio !',
  fone: '898989898',
  email: 'elcio@elcio.com'
}
]


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,  Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE,  OPTIONS');
  next();
});

/* app.post('/api/clientes', (req, res, next) => {
  const cliente = req.body;
  console.log(cliente);
  res.status(201).json({
    mensagem: 'Cliente inserido'
  })
}); */

/* app.post('/api/clientes', (req, res, next) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  })
  console.log(cliente);
  res.status(201).json({ mensagem: 'Cliente inserido' })
}); */

app.get('/api/clientes', (req, res, next) => {

  Cliente.find().then(documents => {
    console.log(documents)
    res.status(200).json({
      mensagem: "Tudo Certo",
      clientes: documents
    });
  })

  /* res.status(200).json({
    mensagem: "Tudo OK",
    clientes: clientes
  }); */
});

/* app.delete('/api/clientes/:id', (req, res, next) => {
  console.log(req.params);
  res.status(200).end();
}); */

app.delete('/api/clientes/:id', (req, res, next) => {
  Cliente.deleteOne({ _id: req.params.id }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Cliente removido" })
  });
});




app.post('/api/clientes', (req, res, next) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  })
  cliente.save().
    then(clienteInserido => {
      res.status(201).json({
        mensagem: 'Cliente inserido',
        id: clienteInserido._id
      })
    })
});

module.exports = app;
