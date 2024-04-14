import React from 'react';
import './Header.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import ibsLogo from '../assets/ibs.png';

function Header() {
    const goBack = () => {
        window.history.back();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container-fluid">
                <a href="/dashboard">
                    <img
                        src={ibsLogo}
                        alt="Logo IBS"
                        className="navbar-brand me-3"
                        style={{ height: '60px' }}
                    />
                </a>

                <h1 className="navbar-brand mb-0 d-flex align-items-center justify-content-center flex-grow-1">IBS Desafio</h1>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="bi bi-list bi-lg"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a href="/login" className="nav-link me-3">
                                <i className="bi bi-house-door bi-lg"></i>
                            </a>
                        </li>
                        
                        <li className="nav-item">
                            <a
                                href="https://github.com/erascardsilva/IBS_Desafio"
                                target="_blank"
                                className="nav-link me-3"
                                rel="noreferrer"
                            >
                                <i className="bi bi-github bi-lg"></i>
                            </a>
                        </li>
                        {/* Ícone Voltar */}
                        <li className="nav-item">
                            <button 
                                className="btn btn-link nav-link me-3"
                                onClick={goBack}
                            >
                                <i className="bi bi-arrow-left"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
