const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const {default: axios} = require('axios');


const app = express();

app.use(express.json());
app.use(cors()); 

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id,
        title
    }

    // Emitting Event To Bus
    const {data} = await axios.post('http://event-bus-srv:4005/events', {
            type: 'CREATE POST',
            data: {id, title}
    });
    console.log(data);
    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log(req.body.type);
    res.send({})
});

app.listen(4000, () => console.log('posts V7 service is running on port 4000'))