const express = require('express');
const {default: axios} = require('axios');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

let events = [];

app.post('/events', async(req, res) => {
    const action = req.body;
    events = events.concat([action]);
    try{
        await Promise.all([
            await axios.post('http://posts-clusterip-srv:4000/events', action),
            await axios.post('http://comments-clusterip-srv:4001/events', action),
            await axios.post('http://query-clusterip-srv:4002/events', action),
            await axios.post('http://moderation-clusterip-srv:4003/events', action),
        ]);
    }catch(err){
        console.log(err.message);
    }
    

    res.status(201).send({status: 'OK'});
});


app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('Event bus is running on port 4005');
})