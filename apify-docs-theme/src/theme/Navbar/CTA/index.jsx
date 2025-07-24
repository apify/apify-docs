import styles from './styles.module.css';

const buttonText = 'Get started';

function clickHandler() {
    if (window.analytics) {
        // Track the click event
        window.analytics.track('Clicked', {
            app: 'docs',
            button_text: buttonText,
            element: 'header.signUpButton',
        });
    }
}

export default function NavbarCTA() {
    return (
        <a href="https://console.apify.com" onClick={clickHandler} className={styles.getStarted}>{buttonText}</a>
    );
}
