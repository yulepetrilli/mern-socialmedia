import {  gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
    query {
        getPosts {
            id
            body
            createdAt
            username
            likes{
                username
                createdAt
            }
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

export const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId: $postId) {
            id
            body
            username
            likes{
                username
                createdAt
            }
            likesCount
            comments {
                id
                body
                username
            }
            commentsCount
        }
    }
`;

export const SIGNIN_USER = gql`
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

export const SIGNUP_USER = gql`
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

export const ADD_POST = gql`
    mutation($body: String!){
        createPost(body: $body) {
            id
            body
            createdAt
            username
        }
    }
`;

export const DELETE_POST = gql`
    mutation($postId: ID!){
        deletePost(postId: $postId)
}
`;

export const LIKE_POST = gql`
    mutation($postId: ID!){
        likePost(postId: $postId) {
            id
            likes{
                username
                createdAt
            }
            likesCount
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation($postId: ID!, $body: String!){
        createComment(postId: $postId, body: $body) {
            id
            username
            comments {
            id
            createdAt
            username
            }
            commentsCount
        }
    }
`;

export const DELETE_COMMENT = gql`
    mutation($postId: ID!, $commentId: ID!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments{
                id
                username
                createdAt
                body
            }
            commentsCount
        }
    }
`;