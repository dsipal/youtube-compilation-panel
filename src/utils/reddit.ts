import axios from 'axios'

export class Reddit {
  private baseUrl = 'https://reddit.com/'
  private url: string

  constructor(sr: string) {
    this.url = this.baseUrl + sr
  }

  async getTopPosts() {
    const top = axios.get(this.url + '/top.json')
    return top
  }
}
