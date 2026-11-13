import Link from '@docusaurus/Link';

// Inline snippets for the "create an API token" instructions repeated across
// integration pages. They render inline, so they work inside list items and
// bullets without breaking the surrounding list.

const CREATE_TOKEN_URL = '/integrations/api#create-api-token';

// Prerequisite bullets: "- _Apify API token_ - <CreateApiTokenLink />"
export const CreateApiTokenLink = () => (
    <>
        <Link to={CREATE_TOKEN_URL}>Create an API token</Link> in Apify Console.
    </>
);

// Tail of a step that asks for the token: "1. Enter your token in the field. <GetApiTokenHint />"
export const GetApiTokenHint = () => (
    <>
        To get one, <Link to={CREATE_TOKEN_URL}>create an API token</Link> in Apify Console and copy it.
    </>
);

// Step after navigating to Settings > API & Integrations: "1. <CreateTokenStep />"
export const CreateTokenStep = () => (
    <>
        In the <strong>Personal API tokens</strong> section, select <strong>Create a new token</strong>. Enter a
        description, optionally limit the token's permissions, and select <strong>Create</strong>.
    </>
);

// Step after CreateTokenStep: "1. <CopyTokenStep /> Then, return to your Make scenario."
export const CopyTokenStep = () => <>Copy the token. You can view it only once, so store it somewhere safe.</>;
