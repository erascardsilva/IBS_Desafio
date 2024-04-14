import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditUser() {
    const { id } = useParams();
    const [userData, setUserData] = useState({
        name: '',
        sex: '',
        birthDate: '',
        maritalStatus: '',
        addresses: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch(`http://localhost:3000/peoples/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                // Convertendo a data de nascimento  YYYY-MM-DD
                const formattedBirthDate = data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : '';
                
                setUserData({
                    ...data,
                    birthDate: formattedBirthDate
                });
            })
            .catch(error => console.error('Erro ao buscar usuário:', error));
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:3000/peoples/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                navigate('/search', { state: { message: 'Usuário atualizado com sucesso' } });
            } else {
                console.error('Erro ao atualizar usuário:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    };

    const handleAddNewAddress = () => {
        navigate(`/addnewaddress/${id}`);
    };

    const handleUpdateAddressPage = (addressId) => {
        navigate(`/editaddress/${id}/${addressId}`);
    };

    const handleDeleteAddress = async (addressId) => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:3000/peoples/${id}/addresses/${addressId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const updatedAddresses = userData.addresses.filter(address => address.id !== addressId);
                setUserData(prevState => ({
                    ...prevState,
                    addresses: updatedAddresses
                }));
            } else {
                console.error('Erro ao deletar endereço:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao deletar endereço:', error);
        }
    };

    return (
        <div className="container mt-5 pb-5">
            <h2>Editar Usuário</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="sex" className="form-label">Sexo</label>
                    <select
                        className="form-control"
                        id="sex"
                        name="sex"
                        value={userData.sex}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="birthDate" className="form-label">Data de Nascimento</label>
                    <input
                        type="date"
                        className="form-control"
                        id="birthDate"
                        name="birthDate"
                        value={userData.birthDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="maritalStatus" className="form-label">Estado Civil</label>
                    <select
                        className="form-control"
                        id="maritalStatus"
                        name="maritalStatus"
                        value={userData.maritalStatus}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="Solteiro">Solteiro</option>
                        <option value="Casado">Casado</option>
                        <option value="Divorciado">Divorciado</option>
                        <option value="Viúvo">Viúvo</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>
                <button
                    type="button"
                    className="btn btn-primary btn-sm mb-3"
                    onClick={handleAddNewAddress}
                >
                    Adicionar Novo Endereço
                </button>

                <h3>Endereços</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>CEP</th>
                            <th>Endereço</th>
                            <th>Número</th>
                            <th>Complemento</th>
                            <th>Bairro</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.addresses.map((address, index) => (
                            <tr key={index}>
                                <td>{address.cep}</td>
                                <td>{address.address}</td>
                                <td>{address.number}</td>
                                <td>{address.complement}</td>
                                <td>{address.district}</td>
                                <td>{address.city}</td>
                                <td>{address.state}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Ações de Endereço">
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm"
                                            onClick={() => handleUpdateAddressPage(address.id)}
                                        >
                                            Atualizar
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteAddress(address.id)}
                                        >
                                            Apagar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button type="submit" className="btn btn-primary">Salvar</button>
            </form>
            <div className="container mt-5 pb-6"></div>
        </div>
    );
}

export default EditUser;
