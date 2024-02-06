import { useState } from 'react';
import { Stepper, Button, Group } from '@mantine/core';
import styles from './sponsor-book-steps.module.css';


function SponsorBookSteps(props) {
    
  return (
    <>
      <Stepper active={props.active} onStepClick={props.setActive} className={styles.stepper}>
        <Stepper.Step label="First step" description="Select books">
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Upload logo">
        </Stepper.Step>
        <Stepper.Step label="Third step" description="Pay">
        </Stepper.Step>
        <Stepper.Completed>
        </Stepper.Completed>
      </Stepper>

       
    </>
  );
}

export default SponsorBookSteps;