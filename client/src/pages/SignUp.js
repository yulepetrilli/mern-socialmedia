import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

//GraphQL
import { gql, useMutation } from '@apollo/client';

//Components
import { Button, Form } from 'semantic-ui-react';

//Hooks
import { useForm } from '../hooks';

const SIGNUP_USER = gql`
    mutation($registerInput: RegisterInput){
        register(registerInput: $registerInput) {
            id
            email
            username
            createdAt
            token
        }
    }

`;

export default function SignUp() {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(signUpUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''   
    });

    const [addUser, {data, loading }] = useMutation(SIGNUP_USER, {
        variables: {
            registerInput: values
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.errors);
        }
    });
    
    function signUpUser(){
        addUser();
    };

    useEffect(()=>{
        if(localStorage.getItem('jwtToken')){
            navigate('/');
        }else if (data?.register){
            context.login(data.register)
            navigate('/');
        }
    },[data, navigate, context])

    return (
        <div className='form-container'>
            <h1>Sign Up</h1>
            {Object.keys(errors).length > 0 && (
                <div class="ui error message">
                    <div class="content">
                        <div class="header">
                            There were some errors with your submission
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
                    fluid label='Email' 
                    placeholder='Email'
                    name='email'
                    value={values.email}
                    onChange={onChange}
                />
                <Form.Input 
                    fluid label='Password' 
                    placeholder='Password'
                    name='password'
                    value={values.password}
                    onChange={onChange}
                />
                <Form.Input 
                    fluid label='Confirm Password' 
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                <Button type='submit' color='purple'>
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}
