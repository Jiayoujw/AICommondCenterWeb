import { create } from 'zustand'
import type { TaskFlow, TaskStatus } from '../types/task'

interface TaskState {
  activeTaskFlows: Record<string, TaskFlow>
  startTaskFlow: (messageId: string, taskFlow: TaskFlow) => void
  updateStepStatus: (taskFlowId: string, stepId: string, status: TaskStatus, output?: string) => void
  advanceStep: (taskFlowId: string) => void
}

export const useTaskStore = create<TaskState>()((set) => ({
  activeTaskFlows: {},

  startTaskFlow: (messageId, taskFlow) =>
    set((s) => ({
      activeTaskFlows: { ...s.activeTaskFlows, [messageId]: taskFlow },
    })),

  updateStepStatus: (taskFlowId, stepId, status, output) =>
    set((s) => {
      const tf = s.activeTaskFlows[taskFlowId]
      if (!tf) return s
      return {
        activeTaskFlows: {
          ...s.activeTaskFlows,
          [taskFlowId]: {
            ...tf,
            steps: tf.steps.map((step) =>
              step.id === stepId
                ? { ...step, status, output, endTime: status === 'completed' ? Date.now() : undefined }
                : step
            ),
          },
        },
      }
    }),

  advanceStep: (taskFlowId) =>
    set((s) => {
      const tf = s.activeTaskFlows[taskFlowId]
      if (!tf) return s
      const nextIndex = tf.currentStepIndex + 1
      if (nextIndex >= tf.steps.length) {
        return {
          activeTaskFlows: {
            ...s.activeTaskFlows,
            [taskFlowId]: { ...tf, status: 'completed' as const, currentStepIndex: nextIndex },
          },
        }
      }
      const updatedSteps = tf.steps.map((step, i) => {
        if (i === tf.currentStepIndex) return { ...step, status: 'completed' as const, endTime: Date.now() }
        if (i === nextIndex) return { ...step, status: 'running' as const, startTime: Date.now() }
        return step
      })
      return {
        activeTaskFlows: {
          ...s.activeTaskFlows,
          [taskFlowId]: {
            ...tf,
            steps: updatedSteps,
            currentStepIndex: nextIndex,
            status: 'running' as const,
          },
        },
      }
    }),
}))
