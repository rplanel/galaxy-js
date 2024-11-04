// import type { $Fetch } from 'nitropack'
import type { $Fetch } from 'ofetch'
import type { GalaxyVersion } from './types'
import { $fetch } from 'ofetch'
import { Datasets } from './datasets'
import { Histories } from './histories'
import { Invocations } from './invocations'
import { Jobs } from './jobs'
import { Tools } from './tools'
import { Workflows } from './workflows'

export class GalaxyClient {
  private static instance: GalaxyClient
  #apiKey: string
  url: string
  api: $Fetch

  private constructor(apiKey: string, url: string) {
    this.#apiKey = apiKey
    this.url = url
    const fetch = $fetch.create({
      headers: {
        'x-api-key': apiKey,
        'accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Cookie': 'galaxysession=3ce3e2281e4506fbe4936bff63a07ce914566a86c755c5791fb3ba914dbf34ee95e8321549bd90a3',
      },

      baseURL: this.url,
    })
    this.api = fetch
  }

  static getInstance(apiKey: string, url: string): GalaxyClient {
    if (this.instance) {
      return this.instance
    }
    this.instance = new GalaxyClient(apiKey, url)
    return this.instance
  }

  public async getVersion(): Promise<GalaxyVersion> {
    return await this.api('/api/version')
  }

  public histories(): Histories {
    return Histories.getInstance(this)
  }

  public workflows(): Workflows {
    return Workflows.getInstance(this)
  }

  public tools(): Tools {
    return Tools.getInstance(this)
  }

  public invocations(): Invocations {
    return Invocations.getInstance(this)
  }

  public jobs(): Jobs {
    return Jobs.getInstance(this)
  }

  public datasets(): Datasets {
    return Datasets.getInstance(this)
  }
}
