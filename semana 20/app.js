const express = require('express');
const bodyParser = require('body-parser');
const mariadb = require('mariadb');

const app = express();
const port = 5000;

app.use(express.json());

let products = [];

app.get('/products', (req, res) => {
    res.send(products);
});

app.post('/products', (req, res) => {
    const product = req.body;
    
    if (!validateProduct(product)) {
        return res.status(400).send({ message: 'Faltan datos necesarios para crear un producto: id, name, count, unitCost, currency.' });
    }

    const existingProduct = products.find(p => p.id === product.id);
    if (existingProduct) {
        return res.status(400).send({ message: 'El producto con este id ya existe.' });
    }

    products.push(product);
    res.status(201).send(product);
});