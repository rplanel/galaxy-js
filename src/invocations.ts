import type { GalaxyClient } from './GalaxyClient'

import type { GalaxyInvocation } from './types'

import { createError } from 'h3'

import { getErrorMessage, getStatusCode } from './errors'

export class Invocations {
  #client: GalaxyClient
  private static instance: Invocations

  private constructor(client: GalaxyClient) {
    this.#client = client
  }

  static getInstance(client: GalaxyClient): Invocations {
    if (this.instance) {
      return this.instance
    }
    this.instance = new Invocations(client)
    return this.instance
  }

  public async getInvocation(invocationId: string): Promise<GalaxyInvocation> {
    try {
      const invocation = await this.#client.api<GalaxyInvocation>()(
        `api/invocations/${invocationId}`,
        {
          method: 'GET',
        },
      )
      return invocation
    }
    catch (error) {
      throw createError({
        statusCode: getStatusCode(error),
        statusMessage: `${getErrorMessage(error)}\nUnable to get invocation ${invocationId}`,
      })
    }
  }
}
