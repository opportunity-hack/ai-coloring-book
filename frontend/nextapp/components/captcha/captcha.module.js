import { useState, useEffect } from 'react';
import { Button, Input } from '@mantine/core';


function Captcha(props) {
  
    
  return (
    <div>
      <div>
        <strong>CAPTCHA:</strong> {props.captchaValue}
      </div>
      <Input
        placeholder="Enter CAPTCHA"
        value={props.value}
        onChange={props.onChange}
      />
      
    </div>
  );
}

export default Captcha;
