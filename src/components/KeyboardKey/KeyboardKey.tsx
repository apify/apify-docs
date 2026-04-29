import styles from './styles.module.css';

export default function Key({ type }) {
    return (
      <span className={styles.body}>
        <span className={styles.text}>{type}</span>
      </span>
    );
  }
