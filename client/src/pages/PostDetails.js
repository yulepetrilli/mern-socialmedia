import React, { useContext } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

//Graphql
import { useQuery } from '@apollo/client';
import { FETCH_POST_QUERY } from '../graphql/gql';

//Components
import { 
    Grid, 
    Image, 
    Card, 
    Button, 
    Icon, 
    Label, 
    Loader 
} from 'semantic-ui-react';
import Like from '../components/Like';
import Delete from '../components/Delete';
import AddComment from '../components/AddComment';

//Hooks
import { AuthContext } from '../context/auth';

export default function PostDetails() {
    const { user } = useContext(AuthContext);
    const { pathname } = useLocation();
    const getId = pathname.split('/')[2];

    const {data, loading} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId: getId
        }
    });
    const post = data?.getPost;

    return (
       <>
            {loading ? (
                <Loader 
                    active 
                    inline='centered' 
                    content='Loading posts...'
                />
            ) : (
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            <Image
                                floated='right'
                                size='small'
                                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                            />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{post.username}</Card.Header>
                                    <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{post.body}</Card.Description>
                                </Card.Content>
                                <hr/>
                                <Card.Content>
                                    <Like 
                                        user={user}
                                        id ={post.id}
                                        likesCount={post.likesCount}
                                        likes={post.likes}
                                    />
                                    <Button
                                        as='div'
                                        labelPosition='right'
                                        onClick={()=> console.log('comment')}
                                    >
                                        <Button basic color='blue'>
                                            <Icon name='comments'/>
                                        </Button>
                                        <Label basic color='blue' pointing='left'>
                                            {post.commentsCount}
                                        </Label>
                                    </Button>
                                    {user && user.username === post.username && (
                                        <Delete id={post.id} details/>
                                    )}
                                </Card.Content>
                            </Card>
                            {user && <AddComment id={post.id}/>}
                            {post?.comments?.map(comment => (
                                <Card fluid key={comment.id}>
                                    <Card.Content>
                                        <Card.Header>
                                            {comment.username}
                                            {user && user.username === comment.username && (
                                                <Delete 
                                                    id={post.id}
                                                    commentId={comment.id}
                                                />
                                            )}
                                        </Card.Header>
                                        <Card.Meta>
                                            {moment(comment.createdAt).fromNow()}
                                        </Card.Meta>
                                        <Card.Description>
                                            {comment.body}
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            ))}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            )}
        
       </>
    )
}
