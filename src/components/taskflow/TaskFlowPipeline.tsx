import type { TaskFlow } from '../../types/task'
import { TaskStepCard } from './TaskStepCard'
import { TaskStepConnector } from './TaskStepConnector'

interface TaskFlowPipelineProps {
  taskFlow: TaskFlow
}

export function TaskFlowPipeline({ taskFlow }: TaskFlowPipelineProps) {
  return (
    <div>
      <p className="text-xs text-terminal-muted mb-2 font-mono tracking-wider">
        TASK PIPELINE: {taskFlow.title}
      </p>
      <div className="flex flex-col md:flex-row md:items-start gap-0 md:gap-0 overflow-x-auto pb-2">
        {taskFlow.steps.map((step, i) => (
          <div key={step.id} className="flex md:flex-row flex-col items-stretch">
            <TaskStepCard step={step} index={i} />
            {i < taskFlow.steps.length - 1 && (
              <TaskStepConnector />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
