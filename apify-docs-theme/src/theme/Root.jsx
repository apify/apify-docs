import React from 'react';
import { cssColorsVariablesBrandDark } from '@apify/ui-library';

// Only the brand dark tokens are injected - the ui-library light tokens shift
// the palette from the current design, so light mode keeps its existing colors.
// Same approach as apify-blog-theme#223.
export default function Root({ children }) {
    return (
        <>
            <style>{`html[data-theme='dark'] { ${cssColorsVariablesBrandDark} }`}</style>
            {children}
        </>
    );
}
