import Link from '@docusaurus/Link';

// Inline snippets for the "create an API token" instructions repeated across
// integration pages. They render inline, so they work inside list items and
// bullets without breaking the surrounding list.

// Opens the create token form in Apify Console.
const CREATE_TOKEN_URL = 'https://console.apify.com/settings/integrations?createApiToken=true';

// `integration` names what the token is for, e.g. "Make.com". Console prefills the form with it.
const createTokenUrl = (integration) =>
    integration ? `${CREATE_TOKEN_URL}&for=${encodeURIComponent(integration)}` : CREATE_TOKEN_URL;

// Link to the create token form with custom text: "<CreateTokenLink>create one in Apify Console</CreateTokenLink>"
export const CreateTokenLink = ({ integration, children }) => <Link to={createTokenUrl(integration)}>{children}</Link>;

// Prerequisite bullets: "- _Apify API token_ - <CreateApiTokenLink integration="Make.com" />"
export const CreateApiTokenLink = ({ integration }) => (
    <>
        <CreateTokenLink integration={integration}>Create an API token</CreateTokenLink> in Apify Console.
    </>
);

// Tail of a step that asks for the token: "1. Enter your token in the field. <GetApiTokenHint />"
export const GetApiTokenHint = ({ integration }) => (
    <>
        To get one, <CreateTokenLink integration={integration}>create an API token</CreateTokenLink> in Apify Console and
        copy it.
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
