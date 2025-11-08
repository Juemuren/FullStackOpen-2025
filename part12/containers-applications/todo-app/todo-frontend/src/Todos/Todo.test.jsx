import { describe, test, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import Todo from './Todo'

describe('Todo component', () => {
  const todo = { id: 1, text: 'Sleep 8 hours', done: false }
  const onDelete = vi.fn()
  const onComplete = vi.fn()

  test('render todo text', () => {
    render(<Todo todo={todo} onClickDelete={onDelete} onClickComplete={onComplete} />)

    screen.debug()

    expect(screen.getByText(todo.text)).toBeTruthy()
  });

});