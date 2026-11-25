type TUndoRedoHandlers = {
  undo: () => void
  redo: () => void
}

const textInputTypes = new Set([
  'text', 'search', 'email', 'url', 'tel', 'password', 'number',
])

const isTextField = (target: EventTarget | null): boolean => {
  if (target instanceof HTMLInputElement) {
    return textInputTypes.has(target.type)
  }

  return target instanceof HTMLTextAreaElement
    || (target instanceof HTMLElement && target.isContentEditable)
}

export const useUndoRedo = ({ undo, redo }: TUndoRedoHandlers): void => {
  const modalStore = useModalStore()

  const handleKeydown = (event: KeyboardEvent): void => {
    if (event.defaultPrevented || event.isComposing || event.altKey) return
    if (!(event.ctrlKey || event.metaKey) || event.code !== 'KeyZ') return
    if (modalStore.computedModalStack.length > 0 || isTextField(event.target)) return

    event.preventDefault()

    if (event.shiftKey) {
      redo()
    } else {
      undo()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
}