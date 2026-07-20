"use client";
import { Input } from '@mantine/core';

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
        aria-label="Type the CAPTCHA letters shown above"
      />
    </div>
  );
}

export default Captcha;
