import { useState } from 'react';

const HIDE_COPIED_AFTER = 2000;

export const useCopyToClipboard = ({ text, transform }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleClick = async () => {
        try {
            const textToCopy = transform ? transform(text) : text;
            await navigator.clipboard.writeText(textToCopy);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), HIDE_COPIED_AFTER);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    return [isCopied, handleClick];
};
