"use client";
import { Stepper } from '@mantine/core';
import styles from './sponsor-book-steps.module.css';

function SponsorBookSteps(props) {
  return (
    <Stepper active={props.active} className={styles.stepper}>
      <Stepper.Step label="Choose books" description="Pick books to sponsor">
      </Stepper.Step>
      <Stepper.Step label="Your business" description="Name and logo">
      </Stepper.Step>
      <Stepper.Step label="Pay" description="Checkout with PayPal">
      </Stepper.Step>
      <Stepper.Completed>
      </Stepper.Completed>
    </Stepper>
  );
}

export default SponsorBookSteps;
