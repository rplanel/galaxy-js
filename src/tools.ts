import type { GalaxyClient } from './GalaxyClient'
import type { GalaxyTool } from './types'
import { createError } from 'h3'
import { getErrorMessage } from './errors'

export class Tools {
  private static instance: Tools
  #client: GalaxyClient

  private constructor(client: GalaxyClient) {
    this.#client = client
  }

  static getInstance(client: GalaxyClient): Tools {
    if (this.instance) {
      return this.instance
    }
    this.instance = new Tools(client)
    return this.instance
  }

  public async getTool(toolId: string, version: string): Promise<GalaxyTool> {
    try {
      const galaxyTool = await this.#client.api(
        `api/tools/${toolId}?io_details=true&version=${version}`,
        {
          method: 'GET',
        },
      )
      return galaxyTool
    }
    catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error),
      })
    }
  }
}
