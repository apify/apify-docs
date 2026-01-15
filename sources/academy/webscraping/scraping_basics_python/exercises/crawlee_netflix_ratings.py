import asyncio
from urllib.parse import quote_plus

from crawlee import Request
from crawlee.crawlers import BeautifulSoupCrawler, BeautifulSoupCrawlingContext


async def main() -> None:
    crawler = BeautifulSoupCrawler()

    @crawler.router.default_handler
    async def handle_netflix_table(context: BeautifulSoupCrawlingContext) -> None:
        requests: list[Request] = []
        name_cells = context.soup.select('[data-uia="top10-table-row-title"] button')
        for name_cell in name_cells[:5]:
            name = name_cell.text.strip()
            imdb_search_url = (
                f"https://www.imdb.com/find/?q={quote_plus(name)}&s=tt&ttype=ft"
            )
            requests.append(Request.from_url(imdb_search_url, label="IMDB_SEARCH"))
        await context.add_requests(requests)

    @crawler.router.handler("IMDB_SEARCH")
    async def handle_imdb_search(context: BeautifulSoupCrawlingContext) -> None:
        await context.enqueue_links(
            selector=".ipc-title-link-wrapper", label="IMDB", limit=1
        )

    @crawler.router.handler("IMDB")
    async def handle_imdb(context: BeautifulSoupCrawlingContext) -> None:
        print(f"Processing IMDB page: {context.request.url}")
        rating_element = context.soup.select_one(
            "[data-testid='hero-rating-bar__aggregate-rating__score']"
        )
        title_element = context.soup.select_one("h1")
        if rating_element and title_element:
            await context.push_data(
                {
                    "url": context.request.url,
                    "title": title_element.text.strip(),
                    "rating": rating_element.text.strip(),
                }
            )

    await crawler.run(["https://www.netflix.com/tudum/top10"])
    await crawler.export_data("dataset.json")


if __name__ == "__main__":
    asyncio.run(main())
