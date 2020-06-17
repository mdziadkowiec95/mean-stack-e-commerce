const express = require('express');
const app = express();

const PORT = 5000;

app.get('/api', (req, res) => res.send('Hello World!'))
app.get('/api/test', (req, res) => res.json({ msg: 'Hello test!'}))

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));