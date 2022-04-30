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

    const newComment = {id, content, status: 'pending'};

    const newComments = oldComments.concat([newComment]);

    commentsByPostId[postId] = newComments;

    await axios.post('http://localhost:4005/events',  {
        type: 'CREATE COMMENT',
        data: {
            postId,
           ...newComment
        }
    });

    res.status(201).send(newComments);
});

app.post('/events', async (req, res) => {
    console.log(req.body);
    const {type} = req.body;
    
    if(type === 'MODERATE COMMENT'){
        const { data:{ id, postId, status}} = req.body;
        commentsByPostId[postId].find(comment => comment.id === id).status = status; 
        await axios.post('http://localhost:4005/events', {
            type: 'UPDATE COMMENT',
            id, postId, status
        });
    }

    res.send({})
});

app.listen(4001, () => console.log('Comments service is running on port 4001'));