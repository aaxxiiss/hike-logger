const express = require('express');
const app = express();

app.listen(5000, () => console.log('Listening at port 5000'));

app.use(express.static('public'));

app.get('/api/', (req, res) => {
    res.json({
        message: 'request passed to the server',
    });
});