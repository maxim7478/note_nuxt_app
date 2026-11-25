import { expect, it, vi } from 'vitest'
import { useHistory } from '~/shared/composables/useHistory'

it('отменяет и повторяет шаг', () => {
  const apply = vi.fn()
  const history = useHistory({ apply })
  const step = { field: 'title', before: 'Список', after: 'Покупки' }

  history.record(step)

  history.undo()
  expect(apply).toHaveBeenLastCalledWith(step, 'undo')

  history.redo()
  expect(apply).toHaveBeenLastCalledWith(step, 'redo')
})