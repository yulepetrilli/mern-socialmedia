import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';

//GraphQL
import { useQuery } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../graphql/gql';

//Components
import { Grid, Loader , Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import AddPost from '../components/AddPost';

export default function Home() {
    const { user } = useContext(AuthContext);
    const {data, loading} = useQuery(FETCH_POSTS_QUERY);
    const posts = data?.getPosts;

    return (
        <Grid columns={'3'}>
            <Grid.Row className='home-header' >
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Row>
                        <AddPost />
                    </Grid.Row>
                )}
                {
                    loading ? (
                        <Loader 
                            active 
                            inline='centered' 
                            content='Loading posts...'
                        />
                    ) : (
                        <Transition.Group>
                            { posts?.map(post => (
                                <Grid.Column 
                                    key={post.id} 
                                    style={{marginBottom: 20}}
                                >
                                    <PostCard  post={post}/>
                                </Grid.Column>    
                            ))}
                        </Transition.Group>
                    )
                }
            </Grid.Row>
        </Grid>
    )
}
