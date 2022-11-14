import React from 'react';

//GraphQL
import {  gql, useQuery, } from '@apollo/client';

//Components
import { Grid, Loader } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

const FETCH_POSTS_QUERY = gql`
    query {
        getPosts {
            id
            body
            createdAt
            username
            likesCount
            commentsCount
            comments{
                id
                body
                username
                createdAt
            }
        }
    }
`;

export default function Home() {
    const {data, loading} = useQuery(FETCH_POSTS_QUERY);
    const posts = data?.getPosts;

    if(data){
        console.log(data?.getPosts)
    }
    return (
        <Grid columns={'3'}>
            <Grid.Row className='home-header' >
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {
                    loading ? (
                        <Loader 
                            active 
                            inline='centered' 
                            content='Loading posts...'
                        />
                    ) : (
                        posts.map(post => (
                            <Grid.Column key={post.id} style={{marginBottom: 20}}>
                                <PostCard  post={post}/>
                            </Grid.Column>    
                        ))
                    )
                }
            </Grid.Row>
        </Grid>
    )
}
