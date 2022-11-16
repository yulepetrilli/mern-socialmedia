import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//graphql
import { useMutation } from '@apollo/client';
import { DELETE_POST, FETCH_POSTS_QUERY, DELETE_COMMENT } from '../graphql/gql';

//Components
import { Button, Confirm } from 'semantic-ui-react';

export default function Delete({id, details = false, commentId = ''}) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const mutation = commentId ? DELETE_COMMENT : DELETE_POST;
    const params = commentId ? {postId: id, commentId: commentId} : {postId: id};

    const [deleteAction, { data }] = useMutation(mutation, {
        variables: params,
        refetchQueries: [
            {query: FETCH_POSTS_QUERY}, 
            'getPosts'
        ]
    });

    useEffect(() => {
        if(data){
            setOpen(false)

            if(details && !commentId){
                //redirect to home if delete is from details
                navigate('/')
            }
        }
    },[data, details, navigate, commentId]);

    return (
        <>
            <Button
                color='red'
                icon='trash alternate'
                floated='right'
                onClick={() => setOpen(true)}
            />
            <Confirm
                open={open}
                onCancel={() => setOpen(false)}
                onConfirm={deleteAction}
                size='tiny'
            />
        </>
    )
}
