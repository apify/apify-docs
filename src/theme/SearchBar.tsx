import React from 'react';

export default function SearchBar() {
    // Replace with your <PROJECT_ID>
    const projectId = 'zat23cvkm1';
    const headerTitle = 'Documentation chatbot';
    // @ts-expect-error: Not a React component
    return <biel-search-button project={projectId} button-style="rounded" header-title={headerTitle}>Search</biel-search-button>;
}
