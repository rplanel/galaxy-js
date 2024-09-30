import type { GalaxyClient } from './GalaxyClient'
import type { GalaxyDataset, GalaxyHistoryDetailed, HDASummary } from './types'

import { createError } from 'h3'

import { getErrorMessage } from './errors'
import { delay } from './helpers'
import { DatasetsTerminalStates } from './types'

export class Histories {
  private static instance: Histories
  #client: GalaxyClient

  private constructor(client: GalaxyClient) {
    this.#client = client
  }

  static getInstance(client: GalaxyClient): Histories {
    if (this.instance) {
      return this.instance
    }
    this.instance = new Histories(client)
    return this.instance
  }

  public async createHistory(name: string): Promise<GalaxyHistoryDetailed> {
    try {
      return await this.#client.api<GalaxyHistoryDetailed>()(
        'api/histories',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `name=${name}`,
        },
      )
    }
    catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error),
      })
    }
  }

  public async deleteHistory(historyId: string): Promise<GalaxyHistoryDetailed> {
    try {
      const galaxyHistory = await this.#client.api<GalaxyHistoryDetailed>()(`api/histories/${historyId}`, {
        method: 'DELETE',
        body: { purge: true },
      })
      return galaxyHistory
    }
    catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error),
      })
    }
  }

  public async getHistories(): Promise<GalaxyHistoryDetailed[]> {
    try {
      const galaxyHistories = await this.#client.api<GalaxyHistoryDetailed[]>()('api/histories', {
        method: 'GET',
      })
      return galaxyHistories
    }
    catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error),
      })
    }
  }

  public async getHistory(historyId: string): Promise<GalaxyHistoryDetailed> {
    try {
      const galaxyHistory = await this.#client.api<GalaxyHistoryDetailed>()(`api/histories/${historyId}`, {
        method: 'GET',
      })
      return galaxyHistory
    }
    catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error),
      })
    }
  }

  public async uploadFile(historyId: string, srcUrl: string): Promise<GalaxyDataset> {
    const payload = {
      history_id: historyId,
      targets: [{
        destination: { type: 'hdas' },
        elements: [{
          src: 'url',
          url: srcUrl,
          name: null,
          dbkey: '?',
          ext: 'auto',
          space_to_tab: false,
          to_posix_lines: true,
        }],
      }],
      auto_decompress: true,
      files: [],
    }
    try {
      const galaxyDataset = await this.#client.api<GalaxyDataset>()(
        'api/tools/fetch',
        {
          method: 'POST',
          body: payload,
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

  public async getListDatasets(historyId: string): Promise<HDASummary[] | undefined> {
    const terminalStatesSet = new Set<string>(DatasetsTerminalStates)
    let terminalState = false

    while (!terminalState) {
      try {
        const datasets = await this.#client.api<HDASummary[]>()(
          `api/histories/${historyId}/contents`,
          {
            method: 'GET',
            params: {
              V: 'dev',
            },
          },
        )
        terminalState = datasets
          .map(d => d.state)
          .every(state => terminalStatesSet.has(state))
        if (terminalState)
          return datasets
        await delay(3000)
      }
      catch (error) {
        throw createError({
          statusCode: 500,
          statusMessage: getErrorMessage(error),
        })
      }
    }
  }

  public async downloadDataset(historyId: string, datasetId: string): Promise<unknown> {
    // /api/histories/{history_id}/contents/{history_content_id}/display
    try {
      const dataset = await this.#client.api()(
        `api/histories/${historyId}/contents/${datasetId}/display`,
        {
          method: 'GET',
        },
      )
      return dataset
    }
    catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: getErrorMessage(error),
      })
    }
  }
}
