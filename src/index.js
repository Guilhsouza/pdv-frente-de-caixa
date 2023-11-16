require('dotenv').config();

const express = require('express');
const multer = require('./servicos/multer');
const aws = require('aws-sdk')
const rotas = require('./rotas/rotas');

const app = express();

app.use(express.json());

app.use(rotas);

app.listen(process.env.PORT)