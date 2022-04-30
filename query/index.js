const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const postsWithComments = {};

app.get('/posts', (req, res) => {
    res.send(postsWithComments);
});

app.post('/events', (req, res) => {
    const {data, type} = req.body;

    if(type === 'CREATE POST'){
        const {id, title} = data;
        postsWithComments[id] = {
            id, title, comments: []
        };
    };

    if(type === 'CREATE COMMENT'){
        const {postId, content, id, status} = data;
        postsWithComments[postId].comments = postsWithComments[postId].comments.concat([{id, content}]);
    };


    
    if(type === 'MODERATE COMMENT'){
        const {postId, id, status} = data;
        postsWithComments[postId].comments.find(comment => comment.id === id).status = status; 
    }

    console.log(postsWithComments);
    res.send({});
});

app.listen(4002, () => console.log('Query is running on 4002'));