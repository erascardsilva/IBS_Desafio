import React from 'react';
import { Link } from 'react-router-dom';
import crudimg from '../assets/crud.png';
import './Dashboard.css'; 

function Dashboard() {
    return (
        <div className="container-fluid mt-3 mb-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-11 bg-white shadow-lg p-4 rounded d-flex flex-column align-items-center">
                    <h2 className="mb-3">Bem vindo.</h2>

                   

                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between w-100">
                        {/* Menu */}
                        <ul className="nav nav-pills flex-column" style={{ width: '30%' }}>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Cadastrar</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/search" className="nav-link">Busca</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/search" className="nav-link">Editar</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/search" className="nav-link">Apagar</Link>
                            </li>
                            
                            
                           
                        </ul>

                        {/* Imagem */}
                        <div className="image-container" style={{ width: '70%' }}>
                        <img src={ crudimg } alt="CRUD" className="img-fluid w-50" />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
