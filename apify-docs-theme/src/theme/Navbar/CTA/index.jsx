import useIsBrowser from '@docusaurus/useIsBrowser';

import styles from './styles.module.css';

// Console writes this cookie on Domain=apify.com while a user has a session, and expires it on logout.
const LOGGED_IN_COOKIE = 'ApifyProdUserId';

function hasLoggedInCookie() {
    return document.cookie.split(';').some((cookie) => {
        const [name, ...value] = cookie.trim().split('=');
        return name === LOGGED_IN_COOKIE && value.join('=') !== '';
    });
}

export default function NavbarCTA() {
    // Prerendered HTML always shows "Get started". Reading the cookie before hydration would cause a mismatch.
    const isBrowser = useIsBrowser();
    const isUserLoggedIn = isBrowser && hasLoggedInCookie();
    const buttonText = isUserLoggedIn ? 'Go to Console' : 'Get started';

    const clickHandler = () => {
        if (!window.analytics) return;
        window.analytics.track('Clicked', {
            app: 'docs',
            button_text: buttonText,
            element: 'header.signUpButton',
            is_user_logged_in: isUserLoggedIn,
        });
    };

    return (
        <a href="https://console.apify.com" onClick={clickHandler} className={styles.getStarted}>
            {buttonText}
        </a>
    );
}
