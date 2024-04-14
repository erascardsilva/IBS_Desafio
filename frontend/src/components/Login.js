import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); 

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            username,
            password
        };

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {
                //  token no localStorage
                localStorage.setItem('token', responseData.token);
                setMessage('Login bem-sucedido! Token recebido e armazenado.');

                // redirecionaDashboard
                navigate("/dashboard");
            } else {
                setMessage('Login ou senha inválidos.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setMessage('Erro ao fazer login. Tente novamente.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            <h4><i className="bi bi-person-circle"></i> Login</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="text-center">
                                    <p>Digite "erasmo" para o username e "3727" para a senha.</p>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Entrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <div className="row mt-3">
                <div className="col text-center">
                    <label className="text-danger">{message}</label>
                </div>
            </div>
        </div>
    );
}

export default Login;
