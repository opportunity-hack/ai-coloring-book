"use client";
import { Card, Image, Checkbox } from '@mantine/core';
import styles from "./drawing.module.css";

function Drawing({ drawing, handleCardClick, handleCheckboxChange }) {
  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className={`${styles.card} ${drawing.selected ? styles.selectedCard : ''}`}
        onClick={handleCardClick}
      >
        <div style={{ display: 'flex', alignItems: "center", flexDirection: "column" }}>
          <Image
            src={drawing.url}
            height={300}
            alt={drawing.label}
            className={styles.cardImage}
          />
          <div style={{ display: 'flex', flexDirection: "column", width: "100%", marginLeft: "30px"  }}>
            <span> {drawing.created_by ? drawing.created_by : "-"}</span>
            <span> {drawing.created_on}</span>
          </div>
           <div className={styles.cardInput}>
            <Checkbox
              checked={drawing.useAI}
              onChange={handleCheckboxChange}
              label={<span style={{ marginRight: '8px' }}>use ai</span>}
            />
        </div>
        </div>
       
        
      </Card>
    </>
  );
}

export default Drawing;