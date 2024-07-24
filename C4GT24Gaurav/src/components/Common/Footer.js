import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="/link1">Link1</a>
                <a href="/link2">Link2</a>
                <a href="/link3">Link3</a>
                <a href="/link4">Link4</a>
                
            </div>
            <div className="footer-info">
                <p>© Website 2024</p>
                <p>Some other footer information here</p>
            </div>
        </footer>
    );
}

export default Footer;
