const express = require('express');
const cors = require('cors');
const app = express();
const sendMail = require('./mail.js');

app.use(express.json());
app.use(cors());

app.post('/mail', (req, res) => {
    sendMail(req.body)
    .then(() => res.json({ success: true }))
    .catch(err => {
        console.error(err);
        res.json({ success: false });
    });
});

app.listen(3000, () => console.log('Server listening on port 3000'));
