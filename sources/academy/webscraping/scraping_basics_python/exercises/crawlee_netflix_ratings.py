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
            tmdb_search_url = (
                f"https://www.themoviedb.org/search?query={quote_plus(name)}"
            )
            requests.append(Request.from_url(tmdb_search_url, label="TMDB_SEARCH"))
        await context.add_requests(requests)

    @crawler.router.handler("TMDB_SEARCH")
    async def handle_tmdb_search(context: BeautifulSoupCrawlingContext) -> None:
        await context.enqueue_links(selector=".title a.result", label="TMDB", limit=1)

    @crawler.router.handler("TMDB")
    async def handle_tmdb(context: BeautifulSoupCrawlingContext) -> None:
        score_element = context.soup.select_one(".user_score_chart")
        title_element = context.soup.select_one(".title a")
        if score_element and title_element:
            await context.push_data(
                {
                    "url": context.request.url,
                    "title": title_element.text.strip(),
                    "user_score": f"{score_element.get('data-percent')}%",
                }
            )

    await crawler.run(["https://www.netflix.com/tudum/top10"])
    await crawler.export_data("dataset.json")


if __name__ == "__main__":
    asyncio.run(main())
