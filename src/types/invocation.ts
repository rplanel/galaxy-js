export const InvocationStates = [
  'new',
  'ready',
  'scheduled',
  'cancelled',
  'cancelling',
  'failed',
] as const

export type InvocationState = typeof InvocationStates[number]

export interface GalaxyInvocation {
  id: string
  state: InvocationState
}
