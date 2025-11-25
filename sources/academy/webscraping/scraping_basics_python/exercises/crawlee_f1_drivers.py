import asyncio
from datetime import datetime

from crawlee.crawlers import BeautifulSoupCrawler, BeautifulSoupCrawlingContext


def format_dob(value: str) -> str | None:
    try:
        return datetime.strptime(value, "%d/%m/%Y").date().isoformat()
    except ValueError:
        return None


async def main() -> None:
    crawler = BeautifulSoupCrawler()

    @crawler.router.default_handler
    async def handle_listing(context: BeautifulSoupCrawlingContext) -> None:
        await context.enqueue_links(selector=".teams-driver-item a", label="DRIVER")

    @crawler.router.handler("DRIVER")
    async def handle_driver(context: BeautifulSoupCrawlingContext) -> None:
        info: dict[str, str] = {}
        for row in context.soup.select(".common-driver-info li"):
            name = row.select_one("span").text.strip()
            value = row.select_one("h4").text.strip()
            info[name] = value

        detail: dict[str, str] = {}
        for row in context.soup.select(".driver-detail--cta-group a"):
            name = row.select_one("p").text.strip()
            value = row.select_one("h2").text.strip()
            detail[name] = value

        title_tag = context.soup.select_one("h1")
        instagram_link = context.soup.select_one(".common-social-share a[href*='instagram']")

        await context.push_data(
            {
                "url": context.request.url,
                "name": title_tag.text.strip() if title_tag else None,
                "team": detail.get("Team"),
                "nationality": info.get("Nationality"),
                "dob": format_dob(info.get("DOB", "")),
                "instagram_url": instagram_link.get("href") if instagram_link else None,
            }
        )

    await crawler.run(["https://www.f1academy.com/Racing-Series/Drivers"])
    await crawler.export_data_json(path="dataset.json", ensure_ascii=False, indent=2)  # type: ignore[attr-defined]


if __name__ == "__main__":
    asyncio.run(main())
