const express = require('express');
const cors = require('cors');
const {default: axios} = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/events', async (req, res) => {
    const {type} = req.body;
    if(type === 'CREATE COMMENT'){
        const {data: {id, postId, content}} = req.body;
        const status = content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://localhost:4005/events', {
        type: 'MODERATE COMMENT',
        data:{
            id,
            postId,
            content,
            status
        }
    });
    }


    

    res.send({});
});

app.listen(4003, () => {
    console.log('Moderation service is running on port 4003');
});

