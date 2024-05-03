// Function to validate username and password
export const signupValidation = async (username, password) => {
    const errors = {};

    if (!username || username.trim() === "") {
        errors.username = 'Please enter a username';
    } else if (!validateUsername(username)) {
        errors.username = 'Please enter a valid username. Username must only contain letters (both uppercase and lowercase) and numbers';
    } else {
        const isUsernameUnique = await checkUsernameUnique(username);
        console.log('isUsernameUnique:', isUsernameUnique); // Print statement for debugging
        if (!isUsernameUnique) {
            errors.username = 'Username is already taken';
        }
    }

    if (!password || password.trim() === "") {
        errors.password = 'Please enter a password';
    } else if (!validatePassword(password)) {
        errors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
    }

    console.log('errors:', errors); // Print statement for debugging
    return errors;
}

export const loginValidation = async (username, password) => {
    const errors = {};

    if (!username || username.trim() === "") {
        errors.username = 'Please enter a username';
    } else if (!validateUsername(username)) {
        errors.username = 'Please enter a valid username. Username must only contain letters (both uppercase and lowercase) and numbers';
    } else {
        const isUsernameUnique = await checkUsernameUnique(username);
        console.log('isUsernameUnique:', isUsernameUnique); // Print statement for debugging
        if (isUsernameUnique) {
            errors.username = 'Username does not exist';
        }
    }

    if (!password || password.trim() === "") {
        errors.password = 'Please enter a password';
    } else if (!validatePassword(password)) {
        errors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
    }

    console.log('errors:', errors); // Print statement for debugging
    return errors;
}

// Function to validate username
const validateUsername = (username) => {
    // Username must can only contain letters (both uppercase and lowercase) and numbers
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
}

// Function to validate password
const validatePassword = (password) => {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
}

// Function to check if username is unique
const checkUsernameUnique = async (username) => {
    try {
        const response = await fetch('/validate/check_username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });
        const data = await response.json();
        console.log('Check username response:', data); // Print statement for debugging
        return response.status === 200;
    } catch (error) {
        console.error('Error checking username uniqueness:', error);
        return false;
    }
}
