type THistoryOptions<TStep> = {
  apply: (step: TStep, direction: 'undo' | 'redo') => void
  onChange?: () => void
}

export const useHistory = <TStep,>(
  {
    apply,
    onChange,
  }: THistoryOptions<TStep>) => {
  const steps: TStep[] = []
  let cursor = 0

  const record = (step: TStep) => {
    steps.splice(cursor)
    steps.push(step)

    if (steps.length > 50) steps.shift()

    cursor = steps.length
    onChange?.()
  }

  const undo = () => {
    if (cursor === 0) return

    apply(steps[cursor - 1] as TStep, 'undo')
    cursor--
    onChange?.()
  }

  const redo = () => {
    if (cursor === steps.length) return

    apply(steps[cursor]!, 'redo')
    cursor++
    onChange?.()
  }

  const reset = () => {
    steps.length = 0
    cursor = 0
  }

  return { record, undo, redo, reset }
}