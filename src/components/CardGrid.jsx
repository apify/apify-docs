import styles from './CardGrid.module.css';

export default function CardGrid({ children }) {
    return (
        <div className={styles['card-grid']}>
            { children }
        </div>
    );
}
