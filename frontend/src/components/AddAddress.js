import React, { useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';

function AddNewAddress() {
    const { userId } = useParams(); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cep: '',
        address: '',
        number: '',
        complement: '',
        district: '',
        state: '',
        city: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const fetchAddressByCep = async (cep) => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                setError('CEP não encontrado');
                return;
            }

            setFormData((prevData) => ({
                ...prevData,
                address: data.logradouro,
                district: data.bairro,
                city: data.localidade,
                state: data.uf
            }));
            setError('');
        } catch (error) {
            setError('Erro ao buscar CEP');
        }
    };

    const handleCepChange = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        setFormData((prevData) => ({ ...prevData, cep }));

        if (cep.length === 8) {
            fetchAddressByCep(cep);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        const data = {
            cep: formData.cep,
            address: formData.address,
            number: formData.number,
            complement: formData.complement,
            district: formData.district,
            state: formData.state,
            city: formData.city
        };

        try {
            const response = await fetch(`http://localhost:3000/peoples/${userId}/addresses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {
                setMessage(responseData.message);
                setFormData({
                    cep: '',
                    address: '',
                    number: '',
                    complement: '',
                    district: '',
                    state: '',
                    city: ''
                });
                navigate(-1);
            } else {
                setMessage('Erro ao adicionar endereço. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao adicionar endereço:', error);
            setMessage('Erro ao adicionar endereço. Tente novamente.');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2>Adicionar Novo Endereço</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="cep" className="form-label">CEP</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cep"
                        name="cep"
                        value={formData.cep}
                        onChange={handleCepChange}
                        required
                    />
                    {error && <div className="mt-2 alert alert-danger">{error}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Endereço</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label htmlFor="number" className="form-label">Número</label>
                        <input
                            type="text"
                            className="form-control"
                            id="number"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="complement" className="form-label">Complemento</label>
                        <input
                            type="text"
                            className="form-control"
                            id="complement"
                            name="complement"
                            value={formData.complement}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="district" className="form-label">Bairro</label>
                    <input
                        type="text"
                        className="form-control"
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label htmlFor="state" className="form-label">Estado</label>
                        <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">Cidade</label>
                        <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {message && <div className="mt-3 alert alert-info">{message}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Adicionar Endereço</button>
            </form>
        </div>
    );
}

export default AddNewAddress;
