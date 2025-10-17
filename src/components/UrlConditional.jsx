import { useLocation } from '@docusaurus/router';

export default function UrlConditional({fragment, children}) {
  const location = useLocation();
  const shouldShow = location.hash === `#${fragment}`;
  return shouldShow ? <>{children}</> : null;
}
