import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateAddress() {
    const { userId, addressId } = useParams();
    const [addressData, setAddressData] = useState({
        cep: '',
        address: '',
        number: '',
        complement: '',
        district: '',
        state: '',
        city: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch(`http://localhost:3000/peoples/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const address = data.addresses.find(a => a.id === parseInt(addressId, 10));
                if (address) {
                    setAddressData(address);
                }
            })
            .catch(error => console.error('Erro ao buscar endereço:', error));
    }, [userId, addressId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddressData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:3000/peoples/${userId}/addresses/${addressId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(addressData)
            });

            if (response.ok) {
                navigate(`/editpeople/${userId}`, { state: { message: 'Endereço atualizado com sucesso' } });
            } else {
                console.error('Erro ao atualizar endereço:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao atualizar endereço:', error);
        }
    };

    return (
        <div className="container mt-5 pb-5">
            <h2>Atualizar Endereço</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="cep" className="form-label">CEP</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cep"
                        name="cep"
                        value={addressData.cep}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Endereço</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={addressData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="number" className="form-label">Número</label>
                    <input
                        type="text"
                        className="form-control"
                        id="number"
                        name="number"
                        value={addressData.number}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="complement" className="form-label">Complemento</label>
                    <input
                        type="text"
                        className="form-control"
                        id="complement"
                        name="complement"
                        value={addressData.complement}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="district" className="form-label">Bairro</label>
                    <input
                        type="text"
                        className="form-control"
                        id="district"
                        name="district"
                        value={addressData.district}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">Cidade</label>
                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={addressData.city}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="form-label">Estado</label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={addressData.state}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mt-3 mb-5"> 
                    <button type="submit" className="btn btn-primary">Atualizar</button>
                </div>
            </form>
            <div className="container mt-5 pb-5"></div>


        </div>
    );
}

export default UpdateAddress;