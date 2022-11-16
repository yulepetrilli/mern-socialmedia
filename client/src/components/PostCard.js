import React, { useContext } from 'react';
import moment from 'moment';
import { AuthContext } from '../context/auth';

//Components
import {Link} from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react';
import Like from './Like';
import Delete from './Delete';

export default function PostCard({post}){
    const { user } = useContext(AuthContext);

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
                <Like 
                    id={post.id}
                    likes={post.likes}
                    user={user}
                    likesCount={post.likesCount}
                />
                <Button
                    color='blue'
                    icon='comments'
                    label={{
                        color: 'blue',
                        pointing: 'left',
                        content: post.commentsCount,
                    }}
                    as={Link}
                    to={`/post/${post.id}`}
                />
                {user && user.username === post.username && <Delete id={post.id} />}
            </Card.Content>
        </Card>
    )
}
