const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
    res.send('Integración Continua y Despliegue Continuo');
});

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});

