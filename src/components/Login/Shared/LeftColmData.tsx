import React from 'react';
import { Image } from 'react-bootstrap';
import logo from '../../../assets/images/iptor-logo-white.svg';

const LeftColmData = () => {
  return (
    <div className="login-lft-cont-container">
      <Image className="login-cont-logo" src={logo} alt="Iptor" title="Iptor" />
      <h1 className="para">A milestone in the Iptor transformation journey</h1>
      <p className="version-details">
        Version 11 is the key platform for distribution and publishing businesses to turn digital disruption into digital opportunity.
      </p>
    </div>
  );
};

export default LeftColmData;
