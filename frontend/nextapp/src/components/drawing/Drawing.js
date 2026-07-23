"use client";
import { Image, Popover, Switch, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import styles from "./drawing.module.css";

function Drawing({ drawing, handleCardClick, handleCheckboxChange }) {
  const [opened, { close, open }] = useDisclosure(false);
  const alt = drawing.label || drawing.subject || 'Uploaded drawing';

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={Boolean(drawing.selected)}
      className={`${styles.card} ${drawing.selected ? styles.selectedCard : ''}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      {drawing.selected && (
        <span className={styles.checkBadge} aria-hidden="true">
          <IconCheck size={14} stroke={3} />
        </span>
      )}

      <Popover opened={opened} width={340} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <div
            className={styles.imageWrap}
            onMouseEnter={open}
            onMouseLeave={close}
          >
            <Image src={drawing.url} h={130} fit="cover" alt={alt} />
          </div>
        </Popover.Target>
        <Popover.Dropdown style={{ pointerEvents: 'none' }}>
          <Image src={drawing.url} h={300} fit="contain" alt={alt} />
        </Popover.Dropdown>
      </Popover>

      <div className={styles.cardBody}>
        <Text fw={600} size="sm" lineClamp={1}>
          {drawing.subject || 'Untitled drawing'}
        </Text>
        <Text size="xs" c="dimmed" lineClamp={1}>
          {drawing.school}
          {drawing.grade ? ` · ${drawing.grade}` : ''}
        </Text>
        {/* created_on is already a plain YYYY-MM-DD string from the API */}
        <Text size="xs" c="dimmed" lineClamp={1}>
          By {drawing.created_by || 'unknown'} · {drawing.created_on}
        </Text>
      </div>

      {/* stopPropagation: the switch must not also toggle card selection */}
      <div className={styles.cardFooter} onClick={(e) => e.stopPropagation()}>
        <Switch
          size="xs"
          checked={Boolean(drawing.useAI)}
          onChange={handleCheckboxChange}
          label="AI coloring page"
        />
      </div>
    </div>
  );
}

export default Drawing;
