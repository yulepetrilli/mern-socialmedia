const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../schemas/Post');
const { checkAuth } = require('../../utils/auth');

module.exports = {
    Mutation: {
        async createComment(_, {postId, body}, context){
            const user = checkAuth(context);
            const checkBody = body.trim() === '';
            const post = await Post.findById(postId);

            if(checkBody){
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment must not be empty'
                    }
                })
            }

            if(post){
                post.comments.unshift({
                    body, 
                    username: user.username,
                    createdAt: new Date().toISOString(),
                })
                await post.save();
                return post;
            }else {
                throw new UserInputError('Post does not exists');
            }
            
        },
        async deleteComment(_, { postId, commentId }, context){
            const user = checkAuth(context);
            const post = await Post.findById(postId);

            if(post){
                const commentIndex = post.comments.findIndex(c => c.id === commentId);
                if(post.comments[commentIndex].username === user.username){
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                }else {
                    throw new AuthenticationError('Action not found');
                }
            }else{
                throw new UserInputError('Post not found');
            }
        }
    }
}