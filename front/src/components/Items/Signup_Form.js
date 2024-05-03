import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider'; // Import the AuthProvider
import { signupValidation } from '../../Validation';

const Signup_Form = () => {
    const { login } = useAuth(); // Destructure the login function from the AuthProvider
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate the details being submitted
        const errors = await signupValidation(username, password);
        if (Object.keys(errors).length > 0) {
            for (let error in errors) {
                alert(errors[error]);
            }
            // provide details to user what they have got wrong
            return;
        }

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                const data = await response.json();
                alert(data.message);
                return;
            }

            console.log('User registered successfully');

            const loginResponse = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (loginResponse.ok) {
                const data = await loginResponse.json();
                login(data); // Call the login function from AuthProvider
                localStorage.setItem('token', data.token); // Store the token in local storage
                navigate('/myprofile');
            } else {
                const data = await loginResponse.json();
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Sign-up</button>
        </form>
    );
}

export default Signup_Form;
