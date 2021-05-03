import React from "react";
import { Card } from "react-bootstrap";

const LoginFooter = () => {
  return (
      <Card style={{ width: '18rem', border: '0' , marginTop:'16px', padding: '14px'}}>
          <Card.Text style={{ color:'#00A3A5' , fontSize: '12px'}}>
          Copyright © 2021 - Iptor Sweden AB  | Privacy Policy  | UK Legal | Code of Conduct
          </Card.Text>
        
      </Card>
  );
};

export default LoginFooter;
