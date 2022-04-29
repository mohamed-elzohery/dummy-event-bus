const express = require('express');
const {default: axios} = require('axios');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

app.post('/events', async(req, res) => {
    const action = req.body;
    await axios.post('http://localhost:4000/events', action);
    await axios.post('http://localhost:4001/events', action);
    await axios.post('http://localhost:4002/events', action);

    res.status(201).send({status: 'OK'});
});

app.listen(4005, () => {
    console.log('Event bus is running on port 4005');
})