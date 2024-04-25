const express = require('express');
const app = express();

// Beispiel Route
app.get('/', (req, res) => {
  res.send('Hallo Welt!');
});

// Starte den Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});