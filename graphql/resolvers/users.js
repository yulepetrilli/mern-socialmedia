const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../schemas/User');
const { SECRET_KEY } = require('../../config');
const { validateRegisterInputs, validateLogin } = require('../../utils/validators');

const generateToken = (obj) => {
    return jwt.sign(
        {
            id: obj.id,
            email: obj.email,
            username: obj.username,
        }, 
        SECRET_KEY, 
        {expiresIn: "10h"}
    )
};

module.exports = {
    Mutation: {
        async login(_, {username, password}){
            const {errors, valid} = validateLogin(username, password);
            const user = await User.findOne({username});

            if(!valid){
                throw new UserInputError('Errors', {errors})
            }

            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found', {errors})
            }

            const matchPassword = await bcrypt.compare(password, user.password);

            if(!matchPassword){
                errors.general = 'Invalid password';
                throw new UserInputError('Wrong credentials', {errors})
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(
            _, 
            { registerInput:
                {
                    username, 
                    email, 
                    password, 
                    confirmPassword
                } 
            }, 
            context, 
            info
        ){
            //Validate user data
            const {valid, errors} = validateRegisterInputs(
                username, 
                email, 
                password, 
                confirmPassword
            );

            if(!valid){
                throw new UserInputError('Errors', {errors})
            }

            //Check if user doesn't already exist
            const user = await User.findOne({username})

            if(user){
                throw new UserInputError('Username already exists, please use another', {
                    errors: {
                        username: 'This username already exists'
                    }
                })
            }

            //hash password and create auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username, 
                email, 
                password,
                createdAt: new Date().toISOString(),
            })

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}