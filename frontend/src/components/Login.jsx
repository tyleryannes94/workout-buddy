import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json(); 
                console.log('Login successful', data);
    
                if (data.user) {
                    localStorage.setItem('userId', data.user); 
                }
    
                navigate('/dashboard'); 
            } else {
                console.error('Login failed');
                alert('Login failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };
    
    const handleSignUpRedirect = () => {
        navigate('/signup');
    };

    return (
        <div className='responsive-margin'>
            <div>
                <h1 className='customYellow'>Hi, </h1>
                <h1 className='customSerif-bold'>Workout Buddy.</h1>
            </div>
            <div className="login-card">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button type="submit">Log In</button>
                </form>
            </div>
            {/* OPTIONAL TODO: import icons for right arrow instead of 'sign up' */}
            <button onClick={handleSignUpRedirect}>Sign Up</button>
        </div>
    );
};

export default Login;
