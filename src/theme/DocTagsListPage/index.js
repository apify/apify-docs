import { Redirect } from '@docusaurus/router';
import React from 'react';

/**
 * The built-in list of all tags is replaced by the hand-written tutorials landing page (only the Academy uses tags).
 * Redirecting in the browser avoids a flash of the list when clicking "View all tags". nginx redirects direct visits.
 */
export default function DocTagsListPage() {
    return <Redirect to="/academy/tutorials" />;
}
