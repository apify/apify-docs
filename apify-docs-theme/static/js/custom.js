// function load() {
//     const versions = document.querySelectorAll('.navbar .dropdown ul a');
//     const basePath = '';
//     const types = [`${basePath}/docs/next`, `${basePath}/docs`];
//     let i = 0;
//
//     for (const el of versions) {
//         const match = el.href.match(/\/docs\/(\d+\.\d+(\.\d+)?)$/) || el.href.match(/\/docs\/(\d+\.\d+(\.\d+)?)/);
//
//         if (!types[i++] && !match) {
//             continue;
//         }
//
//         const version = (types[i++] || match[0]).replace('/docs', '/api');
//
//         if (el.classList.contains('api-version-bound')) {
//             continue;
//         }
//
//         el.addEventListener('click', (e) => {
//             if (version && window.location.pathname.startsWith(`${basePath}/api`)) {
//                 window.location.href = version;
//                 e.preventDefault();
//             }
//         });
//         el.classList.add('api-version-bound');
//     }
// }
//
// setInterval(() => {
//     if (document.querySelectorAll('.navbar .dropdown ul a').length > 0) {
//         load();
//     }
// }, 500);

let lastKnownScrollHash = '';

// handles automatic scrolling of the API reference sidebar (redoc)
function scrollSidebarItemIntoView() {
    const hash = window.location.hash.substring(1);

    if (hash !== lastKnownScrollHash) {
        const $li = document.querySelector(`li[data-item-id="${hash}"]`);

        if (!$li) {
            return;
        }

        // not visible, click on the parent <li> first
        if (!$li.offsetParent) {
            $li.parentElement?.parentElement?.click();
        }

        $li.scrollIntoView({
            // smooth would be nice, but it's not working in some case
            // behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
        lastKnownScrollHash = hash;
    }
}

// handles automatic scrolling of the API reference sidebar (openapi-docs)
function scrollOpenApiSidebarItemIntoView() {
    const $li = document.querySelector(`ul.theme-doc-sidebar-menu a.menu__link--active[href]`);

    if (!$li) {
        return;
    }

    $li.scrollIntoView({
        block: 'nearest',
        inline: 'center',
    });
}

function redirectOpenApiDocs() {
    const { hash, pathname, origin } = new URL(window.location.href);

    if (pathname.startsWith('/api/v2') && pathname.startsWith('/api/v2-')) {
        return;
    }

    const sidebarItems = document.querySelectorAll('[data-altids]');

    if (hash.startsWith('#/reference/') || hash.startsWith('#tag/')) {
        let matched = false;

        for (const item of sidebarItems) {
            const ids = item.getAttribute('data-altids').split(',');

            if (ids.find((variant) => variant === hash)) {
                matched = true;
                item.click();
                setTimeout(() => scrollOpenApiSidebarItemIntoView(), 200);
            }
        }

        if (!matched) {
            window.location.href = `${origin}/search?q=${hash.slice(1)}&not-found=1`;
        }
    }
}

let ticking = false;

document.addEventListener('scroll', () => {
    if (!ticking) {
        // throttling based on current frame rate
        window.requestAnimationFrame(() => {
            scrollSidebarItemIntoView();
            ticking = false;
        });

        ticking = true;
    }
});

window.addEventListener('load', () => {
    setTimeout(() => redirectOpenApiDocs(), 500);

    // we need to wait a bit more, since the event fires too soon, and a lot of hydration is done after it
    setTimeout(() => scrollSidebarItemIntoView(), 1000);

    // docusaurus-openapi-docs plugin: scroll sidebar into viewport, no need for a large timeout here
    setTimeout(() => scrollOpenApiSidebarItemIntoView(), 200);
});

window.addEventListener('popstate', () => {
    setTimeout(() => redirectOpenApiDocs(), 50);
    setTimeout(() => scrollOpenApiSidebarItemIntoView(), 50);
});
