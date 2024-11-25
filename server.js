const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
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

app.listen(35212, () => {
  console.log('Server is running on port 35212');
});
