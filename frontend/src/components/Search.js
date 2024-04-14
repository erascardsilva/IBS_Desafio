import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPencil, BsTrash } from 'react-icons/bs';

function SearchPeople() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:3000/peoples', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Erro ao buscar usuários:', error));
    }, []);

    const handleEditUser = (id) => {
        navigate(`/editpeople/${id}`);
    };

    const handleDeleteUser = (id) => {
        const token = localStorage.getItem('token');

        fetch(`http://localhost:3000/peoples/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    setMessage('Dados deletados do banco de dados apagado'); // td ok
                    // Atualiza a lista de usuários após a exclusão
                    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
                } else {
                    console.error('Erro ao excluir usuário:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Erro ao excluir usuário:', error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="text-center my-4">
                <h2 className="mb-3">Buscar - Editar - Apagar</h2>
                <h3>Modificações nos icone açoes 'apagar' apaga diretamente e editar direciona para outra rota </h3>
                {message && <p className="text-success">{message}</p>}
            </div>
            
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Sexo</th>
                        <th>Data de Nascimento</th>
                        <th>Estado Civil</th>
                        <th>CEP</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <React.Fragment key={user.id}>
                            <div className="mt-3"></div>
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.sex}</td>
                                <td>{new Date(user.birthDate).toLocaleDateString()}</td>
                                <td>{user.maritalStatus}</td>
                                <td>{user.addresses[0]?.cep}</td>
                                <td>
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={() => handleEditUser(user.id)}
                                        title="Editar"
                                    >
                                        <BsPencil />
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteUser(user.id)}
                                        title="Apagar"
                                    >
                                        <BsTrash />
                                    </button>
                                </td>
                            </tr>
                            {/* Endereços */}
                            {user.addresses.map(address => (
                                <tr key={address.id}>
                                    <td colSpan="6">
                                        <strong>Endereço:</strong> {address.address}, {address.number}, {address.complement}, {address.district}, {address.city} - {address.state}, CEP: {address.cep}
                                    </td>
                                </tr>
                            ))}
                            {/* Mensagem */}
                            <tr>
                                <td colSpan="6">
                                    <strong>Mensagem:</strong> {user.message}
                                </td>
                            </tr>
                            {/* Linha de separação */}
                            <tr>
                                <td colSpan="6" className="bg-light" style={{ height: '1px' }}></td>
                            </tr>
                            <div className="mt-5"></div>


                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SearchPeople;
