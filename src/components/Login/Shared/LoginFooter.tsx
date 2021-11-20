import React from 'react';

const LoginFooter = (): JSX.Element => {
  return (
    <p className="login-copyrights">
      Copyright &copy; 2021 - Iptor Sweden AB |{' '}
      <button type="button" className="text-link footer-anchor-button">
        Privacy Policy
      </button>{' '}
      |{' '}
      <button type="button" className="text-link footer-anchor-button">
        UK Legal?
      </button>{' '}
      |{' '}
      <button type="button" className="text-link footer-anchor-button">
        Code
      </button>{' '}
    </p>
  );
};

export default LoginFooter;
