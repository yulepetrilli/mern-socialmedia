import React, { useEffect, useState } from 'react';

//Graphql
import { useMutation } from '@apollo/client';
import { LIKE_POST } from '../graphql/gql';

//Components
import { Button, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Like({id, likesCount, likes, user}) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)){
            setLiked(true)
        }else{
            setLiked(false)
        }
    }, [user, likes]); 

    const [likePost] = useMutation(LIKE_POST, {
        variables:{
            postId: id
        }
    })


    const likeButton = user ? (
        liked ? (
            <Button color='purple'> 
                <Icon name='heart'  style={{margin: 0}}/>
            </Button>
        ) : (
            <Button color='purple' basic> 
                <Icon name='heart' style={{margin: 0}}/>
            </Button>
        )
    ) : (
        <Button color='purple' as={Link} to='/signin'> 
            <Icon name='heart'  style={{margin: 0}}/>
        </Button>
    );


    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            {likeButton}
            <Label basic color='purple' pointing='left'>
                {likesCount}
            </Label>
        </Button>
    )
}
