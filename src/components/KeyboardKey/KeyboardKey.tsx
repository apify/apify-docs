import styles from './styles.module.css';

interface KeyboardKeyProps {
    is: string;
}

export default function KeyboardKey({ is }: KeyboardKeyProps) {
    return (
      <span className={styles.body}>
        <span className={styles.text}>{is}</span>
      </span>
    );
  }
