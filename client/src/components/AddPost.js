import React from 'react';

//GraphQL
import { useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY, ADD_POST } from '../graphql/gql';

//Components
import { Button, Form, Card} from 'semantic-ui-react';

//Hooks
import { useForm } from '../hooks';

export default function AddPost() {
    const { onChange, onSubmit, values } = useForm(addPost, {
        body: ''
    });

    const [createPost, {data, error}] = useMutation(ADD_POST, {
        variables: {
            body: values.body
        },
        refetchQueries: [
            {query: FETCH_POSTS_QUERY}, 
            'getPosts'
        ]
    });

    function addPost(){
        createPost();
    };

    if(data?.createPost){
        values.body = ''
    };

    return (
        <Card fluid style={{width: 370, marginLeft: 13, marginBottom: error ? 20 : 0}}>
            <Card.Content>
                {error && (
                    <div class="ui error message">
                        <div class="content">
                            <ul class="list">
                                <li class="content">
                                    {error.graphQLErrors[0].message}
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                <Form onSubmit={onSubmit} >
                    <h3>Add New Post: </h3>
                    <Form.Field>
                        <Form.Input
                            placeholder='write post'
                            name='body'
                            value={values.body}
                            onChange={onChange}
                        />
                        <Button type='submit' color='purple'>
                            Add Post
                        </Button>
                    </Form.Field>
                </Form>
            </Card.Content>
        </Card>
    )
}
