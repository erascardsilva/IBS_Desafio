import React, { useState } from 'react';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        sex: 'M',
        birthDate: '',
        maritalStatus: 'Solteiro',
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
            name: formData.name,
            sex: formData.sex,
            birthDate: formData.birthDate,
            maritalStatus: formData.maritalStatus,
            addresses: [
                {
                    cep: formData.cep,
                    address: formData.address,
                    number: formData.number,
                    complement: formData.complement,
                    district: formData.district,
                    state: formData.state,
                    city: formData.city
                }
            ]
        };

        try {
            const response = await fetch('http://localhost:3000/peoples', {
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
                    name: '',
                    sex: 'M',
                    birthDate: '',
                    maritalStatus: 'Solteiro',
                    cep: '',
                    address: '',
                    number: '',
                    complement: '',
                    district: '',
                    state: '',
                    city: ''
                });
            } else {
                setMessage('Erro ao cadastrar. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            setMessage('Erro ao cadastrar. Tente novamente.');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2>Cadastrar Pessoa</h2>
            <form onSubmit={onSubmit}>
                {/* Dados da Pessoa */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="sex" className="form-label">Sexo</label>
                    <select
                        className="form-select"
                        id="sex"
                        name="sex"
                        value={formData.sex}
                        onChange={handleChange}
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
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="maritalStatus" className="form-label">Estado Civil</label>
                    <select
                        className="form-select"
                        id="maritalStatus"
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                    >
                        <option value="Solteiro">Solteiro</option>
                        <option value="Casado">Casado</option>
                        <option value="Divorciado">Divorciado</option>
                        <option value="Viúvo">Viúvo</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>

                {/* Endereço */}
                <h3>Endereço</h3>

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

                <button type="submit" className="btn btn-primary">Cadastrar</button>
                <> </>
                
            </form>

           <br></br>
           <p>.</p>
           
        </div>
    );
}

export default Register;
