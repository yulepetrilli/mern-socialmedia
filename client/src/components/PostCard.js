import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';

export default function PostCard({post}){

    const likePost = (e) => {
        e.prenventDefault();
        console.log('like post!')
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{post.username}</Card.Header>
                <Card.Meta as={Link} to={`posts/${post.id}`}>
                    {moment(post.createdAt).fromNow()}
                </Card.Meta>
                <Card.Description>{post.body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button
                    color='purple'
                    icon='heart'
                    content='Like'
                    label={{ 
                        color: 'purple', 
                        pointing: 'left', 
                        content: post.likesCount 
                    }}
                    onClick={likePost}
                />
                <Button
                    color='blue'
                    icon='comments'
                    content='Comments'
                    label={{
                        as: 'a',
                        color: 'blue',
                        pointing: 'left',
                        content: post.commentsCount,
                    }}
                />
            </Card.Content>
        </Card>
    )
}
