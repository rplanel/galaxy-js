import type { $Fetch, NitroFetchRequest } from 'nitropack'
import type { GalaxyVersion } from './types'

import { $fetch } from 'ofetch'
import { Histories } from './histories'
import { Invocations } from './invocations'
import { Tools } from './tools'
import { Workflows } from './workflows'

export class GalaxyClient {
  private static instance: GalaxyClient
  #apiKey: string
  url: string
  api: <T>() => $Fetch<T, NitroFetchRequest>

  private constructor(apiKey: string, url: string) {
    this.#apiKey = apiKey
    this.url = url
    const fetch = $fetch.create({
      baseURL: this.url,
      headers: {
        'x-api-key': this.#apiKey,
        'accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    })
    this.api = <T>() => {
      return fetch as $Fetch<T, NitroFetchRequest>
    }
  }

  static getInstance(apiKey: string, url: string): GalaxyClient {
    if (this.instance) {
      return this.instance
    }
    this.instance = new GalaxyClient(apiKey, url)
    return this.instance
  }

  public async getVersion(): Promise<GalaxyVersion> {
    return await this.api<GalaxyVersion>()('/api/version', {
      method: 'GET',
    })
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
}
