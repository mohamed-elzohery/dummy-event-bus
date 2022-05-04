const express = require('express');
const cors = require('cors');
const EventHandler = require('./EventHandler');
const {default: axios} = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const postsWithComments = {};

app.get('/posts', (req, res) => {
    res.send(postsWithComments);
});

app.post('/events', (req, res) => {
    const {data, type} = req.body;
    EventHandler(type, data, postsWithComments);
    res.send({});
});

app.listen(4002, async () => {
    console.log('Query is running on 4002');
    const {data} = await axios.get('http://event-bus-srv:4005/events');
    data.forEach(element => {
        const {type, data} = element;
        console.log(`processing ${element}`);
        EventHandler(type, data, postsWithComments);
    });
});
