import React, {useEffect, useState} from 'react';
import axios from 'axios';

const CommentList = ({comments}) => {
    return <ul>
        {comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
    </ul>
}

export default CommentList;