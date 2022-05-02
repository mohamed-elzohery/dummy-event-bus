const EventHandler = (type, data, postsWithComments) => {
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
}

module.exports = EventHandler;