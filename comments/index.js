const express = require('express');
const {randomBytes} = require('crypto');
const cors = require('cors');
const {default: axios} = require('axios');

const app = express();

app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {id: postId} = req.params;
    const {content} = req.body;

    const oldComments = commentsByPostId[postId] || [];

    const newComments = oldComments.concat([{id, content}]);

    commentsByPostId[postId] = newComments;

    await axios.post('http://localhost:4005/events',  {
        type: 'CREATE COMMENT',
        data: {
            postId,
            id,
            content
        }
    });

    res.status(201).send(newComments);
});

app.post('/events', (req, res) => {
    console.log(req.body.type);
    res.send({})
});

app.listen(4001, () => console.log('Comments service is running on port 4001'));