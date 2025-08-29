import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useLocation } from '@docusaurus/router';
import { ThemeClassNames } from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import LLMButtons from '@theme/LLMButtons';
import MDXContent from '@theme/MDXContent';
import clsx from 'clsx';
import React from 'react';

function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender = !frontMatter.hide_title && typeof contentTitle === 'undefined';

  if (!shouldRender) {
    return null;
  }

  return metadata.title;
}

/**
 * This component is also used in other Apify docs (clients, SDKs, CLI)
 */
export default function DocItemContent({ children }) {
  const syntheticTitle = useSyntheticTitle();
  const location = useLocation();

  // Define the allowed paths that should show LLMButtons
  // The logic is handled here, and also in docusaurus.config.js (see docusaurus-plugin-openapi-docs)
  const allowedPaths = [
    '/api/v2/getting-started',
    '/api/v2/actors',
    '/api/v2/actors-actor-versions',
    '/api/v2/actors-actor-builds',
    '/api/v2/actors-actor-runs',
    '/api/v2/actors-webhook-collection',
    '/api/v2/actor-builds',
    '/api/v2/actor-runs',
    '/api/v2/actor-tasks',
    '/api/v2/storage-datasets',
    '/api/v2/storage-key-value-stores',
    '/api/v2/storage-request-queues',
    '/api/v2/storage-request-queues-requests',
    '/api/v2/storage-request-queues-requests-locks',
    '/api/v2/webhooks-webhooks',
    '/api/v2/webhooks-webhook-dispatches',
    '/api/v2/schedules',
    '/api/v2/store',
    '/api/v2/logs',
    '/api/v2/users',
    '/api/client',
    '/platform',
    '/sdk',
    '/cli',
  ];

  // Define paths that should not show LLMButtons (e.g., changelog pages)
  const disallowedPaths = [
    '/changelog',
  ];

  const shouldShowLLMButtons = allowedPaths.some((path) => location.pathname.startsWith(path))
    && !disallowedPaths.some((path) => location.pathname.includes(path));

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && <Heading as="h1">{syntheticTitle}</Heading>}
      {shouldShowLLMButtons && <LLMButtons />}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
