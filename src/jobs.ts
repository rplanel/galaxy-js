import type { GalaxyClient } from './GalaxyClient'
import type { ShowFullJobResponse } from './types'
import { createError } from 'h3'
import { getErrorMessage } from './errors'

export class Jobs {
  private static instance: Jobs
  #client: GalaxyClient

  private constructor(client: GalaxyClient) {
    this.#client = client
  }

  static getInstance(client: GalaxyClient): Jobs {
    if (this.instance) {
      return this.instance
    }
    this.instance = new Jobs(client)
    return this.instance
  }

  public async getJob(jobId: string): Promise<ShowFullJobResponse> {
    try {
      const galaxyJob = await this.#client.api(
        `api/jobs/${jobId}?full=true`,
        {
          method: 'GET',
        },
      )
      return galaxyJob
    }
    catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error),
      })
    }
  }
}
