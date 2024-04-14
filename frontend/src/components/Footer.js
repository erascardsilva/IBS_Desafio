import React from 'react';
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid bg-white shadow-lg p-3 rounded">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
          <h5 className="mb-3 mb-md-0">Erasmo Cardoso | DEV</h5>

          <div className="mt-3 mt-md-0">
            <a
              href="https://api.whatsapp.com/send?phone=11949224355"
              target="_blank"
              className="me-3" rel="noreferrer"
            >
              <i className="bi bi-whatsapp"></i>
            </a>
            <a
              href="https://github.com/erascardsilva"
              target="_blank"
              className="me-3" rel="noreferrer"
            >
              <i className="bi bi-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/erasmo-cardoso-da-silva-76105423a/"
              target="_blank" rel="noreferrer"
            >
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
