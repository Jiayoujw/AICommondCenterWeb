import type { TaskFlow, TaskFlowJSON } from '../types/task'

export function extractTaskFlow(content: string): TaskFlow | null {
  const blockMatch = content.match(/```taskflow\s*([\s\S]*?)```/)
  if (blockMatch) {
    try {
      const parsed = JSON.parse(blockMatch[1]) as TaskFlowJSON
      return createTaskFlow(parsed)
    } catch {
      return null
    }
  }

  const steps: { id: string; title: string; description: string }[] = []
  const stepPattern = /(?:Step|Task|步骤)\s*(\d+)[：:]\s*(.+)/gi
  let match: RegExpExecArray | null
  while ((match = stepPattern.exec(content)) !== null) {
    steps.push({
      id: `step-${match[1]}`,
      title: match[2].trim(),
      description: '',
    })
  }

  if (steps.length >= 2) {
    return createTaskFlow({ title: 'Task Pipeline', steps })
  }

  return null
}

function createTaskFlow(json: TaskFlowJSON): TaskFlow {
  const steps = json.steps.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    status: 'pending' as const,
  }))

  return {
    id: `tf-${Date.now()}`,
    title: json.title,
    steps,
    currentStepIndex: 0,
    status: 'pending',
  }
}
