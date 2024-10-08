export const InvocationTerminalStates = [
  'cancelled',
  'failed',
  'scheduled',
]

export const InvocationStates = [
  ...InvocationTerminalStates,
  'new',
  'ready',
  'cancelling',
] as const

export type InvocationState = typeof InvocationStates[number]
export type InvocationTerminalState = typeof InvocationTerminalStates[number]

export interface GalaxyInvocation {
  id: string
  state: InvocationState
}
