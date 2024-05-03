import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider'; // Import the AuthProvider
import { loginValidation } from '../../Validation';

const Login_Form = () => {
    const { login } = useAuth(); // Destructure the login function from the AuthProvider
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = await loginValidation(username, password);
        if (Object.keys(errors).length > 0) {
            for (let error in errors) {
                alert(errors[error]);
            }
            // provide details to user what they have got wrong
            return;
        }


        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                login(data); // Call the login function from AuthProvider
                navigate('/myprofile');
            } else {
                const data = await response.text();
                console.error('Login error:', data);
                alert('An error occurred during login. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login_Form;
