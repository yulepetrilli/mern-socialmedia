module.exports.validateRegisterInputs = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkUsername = username.trim() === '';
    const checkPassword = password === '';
    const checkEmail = email.trim() === '';
    const checkValidEmail = email.match(regEx);
    const checkConfirmPassword = password === confirmPassword;

    if(checkUsername){
        errors.username = 'Username cannot be empty';
    }
    
    if(checkEmail){
        errors.email = 'Email cannot be empty';
    } else if(!checkValidEmail) {
        errors.email = 'Add valid email address';
    }

    if(checkPassword){
        errors.password = 'Password cannot be empty';
    } else if (!checkConfirmPassword){
        errors.confirmPassword = "Passwords don't match";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
};

module.exports.validateLogin = (
    username,
    password
) => {
    const errors = {};
    const checkUsername = username.trim() === '';
    const checkPassword = password === '';

    if(checkUsername){
        errors.username = 'Username cannot be empty';
    }

    
    if(checkPassword){
        errors.password = 'Password cannot be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

