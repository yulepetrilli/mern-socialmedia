import React from 'react';

//Graphql
import { useMutation } from '@apollo/client';
import { ADD_COMMENT, FETCH_POST_QUERY } from '../graphql/gql';

//Components
import { Button, Form, Card} from 'semantic-ui-react';

//Hooks
import { useForm } from '../hooks';

export default function AddComment({id}) {
    const { onChange, onSubmit, values } = useForm(addComment, {
        body: ''
    });

    const [createComment, {data, error}] = useMutation(ADD_COMMENT, {
        variables: {
            postId: id,
            body: values.body
        },
        refetchQueries: [
            {query: FETCH_POST_QUERY}, 
            'getPost'
        ]
    });

    function addComment(){
        createComment();
    };

    if(data?.createComment){
        values.body = ''
    };

    return (
        <Card fluid>
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
                <Form onSubmit={onSubmit}>
                    <h3>Add New Comment: </h3>
                    <Form.Field>
                        <Form.Input
                            placeholder='write comment'
                            name='body'
                            value={values.body}
                            onChange={onChange}
                        />
                        <Button type='submit' color='purple'>
                            Add Comment
                        </Button>
                    </Form.Field>
                </Form>
            </Card.Content>
        </Card>
    )
}
