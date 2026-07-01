import React from 'react';
import { cssColorsVariablesBrandDark, cssColorsVariablesLight } from '@apify/ui-library';

export default function Root({ children }) {
    return (
        <>
            <style>{`:root { ${cssColorsVariablesLight} } html[data-theme='dark'] { ${cssColorsVariablesBrandDark} }`}</style>
            {children}
        </>
    );
}
 