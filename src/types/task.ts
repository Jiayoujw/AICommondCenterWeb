export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped'

export interface TaskStep {
  id: string
  title: string
  description: string
  status: TaskStatus
  startTime?: number
  endTime?: number
  output?: string
  error?: string
}

export interface TaskFlow {
  id: string
  title: string
  steps: TaskStep[]
  currentStepIndex: number
  status: TaskStatus
}

export interface TaskFlowJSON {
  title: string
  steps: { id: string; title: string; description: string }[]
}
