import type { GalaxyClient } from './GalaxyClient'
import type { GalaxyInvoke, GalaxyWorkflow, GalaxyWorkflowExport, GalaxyWorkflowInput, GalaxyWorkflowParameters } from './types'
import { createError } from 'h3'

import { getErrorMessage, getStatusCode } from './errors'

export class Workflows {
  #client: GalaxyClient
  private static instance: Workflows
  private constructor(client: GalaxyClient) {
    this.#client = client
  }

  static getInstance(client: GalaxyClient): Workflows {
    if (this.instance) {
      return this.instance
    }
    this.instance = new Workflows(client)
    return this.instance
  }

  public async getWorkflow(workflowId: string): Promise<GalaxyWorkflow> {
    try {
      const galaxyWorkflow = await this.#client.api(
        `api/workflows/${workflowId}`,
        {
          method: 'GET',
        },
      )
      return galaxyWorkflow
    }
    catch (error) {
      throw createError({
        statusCode: getStatusCode(error),
        statusMessage: `Unable to get workflow ${workflowId}`,
      })
    }
  }

  public async exportWorkflow(workflowId: string): Promise<GalaxyWorkflowExport> {
    try {
      const galaxyWorkflow = await this.#client.api(
        `api/workflows/${workflowId}/download`,
        {
          method: 'GET',
        },
      )
      return galaxyWorkflow
    }
    catch (error) {
      throw createError({
        statusCode: getStatusCode(error),
        statusMessage: `Unable to get workflow ${workflowId}`,
      })
    }
  }

  public async getWorkflows(): Promise<GalaxyWorkflow[]> {
    try {
      const galaxyWorkflows = await this.#client.api(
        'api/workflows',
        {
          method: 'GET',
        },
      )
      return galaxyWorkflows
    }
    catch (error) {
      throw createError({
        statusCode: getStatusCode(error),
        statusMessage: 'Unable to get the list of workflows',
      })
    }
  }

  public async invokeWorkflow(historyGalaxyId: string, workflowId: string, inputs: GalaxyWorkflowInput, parameters: GalaxyWorkflowParameters): Promise<GalaxyInvoke> {
    try {
      const galaxyInvocation = await this.#client.api(
        `api/workflows/${workflowId}/invocations`,
        {
          method: 'POST',
          body: { history_id: historyGalaxyId, inputs, parameters },
        },
      )
      return galaxyInvocation
    }
    catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error),
      })
    }
  }
}
