import type { GalaxyClient } from './GalaxyClient'
import type { GalaxyDataset } from './types'
import { createError } from 'h3'
import { getErrorMessage } from './errors'

export class Datasets {
  private static instance: Datasets
  #client: GalaxyClient

  private constructor(client: GalaxyClient) {
    this.#client = client
  }

  static getInstance(client: GalaxyClient): Datasets {
    if (this.instance) {
      return this.instance
    }
    this.instance = new Datasets(client)
    return this.instance
  }

  public async getDataset(datasetId: string): Promise<GalaxyDataset> {
    try {
      const galaxyDataset = await this.#client.api(
        `api/datasets/${datasetId}`,
        {
          method: 'GET',
        },
      )
      return galaxyDataset
    }
    catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error),
      })
    }
  }
}
