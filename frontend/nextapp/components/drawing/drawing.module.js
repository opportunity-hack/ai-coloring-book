"use client";
import { Card, Image, Checkbox, Popover, Text} from '@mantine/core';
import styles from "./drawing.module.css";
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

function Drawing({ drawing, handleCardClick, handleCheckboxChange }) {
  const [opened, { close, open }] = useDisclosure(false);
  return (    
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className={`${styles.card} ${drawing.selected ? styles.selectedCard : ''}`}
        onClick={handleCardClick}
      >
        
          <Popover opened={opened} width={400} position="bottom" withArrow shadow="md">
            <Popover.Target>
            <Image onMouseEnter={open} onMouseLeave={close}
            src={drawing.url}
            height={100}
            alt={drawing.label}            
            />
          </Popover.Target>
          <Popover.Dropdown style={{ pointerEvents: 'none' }}>          
            <Image
              src={drawing.url}
              height={300}              
              fit="contain"
              alt={drawing.label}
            />
          </Popover.Dropdown>
          </Popover>

          <Text size='md'>{drawing.subject}</Text>          
          <Text size="sm">School: {drawing.school}</Text>
          <Text size="sm">Created by: {drawing.created_by ? drawing.created_by : "-"}</Text>
          <Text size="sm">Uploaded: {drawing.created_on}</Text>
            
          
           <div className={styles.cardInput}>
            <Checkbox
              checked={drawing.useAI}
              onChange={handleCheckboxChange}
              label={<span style={{ marginRight: '8px' }}>use ai</span>}
            />
        </div>
                       
      </Card>
    
  );
}

export default Drawing;