import { useLocation } from '@docusaurus/router';
import Admonition from '@theme/Admonition';

export default function LegacyJsCourseAdmonition({ param = 'legacy-js-course' }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const value = params.get(param);
  if (!value) return null;
  return (
    <div className="legacy-js-course-admonition">
      <Admonition type="caution" title="New course for JavaScript devs">
        <p>
          You're trying to access page <code>{value}</code> from our
          old <strong>Web scraping basics for JavaScript devs</strong> course,
          which is now archived.
        </p>
        <p>
          You can still <a href={'/academy/scraping-basics-javascript/legacy' + value}>go through that page</a>,
          but we recommend you to check out this new course instead. We plan to close the old course
          entirely in a few months.
        </p>
      </Admonition>
    </div>
  );
}
