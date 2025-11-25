import { CheerioCrawler } from 'crawlee';

const crawler = new CheerioCrawler({
  async requestHandler({ $, request, enqueueLinks, pushData }) {
    if (request.label === 'DRIVER') {
      const info = {};
      for (const itemElement of $('.common-driver-info li').toArray()) {
        const name = $(itemElement).find('span').text().trim();
        const value = $(itemElement).find('h4').text().trim();
        info[name] = value;
      }

      const detail = {};
      for (const linkElement of $('.driver-detail--cta-group a').toArray()) {
        const name = $(linkElement).find('p').text().trim();
        const value = $(linkElement).find('h2').text().trim();
        detail[name] = value;
      }

      const dob = info.DOB ?? '';
      const [dobDay = '', dobMonth = '', dobYear = ''] = dob.split('/');

      await pushData({
        url: request.url,
        name: $('h1').text().trim(),
        team: detail.Team,
        nationality: info.Nationality,
        dob: dobYear && dobMonth && dobDay ? `${dobYear}-${dobMonth}-${dobDay}` : null,
        instagram_url: $(".common-social-share a[href*='instagram']").attr('href') ?? null,
      });
    } else {
      await enqueueLinks({ selector: '.teams-driver-item a', label: 'DRIVER' });
    }
  },
});

await crawler.run(['https://www.f1academy.com/Racing-Series/Drivers']);
await crawler.exportData('dataset.json');
