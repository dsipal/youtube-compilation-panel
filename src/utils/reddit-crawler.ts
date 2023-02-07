import type { Browser, Page } from 'puppeteer'
import puppeteer from 'puppeteer'

export class RedditCrawler {
  private subreddit: string

  constructor(srName: string) {
    this.subreddit = '/r/' + srName
  }

  crawl() {
    ;async () => {
      const browser: Browser = await puppeteer.launch()
      const page: Page = await browser.newPage()
      await this.crawlInternal(page, `https://reddit.com${this.subreddit}`)
    }
  }

  async crawlInternal(page: Page, path: string) {
    await page.goto(path)
  }
}
