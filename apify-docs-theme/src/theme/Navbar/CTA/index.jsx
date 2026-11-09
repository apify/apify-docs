import useIsBrowser from '@docusaurus/useIsBrowser';

import styles from './styles.module.css';

// Console writes this cookie on Domain=apify.com while a user has a session, and expires it on logout.
const LOGGED_IN_COOKIE = 'ApifyProdUserId';

const CONSOLE_URL = 'https://console.apify.com';

const CTA = {
    loggedIn: { text: 'Go to Console', href: CONSOLE_URL },
    loggedOut: { text: 'Get started', href: `${CONSOLE_URL}/sign-up` },
};

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
    const cta = isUserLoggedIn ? CTA.loggedIn : CTA.loggedOut;

    const clickHandler = () => {
        if (!window.analytics) return;
        window.analytics.track('Clicked', {
            app: 'docs',
            button_text: cta.text,
            element: 'header.signUpButton',
            is_user_logged_in: isUserLoggedIn,
        });
    };

    return (
        <a href={cta.href} onClick={clickHandler} className={styles.getStarted}>
            {cta.text}
        </a>
    );
}
