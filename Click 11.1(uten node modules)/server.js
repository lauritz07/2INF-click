const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productDB = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endepunkt for å hente alle produkter
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  productDB.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
});

// Endepunkt for å legge til varer i handlekurven
app.post('/add-to-cart', (req, res) => {
  const { product_id, quantity } = req.body;
  // Du kan implementere logikk for å legge til produkter i handlekurven i databasen her
  res.status(201).json({ message: 'Product added to cart' });
});

// Endepunkt for å fjerne varer fra handlekurven
app.post('/remove-from-cart', (req, res) => {
  const { product_id } = req.body;
  // Du kan implementere logikk for å fjerne produkter fra handlekurven i databasen her
  res.status(200).json({ message: 'Product removed from cart' });
});


app.post('/products', (req, res) => {
  const { product_name, description, price, image_url } = req.body;
  const query = 'INSERT INTO products (product_name, description, price, image_url) VALUES (?, ?, ?, ?)';

  db.query(query, [product_name, description, price, image_url], (err, result) => {
    if (err) {
      console.error('Error creating product:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(201).json({ message: 'Product created', productId: result.insertId });
    }
  });
});


app.listen(port, () => {
  console.log('Server is running on port port');
});
