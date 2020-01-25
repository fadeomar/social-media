const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(emailRegEx)){
        return true
    }else {
        return false
    }
}
const isEmpty = string => {
    if(string.trim() === "") return true;
    else return false;
}

exports.validateSignupData = (newUser) => {
    let errors = {};
    if(isEmpty(newUser.email)){
        errors.email = 'Must not be empty'
    }else if(!isEmail(newUser.email)){
        errors.email = 'Must be a valid email adress'
    }

    if(isEmpty(newUser.password)) errors.password = 'Must not be empty';
    if(newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'passwords must match'
    if(isEmpty(newUser.handle)) errors.password = 'Must not be empty';

    return {errors,
    valid: Object.keys(errors).length ? false : true,
    }
}

exports.validateLoginData = (user) => {
    let errors = {}
    if(isEmpty(user.email)) errors.email = 'must not be empty';
    if(isEmpty(user.password)) errors.password = 'must not be empty';

    if(Object.keys(errors).length) return res.status(400).json(errors)
    return {errors, valid: Object.keys(errors).length?false: true}
}

exports.reduceUserDetails = (data) => {
    let userDetails = {};
    
    if(!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
    if(!isEmpty(data.website.trim())){
        if(data.website.trim().substring(0, 4) !== 'http'){
            userDetails.website = `http://${data.website.trim()}`;

        }else userDetails.wibsite = data.wibsite;
    }
    if(!isEmpty(data.location.trim())) userDetails.location = data.location;

    return userDetails;
}