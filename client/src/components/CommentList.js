import React, {useEffect, useState} from 'react';
import axios from 'axios';

const CommentList = ({comments}) => {
    return <ul>
        {comments.map(comment => (
        <li key={comment.id}>{comment.status === 'pending' ? 'Comment is waiting for review' : comment.status === 'approved'? comment.content : 'Comment is rejected'}</li>))}
    </ul>
}

export default CommentList;