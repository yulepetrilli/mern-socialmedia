import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

//GraphQL
import { gql, useMutation } from '@apollo/client';

//Components
import { Button, Form } from 'semantic-ui-react';

//Hooks
import { useForm } from '../hooks';

const SIGNIN_USER = gql`
    mutation($username: String!, $password: String!){
        login(username: $username, password: $password) {
            createdAt
            email
            id
            token
            username
        }
    }

`;

export default function SignIn() {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(signInUser, {
        username: '',
        password: '',
    });

    const [loginUser, {data, loading }] = useMutation(SIGNIN_USER, {
        variables: {
            username: values.username,
            password: values.password,
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.errors);
        }
    });

    function signInUser(){
        loginUser();
    };

    useEffect(() => {
        if(localStorage.getItem('jwtToken')){
            navigate('/');
        }else if (data?.login){
            context.login(data.login)
            navigate('/');
        }
    },[data, navigate, context])

    return (
        <div className='form-container'>
            <h1>Sign In</h1>
            {Object.keys(errors).length > 0 && (
                <div class="ui error message">
                    <div class="content">
                        <div class="header">
                            There was were errors with your submission
                        </div>
                        <ul class="list">
                            {Object.values(errors).map(value => (
                                <li class="content" key={value}>
                                    {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <Form 
                onSubmit={onSubmit} 
                className={loading && 'loading'}
                style={{paddingTop: 10}}
            >
                <Form.Input 
                    label='Username' 
                    placeholder='Username'
                    name='username'
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input 
                    fluid label='Password' 
                    placeholder='Password'
                    name='password'
                    value={values.password}
                    onChange={onChange}
                />
                <Button type='submit' color='purple'>
                    Sign In
                </Button>
            </Form>
        </div>
    )
}
