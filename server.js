const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Bütün məhsulları göstər + pagination
app.get('/products', (req, res) => {
  fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Fayl oxunmadı');
    let products = JSON.parse(data);

    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || products.length;

    const paginated = products.slice(offset, offset + limit);
    res.json({
      total: products.length,
      offset,
      limit,
      products: paginated
    });
  });
});

// ID-yə görə məhsul gətir
app.get('/products/:id', (req, res) => {
  fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Fayl oxunmadı');
    const products = JSON.parse(data);
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).send('Məhsul tapılmadı');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server işə düşdü: http://localhost:${PORT}`);
});

