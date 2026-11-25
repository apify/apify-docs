import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import siteConfig from '@generated/docusaurus.config';
import { withOneTrust } from '@segment/analytics-consent-wrapper-onetrust';
import { AnalyticsBrowser } from '@segment/analytics-next';

const { segmentWriteKey } = siteConfig.customFields;

if (ExecutionEnvironment.canUseDOM && process.env.NODE_ENV === 'production' && segmentWriteKey) {
    const analytics = new AnalyticsBrowser();
    // Wrap before calling load: the wrapper defers the load itself until OneTrust reports consent.
    withOneTrust(analytics).load(
        { writeKey: segmentWriteKey, cdnURL: 'https://analytics.apify.com' },
        {
            // Segment maps only the ad destinations to consent categories, so the rest needs Performance (C0002).
            disable: () => !(window.OnetrustActiveGroups ?? '').split(',').includes('C0002'),
            integrations: {
                'Segment.io': {
                    apiHost: 'analytics.apify.com/v1',
                    deliveryStrategy: { config: { keepalive: true } },
                },
            },
        },
    );
    window.analytics = analytics;
}
