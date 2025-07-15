const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://mongodb:27017/ma_base_de_donnees', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
});
const Item = mongoose.model('Item', ItemSchema);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bonjour depuis mon application Node.js sur Kubernetes !');
});

app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Application Node.js écoutant sur le port ${port}`);
});
