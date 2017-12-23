import React from 'react';
import primaryLogo from './../../images/dropful-primary.svg';

const Header = () => (
    <div className="header">
        <img src={primaryLogo} alt="Dropful primary logo" height="50" />
        <h5>Share files faster & smarter.</h5>
    </div>
);

export default Header;
