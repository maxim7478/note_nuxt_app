import { createPinia, setActivePinia } from 'pinia'
import { expect, it } from 'vitest'
import { useNotesListStore } from '~/entities/note/useNotesListStore'

it('добавляет заметку в стор', () => {
  localStorage.removeItem('notesList')
  setActivePinia(createPinia())

  const store = useNotesListStore()
  const id = store.addNewItem({ title: 'Покупки', items: [] })

  expect(store.getItemById(id).title).toBe('Покупки')
})