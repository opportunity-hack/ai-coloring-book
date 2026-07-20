"use client";
import { TextInput, ActionIcon } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import styles from "./captcha.module.css";

// Presentational only — generation/validation live in @/lib/captcha.
export default function Captcha({ value, onChange, captchaValue, onRefresh, error }) {
  return (
    <div className={styles.captcha}>
      <div className={styles.codeRow}>
        <div className={styles.code} aria-label={`The letters are ${captchaValue.split("").join(", ")}`}>
          {captchaValue.split("").map((char, index) => (
            <span key={index} className={styles.char}>
              {char}
            </span>
          ))}
        </div>
        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          onClick={onRefresh}
          aria-label="Show me different letters"
        >
          <IconRefresh stroke={1.8} />
        </ActionIcon>
      </div>
      <TextInput
        label="Quick check — type these letters"
        description="This keeps robots from filling our book with robot art"
        placeholder="Type the letters above"
        size="lg"
        radius="md"
        value={value}
        onChange={onChange}
        error={error}
        autoComplete="off"
        autoCapitalize="characters"
      />
    </div>
  );
}
